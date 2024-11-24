import React from "react";
import { Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import VirtualHiring from "./pages/VirtualHiring";
import CampusHiring from "./pages/CampusHiring";
import { Route, Routes, useLocation } from "react-router-dom";
import SideNavbar from "../../../Component/Shared/SideNavbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";

function Hiretalent() {
  const location = useLocation();
  const sideMenu = [
    {
      name: "Home",
      icon: <DashboardIcon />,
      link: "/jobs/hiretalent",
    },
    {
      name: "Virtual Hiring",
      icon: <WorkIcon />,
      link: "/jobs/hiretalent/virtual-hiring",
    },
    {
      name: "Schedule",
      icon: <SchoolIcon />,
      link: "/jobs/hiretalent/campus-hiring",
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SideNavbar sideMenu={sideMenu} currentPath={location.pathname} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Routes>
          {/* Base Dashboard Route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="virtual-hiring" element={<VirtualHiring />} />
          <Route path="campus-hiring" element={<CampusHiring />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Hiretalent;
