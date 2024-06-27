import React from 'react'
import { ContextStore } from '../../Context/ContextStore';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import getCuteAvatar from '../../Config/getCuteAvatar';
import ReactTimeAgo from 'react-time-ago';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addLikeOrRemoveLikeReply } from '../../Services/AuthService';

const Reply = (props) => {
    const [reply, setReply] = React.useState(props?.reply);
    const [isLiked, setIsLiked] = React.useState(null);
    const { userData } = ContextStore()
    const userId = userData?._id;

    const handleLikeReply = async (replyId) => {
        try {
            const response = await addLikeOrRemoveLikeReply(replyId);
            const userLikes = reply?.likes.includes(userId);
            if (response && response.data) {
                if (!userLikes) {
                    setReply(prevTopic => ({
                        ...prevTopic,
                        likes: [...(reply?.likes || []), userId] // Update likes with the new data
                    }));
                    setIsLiked(true);
                }
                else {
                    setReply(prevTopic => ({
                        ...prevTopic,
                        likes: prevTopic.likes.filter(like => like !== userId) // Remove userId from likes array
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

    return (

        <ListItem
            key={reply._id}
            alignItems="flex-start"
            style={{ paddingLeft: 80 }}
        >
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
                            component="span"
                            variant="body2"
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
                        <ThumbUpIcon
                            cursor="pointer"
                            onClick={() => handleLikeReply(reply._id)}
                            style={{ color: "gray" }}
                        />
                        {/* {isLiked}  if it is true there then change icone color */}
                        {reply?.likes?.length}
                    </React.Fragment>
                }
            />
        </ListItem>

    )
}

export default Reply