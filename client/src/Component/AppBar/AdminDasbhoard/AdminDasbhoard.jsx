import React from "react";
import { Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TaskSharpIcon from "@mui/icons-material/TaskSharp";
import SideNavbar from "../../Shared/SideNavbar";
import AllUsers from "./Pages/AllUsers";
import CourseAdmin from "./Pages/CourseAdmin";
import JobAdmin from "./Pages/JobAdmin";
import ProblemAdmin from "./Pages/ProblemAdmin";
import Tasks from "./Pages/Tasks";
import Home from "./Pages/Home";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import MenuBookSharpIcon from "@mui/icons-material/MenuBookSharp";
import CalculateSharpIcon from "@mui/icons-material/CalculateSharp";

function AdminDasbhoard() {
  const location = useLocation();
  const sideMenu = [
    {
      name: "Home",
      icon: <HomeSharpIcon />,
      link: "/admin-dashboard",
    },
    {
      name: "All Users",
      icon: <PeopleIcon />,
      link: "/admin-dashboard/all-users",
    },
    {
      name: "Course Admin",
      icon: <MenuBookSharpIcon />,
      link: "/admin-dashboard/course-admin",
    },
    {
      name: "Problem Admin",
      icon: <CalculateSharpIcon />,
      link: "/admin-dashboard/problem-admin",
    },
    {
      name: "Job Admin",
      icon: <WorkSharpIcon />,
      link: "/admin-dashboard/job-admin",
    },
    {
      name: "Tasks",
      icon: <AssignmentSharpIcon />,
      link: "/admin-dashboard/tasks",
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
          <Route path="/" element={<Home />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="course-admin" element={<CourseAdmin />} />
          <Route path="job-admin" element={<JobAdmin />} />
          <Route path="problem-admin" element={<ProblemAdmin />} />
          <Route path="tasks" element={<Tasks />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default AdminDasbhoard;
