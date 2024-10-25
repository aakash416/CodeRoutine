import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Tasks from "./Pages/Tasks";
import Schedule from "./Pages/Schedule";
import SideNavbar from "../../../Component/Shared/SideNavbar";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";

const Dashboard = () => {
  const sideMenu = [
    {
      name: "Home",
      icon: <HomeIcon />,
      link: "/courses/instructor",
    },
    {
      name: "All Courses",
      icon: <WorkIcon />,
      link: "/courses/instructor/all",
    },
    {
      name: "Tasks",
      icon: <WorkIcon />,
      link: "/courses/instructor/tasks",
    },
    {
      name: "Schedule",
      icon: <SchoolIcon />,
      link: "/courses/instructor/schedule",
    },
  ];
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SideNavbar sideMenu={sideMenu} />
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
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Courses />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
