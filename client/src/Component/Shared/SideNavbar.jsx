import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Divider,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

const SideNavbar = ({ sideMenu }) => {
  const [open, setOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setOpen((prevOpen) => !prevOpen); // Toggle sidebar open/close state
  };

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setOpen(false); // Collapse sidebar if window width is less than 1024px
    } else {
      setOpen(true); // Expand sidebar if window width is 1024px or more
    }
  };

  useEffect(() => {
    handleResize(); // Check initial size on mount
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
    };
  }, []);

  return (
    <Box
      sx={{
        width: open ? 240 : 60, // Adjust width based on sidebar state
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        position: "sticky",
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.3s ease", // Add smooth transition to width
      }}
    >
      {/* Collapsible List */}
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
      <Box
        sx={{
          textAlign: "right",
          position: "sticky", // Fix the position
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
            <ChevronRightIcon sx={{ fontSize: "40px" }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default SideNavbar;
