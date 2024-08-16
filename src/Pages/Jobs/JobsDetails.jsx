import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch, useSelector } from "react-redux";
import { ContextStore } from "../../Context/ContextStore";
import {
  selectJobById,
  selectLoading,
  selectError,
} from "../../features/jobs/jobSlice";
import {
  applyForJob,
  fetchJobById,
  removeJob,
} from "../../features/jobs/jobActions";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = ContextStore();

  const job = useSelector((state) => selectJobById(state, id));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    document.title = "CodeRoutine | Job Details";
  }, []);

  useEffect(() => {
    dispatch(fetchJobById(id)); // Fetch job details using Redux
  }, [dispatch, id]);

  const confirmDelete = () => {
    dispatch(removeJob(id));
    navigate(`/jobs`);
    setOpen(false);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          {error}
        </Typography>
      </Container>
    );
  }

  const JobExpiry = (applicationDeadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(applicationDeadline);
    return deadlineDate.getTime() > currentDate.getTime();
  };

  return (
    <Container
      maxWidth="md"
      sx={{ marginBottom: 6, padding: 2, maxWidth: "auto 100vh" }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
            opacity: 0.7,
            zIndex: -1,
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {job?.title}
        </Typography>

        {job?.applicationDeadline && !JobExpiry(job?.applicationDeadline) && (
          <Box display="flex" gap={1} color="error.main" alignItems="center">
            <ErrorIcon sx={{ fontSize: 22 }} />
            <Typography variant="body1">
              No longer accepting applications
            </Typography>
          </Box>
        )}

        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "primary.dark", fontWeight: "medium" }}
        >
          {job?.company}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {job?.location}
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: "primary.light" }} />
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="body1" gutterBottom>
            {job?.description}
          </Typography>
        </Box>
        <Section title="Skills Required">
          {job?.skills?.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{
                margin: 0.5,
                backgroundColor: "primary.light",
                color: "primary.contrastText",
              }}
            />
          ))}
        </Section>
        <Section title="Responsibilities">
          <ul>
            {job?.responsibilities?.map((item, index) => (
              <li style={{ marginLeft: "30px" }} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Requirements">
          <ul>
            {job?.requirements?.map((item, index) => (
              <li style={{ marginLeft: "30px" }} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Benefits">
          <ul>
            {job?.benefits?.map((item, index) => (
              <li style={{ marginLeft: "30px" }} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </Section>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {job?.employmentType && (
              <JobDetail label="Employment Type" value={job?.employmentType} />
            )}
            {job?.jobLevel && (
              <JobDetail label="Job Level" value={job?.jobLevel} />
            )}
            {job?.industry && (
              <JobDetail label="Industry" value={job?.industry} />
            )}
            {job?.salary && <JobDetail label="Salary" value={job?.salary} />}
            {job?.numberOfOpenings && (
              <JobDetail
                label="Number of Openings"
                value={job.numberOfOpenings}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {job?.applicationDeadline && (
              <JobDetail
                label="Application Deadline"
                value={new Date(job?.applicationDeadline).toLocaleDateString()}
              />
            )}
            <JobDetail label="Posted By" value={job?.postedBy} />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4 }} display="flex" gap={2}>
          {job?.externalLink ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window.open(job?.externalLink, "_blank");
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
              endIcon={<ArrowOutwardIcon />}
            >
              Apply
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={job?.applied}
              onClick={() => {
                dispatch(applyForJob(job?._id));
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {job?.applied ? "Applied" : "Apply Now"}
            </Button>
          )}

          {job?.createdBy === userData?._id && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate(`/job/edit/${job._id}`)}
                sx={{
                  "&:hover": {
                    backgroundColor: "success.dark",
                  },
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(true)}
                sx={{
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          Delete Job
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this job listing? Once deleted, it
            cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const Section = ({ title, children }) => (
  <Box sx={{ marginBottom: 3 }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{ fontWeight: "medium", color: "primary.main" }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const JobDetail = ({ label, value }) => (
  <Typography variant="body1" gutterBottom>
    <strong>{label}:</strong> {value}
  </Typography>
);

export default JobDetails;
