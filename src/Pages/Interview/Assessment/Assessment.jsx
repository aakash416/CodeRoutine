import React from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import { data } from "./data.js";

const Assessment = () => {
  React.useEffect(() => {
    document.title = "CodeRoutine | Assessment";
  }, []);
  return (
    <Container sx={{ mt: 5, backgroundColor: "#fafafa", p: 3 }}>
      <Typography variant="h3" component="h1" sx={{ mt: 8 }}>
        Mock Assessment
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Prepare yourself. Start a practice assessment from a collection of real
        company questions.
      </Typography>
      <Grid container alignItems="center" spacing={2} sx={{ mt: 1 }}>
        <Grid item>
          <Button variant="text" color="primary">
            Go to my overview
          </Button>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <Grid item>
          <Button variant="text" color="secondary">
            Go to my assessment History
          </Button>
        </Grid>
      </Grid>
      {data.map((info, index) => (
        <Box
          key={index}
          sx={{
            mt: 4,
            p: 3,
            boxShadow: 3,
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" component="h3">
            {info.heading}
          </Typography>
          <Typography variant="h5" component="h4" sx={{ mt: 2, mb: 3 }}>
            {info.subHeading}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <PeopleIcon sx={{ mr: 1 }} />
            <Typography variant="body1">ATTEMPTED: {info.ATTEMPTED}</Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
            <BarChartIcon sx={{ mr: 1 }} />
            <Typography variant="body1">
              SUCCESS RATE: {info.SUCCESS}
            </Typography>
          </Box>
          <Button variant="contained" color="primary">
            Start
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default Assessment;
