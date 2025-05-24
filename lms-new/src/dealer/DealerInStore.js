import React, { useEffect, useState } from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  styled,
  TableBody,
  Table,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DealerProductDetailModal from "./DealerProductDetailModal";
import secureLocalStorage from "react-secure-storage";
import { mainRoute } from "../App";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#b80f768f",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DealerInStore = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [dealer, setDealer] = useState([]);
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(secureLocalStorage.getItem("info"));

  const handleClick = (item, index) => {
    navigate(`${mainRoute}/dealeredit`, { state: item });
  };

  const getDealer = () => {
    setLoading(true);
    axios
      .get(window.MyApiRoute + "dealer/get")
      .then((res) => {
        setDealer(res.data.details);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getDealer();
  }, []);

  const Details = (item) => {
    axios
      .post(
        window.MyApiRoute + `record/getfordealer?dealerId=${item.ID}`,
        user.data
      )
      .then((res) => {
        console.log(res.data.Data);
        setAll(res.data.Data);
        setOpen(true);
      })
      .catch((error) => {
        console.log("err", error.response.data.message);
      });
  };

  const handleNavigate = (item) => {
    navigate(`${mainRoute}/po-table/` + item.ID, { state: item.name });
  };

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress />
        </div>
      )}

      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
        <input
          placeholder="Dealer name"
          type="text"
          className="border-2 py-2 px-3 w-[300px] border-gray-500 rounded "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to={`${mainRoute}/dealerform`}>
          <Button variant="contained">Add Dealer</Button>
        </Link>
      </Box>

      <TableContainer sx={{ height: 480 }} component={Paper}>
        <Table sx={{ width: 1800 }} stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 170 }}>
                Option
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 250 }}>
                Purchase Order
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ padding: 0 }}>
                Name
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Gst No
              </StyledTableCell>
              {/* <StyledTableCell align="center" sx={ { paddingX: 0 } }>Registered By</StyledTableCell> */}
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Pancard
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Mobile No.
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Email
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Bank Account Number
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Ifsc Code
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Bank Name
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Address
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                City
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                State
              </StyledTableCell>
              {data.Designation === "storekeeper" && (
                <StyledTableCell align="center" sx={{ paddingX: 2 }}>
                  Options
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {dealer &&
              dealer
                ?.filter((item) =>
                  item.name?.toLowerCase().includes(searchTerm?.toLowerCase())
                )
                .map((item, index) => {
                  return (
                    <>
                      <StyledTableRow>
                        <StyledTableCell align="center" sx={{ maxWidth: 80 }}>
                          <Button
                            variant="contained"
                            onClick={() => handleClick(item, index)}
                            size="small">
                            Edit
                          </Button>
                          {/* <Button
                            sx={{ marginTop: 2  }}
                            variant="contained"
                            onClick={() => Details(item)}
                            size="small"
                          >
                            View
                          </Button> */}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Button
                            onClick={() => handleNavigate(item)}
                            variant="contained">
                            P.O.
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.gstNumber}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.panCard}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.mobileNo}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.bankAccountNumber}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.ifscCode}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.bankName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.address}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.city}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.state}
                        </StyledTableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {all.length && (
        <DealerProductDetailModal open={open} setOpen={setOpen} all={all} />
      )}
    </>
  );
};

export default DealerInStore;
