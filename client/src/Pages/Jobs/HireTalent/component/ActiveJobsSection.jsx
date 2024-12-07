// ActiveJobsSection.js
import React, { useMemo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ArticleIcon from "@mui/icons-material/Article";
import { useSelector } from "react-redux";
import { selectJobs } from "../../../../features/jobs/jobSlice";

function ActiveJobsSection() {
  const jobs = useSelector(selectJobs);

  const currentDate = new Date();

  // Memoized counts for performance
  const activeJobsCount = useMemo(
    () =>
      jobs.filter(
        (job) =>
          new Date(job.applicationDeadline) > currentDate ||
          job.applicationDeadline === null
      ).length,
    [jobs, currentDate]
  );

  const expiredJobsCount = useMemo(
    () =>
      jobs.filter(
        (jobEx) =>
          new Date(jobEx.applicationDeadline) < currentDate &&
          jobEx.applicationDeadline != null
      ).length,
    [jobs, currentDate]
  );

  const totalJobsCount = jobs.length;

  const getIconStyle = (color) => ({
    display: "flex",
    justifyContent: "center",
    backgroundColor: color,
    padding: 2,
    borderRadius: "50%",
    color: "white",
  });

  const JobStatusCard = ({ color, title, count, Icon }) => (
    <Box display="flex" gap={2} alignItems="center">
      <Box sx={getIconStyle(color)}>
        <Icon />
      </Box>
      <Box>
        <Typography>{title}</Typography>
        <Typography>{count}</Typography>
      </Box>
    </Box>
  );

  // Array of job status details to be mapped
  const jobStatuses = [
    {
      color: "rgb(0, 204, 153)",
      title: "Active Jobs",
      count: activeJobsCount,
      Icon: WorkIcon,
    },
    {
      color: "rgb(86, 122, 249)",
      title: "Expired Jobs",
      count: expiredJobsCount,
      Icon: EventBusyIcon,
    },
    {
      color: "rgb(96, 108, 309)",
      title: "Total Jobs",
      count: totalJobsCount,
      Icon: ArticleIcon,
    },
  ];

  return (
    <Paper
      p={2}
      elevation={3}
      flexDirection={{ xs: "column", sm: "row" }}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        gap: 2,
        border: "1px solid #f0f0f0", // Light background for contrast
        padding: 2,
        alignItems: "center",
      }}
      borderRadius="20px"
    >
      {jobStatuses.map((status, index) => (
        <JobStatusCard
          key={index}
          color={status.color}
          title={status.title}
          count={status.count}
          Icon={status.Icon}
        />
      ))}
    </Paper>
  );
}

export default ActiveJobsSection;
