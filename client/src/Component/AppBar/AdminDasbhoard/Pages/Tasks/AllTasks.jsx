import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  Pagination,
} from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";

const AllTasks = ({ tasks, setTasks }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [tasksPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("dateAsc");
  const [page, setPage] = useState(1);

  const handleEditOpen = (task) => {
    setSelectedTask(task);
    setNewStatus(getTaskStatus(task.id));
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedTask(null);
    setNewStatus("");
  };

  const handleEditSave = () => {
    if (!selectedTask || !newStatus) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTask.id ? { ...task, status: newStatus } : task
      )
    );
    handleEditClose();
  };

  const handleSort = (column) => {
    setSortOrder((prevOrder) => {
      const isAsc = prevOrder.startsWith(column) && prevOrder.endsWith("Asc");
      return `${column}${isAsc ? "Desc" : "Asc"}`; // Toggle between Asc and Desc
    });
  };

  const sortTasks = (tasksToSort) => {
    return tasksToSort.sort((a, b) => {
      const [column, order] = sortOrder.split(/(?=[A-Z])/);
      const isAsc = order === "Asc";
      let compare = 0;

      if (column === "date") {
        compare = new Date(a.date) - new Date(b.date);
      } else if (column === "title") {
        compare = a.title.localeCompare(b.title);
      } else if (column === "status") {
        compare = a.status.localeCompare(b.status);
      }

      return isAsc ? compare : -compare;
    });
  };

  const allTasks = tasks;
  const sortedTasks = sortTasks(allTasks);
  const paginatedTasks = sortedTasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getTaskStatus = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    return task ? task.status : null;
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort("title")}
                sx={{ cursor: "pointer" }}
              >
                Title{" "}
                {sortOrder === "titleAsc"
                  ? "▲"
                  : sortOrder === "titleDesc"
                  ? "▼"
                  : ""}
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell
                onClick={() => handleSort("status")}
                sx={{ cursor: "pointer" }}
              >
                Status{" "}
                {sortOrder === "statusAsc"
                  ? "▲"
                  : sortOrder === "statusDesc"
                  ? "▼"
                  : ""}
              </TableCell>
              <TableCell
                onClick={() => handleSort("date")}
                sx={{ cursor: "pointer" }}
              >
                Date{" "}
                {sortOrder === "dateAsc"
                  ? "▲"
                  : sortOrder === "dateDesc"
                  ? "▼"
                  : ""}
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEditOpen(task)}>
                    <RuleIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(sortedTasks.length / tasksPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      />

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Change Task Status</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            variant="outlined"
          >
            {["todo", "inProgress", "completed"].map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllTasks;
