import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Tabs,
  Tab,
  TablePagination,
  Slider,
} from "@mui/material";
import {
  selectJobs,
  selectLoading,
  selectError,
  setFilters,
  setSelectedTab,
  selectFilters,
  selectSelectedTab,
} from "../../features/jobs/jobSlice";
import JobsLoader from "./Loading/JobsLoading";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";
import { fetchJobs } from "../../features/jobs/jobActions";
import Error from "../../Component/Error";
import { ContextStore } from "../../Context/ContextStore";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  const selectedTab = useSelector(selectSelectedTab);
  const { userData } = ContextStore();

  const salaryValues = jobs
    .map((job) => parseFloat(job.salary))
    .filter((salary) => !isNaN(salary));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const minSalary = salaryValues.length > 0 && Math.min(...salaryValues);
  const maxSalary = salaryValues.length > 0 && Math.max(...salaryValues);

  React.useEffect(() => {
    document.title = "CodeRoutine | Jobs";
  }, []);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, selectedTab]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    let newFilters = { ...filters };

    if (name === "employmentTypes") {
      newFilters = {
        ...newFilters,
        employmentTypes: checked
          ? [...newFilters.employmentTypes, value]
          : newFilters.employmentTypes.filter((type) => type !== value),
      };
    } else if (name === "jobLevel") {
      newFilters = {
        ...newFilters,
        jobLevel: checked
          ? [...newFilters.jobLevel, value]
          : newFilters.jobLevel.filter((type) => type !== value),
      };
    } else {
      newFilters = {
        ...newFilters,
        [name]: value,
      };
    }

    dispatch(setFilters({ ...newFilters }));
    setPage(0);
  };

  const handleSalaryRangeChange = (event, newValue) => {
    const [min, max] = newValue;

    dispatch(
      setFilters({
        ...filters,
        salaryRange: {
          min: min !== null && !isNaN(min) ? min : minSalary,
          max: max !== null && !isNaN(max) ? max : maxSalary,
        },
      })
    );
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue));
  };

  const filterJobs = (job) => {
    const { title, location, employmentTypes, jobLevel, salaryRange } = filters;
    const isSaved = job.saved;
    const isApplied = job.applied;
    const isTabMatch =
      selectedTab === 0 || // All Jobs
      (selectedTab === 1 && isSaved) || // Saved Jobs
      (selectedTab === 2 && isApplied); // Applied Jobs

    const isSalaryRangeMatch =
      (salaryRange.min === null || job.salary >= salaryRange.min) &&
      (salaryRange.max === null || job.salary <= salaryRange.max);

    return (
      isTabMatch &&
      (!title || job.title.toLowerCase().includes(title.toLowerCase())) &&
      (!location ||
        job.location.toLowerCase().includes(location.toLowerCase())) &&
      (employmentTypes.length === 0 ||
        employmentTypes.includes(job.employmentType)) &&
      (jobLevel.length === 0 || jobLevel.includes(job.jobLevel)) &&
      isSalaryRangeMatch
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

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "50px", marginBottom: "50px", minHeight: "100vh" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Box mb={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
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
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h6">Salary Range</Typography>
                <Slider
                  value={[
                    filters.salaryRange.min !== null &&
                    filters.salaryRange.min !== undefined
                      ? filters.salaryRange.min
                      : minSalary,
                    filters.salaryRange.max !== null &&
                    filters.salaryRange.max !== undefined
                      ? filters.salaryRange.max
                      : maxSalary,
                  ]}
                  onChange={handleSalaryRangeChange}
                  valueLabelDisplay="auto"
                  min={minSalary}
                  max={maxSalary}
                  step={10000}
                  name="salaryRange"
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1">
                    ₹{filters.salaryRange.min || minSalary}
                  </Typography>
                  <Typography variant="body1">
                    ₹{filters.salaryRange.max || maxSalary}
                  </Typography>
                </Box>
              </Box>
              <FormGroup>
                <Typography variant="h6" gutterBottom>
                  Employment Type
                </Typography>
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
                <Typography variant="h6" gutterBottom>
                  Job Level{" "}
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      name="jobLevel"
                      value="Entry-Level"
                      checked={filters?.jobLevel?.includes("Entry-Level")}
                      onChange={handleFilterChange}
                    />
                  }
                  label="Entry Level"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="jobLevel"
                      value="Mid-Level"
                      checked={filters.jobLevel.includes("Mid-Level")}
                      onChange={handleFilterChange}
                    />
                  }
                  label="Mid Level"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="jobLevel"
                      value="Senior-Level"
                      checked={filters.jobLevel.includes("Senior-Level")}
                      onChange={handleFilterChange}
                    />
                  }
                  label="Senior Level"
                />
              </FormGroup>
            </Paper>
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={userData?.role === "admin" ? "/jobs/hiretalent" : "/jobs/signup"}
            sx={{ marginBottom: 2 }}
          >
            Hire Talent
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Tabs
            value={selectedTab}
            style={{ paddingBottom: "16px" }}
            onChange={handleTabChange}
            aria-label="job categories"
          >
            <Tab label="All Jobs" />
            <Tab label="Saved Jobs" />
            <Tab label="Applied Jobs" />
          </Tabs>

          {loading ? (
            <JobsLoader />
          ) : (
            <Grid container spacing={2} mb={2}>
              {filteredJobs.length === 0 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                >
                  <Typography variant="h6" gutterBottom>
                    No Jobs Found!
                  </Typography>
                </Box>
              )}
              {filteredJobs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((job, index) => (
                  <Grid item key={index} xs={12} sm={12} md={12} gap={2}>
                    <JobCard job={job} index={index} />
                  </Grid>
                ))}
            </Grid>
          )}
          {jobs.length > 0 && filteredJobs.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredJobs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Jobs;
