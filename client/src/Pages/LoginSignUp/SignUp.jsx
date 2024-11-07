import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import codeRoutineLogo from "../../assets/logo.png";
import { Avatar, Skeleton } from "@mui/material";
import { registerUser } from "../../Api/userApi";
import Loading from "./Loading";

const defaultTheme = createTheme();

const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
  return <RouterLink ref={ref} {...props} />;
});

const SkeletonLoader = () => (
  <Box sx={{ marginTop: 4 }}>
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

export default function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    document.title = "CodeRoutine | Sign Up";
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const res = await registerUser(data);
      toast.success(res?.data?.message);
      navigate("/login");
      setIsLoading(true);
    } catch (err) {
      toast.error(err.response.data?.message);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Loading />}
      <Container component="main" maxWidth="xs" sx={{ minHeight: "100vh" }}>
        <CssBaseline />
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
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
                type="text"
                id={"userName"}
                label="User Name"
                name={"userName"}
                value={data.userName}
                onChange={(e) => setData({ ...data, userName: e.target.value })}
                autoComplete="username"
                autoFocus
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
              <TextField
                margin="normal"
                required
                fullWidth
                name={"confirmPassword"}
                label="Confirm Password"
                type="password"
                id={"confirmPassword"}
                autoComplete="current-password"
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
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
                autoFocus
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
                  Sign Up
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
                  disabled={
                    !(
                      data.userName &&
                      data.confirmPassword &&
                      data.email &&
                      data.password
                    )
                  }
                >
                  Sign Up
                </Button>
              )}
              <Link component={CombinedLink} to={"/login"} variant="body2">
                {"Have an account? Sign In"}
              </Link>
            </Box>
            <Typography
              mt={4}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              or you can sign in with
            </Typography>
            <Stack direction="row" spacing={3} color="grey" mt={2}>
              <GoogleIcon />
              <GitHubIcon />
              <FacebookIcon />
            </Stack>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
