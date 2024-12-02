import React from "react";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import getCuteAvatar from "../../../../Config/getCuteAvatar";
import { ContextStore } from "../../../../Context/ContextStore";

function Welcome() {
  const navigate = useNavigate();
  const { userData } = ContextStore();

  const buttonStyle = {
    borderRadius: "40px",
    whiteSpace: "nowrap",
    mt: { xs: 2, sm: 0 },
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mb: 2,
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
        borderRadius: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: 2,
          gap: 2,
        }}
        borderRadius="20px"
      >
        <Box display="flex" gap={2} alignItems="center" flexShrink={1}>
          <Avatar
            alt={userData?.userName}
            src={getCuteAvatar(userData?.userName)}
            onClick={() => navigate(`/profile/${userData?.userName}`)}
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Welcome {userData?.userName}
            </Typography>
            <Typography variant="body2" sx={{ color: "red" }}>
              Your credentials are being reviewed by the Coderoutine Admin Team.
              The verification process usually takes up to two business days.
            </Typography>
          </Box>
        </Box>
        <Box flexShrink={0}>
          <Button
            variant="contained"
            sx={buttonStyle}
            component={Link}
            to="/jobs/postjobs"
          >
            Post A Job
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default Welcome;
