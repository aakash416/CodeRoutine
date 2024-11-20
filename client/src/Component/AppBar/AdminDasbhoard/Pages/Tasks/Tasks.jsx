import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { initialTasks } from "./DummyData";
import TaskDashboard from "./TaskDashboard";
import AllTasks from "./AllTasks";
import CreateTask from "./CreateTask";

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab label="Task Dashboard" />
        <Tab label="All Tasks" />
        <Tab label="Create Task" />
      </Tabs>

      {currentTab === 0 && <TaskDashboard tasks={tasks} />}

      {currentTab === 1 && <AllTasks tasks={tasks} setTasks={setTasks} />}

      {currentTab === 2 && <CreateTask tasks={tasks} setTasks={setTasks} />}
    </Box>
  );
};

export default Tasks;
