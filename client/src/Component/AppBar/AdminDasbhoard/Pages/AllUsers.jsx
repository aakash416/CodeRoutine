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

function AllUsers() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "John Doe",
      email: "johndoe@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "Active",
      comment: "",
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "janesmith@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      status: "Active",
      comment: "",
    },
    {
      id: 3,
      username: "Doe John",
      email: "doejohn@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "Active",
      comment: "",
    },
    {
      id: 4,
      username: "Smith Jane",
      email: "smithjane@example.com",
      avatar: "https://i.pravatar.cc/150?img=4",
      status: "Active",
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
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
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
        All Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
              {users.some(
                (user) => user.status === "Banned" || user.status === "Deleted"
              ) && <TableCell>Comments</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
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
                        user.status === "Active"
                          ? "green"
                          : user.status === "Deactivated"
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
                {(user?.status === "Banned" || user?.status === "Deleted") && (
                  <TableCell>
                    <Typography variant="body2">
                      {user?.comment ? user?.comment : "No Comments yet!"}
                    </Typography>
                  </TableCell>
                )}
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
              onClick={() => handleStatusChange("Active")}
              disabled={selectedUser?.status === "Active"}
            >
              Active
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => handleStatusChange("Deactivated")}
              disabled={selectedUser?.status === "Deactivated"}
            >
              Deactivated
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleStatusChange("Deleted")}
              disabled={selectedUser?.status === "Deleted"}
            >
              Deleted
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleStatusChange("Banned")}
              disabled={selectedUser?.status === "Banned"}
            >
              Banned
            </Button>
          </Box>
          <TextField
            autoFocus
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

export default AllUsers;
