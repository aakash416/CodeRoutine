import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import GavelIcon from "@mui/icons-material/Gavel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function Home() {
  const userStats = {
    total: 1200,
    deactivated: 150,
    banned: 50,
    deleted: 25,
  };

  const adminStats = {
    course: { pending: 10, active: 30, rejected: 5 },
    problem: { pending: 5, active: 20, rejected: 2 },
    jobs: { pending: 15, active: 25, rejected: 3 },
  };

  const renderStatCard = (title, count, icon, color) => (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          backgroundColor: color,
          color: "#fff",
          borderRadius: 3,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {count}
              </Typography>
            </Box>
            <Box sx={{ fontSize: 50 }}>{icon}</Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
        minHeight: "100vh",
        margin: 4,
      }}
    >
      <Grid container spacing={3}>
        {/* User Stats */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 500, color: "#555" }}
          >
            All Users
          </Typography>
        </Grid>
        {renderStatCard(
          "Total Users",
          userStats.total,
          <GroupsIcon sx={{ fontSize: 50 }} />,
          "#2196f3"
        )}
        {renderStatCard(
          "Deactivated Users",
          userStats.deactivated,
          <RemoveCircleIcon sx={{ fontSize: 50 }} />,
          "#fbc02d"
        )}
        {renderStatCard(
          "Banned Users",
          userStats.banned,
          <GavelIcon sx={{ fontSize: 50 }} />,
          "#d32f2f"
        )}
        {renderStatCard(
          "Deleted Users",
          userStats.deleted,
          <DeleteForeverIcon sx={{ fontSize: 50 }} />,
          "#757575"
        )}

        {/* Course Admin Stats */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 500, color: "#555" }}
          >
            Course Admin
          </Typography>
        </Grid>
        {renderStatCard(
          "Active Admin",
          adminStats.course.active,
          <TaskAltIcon sx={{ fontSize: 50 }} />,
          "#388e3c"
        )}
        {renderStatCard(
          "Pending Admin",
          adminStats.course.pending,
          <HourglassEmptyIcon sx={{ fontSize: 50 }} />,
          "#f57c00"
        )}
        {renderStatCard(
          "Rejected Admin",
          adminStats.course.rejected,
          <HighlightOffIcon sx={{ fontSize: 50 }} />,
          "#d32f2f"
        )}

        {/* Problem Admin Stats */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 500, color: "#555" }}
          >
            Problem Admin
          </Typography>
        </Grid>
        {renderStatCard(
          "Active Admin",
          adminStats.problem.active,
          <TaskAltIcon sx={{ fontSize: 50 }} />,
          "#388e3c"
        )}
        {renderStatCard(
          "Pending Admin",
          adminStats.problem.pending,
          <HourglassEmptyIcon sx={{ fontSize: 50 }} />,
          "#f57c00"
        )}
        {renderStatCard(
          "Rejected Admin",
          adminStats.problem.rejected,
          <HighlightOffIcon sx={{ fontSize: 50 }} />,
          "#d32f2f"
        )}

        {/* Jobs Admin Stats */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 500, color: "#555" }}
          >
            Jobs Admin
          </Typography>
        </Grid>
        {renderStatCard(
          "Active Admin",
          adminStats.jobs.active,
          <TaskAltIcon sx={{ fontSize: 50 }} />,
          "#388e3c"
        )}
        {renderStatCard(
          "Pending Admin",
          adminStats.jobs.pending,
          <HourglassEmptyIcon sx={{ fontSize: 50 }} />,
          "#f57c00"
        )}
        {renderStatCard(
          "Rejected Admin",
          adminStats.jobs.rejected,
          <HighlightOffIcon sx={{ fontSize: 50 }} />,
          "#d32f2f"
        )}
      </Grid>
    </Box>
  );
}

export default Home;
