import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import RedeemIcon from "@mui/icons-material/Redeem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Avatar, Button, CssBaseline, Grid, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import codeRoutineLogo from "../../assets/logo.png";
import StarsIcon from "@mui/icons-material/Stars";
import { data } from "../Store/Config.js";

export default function Redeem() {
  React.useEffect(() => {
    document.title = "CodeRoutine | Redeem";
  }, []);
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <CssBaseline />
      {/* //the button is automatically taking block level, position should be fixed */}
      <Button
        size="small"
        color="primary"
        variant="contained"
        disableElevation
        sx={{
          backgroundColor: "rgb(74,74,74)",
          color: "white",
          padding: 0.5,
        }}
      >
        <StarsIcon
          sx={{
            width: 15,
            color: "#ffc400",
            mr: 1,
          }}
        />
        30
      </Button>
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
        <Typography sx={{ fontSize: 32 }}>CodeRoutine Logo</Typography>
        <Typography sx={{ fontSize: 18, mt: 3, color: "#bdbdbd" }}>
          Shop in our store or redeem our products for free by using
          CodeRoutine.
        </Typography>
        {/* //the Buttons are not in order in small screen, needs to be fixed */}
        <Stack
          direction="row"
          spacing={3}
          color="grey"
          mt={3}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Button
            startIcon={<RedeemIcon />}
            sx={{
              fontSize: 16,
              mt: 3,
              color: "black",
              border: "1px dotted white",
              backgroundColor: "white",
            }}
          >
            Redeem
          </Button>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              fontSize: 16,
              mt: 3,
              color: "white",
              border: "1px dotted white",
              "&:hover": {
                borderColor: "white",
                color: "black",
                backgroundColor: "white",
              },
            }}
          >
            Earn Coin
          </Button>
          <Button
            startIcon={<StarIcon />}
            sx={{
              fontSize: 16,
              mt: 3,
              color: "white",
              border: "1px dotted white",
              "&:hover": {
                borderColor: "white",
                color: "black",
                backgroundColor: "white",
              },
            }}
          >
            Premium
          </Button>
          <Button
            startIcon={<SendIcon />}
            sx={{
              fontSize: 16,
              mt: 3,
              color: "white",
              border: "1px dotted white",
              "&:hover": {
                borderColor: "white",
                color: "black",
                backgroundColor: "white",
              },
            }}
          >
            View Orders
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          flexGrow: 5,
          p: 8,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.map((storeData, index) => (
          <Card
            key={index}
            sx={{ m: 5, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <CardMedia
              component="img"
              height="300px"
              width="300px"
              image={storeData.image}
              sx={{ width: 300, height: 300 }}
              alt={storeData.biggerText}
            />
            <CardContent
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography gutterBottom sx={{ fontSize: 12 }} component="div">
                  {storeData.biggerText}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: 10 }}>
                  {storeData.smallerText}
                </Typography>
              </Box>
              <Button
                size="small"
                color="primary"
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "rgb(74,74,74)",
                  color: "white",
                  padding: 0.5,
                }}
              >
                <StarsIcon
                  sx={{
                    width: 15,
                    color: "#ffc400",
                    mr: 1,
                  }}
                />
                {storeData.coins}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      {/* the box is taking block level, needs to be fixed */}
      <Box
        sx={{
          border: "2px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography>Redeem With Code</Typography>
        <Button>Redeem</Button>
      </Box>
    </Grid>
  );
}
