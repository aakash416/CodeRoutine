import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function InterviewOnline() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  React.useEffect(() => {
    document.title = "CodeRoutine | Interview Online";
  }, []);

  const handleClickOpen = (newContent) => {
    setContent(newContent);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Interview Preparation
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6">Practice Questions</Typography>
              <Typography paragraph>
                Access a variety of practice questions to enhance your skills.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickOpen("Practice Questions Content")}
              >
                View Questions
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6">Interview Tips</Typography>
              <Typography paragraph>
                Learn tips and tricks to excel in your interviews.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickOpen("Interview Tips Content")}
              >
                View Tips
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 2,
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6">Guides and Tutorials</Typography>
              <Typography paragraph>
                Detailed guides and tutorials to help you prepare.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickOpen("Guides and Tutorials Content")}
              >
                View Guides
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => handleClickOpen("Start Practice Content")}
        >
          Start Practice
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{content}</DialogTitle>
        <DialogContent>
          <Typography>
            {content === "Practice Questions Content" &&
              "Here you can practice questions to enhance your skills."}
            {content === "Interview Tips Content" &&
              "Here you can learn tips and tricks to excel in your interviews."}
            {content === "Guides and Tutorials Content" &&
              "Here are detailed guides and tutorials to help you prepare."}
            {content === "Start Practice Content" &&
              "Let's get started with your practice sessions!"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default InterviewOnline;
