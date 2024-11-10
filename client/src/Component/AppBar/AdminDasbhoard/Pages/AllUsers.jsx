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
  Container,
} from "@mui/material";

function AllUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "John Doe",
      email: "johndoe@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "Pending",
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "janesmith@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      status: "Approved",
    },
    {
      id: 3,
      username: "Doe John",
      email: "doejohn@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "Pending",
    },
    {
      id: 4,
      username: "Smith Jane",
      email: "smithjane@example.com",
      avatar: "https://i.pravatar.cc/150?img=4",
      status: "Approved",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
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
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.username} />
                </TableCell>
                <TableCell>
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
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleStatusChange(user.id, "Approved")}
                      disabled={user.status === "Approved"}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => handleStatusChange(user.id, "Pending")}
                      disabled={user.status === "Pending"}
                    >
                      Pending
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleStatusChange(user.id, "Rejected")}
                      disabled={user.status === "Rejected"}
                    >
                      Reject
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AllUsers;
