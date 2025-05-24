import React, { useEffect, useState } from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  styled,
  TableBody,
  Table,
  Button,
  CircularProgress,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const POTable = () => {
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [data, setData] = useState([]);
  const params = useParams();
  const { dealerid } = params;
  const navigate = useNavigate();
  const [dealer, setDealer] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}dealerPO/get?DealerId=${params.dealerid}`,
        userInfo
      )
      .then((res) => {
        setDealer(res?.data?.dealerName);

        setData(res.data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNavigate = () => {
    navigate(`${mainRoute}/po-form?poNumber=new&dealerId=` + params.dealerid);
  };
  const handleChangeRoute = (item) => {
    // console.log("poNumber ", item.poNumber)
    const encodedPoNumber = encodeURIComponent(item.poNumber);
    navigate(`${mainRoute}/editpo?dealerId=${params.dealerid}&poNumber=${encodedPoNumber}`);
  };

  const handleSend = (item) => {
    const encodedPoNumber = encodeURIComponent(item.poNumber);
    navigate(
      `${mainRoute}/sendproductdealer?dealerId=${params.dealerid}&poNumber=${encodedPoNumber}`,
      { state: item }
    );
  };

  return (
    <div>
      <div className=" flex justify-around items-center pt-2 pb-2">
        <div>
          <p className="text-xl text-white bg-[#ed0793] px-2 py-1 rounded-md ">
            Dealer Name :{state}
          </p>
        </div>
        <Button variant="contained" onClick={() => handleNavigate()}>
          Add New P.O.
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 150 }}>
                Option
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 150 }}>
                View
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 150 }}>
                Download PO
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 150 }}>
                PO Number
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 150 }}>
                Product Type
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 150 }}>
                Quantity
              </StyledTableCell>

              {/* <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 150 }}>
                PO Type
              </StyledTableCell> */}
              <StyledTableCell
                align="center"
                sx={{ padding: 0, maxWidth: 150 }}>
                Company Name
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Contact Number
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                Contact Person
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((item, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => handleChangeRoute(item)}
                        variant="contained"
                        size="small">
                        Edit
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => handleSend(item)}
                        variant="contained"
                        size="small">
                        Challan
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => {
                          const url = `${mainRoute}/pochallan/${params.dealerid}?poNumber=${item.poNumber}`;
                          window.open(url, "_blank");
                        }}
                        variant="contained"
                        size="small">
                        P.O.
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item?.poNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item?.detail.map((i) => i.ProductType + ", ")}
                      {item?.ProductType}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item?.detail.map((i) => i.Quantity + ", ")}
                      {item?.Quantity}
                    </StyledTableCell>

                    {/* <StyledTableCell align="center">
                      {item?.detail[0].PO_Type}
                    </StyledTableCell> */}
                    <StyledTableCell align="center">
                      {item?.detail[0].CompanyName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item?.detail[0].ContactNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item?.detail[0].ContactPerson}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default POTable;
