import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
  return <RouterLink ref={ref} {...props} />;
});
const orders = [
  {
    id: "1234",
    item: "LeetCode T-Shirt",
    placed: "June 10, 2024 12:36 PM",
    status: "Pending",
  },
  {
    id: "1235",
    item: "LeetCode Bag",
    placed: "Feb 3, 2024 12:36 PM",
    status: "Completed",
  },
];

const Orders = () => {
  React.useEffect(() => {
    document.title = "CodeRoutine | Orders";
  }, []);
  return (
    <Container>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h4" component="h6">
          Your Orders
        </Typography>
        <Box m={5} />
        <Link component={CombinedLink} to={"/store/redeem"} variant="body2">
          Continue shopping at the LeetCode Store
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Order Placed</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.item}</TableCell>
                <TableCell>{order.placed}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Orders;
