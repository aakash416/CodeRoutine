import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Component/AppBar/NavBar";
import SignIn from "./Pages/LoginSignUp/SignIn";
import SignUp from "./Pages/LoginSignUp/SignUp";
import { Store } from "./Context/ContextStore";
import Home from "./Pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Playgrounds from "./Component/profile/Playgrounds";
import Orders from "./Component/profile/Orders";
import Profile from "./Pages/Profile/Profile";
import AddProblem from "./Pages/AddProblem/AddProblem";
import Redeem from "./Pages/Store/Redeem";
import Problem from "./Pages/problem/Problem";
import Contest from "./Pages/Contest/Contest";
import Explore from "./Pages/Explore/Explore";
import DiscussDetails from "./Pages/Discuss/DiscussDetails";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import "react-quill/dist/quill.snow.css";
import Discuss from "./Pages/Discuss/Discuss";
import Problems from "./Pages/ProblemList/Problems";
import Assessment from "./Pages/Interview/Assessment/Assessment";
import InterviewOnline from "./Pages/Interview/InterviewOnline";
import Premium from "./Pages/Store/Premium";
import Resume from "./Pages/Profile/Resume/Resume";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Jobs from "./Pages/Jobs/Jobs";
import JobsDetails from "./Pages/Jobs/JobsDetails";
import PostNewJob from "./Pages/Jobs/PostNewJob";
import EditJob from "./Pages/Jobs/EditJob";
import UnderConstruction from "./Component/UnderConstruction";
import CoursesPage from "./Pages/Courses/CoursesPage";
import CourseDetailPage from "./Pages/Courses/CourseDetailPage";
import ProgressPage from "./Pages/Courses/ProgressPage";
import CreateCourse from "./Pages/Courses/CreateCourse";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_Client_ID}>
      <Store>
        <BrowserRouter>
          <NavBar />
          <ToastContainer position="top-right" theme="light" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/underconstruction" element={<UnderConstruction />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<Problem />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/resume/:id" element={<Resume />} />
            {/* <Route path="/resume/:id" element={<HomeResume />} />
            <Route path="/resume/:id/:resumeId/edit" element={<EditResume />} /> */}
            <Route path="/settings/orders" element={<Orders />} />
            <Route path="/settings/playgrounds" element={<Playgrounds />} />
            <Route path="/addProblems" element={<AddProblem />} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/postjobs" element={<PostNewJob />} />
            <Route path="/jobs/:id" element={<JobsDetails />} />
            <Route path="/job/edit/:id" element={<EditJob />} />
            <Route path="/store/redeem" element={<Redeem />} />
            <Route path="/store/premium" element={<Premium />} />
            <Route path="/discuss" element={<Discuss />} />
            <Route path="/discuss/:id" element={<DiscussDetails />} />
            <Route path="/interview/assessment" element={<Assessment />} />
            <Route
              path="/interview/onlineinterview"
              element={<InterviewOnline />}
            />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/add" element={<CreateCourse />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </BrowserRouter>
      </Store>
    </GoogleOAuthProvider>
  );
};

export default App;
