import React, { useEffect } from "react";
import Description from "./Description/Description";
import WorkPlace from "./WorkPlace/WorkPlace";
import Split from "react-split";

const Problem = () => {
  useEffect(() => {
    document.title = "CodeRoutine | Problem";
  }, []);
  return (
    <div>
      <Split
        className="split"
        minSize={0}
        style={{ height: "calc(100vh - 70px)" }}
        gutterSize={6}
      >
        <Description />
        <WorkPlace />
      </Split>
    </div>
  );
};

export default Problem;
