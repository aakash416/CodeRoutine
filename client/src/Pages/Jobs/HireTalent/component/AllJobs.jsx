import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TablePagination,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJobs } from "../../../../features/jobs/jobSlice";
import { fetchJobs, removeJob } from "../../../../features/jobs/jobActions";
import { useNavigate } from "react-router-dom";
import { ContextStore } from "../../../../Context/ContextStore";

function AllJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { userData } = ContextStore();

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const { loading } = useSelector((state) => state.jobs);

  const handleDelete = (id) => {
    dispatch(removeJob(id));
    setOpen(false);
  };

  const DeleteJob = (id) => {
    setOpen(true);
    handleDelete(id);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice the jobs array for pagination
  const paginatedJobs = jobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const SkeletonTable = () =>
    Array.from({ length: rowsPerPage }).map((_, index) => (
      <TableRow key={index}>
        {Array.from({ length: 6 }).map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ));
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        All Jobs
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          marginBottom: 2,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="job table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Job Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Company Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Salary
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Location
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Level
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <>
                {" "}
                <SkeletonTable />
              </>
            ) : (
              <>
                {paginatedJobs.map((job, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {job.title}
                    </TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>₹{job.salary}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.jobLevel}</TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          onClick={() => navigate(`/job/edit/${job._id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => DeleteJob(job._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        <TablePagination
          component="div"
          count={jobs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

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
            onClick={handleDelete}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AllJobs;
