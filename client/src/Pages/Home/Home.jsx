import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink } from "react-router-dom";
import { ContextStore } from "../../Context/ContextStore.jsx";
import { cards } from "./Config.js";

function Home() {
  const { userData } = ContextStore();
  const [searchQuery, setSearchQuery] = useState("");
  React.useEffect(() => {
    document.title = "CodeRoutine | Home";
  }, []);
  const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
    return <RouterLink ref={ref} {...props} />;
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            pt: 8,
            pb: 6,
            backgroundColor: "#393f48",
            color: "white",
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              A New Way to Learn
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              CodeRoutine is the best platform to help you enhance your skills,
              expand your knowledge, and prepare for technical interviews.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to={!userData ? "/login" : "/explore"}
              >
                {!userData ? "Sign In" : "Explore"}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/problems"
              >
                Learn More
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" textAlign="center" mb={2}>
            Newly Launched
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Paper
              component="form"
              sx={{
                p: "4px 8px",
                display: "flex",
                alignItems: "center",
                width: 800,
                borderRadius: 3,
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <TextField
                placeholder="Search..."
                variant="outlined"
                fullWidth
                size="small"
                onChange={handleSearch}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={3}>
                <Link
                  component={CombinedLink}
                  to="/underconstruction"
                  underline="none"
                >
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        sx={{ height: "130px", width: "350px" }}
                        image={card.image}
                        alt={card.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </Box>
  );
}

export default Home;
