import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllJobs } from "../../Api/jobAPi";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArticleIcon from "@mui/icons-material/Article";
import ReactTimeAgo from "react-time-ago";
import JobsLoader from "./Loading/JobsLoading";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    employmentTypes: [],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        setJobs(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "employmentTypes") {
      setFilters((prev) => ({
        ...prev,
        employmentTypes: checked
          ? [...prev.employmentTypes, value]
          : prev.employmentTypes.filter((type) => type !== value),
      }));
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const filterJobs = (job) => {
    const { title, location, employmentTypes } = filters;
    return (
      (!title || job.title.toLowerCase().includes(title.toLowerCase())) &&
      (!location ||
        job.location.toLowerCase().includes(location.toLowerCase())) &&
      (employmentTypes.length === 0 ||
        employmentTypes.includes(job.employmentType))
    );
  };

  const filteredJobs = jobs.filter(filterJobs);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentPageJobs = filteredJobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const JobExpiry = (applicationDeadline) => {
    const currentDate = new Date();
    return new Date(applicationDeadline) > currentDate;
  }

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Box mb={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filter Jobs
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  name="title"
                  label="Search by Title"
                  value={filters.title}
                  size="small"
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  name="location"
                  label="Location"
                  size="small"
                  value={filters.location}
                  onChange={handleFilterChange}
                  fullWidth
                />
              </Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="employmentTypes"
                      value="Full-Time"
                      checked={filters.employmentTypes.includes("Full-Time")}
                      onChange={handleFilterChange}
                    />
                  }
                  label="Full-Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="employmentTypes"
                      value="Part-Time"
                      checked={filters.employmentTypes.includes("Part-Time")}
                      onChange={handleFilterChange}
                    />
                  }
                  label="Part-Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="employmentTypes"
                      value="Contract"
                      checked={filters.employmentTypes.includes("Contract")}
                      onChange={handleFilterChange}
                    />
                  }
                  label="Contract"
                />
              </FormGroup>
            </Paper>
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={"/jobs/postjobs"}
            sx={{ marginBottom: 2 }}
          >
            Post a New Job
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          {loading ? (
            <JobsLoader />
          ) : (
            <>
              <Grid container spacing={2} mb={2}>
                {currentPageJobs.map((job) => (
                  <Grid item key={job._id} xs={12} sm={12} md={12} gap={2}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        borderLeft: "5px solid transparent",
                        transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                        "&:hover": {
                          borderColor: JobExpiry(job?.applicationDeadline) ? "green" : "red",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => navigate(`/jobs/${job._id}`)}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {job.title}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{ fontWeight: 600 }}
                      >
                        {job.company}
                      </Typography>
                      <Box
                        display="flex"
                        spacing={2}
                        gap={4}
                        color="textSecondary"
                        mt={1}
                        mb={1}
                        alignItems="center"
                      >
                        <Box display="flex">
                          <WorkOutlineIcon sx={{ color: "#00000099" }} />
                          <Typography>{job.jobLevel}</Typography>
                        </Box>
                        <Box display="flex">
                          <CurrencyRupeeIcon sx={{ color: "#00000099" }} />
                          <Typography>
                            {job.salary ? `${job.salary}` : "Not specified"}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <LocationOnIcon sx={{ color: "#00000099" }} />
                          <Typography>{job.location}</Typography>
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center" mt={1} mb={1}>
                        <ArticleIcon sx={{ color: "#00000099" }} />
                        <Typography variant="body1">
                          {job.responsibilities.join(" ").length < 100
                            ? job.responsibilities.join(" ")
                            : `${job.responsibilities
                                .join(" ")
                                .slice(0, 90)}....`}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body2" color="textSecondary">
                          {job.skills.join(" ").length < 100
                            ? job.skills.join(" ")
                            : `${job.skills.join(" ").slice(0, 90)}....`}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="body2" color="textSecondary">
                          <ReactTimeAgo
                            date={new Date(job?.postedOn).getTime()}
                            locale="en-US"
                          />
                        </Typography>

                        <Button
                          component={Link}
                          to={`/jobs/${job._id}`}
                          variant="outlined"
                          color="primary"
                          size="small"
                        >
                          View Details
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2">
                  Page: {page + 1} of{" "}
                  {Math.ceil(filteredJobs.length / rowsPerPage)}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" mr={1}>
                    Rows per page:
                  </Typography>
                  <Select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    size="small"
                  >
                    {[5, 10, 25, 50].map((rows) => (
                      <MenuItem key={rows} value={rows}>
                        {rows}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Button
                    onClick={(e) => handleChangePage(e, page - 1)}
                    disabled={page === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={(e) => handleChangePage(e, page + 1)}
                    disabled={
                      page >= Math.ceil(filteredJobs.length / rowsPerPage) - 1
                    }
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Jobs;