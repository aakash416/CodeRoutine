import React from "react";
import CourseDetails from "./components/CourseDetails";

const CourseDetailPage = () => {
  React.useEffect(() => {
    document.title = "CodeRoutine | Course Details";
  }, []);
  return (
    <div>
      <CourseDetails />
    </div>
  );
};

export default CourseDetailPage;
