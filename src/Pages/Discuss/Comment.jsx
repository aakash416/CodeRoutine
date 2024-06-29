import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ChatIcon from "@mui/icons-material/Chat";
import ReactTimeAgo from "react-time-ago";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  addLikeOrRemoveLikeComment,
  addReplyToComment,
} from "../../Services/AuthService";
import { ContextStore } from "../../Context/ContextStore";
import Reply from "./Reply";
import ReplyIcon from "@mui/icons-material/Reply";
import IsLogin from "../../Component/IsLogin";
const Comment = (props) => {
  const [comment, setComment] = useState(props?.comment);
  const [replyContent, setReplyContent] = useState("");
  const [isLiked, setIsLiked] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state
  const [likeorComment, setisLikeorComment] = useState(null);
  const [showReplies, setShowReplies] = React.useState(false);
  const { userData } = ContextStore();
  const userId = userData?._id;
  const handleLikeComment = async (commentId) => {
    if (!userData) {
      setisLikeorComment("If you want to like,then please Login");
      setLoginDialogOpen(true);
      return;
    }
    try {
      const response = await addLikeOrRemoveLikeComment(commentId);
      const userLikes = comment?.likes.includes(userId);
      if (response && response.data) {
        if (!userLikes) {
          setComment((prevTopic) => ({
            ...prevTopic,
            likes: [...(comment?.likes || []), userId], // Update likes with the new data
          }));
          setIsLiked(true);
        } else {
          setComment((prevTopic) => ({
            ...prevTopic,
            likes: prevTopic.likes.filter((like) => like !== userId), // Remove userId from likes array
          }));
          setIsLiked(false);
        }
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  useEffect(() => {
    if (comment) {
      setIsLiked(comment?.likes?.includes(userData?._id));
    }
  }, [comment, userData]);

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
    setReplyContent(""); // Clear content on toggle
  };

  const handleReplyToComment = async (commentId) => {
    try {
      if (!userData) {
        // Check if user is logged in
        setLoginDialogOpen(true); // Open login dialog
        setisLikeorComment("if you want to reply,then please Login");
        return; // Exit function to prevent further execution
      }

      const response = await addReplyToComment(commentId, {
        content: replyContent,
      });
      if (response && response.data) {
        const newCommentData = {
          ...response.data.reply,
          author: {
            _id: userData?._id,
            userName: userData?.userName,
          },
        };
        // Create a new array with the new comment added
        const updatedComments = [...(comment?.replies || []), newCommentData];
        // Update the topic state with the new comments array
        setComment((prevTopic) => ({
          ...prevTopic,
          replies: updatedComments,
        }));
      }
      setReplyContent("");
      setIsReplying(false);
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  const handleCancel = () => {
    setIsReplying(false);
    setReplyContent("");
  };

  const handleReplies = () => {
    setShowReplies(!showReplies);
  };
  return (

    <List display="flex">
      {comment ? (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={comment?.author?.userName}
              src={getCuteAvatar(comment?.author?.userName)}
            />
          </ListItemAvatar>
          <ListItemText
            primary={comment?.author?.userName}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {comment.content}
                </Typography>
                <br />
                <ReactTimeAgo
                  date={new Date(comment?.createdAt).getTime()}
                  locale="en-US"
                />
                <br />

                  <Typography display={"flex"} alignItems={"center"} gap={1}  component={"span"}
                  variant={"body2"}>
                    <ThumbUpIcon
                      cursor="pointer"
                      onClick={() => handleLikeComment(comment?._id)}
                      style={{ color: isLiked ? "#0247FE" : "gray" }}
                    />
                    {comment?.likes?.length > 0 && comment?.likes?.length}

                  <Button
                    onClick={handleReplyClick}
                    style={{ color: isReplying ? "#0247FE" : "gray" }}
                  >
                    <ReplyIcon />
                    Reply
                  </Button>
                  {comment.replies.length > 0 && (
                    <Button
                      onClick={handleReplies}
                      style={{ color: showReplies ? "#0247FE" : "gray" }}
                    >
                      <ChatIcon />
                      {showReplies
                        ? `Hide ${comment.replies.length} ${
                            comment.replies.length > 1 ? "replies" : "reply"
                          }`
                        : `Show ${comment.replies.length} ${
                            comment.replies.length > 1 ? "replies" : "reply"
                          }`}
                    </Button>
                  )}
                </Typography>

                {isReplying && (
                  <React.Fragment>
                    <TextField
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      fullWidth
                      multiline
                      rows={2}
                    />
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "flex-end", // Align buttons to the right
                        marginTop: "8px",
                        gap: "8px", // Adjust spacing between buttons
                      }}


                        <Button
                          onClick={handleCancel}
                          variant="outlined"
                          color="secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleReplyToComment(comment?._id)}
                          disabled={!replyContent.trim()}
                          variant="contained"
                          color="primary"
                        >
                        Post
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
      ) : (
        <ListItem>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" width="20%" />}
            secondary={<Skeleton variant="text" width="20%" />}
          />
        </ListItem>
      )}
      {showReplies && (
        <List>
          {comment.replies
            .map((reply) => <Reply key={reply._id} reply={reply} />)
            .reverse()}
        </List>
      )}
    </List>
     <IsLogin
        setLoginDialogOpen={setLoginDialogOpen}
        loginDialogOpen={loginDialogOpen}
        message={likeorComment}
      />
  );
};

export default Comment;
