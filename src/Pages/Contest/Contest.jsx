import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Pagination,
  Button,
} from "@mui/material";
import Trophy from "../../assets/Contest/trophy.png";
import BlueImage from "../../assets/Contest/blueImage.png";
import GreenImage from "../../assets/Contest/greenImage.png";
import WeeklyContest291 from "../../assets/Contest/FeaturedContest/WeeklyContest291.png";
import BiweeklyContest from "../../assets/Contest/FeaturedContest/biweekly-contest.jpg";
import Contest200 from "../../assets/Contest/FeaturedContest/contest.jpg";
import { data } from "./Config.js";
import { leader } from "./LeaderBoard.js";
import {
  avataaars,
  micah,
  bottts,
  adventurer,
  identicon,
  initials,
} from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

const getCuteAvatar = (author) => {
  const styles = [avataaars, micah, bottts, adventurer, identicon, initials];
  const style = styles[author.length % styles.length];
  const avatar = createAvatar(style, {
    seed: author,
    size: 128,
  });
  return avatar.toDataUri();
};

export default function Contest() {
  React.useEffect(() => {
    document.title = "CodeRoutine | Contest";
  }, []);
  return (
    <Grid
      container
      direction="column"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          color: "white",
          background:
            "radial-gradient(circle, rgba(74,74,74,1) 0%, rgba(5,5,5,1) 100%)",
          height: "65vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          alt="Trophy"
          src={Trophy}
          sx={{ width: 250, height: 250 }}
          variant="square"
        />
        <Typography sx={{ fontSize: 32 }}>CodeRoutine Contest</Typography>
        <Typography sx={{ fontSize: 18, mt: 1, color: "#bdbdbd" }}>
          Contest every week. Compete and see your ranking.
        </Typography>
      </Box>
      <Grid
        container
        gap={5}
        justifyContent="center"
        sx={{
          mt: -10,
        }}
      >
        {[BlueImage, GreenImage].map((image, index) => (
          <Card key={index} sx={{ maxWidth: 345, borderRadius: "10px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                image={image}
                alt={`Weekly Contest ${index + 403}`}
              />
              <CardContent sx={{ backgroundColor: "#282828", color: "white" }}>
                <Typography gutterBottom variant="h6">
                  Weekly Contest {index + 403}
                </Typography>
                <Typography variant="body2" color="#eff1f6bf">
                  Sunday 8:00 AM IST
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
      <Grid sx={{ m: "50px 200px" }}>
        <Typography variant="h5" mb={2}>
          Featured Contests
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 7,
            flexWrap: "wrap",
            color: "white",
          }}
        >
          {[WeeklyContest291, BiweeklyContest, Contest200].map(
            (image, index) => (
              <Box key={index} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={image}
                  alt={`Weekly Contest ${index + 291}`}
                  sx={{ borderRadius: "10px" }}
                />
                <Box sx={{ color: "white", mt: 1 }}>
                  <Typography gutterBottom variant="h6">
                    Weekly Contest {index + 291}
                  </Typography>
                  <Typography variant="body2" color="#eff1f6bf">
                    Sunday 8:00 AM IST
                  </Typography>
                </Box>
              </Box>
            )
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 700,
              backgroundColor: "#282828",
              borderRadius: "10px",
            }}
          >
            <Table aria-label="contest table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button variant="contained" size="small">
                      Past Contests
                    </Button>
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    <Button variant="outlined" size="small">
                      My Contests
                    </Button>
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    What's a Virtual Contest?
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((contest) => (
                  <TableRow key={contest.id} sx={{ borderBottom: "none" }}>
                    <TableCell>
                      <img
                        src={contest.img}
                        alt={contest.name}
                        width={100}
                        height={60}
                        style={{ borderRadius: "5%" }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {contest.name}
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="secondary">
                        {contest.button}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack spacing={2} sx={{ m: 2 }} align="right">
              <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#fff",
                    backgroundColor: "#262626bf",
                  },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "#919191ab",
                  },
                }}
              />
            </Stack>
          </TableContainer>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              backgroundColor: "#282828",
              borderRadius: "10px",
            }}
          >
            <Typography mx={2}>Global Ranking</Typography>
            {leader.map((data) => (
              <ListItem key={data.id} sx={{ mt: 3 }}>
                <Typography mx={3}>
                  <i>{data.id}</i>
                </Typography>
                <ListItemAvatar>
                  <Avatar src={getCuteAvatar(data.name)} />
                </ListItemAvatar>
                <Box>
                  <Typography>{data.name}</Typography>
                  <Typography
                    sx={{ display: "flex", color: "#eff2f699" }}
                    gap={2}
                  >
                    <Typography>
                      Rating:{" "}
                      <span style={{ color: "white" }}>{data.Rating}</span>
                    </Typography>
                    <Typography>
                      Attended:{" "}
                      <span style={{ color: "white" }}>{data.Attended}</span>
                    </Typography>
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}
