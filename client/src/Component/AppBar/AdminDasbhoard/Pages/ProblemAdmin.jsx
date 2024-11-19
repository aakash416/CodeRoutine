import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";

function ProblemAdmin() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [comment, setComment] = useState("");
  const [problemAdmin, setProblemAdmin] = useState([
    {
      id: 1,
      username: "John Doe",
      email: "johndoe@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "Pending",
      comment: "",
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "janesmith@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      status: "Pending",
      comment: "",
    },
    {
      id: 3,
      username: "Doe John",
      email: "doejohn@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "Pending",
      comment: "",
    },
    {
      id: 4,
      username: "Smith Jane",
      email: "smithjane@example.com",
      avatar: "https://i.pravatar.cc/150?img=4",
      status: "Pending",
      comment: "",
    },
  ]);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setComment(user.comment || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setComment("");
  };

  const handleStatusChange = (newStatus) => {
    if (selectedUser) {
      setSelectedUser((prevUser) => ({ ...prevUser, status: newStatus }));
    }
  };

  const handleSave = () => {
    if (selectedUser) {
      setProblemAdmin((prevProblemAdmin) =>
        prevProblemAdmin.map((user) =>
          user.id === selectedUser.id
            ? { ...user, status: selectedUser.status, comment }
            : user
        )
      );
    }
    handleClose();
  };

  return (
    <Box m={5}>
      <Typography variant="h4" gutterBottom>
        Problem Admins
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problemAdmin.map((user) => (
              <TableRow key={user.id}>
                <TableCell
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Avatar src={user.avatar} alt={user.username} />
                  <Typography variant="body1">{user.username}</Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        user.status === "Approved"
                          ? "green"
                          : user.status === "Pending"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {user.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button size="small" onClick={() => handleClickOpen(user)}>
                      <RuleIcon />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {user.comment ? user.comment : "No Comments yet!"}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle>Actions</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2} mb={2}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleStatusChange("Approved")}
              disabled={selectedUser?.status === "Approved"}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => handleStatusChange("Pending")}
              disabled={selectedUser?.status === "Pending"}
            >
              Pending
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleStatusChange("Rejected")}
              disabled={selectedUser?.status === "Rejected"}
            >
              Reject
            </Button>
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProblemAdmin;
