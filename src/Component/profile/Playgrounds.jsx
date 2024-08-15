import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import codeRoutineLogo from "../../assets/logo.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Avatar, Button, Grid, Stack } from "@mui/material";

export default function Playgrounds() {
  React.useEffect(() => {
    document.title = "CodeRoutine | Playgrounds";
  }, []);
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          color: "white",
          background: "rgb(74,74,74)",
          backgroundColor:
            "radial-gradient(circle, rgba(74,74,74,1) 0%, rgba(5,5,5,1) 100%)",
          height: "65vh",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          alt="codeRoutineLogo"
          src={codeRoutineLogo}
          sx={{ width: 200, height: 200 }}
          variant="square"
        />
        <Typography sx={{ fontSize: 32 }}>CodeRoutine PlayGround</Typography>
        <Typography sx={{ fontSize: 18, mt: 3, color: "#bdbdbd" }}>
          Compile. Run. Debug.
        </Typography>
        <Stack direction="row" spacing={3} color="grey" mt={3}>
          <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            color="primary"
          >
            New Playground
          </Button>
        </Stack>
      </Box>
      <Typography mt={10} textAlign="center">
        No saved playground
      </Typography>
    </Grid>
  );
}
