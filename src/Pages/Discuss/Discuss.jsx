import React, { useCallback, useEffect, useState } from "react";
import {
  List,
  Container,
  Box,
  Button,
  InputBase,
  debounce,
  IconButton,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DiscussList from "./DiscussList";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DiscussLoading from "./Loading/DiscussLoading";
import NewPost from "./NewPost";
import { getDiscuss } from "../../Api/Discuss/discussApi";

const Discuss = () => {
  const [loading, setLoading] = useState(true);
  const [discussions, setDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  React.useEffect(() => {
    document.title = "CodeRoutine | Discuss";
  }, []);

  const fetchDiscussions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDiscuss({
        params: {
          page,
          limit,
          sortBy,
          order,
          searchTerm,
        },
      });
      const { topics, total, pages } = response?.data || {};
      setDiscussions(topics || []);
      setTotalPages(pages || 0);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, order, searchTerm]);

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      setSearchTerm(searchTerm);
      setPage(1); // Reset page when search term changes
    }, 300),
    []
  );

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("desc"); // Default to descending order when changing sort field
    }
    setPage(1); // Reset to first page on sort change
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(1); // Reset page when limit changes
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <InputBase
          placeholder="Search..."
          style={{ width: 300 }}
          value={searchTerm}
          onChange={handleSearchChange}
          inputProps={{ "aria-label": "search" }}
          sx={{
            border: "1px solid #ced4da",
            borderRadius: "4px",
            padding: "2px 12px",
          }}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          startIcon={<OpenInNewIcon />}
          size="small"
        >
          New
        </Button>
      </Box>
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={1}>
          <IconButton onClick={() => handleSort("createdAt")} size="small">
            Created {sortBy === "createdAt" && (order === "asc" ? "↑" : "↓")}
          </IconButton>
          <IconButton onClick={() => handleSort("title")} size="small">
            Title {sortBy === "title" && (order === "asc" ? "↑" : "↓")}
          </IconButton>
          <IconButton onClick={() => handleSort("author")} size="small">
            Author {sortBy === "author" && (order === "asc" ? "↑" : "↓")}
          </IconButton>
          <IconButton onClick={() => handleSort("likes")} size="small">
            Likes {sortBy === "likes" && (order === "asc" ? "↑" : "↓")}
          </IconButton>
        </Box>
      </Box>
      {loading ? (
        <DiscussLoading />
      ) : (
        <List>
          {discussions.map((discussion) => (
            <DiscussList key={discussion._id} discussion={discussion} />
          ))}
        </List>
      )}
      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <FormControl sx={{ minWidth: 80 }}>
          <InputLabel id="limit-select-label">Per Page</InputLabel>
          <Select
            labelId="limit-select-label"
            value={limit}
            onChange={handleLimitChange}
            size="small"
            label="Per Page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="small"
          />
        )}
      </Box>
      <NewPost
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        setDiscussions={setDiscussions}
        setOpenDialog={setOpenDialog}
      />
    </Container>
  );
};

export default Discuss;
