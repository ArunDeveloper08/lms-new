import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StoreChallan = () => {
  const userinfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}record/get?category=3-phaseMeter&location=getChallanDetails&challanType=external returnable challan&createdBy=storekeeper`,
        userinfo
      )
      .then((res) => {
        console.log("challans", res.data.Data);
        setData(res.data?.Data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);
  return (
    <div>
      {/* <input
        name="search"
        debounce={300}
        onChange={(e) => setSearch(e.target.value)}
        value={search ?? ""}
        className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
        placeholder="Serial Number"
      /> */}
      <div className="flex items-center justify-around mb-2">
        <select
          name="Status"
          debounce={300}
          onChange={(e) => setSearch(e.target.value)}
          value={search ?? ""}
          className="border-2 py-3 px-5 w-[300px] border-gray-500 rounded"
        >
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="close">close</option>
        </select>
        <div></div>
      </div>
      <TableContainer
        sx={{ width: "900px", margin: "0 auto" }}
        component={Paper}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Challan No.
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Product Serial No.
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                created By
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <React.Fragment>
              {data &&
                data
                  ?.filter((item) =>
                    item?.Status.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item, index) => {
                    return (
                      <>
                        <StyledTableRow key={index}>
                          <StyledTableCell align="center" colSpan={1}>
                            {item.challanNumber}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ maxWidth: 300 }}
                          >
                            {item?.Products?.map((item, index, array) => {
                              return (
                                <span>
                                  {item?.productSrNo}
                                  {index < array.length - 1 && ","} &nbsp;
                                </span>
                              );
                            })}
                          </StyledTableCell>
                          <StyledTableCell align="center" colSpan={1}>
                            storekeeper
                          </StyledTableCell>
                          <StyledTableCell align="center" colSpan={1}>
                            <Link
                              to={`/downloadengineerchallanpdf/${item.challanNumber}?type=externalReturnableChallan`}
                              className="no-underline bg-sky-600 text-white border-black px-3 
                              rounded-md py-2"
                            >
                              {item.Status}
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    );
                  })}
            </React.Fragment>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StoreChallan;
