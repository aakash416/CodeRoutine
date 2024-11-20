import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const CreateTask = ({ tasks, setTasks }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleCreateClose = () => {
    setOpenCreate(false);
    setNewTask({ title: "", description: "" });
  };

  const handleCreate = () => {
    if (!newTask.date) return;
    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: "todo",
      date: newTask.date,
    };
    setTasks((prev) => [newTaskObj, ...prev]);
    handleCreateClose();
  };

  const handleInputChange = (field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <TextField
        fullWidth
        label="Title"
        variant="outlined"
        margin="normal"
        value={newTask.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        value={newTask.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ marginRight: 2 }}
        >
          Create Task
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCreateClose}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTask;
