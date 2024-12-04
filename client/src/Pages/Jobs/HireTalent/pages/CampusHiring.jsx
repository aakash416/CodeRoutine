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
  Event,
  CheckCircle,
  Work,
  Engineering,
  Science,
  Computer,
} from "@mui/icons-material";

function CampusHiring() {
  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(135deg, #e8f5e9, #ffffff)",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Campus Hiring for Top Talent!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover opportunities tailored for B.Tech, M.Tech, B.Sc., and more.
          Connect with the brightest minds and kickstart their careers in
          diverse roles.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          View Job Openings
        </Button>
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
              <Engineering sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                80
              </Typography>
              <Typography variant="body2" color="text.secondary">
                B.Tech Candidates Engaged
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
              <Science sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                50
              </Typography>
              <Typography variant="body2" color="text.secondary">
                M.Tech Candidates Engaged
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
              <Computer sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                70
              </Typography>
              <Typography variant="body2" color="text.secondary">
                B.Sc. Candidates Engaged
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
              <Work sx={{ fontSize: 50, color: "primary.main" }} />
              <Typography variant="h5" fontWeight="bold" color="primary">
                30
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Job Offers Extended
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, p: 3 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Software Engineers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join leading tech companies as SDE. Be a part of teams developing
              Software solutions.
            </Typography>
            <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
              Apply Now
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, p: 3 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Data Analysts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyze complex data sets to provide insights and support
              strategic decisions in top companies.
            </Typography>
            <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
              Apply Now
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, p: 3 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Project Managers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lead projects from initiation to completion, ensuring smooth
              coordination and successful delivery.
            </Typography>
            <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
              Apply Now
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, p: 3 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Upcoming Events
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Event color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Software Engineering Test - ABC University"
                  secondary="8th Dec, 10:00 AM"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Event color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Data Science Webinar"
                  secondary="12th Dec, 2:00 PM"
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
                <ListItemText primary="Shortlist B.Tech Candidates" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Finalize Job Descriptions for Roles" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Prepare Onboarding Documents" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CampusHiring;
