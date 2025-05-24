import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import * as XLSX from "xlsx";
// import Modal from "./modal";

import qs from "query-string";
import secureLocalStorage from "react-secure-storage";
import { ProductList } from "../constants/ProductList";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#191818",
    color: theme.palette.common.white,
    paddingX: 0,
    minWidth: 200,
    fontWeight: 800,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0,
    minWidth: 200,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ddd",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
let oldList = [...ProductList];
oldList.shift();
const newList = [["All", " "], ...ProductList];

const AllThirdPartyChallan = () => {
  const pageSize = [10, 20, 50, 100, 200, 500, 1000, 2000];
  const initialState = {
    location: "dealerDetails",
    check: "returnable",
    createdBy: "storekeeper",
    dealerId: "",
    category: "modem",
    productSrNo: "",
    challanNumber: "",
    productType: "",
    pageSize: pageSize[0],
    pageNo: 1,
    status: "open",
  };
  const [dealer, setDealer] = useState([]);
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: "",
  });
  // selectedRow = [ productSrNo-productType]
  const [selectedRows, setSelectedRows] = useState({});
  const [modal, setModal] = useState({
    data: [],
    open: false,
  });
  const [query, setQuery] = useState(initialState);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const getDealer = () => {
    axios
      .get(`${window.MyApiRoute}dealer/get`)
      .then((res) => {
        setDealer(res.data?.details);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const handleChangeQuery = (name, value) => {
    // console.log(name, value);
    setQuery((p) => ({ ...p, pageNo: 1, [name]: value }));
  };
  const getProducts = async () => {
    try {
      setState((p) => ({ ...p, loading: true }));
      const url = qs.stringifyUrl({
        url: `${window.MyApiRoute}record/get`,
        query,
      });
      const { data } = await axios.post(url, userInfo);
      // console.log(data);
      setState((p) => ({ ...p, data: data, error: "" }));
    } catch (error) {
      setState((p) => ({ ...p, error: error.message }));
    } finally {
      setState((p) => ({ ...p, loading: false }));
    }
  };
  useEffect(() => {
    // if (!dealer.length) {
    getDealer();
    // }
    getProducts();
  }, [query]);
  const handleSelectRow = (unique, item) => {
    let updated = { ...selectedRows };
    if (updated[unique]) {
      // removing the keys and the data
      delete updated[unique];
    } else {
      updated[unique] = item;
    }
    setSelectedRows(updated);
  };
  const openModal = () => {
    setModal({
      data: selectedRows,
      open: true,
    });
  };
  const handlePageChange = (type) => {
    if (type === "first") {
      setQuery({ ...query, pageNo: 1 });
    } else if (type === "prev") {
      setQuery((prev) => ({ ...query, pageNo: prev.pageNo - 1 }));
    } else if (type === "next") {
      setQuery((prev) => ({ ...query, pageNo: prev.pageNo + 1 }));
    } else if (type === "last") {
      setQuery(() => ({ ...query, pageNo: state.data.lastPage }));
    }
  };
  // console.log(state);

  const handleOnExport = (data) => {
    const newData = data?.map((item, index) => {
      const {
        id,
        inTime,
        outTime,
        createdAt,
        updatedAt,
        recievedBy,
        outFlag,
        inFlag,
        ActivityLog,
        issuedBy,
        createdBy,
        ...rest
      } = item;
      return rest;
    });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(newData);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(
      wb,
      `Excel-${new Date().toDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}.xlsx`
    );
  };
  return (
    <section>
      {/* {modal.open && (
        <Modal
          modal={modal}
          setModal={setModal}
          setSelectedRows={setSelectedRows}
          getProducts={getProducts}
        />
      )} */}
      <main className="flex justify-around items-center py-2">
        <Autocomplete
          onChange={(e, f) => handleChangeQuery("dealerId", f?.ID ?? "")}
          className="w-[250px]"
          name="selectDealer"
          options={dealer.map((option) => option)}
          getOptionLabel={(option) =>
            `${option.name.toUpperCase()} , ID: ${option.ID} , GST-${
              option.gstNumber
            }`
          }
          renderInput={(params) => (
            <TextField {...params} label="Select Dealer" />
          )}
        />
        <TextField
          label="Challan Number"
          onChange={(e) => handleChangeQuery("challanNumber", e.target.value)}
          placeholder="Challan Number"
          className="w-[150px]"
        />

        <TextField
          label="Product SrNo"
          onChange={(e) => handleChangeQuery("productSrNo", e.target.value)}
          placeholder="Product SrNo"
          className="w-[150px]"
        />
        <Autocomplete
          onChange={(e, f) => handleChangeQuery("productType", f?.[1] ?? "")}
          defaultValue={newList[0]}
          className="w-[200px]"
          name="Select Product"
          options={newList.map((option) => option)}
          getOptionLabel={(option) => option[0]}
          renderInput={(params) => (
            <TextField {...params} label="Select Product" />
          )}
        />
        <Select
          onChange={(e) => handleChangeQuery("createdBy", e.target.value)}
          value={query.createdBy}
          sx={{ width: 200 }}
        >
          <MenuItem value="storekeeper">Initiate By Store</MenuItem>
          <MenuItem value="dealer">Initiate By Dealer</MenuItem>
        </Select>
        <Select
          onChange={(e) => handleChangeQuery("status", e.target.value)}
          value={query?.status}
          sx={{ width: 150 }}
        >
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="close">Close</MenuItem>
        </Select>
        <p>Count:{state?.data.count}</p>
        <Button onClick={getProducts} variant="contained">
          Search
        </Button>
      </main>
      <div>
        <TableContainer sx={{ marginBottom: 3 }} component={Paper}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Challan No.</StyledTableCell>
                <StyledTableCell align="center">Product Sr No.</StyledTableCell>
                <StyledTableCell align="center">Product Type</StyledTableCell>
                <StyledTableCell align="center">Dealer Name</StyledTableCell>

                <StyledTableCell align="center">Send by Dealer</StyledTableCell>
                <StyledTableCell align="center">
                  Accepted by Store
                </StyledTableCell>
                <StyledTableCell align="center">send by Store</StyledTableCell>
                <StyledTableCell align="center">
                  Accepted by Dealer
                </StyledTableCell>
                <StyledTableCell align="center">In Leiu</StyledTableCell>
                <StyledTableCell align="center">Dealer ID</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.loading ? (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={6}
                    className="w-full h-[300px] animate-pulse !text-3xl !text-center"
                  >
                    Loading ...
                  </StyledTableCell>
                </StyledTableRow>
              ) : state.error ? (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={6}
                    className="w-full h-[300px] !text-3xl !text-center"
                  >
                    Some Error Occured
                  </StyledTableCell>
                </StyledTableRow>
              ) : state?.data?.data?.length ? (
                state?.data.data.map((item) => {
                  const unique = item.productSrNo + "@" + item.productType;
                  const isSelected = !!selectedRows[unique];
                  return (
                    <StyledTableRow key={unique}>
                      <StyledTableCell>{item.challanNumber}</StyledTableCell>
                      <StyledTableCell>{item.productSrNo}</StyledTableCell>
                      <StyledTableCell>{item.productType}</StyledTableCell>
                      <StyledTableCell>{item.dealerName}</StyledTableCell>

                      <StyledTableCell>{item.sendByDealer}</StyledTableCell>
                      <StyledTableCell>{item.acceptedByStore}</StyledTableCell>
                      <StyledTableCell>{item.sendByStore}</StyledTableCell>
                      <StyledTableCell>{item.acceptedByDealer}</StyledTableCell>
                      <StyledTableCell>{item.otherProductSrNo}</StyledTableCell>
                      <StyledTableCell>{item.dealerId}</StyledTableCell>
                      <StyledTableCell>{item.status}</StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={6}
                    className="w-full h-[300px] !text-3xl !text-center"
                  >
                    No Data Found
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex px-10 justify-between items-center">
        <Badge badgeContent={selectedRows.length} color="error">
          <Button
            onClick={() => handleOnExport(state?.data.data)}
            variant="contained"
          >
            Download
          </Button>
        </Badge>
        <div className="flex items-center gap-x-4">
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Rows</InputLabel>
            <Select
              defaultValue={pageSize[0]}
              // open={open}
              // onClose={handleClose}
              // onOpen={handleOpen}
              // value={Rows}
              label="Rows"
              onChange={(e) => handleChangeQuery("pageSize", e.target.value)}
            >
              {pageSize.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            disabled={state.loading || !state.data.hasPreviousPage}
            onClick={() => handlePageChange("first")}
            variant="outlined"
          >
            {" << "}
          </Button>
          <Button
            disabled={state.loading || !state.data.hasPreviousPage}
            onClick={() => handlePageChange("prev")}
            variant="outlined"
          >
            {" < "}
          </Button>
          <Button
            disabled={state.loading || !state.data.hasNextPage}
            onClick={() => handlePageChange("next")}
            variant="outlined"
          >
            {" > "}
          </Button>
          <Button
            disabled={state.loading || !state.data.hasNextPage}
            onClick={() => handlePageChange("last")}
            variant="outlined"
          >
            {" >> "}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllThirdPartyChallan;
