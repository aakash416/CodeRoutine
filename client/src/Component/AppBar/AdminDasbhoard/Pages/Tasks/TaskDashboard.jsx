import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const TaskDashboard = ({ tasks }) => {
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2024);

  const handleMonthChangeLeft = () => {
    setMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      if (prevMonth === 0) setYear((prevYear) => prevYear - 1);
      return newMonth;
    });
  };

  const handleMonthChangeRight = () => {
    setMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      if (prevMonth === 11) setYear((prevYear) => prevYear + 1);
      return newMonth;
    });
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 4,
          float: "right",
        }}
      >
        <IconButton onClick={handleMonthChangeLeft} sx={{ marginRight: 2 }}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="h6">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleMonthChangeRight} sx={{ marginLeft: 2 }}>
          <ArrowRight />
        </IconButton>
      </Box>
      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        {["todo", "inProgress", "completed"].map((status) => {
          const filteredTasks = tasks.filter(
            (task) =>
              task.status === status &&
              new Date(task.date).getMonth() === month &&
              new Date(task.date).getFullYear() === year
          );
          const taskCount = filteredTasks.length;

          return (
            <Grid item xs={12} md={4} key={status}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {taskCount > 0 && ` (${taskCount})`}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  padding: 2,
                  borderRadius: 1,
                  minHeight: "100px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  overflowY: "auto",
                }}
              >
                {filteredTasks.map((task) => (
                  <Card
                    key={task.id}
                    sx={{
                      marginBottom: 2,
                      boxShadow: 3,
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {task.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {task.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TaskDashboard;
