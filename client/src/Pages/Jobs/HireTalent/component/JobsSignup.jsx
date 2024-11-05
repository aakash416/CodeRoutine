import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SearchIcon from "@mui/icons-material/Search";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const JobsSignup = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "green",
          color: "white",
          textAlign: "center",
          py: 11,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 600 }}
            gutterBottom
          >
            Welcome to Jobs SignUp
          </Typography>
          <Typography variant="h6" paragraph>
            Find your dream job and connect with top employers. Sign up today to
            get started!
          </Typography>
          <Button variant="outlined" color="inherit" size="large">
            Sign Up Now
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography
          variant="h4"
          component="h3"
          align="center"
          gutterBottom
          mb={5}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Find Top Employers",
              text: "Connect with companies looking for talented individuals like you.",
              icon: (
                <BusinessCenterIcon color="primary" sx={{ fontSize: 40 }} />
              ),
            },
            {
              title: "Access Job Listings",
              text: "Browse a wide range of job listings tailored to your skills.",
              icon: <SearchIcon color="primary" sx={{ fontSize: 40 }} />,
            },
            {
              title: "Easy Application Process",
              text: "Apply for jobs with a single click and manage applications in one place.",
              icon: <FingerprintIcon color="primary" sx={{ fontSize: 40 }} />,
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: "16px",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                {feature.icon}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mt: 2 }}
                  gutterBottom
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ backgroundColor: "#f5f5f5", py: 12 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={2}
              sx={{
                padding: 5,
                width: "100%",
                borderRadius: "16px",
              }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                Ready to Find the Best Talent?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mb: 3 }}
              >
                Sign up today and connect with top talent that fits your
                company's needs.
              </Typography>
              <Box component="form" sx={{ mt: 4 }}>
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
                      helperText="Please, use your company email ID"
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
                </Grid>
                <Button
                  variant="contained"
                  textAlign="center"
                  color="primary"
                  size="large"
                  type="submit"
                  sx={{ mt: 4 }}
                >
                  Get Started
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default JobsSignup;
