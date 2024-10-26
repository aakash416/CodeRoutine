import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Link,
  Button,
  Skeleton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProblems } from "../../features/problems/problemActions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ContextStore } from "../../Context/ContextStore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import Courses from "./Courses";
import LearningPlan from "./LearningPlan";
import Tags from "./Tags";

function Problems() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { userData } = ContextStore();

  const dispatch = useDispatch();
  const { problems: questions, loading } = useSelector(
    (state) => state.problems
  );

  useEffect(() => {
    document.title = "CodeRoutine | Problems";
    dispatch(fetchProblems());
  }, [dispatch]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
    setPage(0);
  };

  useEffect(() => {
    setFilteredQuestions(questions);
    if (selectedTags.length === 0) {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter((question) =>
        selectedTags.some((tag) => question.tags.includes(tag))
      );
      setFilteredQuestions(filtered);
    }
  }, [selectedTags, questions]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) =>
    setRowsPerPage(parseInt(e.target.value, 10));

  const SkeletonTable = () =>
    Array.from({ length: rowsPerPage }).map((_, index) => (
      <TableRow key={index}>
        {Array.from({ length: 7 }).map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ));

  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px", minHeight: "100vh" }}>
      {userData?.role === "admin" && (
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to={"/problems/protalent"}
          sx={{ float: "right" }}
        >
          ProTalent
        </Button>
      )}
      <Courses />
      <LearningPlan />
      <Tags
        questions={questions}
        onTagClick={handleTagClick}
        selectedTags={selectedTags}
      />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 5 }}>
          <TableContainer>
            <Table aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Solution</TableCell>
                  <TableCell>Acceptance</TableCell>
                  <TableCell>Difficulty</TableCell>
                  <TableCell>Frequency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <SkeletonTable />
                ) : (
                  filteredQuestions
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => (
                      <TableRow key={row._id} sx={{ cursor: "pointer" }}>
                        <TableCell>
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        </TableCell>
                        <TableCell>
                          <RouterLink
                            to={`/problems/${row._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            {row?.title}
                          </RouterLink>
                        </TableCell>
                        <TableCell>
                          <Link component={RouterLink} to={row?.solution}>
                            <PlayCircleIcon />
                          </Link>
                        </TableCell>
                        <TableCell>
                          {Math.floor(Math.random() * 71) + 30}%
                        </TableCell>
                        <TableCell
                          style={{
                            color:
                              row.difficulty === "Easy"
                                ? "green"
                                : row.difficulty === "Hard"
                                ? "red"
                                : "orange",
                          }}
                        >
                          {row?.difficulty}
                        </TableCell>
                        <TableCell>
                          <SyncLockIcon />
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {filteredQuestions.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredQuestions?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default Problems;
