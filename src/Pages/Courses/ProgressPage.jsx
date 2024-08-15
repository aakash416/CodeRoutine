import React from "react";
import ProgressTracker from "./components/ProgressTracker";

const ProgressPage = () => {
  React.useEffect(() => {
    document.title = "CodeRoutine | Progress";
  }, []);
  return (
    <div>
      <ProgressTracker />
    </div>
  );
};

export default ProgressPage;
