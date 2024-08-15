import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addProblem } from "../../Api/problemApi";

const difficultyOptions = ["Easy", "Medium", "Hard"];

const AddProblem = () => {
  const navigate = useNavigate();
  const [problemData, setProblemData] = useState({
    title: "",
    description: "",
    inputDescription: "",
    outputDescription: "",
    constraints: "",
    examples: [{ input: "", output: "", explanation: "" }],
    tags: "",
    difficulty: "",
    solution: "",
    author: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  React.useEffect(() => {
    document.title = "CodeRoutine | Add Problem";
  }, []);

  useEffect(() => {
    const isFormFilled = Object.values(problemData).every((value) =>
      Array.isArray(value)
        ? value.length > 0 && value.every((ex) => ex.input && ex.output)
        : value !== ""
    );
    setIsButtonDisabled(!isFormFilled);
  }, [problemData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblemData({
      ...problemData,
      [name]: value,
    });
  };

  const handleExampleChange = (index, e) => {
    const { name, value } = e.target;
    const examples = [...problemData.examples];
    examples[index][name] = value;
    setProblemData({
      ...problemData,
      examples,
    });
  };

  const addExample = () => {
    setProblemData({
      ...problemData,
      examples: [
        ...problemData.examples,
        { input: "", output: "", explanation: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    const formattedData = {
      ...problemData,
      tags: problemData.tags.split(",").map((tag) => tag.trim()),
    };

    // Simulate a delay for the loading indicator

    try {
      const response = await addProblem(formattedData);
      toast.success(response?.data?.message);
      setIsSubmitting(false); // Set submitting state to false

      navigate("/problems");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add a New Problem
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={problemData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={problemData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Input Description"
                name="inputDescription"
                value={problemData.inputDescription}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Output Description"
                name="outputDescription"
                value={problemData.outputDescription}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Constraints"
                name="constraints"
                value={problemData.constraints}
                onChange={handleChange}
                required
              />
            </Grid>
            {problemData.examples.map((example, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6">Example {index + 1}</Typography>
                <TextField
                  fullWidth
                  label="Input"
                  name="input"
                  style={{ marginBottom: 15 }}
                  value={example.input}
                  onChange={(e) => handleExampleChange(index, e)}
                  required
                />
                <TextField
                  fullWidth
                  label="Output"
                  name="output"
                  style={{ marginBottom: 15 }}
                  value={example.output}
                  onChange={(e) => handleExampleChange(index, e)}
                  required
                />
                <TextField
                  fullWidth
                  label="Explanation"
                  name="explanation"
                  value={example.explanation}
                  onChange={(e) => handleExampleChange(index, e)}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" onClick={addExample}>
                Add Example
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags (comma separated)"
                name="tags"
                value={problemData.tags}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Difficulty"
                name="difficulty"
                value={problemData.difficulty}
                onChange={handleChange}
                required
              >
                {difficultyOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Solution"
                name="solution"
                multiline
                rows={4}
                value={problemData.solution}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={problemData.author}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isButtonDisabled || isSubmitting} // Disable button based on state
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null} // Show loading indicator
              >
                {isSubmitting ? (
                  <>
                    {" "}
                    <Skeleton /> Add problem
                  </>
                ) : (
                  "Add Problem"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddProblem;
