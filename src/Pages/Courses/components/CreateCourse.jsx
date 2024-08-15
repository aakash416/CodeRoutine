import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { createCourse } from "../../../Api/CoursesApi";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    topics: [],
  });
  React.useEffect(() => {
    document.title = "CodeRoutine | Create Course";
  }, []);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCourse(courseData)
      .then((res) => {
        console.log("Course created:", res.data);
        // Reset form or show success message
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">Create a New Course</Typography>
      <TextField
        label="Title"
        name="title"
        value={courseData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={courseData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Add additional fields for topics, exercises, etc. */}
      <Button type="submit" variant="contained" color="primary">
        Create Course
      </Button>
    </form>
  );
};

export default CreateCourse;
