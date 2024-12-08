import React from "react";
import { Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import VirtualHiring from "./pages/VirtualHiring";
import CampusHiring from "./pages/CampusHiring";
import { Route, Routes, useLocation } from "react-router-dom";
import SideNavbar from "../../../Component/Shared/SideNavbar";
import ManageCandidates from "./pages/ManageCandidates";
import GenerateReports from "./pages/GenerateReports";
import AddNewTest from "./pages/AddNewTest";
import Schedule from "./pages/Schedule";
import HelpCenter from "./pages/HelpCenter";
import {
  Assessment,
  Dashboard as DashboardIcon,
  BorderColor as BorderColorIcon,
  Devices as DevicesIcon,
  WatchLater as WatchLaterIcon,
  SupportAgent as SupportAgentIcon,
  ManageAccounts as ManageAccountsIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

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
      icon: <DevicesIcon />,
      link: "/jobs/hiretalent/virtual-hiring",
    },
    {
      name: "Campus Hiring",
      icon: <SchoolIcon />,
      link: "/jobs/hiretalent/campus-hiring",
    },
    {
      name: "Manage Candidates",
      icon: <ManageAccountsIcon />,
      link: "/jobs/hiretalent/manage-candidates",
    },
    {
      name: "Schedule",
      icon: <WatchLaterIcon />,
      link: "/jobs/hiretalent/schedule",
    },
    {
      name: "Add New Test",
      icon: <BorderColorIcon />,
      link: "/jobs/hiretalent/add-new-test",
    },
    {
      name: "Generate Reports",
      icon: <Assessment />,
      link: "/jobs/hiretalent/generate-reports",
    },
    {
      name: "Help Center",
      icon: <SupportAgentIcon />,
      link: "/jobs/hiretalent/help-center",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
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
          <Route path="schedule" element={<Schedule />} />
          <Route path="campus-hiring" element={<CampusHiring />} />
          <Route path="manage-candidates" element={<ManageCandidates />} />
          <Route path="add-new-test" element={<AddNewTest />} />
          <Route path="generate-reports" element={<GenerateReports />} />
          <Route path="help-center" element={<HelpCenter />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Hiretalent;
