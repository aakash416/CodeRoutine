import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AllProblems from "./Pages/AllProblems";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import SideNavbar from "../../../Component/Shared/SideNavbar";

function Protalent() {
  const sideMenu = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/problems/protalent",
    },
    {
      name: "All Problems",
      icon: <WorkIcon />,
      link: "/problems/protalent/all-problems",
    },
  ];
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SideNavbar sideMenu={sideMenu} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Routes>
          {/* Base Dashboard Route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="all-problems" element={<AllProblems />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Protalent;
