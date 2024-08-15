import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  Link,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MediaControlCard from "./MediaControlCard"; // Assuming you have this component defined
import { data } from "./Config"; // Assuming you have data imported or fetched from a source
import CopyRight from "../../Component/CopyRight/CopyRight";
import { Link as RouterLink } from "react-router-dom";

function Explore() {
  React.useEffect(() => {
    document.title = "CodeRoutine | Explore";
  }, []);
  const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
    return <RouterLink ref={ref} {...props} />;
  });

  return (
    <>
      <Container
        maxWidth="lg"
        style={{ overflow: "auto", marginTop: "50px" }}
        component="main"
        id="main-explore"
      >
        {/* Header Section */}
        <Box
          sx={{
            backgroundColor: "#d6f4fc",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="h6">Welcome to</Typography>
              <Typography variant="h4">CodeRoutine Explore</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="primary" aria-label="home">
                <StarBorderIcon />
              </IconButton>
              <IconButton color="primary" aria-label="settings">
                <AccessAlarmIcon />
              </IconButton>
            </Box>
          </Box>
          {/* Media Control Card Section */}
          <MediaControlCard />
        </Box>

        {/* Featured Section */}
        <Box mt={4}>
          <Typography variant="h4">Featured</Typography>
          <Grid container spacing={2} mt={2}>
            {data.map((product) => (
              <Grid key={product.id} item xs={12} md={6} lg={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    component={CombinedLink}
                    to="/underconstruction"
                    underline="none"
                  >
                    <CardMedia
                      component="img"
                      height="200px"
                      image={product.image}
                      alt={product.biggerText}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6">
                        {product.biggerText}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {product.smallerText}
                      </Typography>
                    </CardContent>
                  </Link>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}
                  >
                    <Button size="small" color="primary" variant="contained">
                      <StarBorderIcon sx={{ mr: 1 }} />
                      {product.coins}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Footer Section */}
      <CopyRight />
    </>
  );
}

export default Explore;
