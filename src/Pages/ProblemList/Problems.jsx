import * as React from "react";
import PropTypes from "prop-types";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import EditIcon from "@mui/icons-material/Edit";
import Skeleton from "@mui/material/Skeleton";
import { ContextStore } from "../../Context/ContextStore";
import { Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getAllQuestionsData } from "../../Api/problemApi";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { userData } = ContextStore();

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  // updated page title

  React.useEffect(() => {
    document.title = "CodeRoutine | Problems";
  }, []);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>Status</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Solution</TableCell>
        <TableCell>Acceptance</TableCell>
        <TableCell>Difficulty</TableCell>
        <TableCell>Frequency</TableCell>
        {userData?.role === "admin" && <TableCell />}
        {userData?.role === "admin" && <TableCell />}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Problems() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { userData } = ContextStore();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllQuestionsData();
        setQuestions(response.data.problemsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [setQuestions]);

  const CombinedLink = React.forwardRef(function CombinedLink(props, ref) {
    return <RouterLink ref={ref} {...props} />;
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = questions.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id);
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0;

  const SkeletonTable = () => (
    <>
      {Array.from({ length: rowsPerPage }, (_, index) => (
        <TableRow key={index}>
          <TableCell padding="checkbox">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={24}
              height={24}
            />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          {userData?.role === "admin" && <TableCell />}
          {userData?.role === "admin" && <TableCell />}
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </>
  );

  return (
    <Container
      maxWidth="lg"
      style={{ overflow: "auto", marginTop: "50px" }}
      component="main"
      id="main-content"
    >
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={questions.length}
              />
              <TableBody>
                {loading ? (
                  <SkeletonTable />
                ) : (
                  stableSort(questions, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell>
                            <CheckCircleOutlineIcon
                              style={{ color: "green" }}
                            />
                          </TableCell>
                          <TableCell>
                            <RouterLink
                              to={`/problems/${row.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              {row.title}
                            </RouterLink>
                          </TableCell>
                          <TableCell>
                            <Link
                              component={CombinedLink}
                              to={row.solution}
                              variant="body2"
                            >
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
                                  ? "#357a38"
                                  : row.difficulty === "Hard"
                                  ? "#f44336"
                                  : "#ffc107",
                            }}
                          >
                            {row.difficulty}
                          </TableCell>
                          <TableCell style={{ color: "#357a38" }}>
                            <SyncLockIcon />
                          </TableCell>
                          {userData?.role === "admin" && (
                            <TableCell>
                              <Link
                                component={CombinedLink}
                                to={row.edit}
                                variant="body2"
                              >
                                <EditIcon style={{ color: "green" }} />
                              </Link>
                            </TableCell>
                          )}
                          {userData?.role === "admin" && (
                            <TableCell>
                              <Link
                                component={CombinedLink}
                                to={row.delete}
                                variant="body2"
                              >
                                <DeleteIcon style={{ color: "red" }} />
                              </Link>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={questions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
}
