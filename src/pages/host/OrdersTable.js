import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

// third-party
import { useSelector } from "react-redux";

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

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: "Host",
    align: "left",
    disablePadding: false,
    label: "Host Name",
  },
  {
    id: "Date",
    align: "left",
    disablePadding: true,
    label: "Date",
  },
  {
    id: "Download",
    align: "left",
    disablePadding: false,
    label: "Download (GB)",
  },
  {
    id: "Upload",
    align: "left",
    disablePadding: false,

    label: "Upload (GB)",
  },
  {
    id: "Session",
    align: "left",
    disablePadding: false,
    label: "Session",
  },
  {
    id: "Total",
    align: "left",
    disablePadding: false,
    label: "Total (GB)",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  function createData(hostName, date, download, upload, session, total) {
    return { hostName, date, download, upload, session, total };
  }
  const [rows, setRows] = useState([]);
  const analytics = useSelector((state) => state.analytics);
  console.log("rowsrowsrows", rows);
  useEffect(() => {
    const r = [];
    if (analytics.dailyDataHost && analytics.dailyDataHost.length > 0) {
      analytics.dailyDataHost.forEach((item) => {
        r.push(
          createData(
            item._id.hostName,
            `${item._id.day}-${item._id.month}-${item._id.year}`,
            parseFloat(item.download / 1024 / 1024).toFixed(2),
            parseFloat(item.upload / 1024 / 1024).toFixed(2),
            item.count,
            parseFloat((item.download + item.upload) / 1024 / 1024).toFixed(2),
          ),
        );
      });
      setRows(r);
    }
  }, [analytics.dailyDataHost]);

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-child": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-child": {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    {row.hostName}{" "}
                  </TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">{row.download}</TableCell>
                  <TableCell align="left">{row.upload}</TableCell>
                  <TableCell align="left">{row.session}</TableCell>
                  <TableCell align="left">{row.total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
