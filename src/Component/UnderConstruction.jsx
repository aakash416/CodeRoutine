import React, { useEffect } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import CopyRight from "./CopyRight/CopyRight";

function UnderConstruction() {
  useEffect(() => {
    document.title = "CodeRoutine | UnderConstruction";
  }, []);
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "80vh" }}
        >
          <Grid item>
            <Box textAlign="center">
              <ConstructionIcon color="primary" sx={{ fontSize: 80 }} />
              <Typography variant="h3" component="h1" gutterBottom>
                Coming Soon
              </Typography>
              <Typography variant="h6" component="p" color="textSecondary">
                We’re working hard to get this page ready. Please check back
                soon!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <CopyRight />
    </React.Fragment>
  );
}

export default UnderConstruction;
