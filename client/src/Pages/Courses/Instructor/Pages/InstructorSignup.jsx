import React, { useRef } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";

const InstructorSignup = () => {
  const signupSectionRef = useRef(null);

  const scrollToSignup = () => {
    if (signupSectionRef.current) {
      signupSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Grid item sm={12} md={6} lg={4}>
        <Box
          sx={{
            backgroundColor: "green",
            color: "white",
            textAlign: "center",
            py: 10,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Become an Instructor
          </Typography>
          <Typography variant="h5" paragraph>
            Share your knowledge with millions of students. Join our platform
            today!
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={scrollToSignup}
          >
            Sign Up Now
          </Button>
        </Box>
      </Grid>

      <Container>
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Why Teach with Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={5}
                sx={{ p: 3, textAlign: "center", height: "100%" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  Reach a Global Audience
                </Typography>
                <Typography>
                  Your courses will reach millions of students worldwide,
                  helping you grow your influence.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={5}
                sx={{ p: 3, textAlign: "center", height: "100%" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  Flexible Teaching
                </Typography>
                <Typography>
                  Teach from anywhere, anytime, with full control over your
                  course schedule and content.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={5}
                sx={{ p: 3, textAlign: "center", height: "100%" }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  Earn Revenue
                </Typography>
                <Typography>
                  Get paid for your knowledge and expertise by offering both
                  free and paid courses.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        ref={signupSectionRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 8,
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Signup to Become an Instructor
          </Typography>
          <Typography variant="h6" paragraph>
            Fill out the form below to create your account.
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
              p: 4,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  helperText="Please, use your official email ID"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  type="tel"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Designation"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InstructorSignup;
