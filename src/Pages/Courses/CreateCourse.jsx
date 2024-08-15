import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { createCourse } from "../../Api/CoursesApi";
import ExerciseForm from "./ExerciseForm";
import TopicForm from "./TopicForm";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  React.useEffect(() => {
    document.title = "CodeRoutine | Create Course";
  }, []);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    topics: [{ title: "", description: "", content: "" }],
    exercises: [
      {
        title: "",
        questions: [{ questionText: "", options: [], correctAnswer: "" }],
      },
    ],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleAddTopic = () => {
    setCourseData({
      ...courseData,
      topics: [
        ...courseData.topics,
        { title: "", description: "", content: "" },
      ],
    });
  };

  const handleAddExercise = () => {
    setCourseData({
      ...courseData,
      exercises: [
        ...courseData.exercises,
        {
          title: "",
          questions: [{ questionText: "", options: [], correctAnswer: "" }],
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    try {
      const response = await createCourse(courseData);
      navigate(`/courses/${response.data._id}`);
    } catch (error) {
      console.error("Error creating course:", error);
      setError(
        "An error occurred while creating the course. Please try again."
      );
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create New Course
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Course Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Course Title"
                value={courseData.title}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Course Description"
                value={courseData.description}
                onChange={handleInputChange}
                fullWidth
                size="small"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Topics</Typography>
            </Grid>
            {courseData.topics.map((topic, index) => (
              <Grid item xs={12} key={index}>
                <TopicForm
                  topic={topic}
                  index={index}
                  courseData={courseData}
                  setCourseData={setCourseData}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddTopic}
              >
                Add Topic
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Exercises</Typography>
            </Grid>
            {courseData.exercises.map((exercise, index) => (
              <Grid item xs={12} key={index}>
                <ExerciseForm
                  exercise={exercise}
                  index={index}
                  courseData={courseData}
                  setCourseData={setCourseData}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddExercise}
              >
                Add Exercise
              </Button>
            </Grid>

            <Grid item xs={12}>
              {error && (
                <Typography color="error" gutterBottom>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
              >
                Create Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateCourse;
