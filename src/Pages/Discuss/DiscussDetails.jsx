import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Avatar,
  TextField,
  List,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/ChatBubble";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendIcon from "@mui/icons-material/Send";

import getCuteAvatar from "../../Config/getCuteAvatar";
import DiscussEdit from "./DiscussEdit";
import { ContextStore } from "../../Context/ContextStore";
import Comment from "./Comment";
import IsLogin from "../../Component/IsLogin";
import TopicLoadig from "./Loading/TopicLoadig";
import {
  addLikeOrRemoveLike,
  deleteDiscussById,
  getDiscussById,
} from "../../Api/Discuss/discussApi";
import { addCommentToTopic } from "../../Api/Discuss/commentApi";

const DiscussDetails = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [update, setUpdate] = useState({});
  const [newComment, setNewComment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state
  const [isLiked, setIsLiked] = useState(null);
  const [likeorComment, setisLikeorComment] = useState(null);

  const navigate = useNavigate();
  const { userData } = ContextStore();

  React.useEffect(() => {
    document.title = "CodeRoutine | Discuss Details";
  }, []);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await getDiscussById(id);
        setTopic(response.data);
        setUpdate(response.data);
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };

    fetchTopic();
  }, [id]);

  useEffect(() => {
    if (topic) {
      setIsLiked(topic?.likes?.includes(userData?._id));
    }
  }, [topic, userData]);

  const handleDelete = async () => {
    try {
      await deleteDiscussById(id);
      navigate("/discuss");
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      if (!userData) {
        // Check if user is logged in
        setisLikeorComment("If you want write comment,then please Login");
        setLoginDialogOpen(true); // Open login dialog
        return; // Exit function to prevent further execution
      }

      const response = await addCommentToTopic(id, {
        content: newComment,
      });
      if (response && response.data) {
        const newCommentData = {
          ...response.data.comment,
          author: {
            _id: userData?._id,
            userName: userData?.userName,
          },
        };
        const updatedComments = [...(topic?.comments || []), newCommentData];
        setTopic((prevTopic) => ({
          ...prevTopic,
          comments: updatedComments,
        }));
      }
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle error scenarios here
    }
  };

  const handleLike = async () => {
    if (!userData) {
      // Check if user is logged in
      setisLikeorComment("If you want to like,then please Login");
      setLoginDialogOpen(true); // Open login dialog
      return;
    }

    const userId = userData?._id;
    try {
      const response = await addLikeOrRemoveLike(id);
      const userLikes = topic?.likes.includes(userId);
      if (response && response.data) {
        if (!userLikes) {
          setTopic((prevTopic) => ({
            ...prevTopic,
            likes: [...(topic?.likes || []), userId],
          }));
          setIsLiked(true);
        } else {
          setTopic((prevTopic) => ({
            ...prevTopic,
            likes: prevTopic.likes.filter((like) => like !== userId),
          }));
          setIsLiked(false);
        }
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error liking/unliking topic:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleContentChange = (value) => {
    setUpdate({
      ...update,
      content: value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {!topic ? (
        <TopicLoadig />
      ) : (
        <>
          <Typography variant="h5" mb={2}>
            {topic.title}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            gap={1}
          >
            <Avatar
              alt={topic?.author?.userName}
              src={getCuteAvatar(topic?.author?.userName)}
              onClick={() => navigate(`/profile/${topic?.author?.userName}`)}
              aria-label="author"
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
              }}
            />
            <Typography
              variant="body2"
              color="gray"
              onClick={() => navigate(`/profile/${topic?.author?.userName}`)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {topic?.author?.userName}
            </Typography>
            <ThumbUpIcon
              cursor="pointer"
              onClick={handleLike}
              fontSize="small"
              sx={{
                color: isLiked ? "#0247FE" : "gray",
                "&:hover": {
                  color: isLiked ? "gray" : "#0247FE",
                },
              }}
              color="action"
              aria-label="like"
            />
            <Typography variant="body2" color="gray">
              {topic?.likes?.length > 0 && topic?.likes?.length}
            </Typography>
            {userData?._id === topic?.author?._id && (
              <>
                <EditIcon
                  onClick={handleOpenDialog}
                  fontSize="small"
                  aria-label="edit"
                  cursor="pointer"
                  sx={{
                    color: "green",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                  color="action"
                />
                <DeleteOutlineIcon
                  onClick={handleDelete}
                  fontSize="small"
                  aria-label="delete"
                  cursor="pointer"
                  sx={{
                    color: "red",
                    "&:hover": {
                      color: "orange",
                    },
                  }}
                  color="action"
                />
              </>
            )}
          </Box>

          <Typography variant="body2" color="gray" mt={2} component={"div"}>
            <div dangerouslySetInnerHTML={{ __html: topic.content }} />
          </Typography>

          <Box mt={2} gap={1}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              <CommentIcon
                fontSize="small"
                color="action"
                aria-label="comment"
                cursor="pointer"
                sx={{
                  color: "blue",
                }}
              />
              <Typography variant="body2" color="gray">
                Comments: {topic?.comments?.length}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              gap={1}
              mt={1}
            >
              <TextField
                value={newComment}
                fullWidth
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type comment here..."
                multiline
                rows={2}
                variant="outlined"
                aria-label="comment"
              />
              <Button
                onClick={handleAddComment}
                variant="contained"
                color="primary"
                size="small"
                aria-label="add comment"
                sx={{
                  color: "white",
                }}
                disabled={!newComment.trim()}
                startIcon={<SendIcon fontSize="small" />}
              >
                Post
              </Button>
            </Box>
          </Box>

          {topic?.comments?.length === 0 ? (
            <Typography variant="body2" color="gray">
              No comments yet ! 😢
            </Typography>
          ) : (
            <List>
              {topic?.comments
                ?.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    topicId={topic?._id}
                    setTopic={setTopic}
                  />
                ))
                .reverse()}
            </List>
          )}

          <DiscussEdit
            openDialog={openDialog}
            update={update}
            setUpdate={setUpdate}
            handleCloseDialog={handleCloseDialog}
            handleContentChange={handleContentChange}
            setTopic={setTopic}
            setOpenDialog={setOpenDialog}
          />

          <IsLogin
            setLoginDialogOpen={setLoginDialogOpen}
            loginDialogOpen={loginDialogOpen}
            message={likeorComment}
          />
        </>
      )}
    </Container>
  );
};

export default DiscussDetails;
