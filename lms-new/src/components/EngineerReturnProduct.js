import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import moment from "moment/moment";
import { Checkbox } from "@mui/material";
import { downloadPdfApi } from "../products/OnHold/api";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CheckBox from "@mui/material/Checkbox";
import { Badge, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import  secureLocalStorage  from  "react-secure-storage";
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
const EngineerReturnProduct = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  const dataa = JSON.parse(secureLocalStorage.getItem("info")).data;

  const api = () => {
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=modem&challanType=external returnable challan&location=getChallanNumber`,
        dataa
      )
      .then((res) => {
        console.log(res.data.Data);
        setData(res?.data?.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    api();
  }, []);

  const handleSubmit = (item) => {
    navigate(`${mainRoute}/engineerreturnproductsee`, { state: item });
  };

  return (
    <>
      <Fragment>
        <div className="w-full h-[75vh] overflow-scroll ml-2">
          <input
            name="Meter_Serial_No"
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 py-2  mb-3 px-5  w-[300px] border-gray-500 rounded"
            placeholder="Challan Number"
          />
          <TableContainer sx={{ paddingY: 0 }} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    sx={{ paddingX: 0, minWidth: 100 }}
                    align="center"
                  >
                    Challan No.
                  </StyledTableCell>

                  <StyledTableCell
                    sx={{ paddingX: 0, minWidth: 150 }}
                    align="center"
                  >
                    option
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data
                    ?.filter((item) =>
                      String(item?.challanNumber)?.includes(String(search))
                    )
                    .map((item, index) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="center">
                            {item.challanNumber}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              onClick={() => handleSubmit(item)}
                            >
                              Submit
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Fragment>
    </>
  );
};

export default EngineerReturnProduct;
// .filter((item) => item?.challanNumber.includes(search))
