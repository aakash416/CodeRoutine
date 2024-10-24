import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Badge } from "@mui/material";
import codeRoutineLogo from "../../assets/logo.png";
import { ContextStore } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import getCuteAvatar from "../../Config/getCuteAvatar";
import {
  pages,
  storeSubmenuItems,
  interviewSubmenuItems,
  settings,
} from "./config";
import ThemeToggleButton from "./ThemeToggleButton";

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElStore, setAnchorElStore] = React.useState(null);
  const [anchorElInterview, setAnchorElInterview] = React.useState(null);
  const { userData, setUserData } = ContextStore();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenStoreMenu = (event) => {
    setAnchorElStore(event.currentTarget);
  };

  const handleOpenInterviewMenu = (event) => {
    setAnchorElInterview(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseStoreMenu = () => {
    setAnchorElStore(null);
  };

  const handleCloseInterviewMenu = () => {
    setAnchorElInterview(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    setUserData(null);
    navigate("/");
    setAnchorElUser(null);
  };

  const handleProfileNavigation = (path) => {
    setAnchorElUser(null);
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#424242" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="codeRoutineLogo"
            src={codeRoutineLogo}
            sx={{ width: 56, height: 56 }}
            variant="square"
          />
          <Typography
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CODEROUTINE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages
                .filter(
                  (page) =>
                    page.role === "user" ||
                    (page.role === "admin" && userData?.role === "admin")
                )
                .map((page) =>
                  page.name === "Store" ? (
                    <MenuItem key={page.name} onClick={handleOpenStoreMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                      {Boolean(anchorElStore) ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </MenuItem>
                  ) : page.name === "Interview" ? (
                    <MenuItem key={page.name} onClick={handleOpenInterviewMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                      {Boolean(anchorElInterview) ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={page.name}
                      component={Link}
                      to={page.path}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  )
                )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CODEROUTINE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter(
                (page) =>
                  page.role === "user" ||
                  (page.role === "admin" && userData?.role === "admin")
              )
              .map((page) =>
                page.name === "Store" ? (
                  <Box key={page.name} sx={{ position: "relative" }}>
                    <Button
                      onClick={handleOpenStoreMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {page.name}
                      {Boolean(anchorElStore) ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Button>
                    <Menu
                      anchorEl={anchorElStore}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      open={Boolean(anchorElStore)}
                      onClose={handleCloseStoreMenu}
                    >
                      {storeSubmenuItems.map((item) => (
                        <MenuItem
                          key={item.name}
                          component={Link}
                          to={item.path}
                          onClick={handleCloseStoreMenu}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : page.name === "Interview" ? (
                  <Box key={page.name} sx={{ position: "relative" }}>
                    <Button
                      onClick={handleOpenInterviewMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {page.name}
                      {Boolean(anchorElInterview) ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Button>
                    <Menu
                      anchorEl={anchorElInterview}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      open={Boolean(anchorElInterview)}
                      onClose={handleCloseInterviewMenu}
                    >
                      {interviewSubmenuItems.map((item) => (
                        <MenuItem
                          key={item.name}
                          component={Link}
                          to={item.path}
                          onClick={handleCloseInterviewMenu}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                )
              )}
          </Box>
          {userData?.userName ? (
            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Badge
                  color="error"
                  variant="dot"
                  overlap="circular"
                  sx={{ "& .MuiBadge-dot": { border: "2px solid white" } }}
                >
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge>
                <ThemeToggleButton />

                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={userData?.userName}
                      src={
                        userData?.profilePicture ||
                        getCuteAvatar(userData?.userName)
                      }
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings
                  .filter(
                    (setting) =>
                      !(
                        setting.name === "Dashboard" &&
                        userData.role !== "admin"
                      )
                  )
                  .map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={
                        setting?.name === "Sign Out"
                          ? handleLogout
                          : () =>
                              handleProfileNavigation(
                                setting.name === "Profile"
                                  ? `${setting.path}/${userData.userName}`
                                  : setting.path
                              )
                      }
                    >
                      <Typography textAlign="center">
                        <Button
                          component={Link}
                          to={
                            setting.name === "Profile"
                              ? `${setting.path}/${userData.userName}`
                              : setting.path
                          }
                        >
                          {setting?.icon && (
                            <span style={{ marginRight: "8px" }}>
                              {setting.icon}
                            </span>
                          )}
                          {setting?.name}
                        </Button>
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Typography
                component={Link}
                to={"/signup"}
                sx={{ margin: "8px", color: "white", textDecoration: "none" }}
              >
                SIGNUP
              </Typography>
              <Typography sx={{ color: "white" }}>or</Typography>
              <Typography
                component={Link}
                to={"/login"}
                sx={{ margin: "8px", color: "white", textDecoration: "none" }}
              >
                LOGIN
              </Typography>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
