import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import SupportIcon from "@mui/icons-material/Support";
import BlockIcon from "@mui/icons-material/Block";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CopyRight from "../../Component/CopyRight/CopyRight";
import getCuteAvatar from "../../Config/getCuteAvatar";

const testimonials = [
  {
    name: "John Doe",
    review:
      "CodeRoutine has completely transformed the way I code. The premium content is top-notch!",
  },
  {
    name: "Jane Smith",
    review:
      "The priority customer support is amazing. They always respond quickly and helpfully.",
  },
  {
    name: "Samuel Lee",
    review:
      "Offline access has been a game-changer for me. I can now learn even when I'm not connected to the internet.",
  },
];

const Premium = () => {
  React.useEffect(() => {
    document.title = "CodeRoutine | Premium";
  }, []);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#282828",
          minHeight: "100vh",
          padding: 4,
          color: "white",
        }}
      >
        <Container>
          <Box sx={{ padding: 4 }} mt={5}>
            <Typography variant="h3" gutterBottom textAlign="center">
              Premium
            </Typography>
            <Typography variant="body1" gutterBottom textAlign="center">
              Get started with a CodeRoutine Subscription that works for you.
            </Typography>
            <Grid container spacing={4} justifyContent="center" mt={4}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    Basic Plan
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    ₹11/month
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Includes basic features and support.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Choose Basic
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    Premium Plan
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    ₹21/month
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Includes all features and priority support.
                  </Typography>
                  <Button variant="contained" color="secondary">
                    Choose Premium
                  </Button>
                </Paper>
              </Grid>
            </Grid>
            <Box mt={4} mb={10}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Unlimited access to all content"
                        secondary="Enjoy unlimited access to our extensive library."
                        primaryTypographyProps={{ style: { color: "white" } }}
                        secondaryTypographyProps={{
                          style: { color: "#eff1f6bf" },
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <StarIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Exclusive premium content"
                        secondary="Get access to exclusive content available only to premium members."
                        primaryTypographyProps={{ style: { color: "white" } }}
                        secondaryTypographyProps={{
                          style: { color: "#eff1f6bf" },
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SupportIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Priority customer support"
                        secondary="Receive priority support from our team."
                        primaryTypographyProps={{ style: { color: "white" } }}
                        secondaryTypographyProps={{
                          style: { color: "#eff1f6bf" },
                        }}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <BlockIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="No ads"
                        secondary="Enjoy an ad-free experience."
                        primaryTypographyProps={{ style: { color: "white" } }}
                        secondaryTypographyProps={{
                          style: { color: "#eff1f6bf" },
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <OfflineBoltIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Offline access"
                        secondary="Download content to watch offline."
                        primaryTypographyProps={{ style: { color: "white" } }}
                        secondaryTypographyProps={{
                          style: { color: "#eff1f6bf" },
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <QuestionAnswerIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Monthly Q&A sessions"
                        secondary="Participate in monthly Q&A sessions with experts."
                        primaryTypographyProps={{ style: { color: "white" } }}
                        secondaryTypographyProps={{
                          style: { color: "#eff1f6bf" },
                        }}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h4" gutterBottom textAlign="center" mb={5}>
                What others are saying about us?
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper
                      elevation={3}
                      sx={{ padding: 3, textAlign: "center", color: "black" }}
                    >
                      <Avatar
                        src={getCuteAvatar(testimonial.name)}
                        alt={testimonial.name}
                        sx={{
                          width: 56,
                          height: 56,
                          margin: "auto",
                          marginBottom: 2,
                        }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body1">
                        {testimonial.review}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
      <CopyRight />
    </>
  );
};

export default Premium;
