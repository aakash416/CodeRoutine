import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import getCuteAvatar from "../../../../Config/getCuteAvatar";
import { ContextStore } from "../../../../Context/ContextStore";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { userData } = ContextStore();

  const handleAvatarClick = () => {
    navigate(`/profile/${userData?.userName}`);
  };

  const buttonStyle = {
    borderRadius: "40px",
    mt: { xs: 2, sm: 0 },
    whiteSpace: "nowrap",
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row", md: "row", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        border: "1px solid #f0f0f0", // Light background for contrast
        padding: 2,
      }}
      borderRadius="20px"
      gap={3}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Avatar
          alt={userData?.userName}
          src={getCuteAvatar(userData?.userName)}
          onClick={handleAvatarClick}
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            cursor: "pointer",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Welcome, {userData?.userName}!
          </Typography>
          <Typography variant="body2" sx={{ color: "red" }}>
            Your credentials are being reviewed by the Coderoutine Admin Team.
            The verification process usually takes up to two business days.
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        sx={buttonStyle}
        component={Link}
        to="/courses/add"
      >
        Post A Course
      </Button>
    </Box>
  );
};

export default WelcomePage;
