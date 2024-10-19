// Routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import UnderConstruction from "../Component/UnderConstruction";
import Problems from "../Pages/ProblemList/Problems";
import Problem from "../Pages/problem/Problem";
import SignIn from "../Pages/LoginSignUp/SignIn";
import SignUp from "../Pages/LoginSignUp/SignUp";
import Profile from "../Pages/Profile/Profile";
import Resume from "../Pages/Profile/Resume/Resume";
import Orders from "../Component/profile/Orders";
import Playgrounds from "../Component/profile/Playgrounds";
import AddProblem from "../Pages/AddProblem/AddProblem";
import Contest from "../Pages/Contest/Contest";
import Explore from "../Pages/Explore/Explore";
import Jobs from "../Pages/Jobs/Jobs";
import PostNewJob from "../Pages/Jobs/PostNewJob";
import JobsDetails from "../Pages/Jobs/JobsDetails";
import EditJob from "../Pages/Jobs/EditJob";
import Redeem from "../Pages/Store/Redeem";
import Premium from "../Pages/Store/Premium";
import Discuss from "../Pages/Discuss/Discuss";
import DiscussDetails from "../Pages/Discuss/DiscussDetails";
import Assessment from "../Pages/Interview/Assessment/Assessment";
import InterviewOnline from "../Pages/Interview/InterviewOnline";
import CoursesPage from "../Pages/Courses/CoursesPage";
import CreateCourse from "../Pages/Courses/CreateCourse";
import CourseDetailPage from "../Pages/Courses/CourseDetailPage";
import ProgressPage from "../Pages/Courses/ProgressPage";
import Hiretalent from "../Pages/Jobs/HireTalent/Hiretalent";
import Dashboard from "../Pages/Courses/Instructor/Dashboard";
import Protalent from "../Pages/ProblemList/Protalent/Protalent";
import AdminRoute from "../Config/AdminRoute";
import CourseAdminRoute from "../Config/CourseAdminRoute";
import InstructorSignup from "../Pages/Courses/Instructor/Pages/InstructorSignup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/underconstruction" element={<UnderConstruction />} />
      <Route path="/problems" element={<Problems />} />
      <Route
        path="/problems/protalent/*"
        element={
          <AdminRoute>
            <Protalent />
          </AdminRoute>
        }
      />
      <Route path="/problems/:id" element={<Problem />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/profile/resume/:id" element={<Resume />} />
      <Route path="/settings/orders" element={<Orders />} />
      <Route path="/settings/playgrounds" element={<Playgrounds />} />
      <Route path="/addProblems" element={<AddProblem />} />
      <Route path="/contest" element={<Contest />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/postjobs" element={<PostNewJob />} />
      <Route
        path="/jobs/hiretalent/*"
        element={
          <AdminRoute>
            <Hiretalent />
          </AdminRoute>
        }
      />
      <Route path="/jobs/:id" element={<JobsDetails />} />
      <Route path="/job/edit/:id" element={<EditJob />} />
      <Route path="/store/redeem" element={<Redeem />} />
      <Route path="/store/premium" element={<Premium />} />
      <Route path="/discuss" element={<Discuss />} />
      <Route path="/discuss/:id" element={<DiscussDetails />} />
      <Route path="/interview/assessment" element={<Assessment />} />
      <Route path="/interview/onlineinterview" element={<InterviewOnline />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/add" element={<CreateCourse />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route
        path="/courses/instructor/*"
        element={
          <CourseAdminRoute>
            <Dashboard />
          </CourseAdminRoute>
        }
      />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/courses/instructor/signup" element={<InstructorSignup />} />
    </Routes>
  );
};

export default AppRoutes;
