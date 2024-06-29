import React, { useEffect, useState } from "react";
import { ContextStore } from "../../Context/ContextStore";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import getCuteAvatar from "../../Config/getCuteAvatar";
import ReactTimeAgo from "react-time-ago";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addLikeOrRemoveLikeReply } from "../../Services/AuthService";
import IsLogin from "../../Component/IsLogin";

const Reply = (props) => {
  const [reply, setReply] = React.useState(props?.reply);
  const [isLiked, setIsLiked] = React.useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // New state

  const { userData } = ContextStore();
  const userId = userData?._id;

  const handleLikeReply = async (replyId) => {
    if (!userData) {
      setLoginDialogOpen(true);
      return;
    }
    try {
      const response = await addLikeOrRemoveLikeReply(replyId);
      const userLikes = reply?.likes.includes(userId);
      if (response && response.data) {
        if (!userLikes) {
          setReply((prevTopic) => ({
            ...prevTopic,
            likes: [...(reply?.likes || []), userId], // Update likes with the new data
          }));
          setIsLiked(true);
        } else {
          setReply((prevTopic) => ({
            ...prevTopic,
            likes: prevTopic.likes.filter((like) => like !== userId), // Remove userId from likes array
          }));
          setIsLiked(false);
        }
      } else {
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      console.error("Error liking reply:", error);
    }
  };

  useEffect(() => {
    if (reply) {
      setIsLiked(reply?.likes?.includes(userData?._id));
    }
  }, [reply, userData]);
  return (
    <ListItem
      key={reply._id}
      alignItems="flex-start"
      style={{ paddingLeft: 80 }}
    >
      {reply ? (
        <React.Fragment>
          <ListItemAvatar>
            <Avatar
              alt={reply?.author?.userName}
              src={getCuteAvatar(reply?.author?.userName)}
            />
          </ListItemAvatar>
          <ListItemText
            primary={reply?.author?.userName}
            secondary={
              <React.Fragment>
                <Typography
                  component={"span"}
                  variant={"body2"} 
                  color="textPrimary"
                >
                  {reply.content}
                </Typography>
                <br />
                <ReactTimeAgo
                  date={new Date(reply?.createdAt).getTime()}
                  locale="en-US"
                />
                <br />
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  component={"span"}
                  variant={"body2"}
                >
                  <ThumbUpIcon
                    cursor="pointer"
                    onClick={() => handleLikeReply(reply._id)}
                    style={{ color: isLiked ? "#0247FE" : "gray" }}
                  />
                  {/* {isLiked}  if it is true there then change icone color */}
                  {reply?.likes?.length > 0 && reply?.likes?.length}
                </Typography>
              </React.Fragment>
            }
          />
        </React.Fragment>
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
      <IsLogin
        setLoginDialogOpen={setLoginDialogOpen}
        loginDialogOpen={loginDialogOpen}
        message={" If you want to like, then please login."}
      />
    </ListItem>
  );
};

export default Reply;
