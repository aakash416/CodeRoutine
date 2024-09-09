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

const CommentSection = ({ comments, setTopic, topicId }) => {
  return (
    <Box mt={2} gap={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <CommentIcon fontSize="small" color="action" aria-label="comment" />
        <Typography variant="body2" color="gray">
          Comments: {comments.length}
        </Typography>
      </Box>
      {comments.length === 0 ? (
        <Typography variant="body2" color="gray">
          No comments yet! 😢
        </Typography>
      ) : (
        <List>
          {comments
            .map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                topicId={topicId}
                setTopic={setTopic}
              />
            ))
            .reverse()}
        </List>
      )}
    </Box>
  );
};

const DiscussDetails = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [update, setUpdate] = useState({});
  const [newComment, setNewComment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state
  const [isLiked, setIsLiked] = useState(null);
  const [likeorComment, setLikeorComment] = useState("");
  const {
    state: { user },
  } = React.useContext(ContextStore);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch topic by ID
    const fetchTopic = async () => {
      try {
        const response = await getDiscussById(id);
        setTopic(response);
        setIsLiked(response.isLiked);
      } catch (error) {
        console.error("Failed to fetch topic:", error);
      }
    };
    fetchTopic();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      setLikeorComment("Please log in to like or comment.");
      setLoginDialogOpen(true);
      return;
    }
    try {
      const response = await addLikeOrRemoveLike(id);
      setTopic((prevTopic) => ({
        ...prevTopic,
        likes: response.likes,
      }));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to like/unlike topic:", error);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      setLikeorComment("Please log in to delete.");
      setLoginDialogOpen(true);
      return;
    }
    try {
      await deleteDiscussById(id);
      navigate("/discussions"); // Navigate to discussions list after deletion
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  };

  const handleCommentChange = (event) => setNewComment(event.target.value);

  const handleAddComment = async () => {
    if (!user) {
      setLikeorComment("Please log in to add a comment.");
      setLoginDialogOpen(true);
      return;
    }
    try {
      const response = await addCommentToTopic(id, newComment);
      setTopic((prevTopic) => ({
        ...prevTopic,
        comments: [response, ...prevTopic.comments],
      }));
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, minHeight: "100vh" }}>
      {!topic ? (
        <TopicLoadig />
      ) : (
        <>
          <Typography variant="h5" mb={2}>
            {topic.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              alt={topic.author.name}
              src={getCuteAvatar(topic.author.avatar)}
            />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {topic.author.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(topic.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" paragraph>
            {topic.content}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Button
              variant={isLiked ? "contained" : "outlined"}
              color="primary"
              startIcon={<ThumbUpIcon />}
              onClick={handleLike}
            >
              {isLiked ? "Unlike" : "Like"} ({topic.likes.length})
            </Button>
            {user && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setOpenDialog(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
          <DiscussEdit
            openDialog={openDialog}
            update={update}
            setUpdate={setUpdate}
            handleCloseDialog={() => setOpenDialog(false)}
            handleContentChange={(e) =>
              setUpdate({ ...update, content: e.target.value })
            }
            setTopic={setTopic}
            setOpenDialog={setOpenDialog}
          />
          <CommentSection
            comments={topic.comments}
            setTopic={setTopic}
            topicId={topic._id}
          />
          <Box mt={2}>
            <TextField
              fullWidth
              label="Add a comment"
              value={newComment}
              onChange={handleCommentChange}
              variant="outlined"
              multiline
              rows={3}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              onClick={handleAddComment}
              sx={{ mt: 1 }}
            >
              Post
            </Button>
          </Box>
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
