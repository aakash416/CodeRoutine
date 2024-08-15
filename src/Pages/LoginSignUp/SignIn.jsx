import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import codeRoutineLogo from "../../assets/logo.png";
import { Avatar, IconButton, Skeleton } from "@mui/material";
import { ContextStore } from "../../Context/ContextStore";
import CircularProgress from "@mui/material/CircularProgress";
import { googleLogin, loginUser } from "../../Api/userApi";
import { GoogleLogin } from "@react-oauth/google";

const defaultTheme = createTheme();

const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
  return <RouterLink ref={ref} {...props} />;
});

const SkeletonLoader = () => (
  <Box sx={{ marginTop: 12 }}>
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Skeleton
        variant="rectangular"
        width={56}
        height={56}
        sx={{ borderRadius: "50%", backgroundColor: "grey" }}
      />
      <Box sx={{ mt: 1, width: "100%" }}>
        <Skeleton variant="text" height={80} />
        <Skeleton variant="text" height={80} />
      </Box>
    </Box>
    <Box sx={{ mt: 1 }}>
      <Skeleton variant="text" height={56} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Box>
  </Box>
);

export default function SignIn() {
  const navigate = useNavigate();
  const { setUserData, setToken } = ContextStore();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoginSuccess = async (response) => {
    if (response && response.credential) {
      const { credential } = response;
      try {
        const res = await googleLogin({ credential: credential });
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        setUserData(res.data.user);
        setToken(res.data.token);
        toast.success(res?.data?.message);
        navigate("/");
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    } else {
      console.error("No credential received");
    }
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed:", error);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      setUserData(res.data.user);
      setToken(res.data.token);
      toast.success(res?.data?.message);
      navigate("/");
      setIsLoading(true);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  React.useEffect(() => {
    document.title = "CodeRoutine | Sign In";
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Box
            sx={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="codeRoutineLogo"
              src={codeRoutineLogo}
              sx={{ width: 56, height: 56 }}
              variant="square"
              style={{ backgroundColor: "grey" }}
            />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                id={"email"}
                label="Email Address"
                name={"email"}
                autoComplete="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name={"password"}
                label="Password"
                type="password"
                id={"password"}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                autoComplete="current-password"
              />
              {isLoading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#424242",
                    padding: "8px",
                    color: "white",
                  }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  <CircularProgress size={15} style={{ marginRight: "8px" }} />
                  Sign In
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#424242",
                    padding: "8px",
                    color: "white",
                  }}
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!(data.email && data.password)}
                >
                  Sign In
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={CombinedLink} to={"/signup"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Typography
              mt={4}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              or you can sign in with
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              color="grey"
              mt={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                shape="circle"
                type="icon"
              />
              <GitHubIcon />
              <LinkedInIcon />
              <FacebookIcon />
            </Stack>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
