import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  Autocomplete,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { mainRoute } from "../../App";

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

const EngineerChallan = () => {
  const navigate = useNavigate();
  const userinfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [data, setData] = useState([]);
  const [engineer, setEngineer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [moreDetails, setMoreDetails] = useState("");

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}record/get?category=3-phaseMeter&location=getChallanDetails&challanType=${"external returnable challan"}&createdBy=engineer&engineerName=${moreDetails}`,
        userinfo
      )
      .then((res) => {
        setData(res.data?.Data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, [moreDetails]);

  const handleSubmit = (item) => {
    navigate(`${mainRoute}/engineerreturnproductsee`, { state: item });
  };
  useEffect(() => {
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => {
        setEngineer(res.data.data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  // const handleSelect = (a, b) => {
  //   setMoreDetails((p) => ({ ...p, [a]: b }));
  // };
  return (
    <div>
      <div className="flex justify-around mt-4">
        <div className="w-[300px]">
          <Autocomplete
            //  onChange={(e, f) => handleSelect("Engineer", f)}
            onChange={(e, f) => setMoreDetails(f)}
            className="flex-1 "
            name="Engineer"
            options={engineer?.map((option) => option?.Name)}
            renderInput={(params) => (
              <TextField {...params} label="Select Engineer Name" />
            )}
          />
        </div>

        <select
          name="Status"
          debounce={300}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm ?? ""}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Serial Number"
        >
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="close">close</option>
        </select>
      </div>
      <TableContainer
        sx={{ width: "800px", margin: "24px auto" }}
        component={Paper}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Challan No.
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                created By
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Product Serial No.
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Status
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                PDF
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <React.Fragment>
              {data &&
                data
                  ?.filter((item) =>
                    item.Status.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => {
                    return (
                      <>
                        <StyledTableRow key={index}>
                          <StyledTableCell align="center" colSpan={1}>
                            {item.challanNumber}
                          </StyledTableCell>
                          <StyledTableCell align="center" colSpan={1}>
                            {item.issuedBY}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ maxWidth: 300 }}
                          >
                            {item?.Products?.map((item, index, array) => {
                              return (
                                <span>
                                  {item?.Meter_Serial_No}
                                  {index < array.length - 1 && ","} &nbsp;
                                </span>
                              );
                            })}
                          </StyledTableCell>
                          <StyledTableCell align="center" colSpan={1}>
                            {item.inTime === null ? (
                              <Button
                                onClick={() => alert("Please receive first")}
                              >
                                {item.Status}
                              </Button>
                            ) : (
                              <Button onClick={() => handleSubmit(item)}>
                                {item.Status}
                              </Button>
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center" colSpan={1}>
                            <Link
                              to={`${mainRoute}/downloadengineerchallanpdf/${item.challanNumber}?type=externalReturnableChallan`}
                            >
                              <Button variant="contained">pdf</Button>
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

export default EngineerChallan;

