import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

const SideNavbar = ({ sideMenu }) => {
  const [open, setOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setOpen((prevOpen) => !prevOpen); // Toggle sidebar open/close state
  };

  return (
    <Box
      sx={{
        width: open ? 240 : 60, // Adjust width based on sidebar state
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        position: "sticky",
        left: 0,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease", // Add smooth transition to width
      }}
    >
      {/* Collapsible List */}
      <Box
        sx={{
          textAlign: "right",
          bottom: 0, // Stick to the bottom
          width: open ? 240 : 60,
          transition: "width 0.3s ease", // Add smooth transition to width
        }}
      >
        <Divider />

        <IconButton
          onClick={toggleSidebar}
          aria-label={open ? "Close Sidebar" : "Open Sidebar"}
        >
          {open ? (
            <ChevronLeftIcon sx={{ fontSize: "40px" }} />
          ) : (
            <MenuIcon sx={{ fontSize: "40px" }} />
          )}
        </IconButton>
      </Box>
      <List>
        {sideMenu.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.link}
            sx={{
              backgroundColor:
                window.location.pathname === item.link ? "#f0f0f0" : "",
              height: "60px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              transition: "padding 0.3s ease", // Optional: smooth transition for padding
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Box
              sx={{
                opacity: open ? 1 : 0, // Show/hide text with transition
                transition: "opacity 0.3s ease", // Smooth transition for text
              }}
            >
              {open && <ListItemText primary={item.name} />}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideNavbar;
