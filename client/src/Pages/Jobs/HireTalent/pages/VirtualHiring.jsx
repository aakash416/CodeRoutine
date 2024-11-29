import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  TrendingUp,
  People,
  Assessment,
  AddBox,
  Event,
  CheckCircle,
  HelpOutline,
  Group,
} from "@mui/icons-material";

function VirtualHiring() {
  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Welcome to Virtual Hiring!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Streamline your hiring process with our tools. Manage tests, track
          progress, and find the best candidates effortlessly.
        </Typography>
      </Paper>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUp sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                85%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hiring Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <People sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                32
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Candidates Engaged
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Assessment sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                14
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tests Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Group sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                50
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Candidates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, p: 3 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Upcoming Tests & Events
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Event color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Technical Test"
                  secondary="28th Nov, 10:00 AM"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Event color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="HR Screening"
                  secondary="30th Nov, 2:00 PM"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, p: 3 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Pending Tasks
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Review Test Results" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Send Exam Invitation Mails" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Send Mails to Selected Candidates" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VirtualHiring;
