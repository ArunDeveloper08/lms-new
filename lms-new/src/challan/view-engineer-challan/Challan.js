import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button, Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { mainRoute } from "../../App";
// import OtherProductModal from "./other-product-modal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#191818",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const Challan = ({ item, actions }) => {
 
  const [selectedRows, setSelectedRows] = useState([]);
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();
  const [challanProducts, setChallanProducts] = useState(item);
  const [modal, setModal] = useState({
    open: false,
    data: {},
  });
  useEffect(() => {
    setChallanProducts(item);
 
  }, [item]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const toggleSelectedRows = (row) => {
    const updatedSelectedRows = [...selectedRows];
    let selected = updatedSelectedRows.some((item) => item.id === row.id);
    if (selected) {
      const removed = updatedSelectedRows.filter((item) => item.id !== row.id);
      setSelectedRows(removed);
    } else {
      updatedSelectedRows.push(row);
      setSelectedRows(updatedSelectedRows);
    }
  };
  // if (!actions) return null;
  // console.log('toggleSelectedRows', selectedRows);

  const onModalOpen = (row) => {
    if (row.inTime === null) {
      return alert("Please accept the product in store First ");
    }
    
    setModal({
      open: true,
      data: row,
    });
  };
  const handleSubmit = () => {
    console.log(selectedRows, remark);
    axios
      .put(
        `${window.MyApiRoute}record/update?check=sendToSite`,
        {
          ...userInfo,
          remark: remark,
          sim: selectedRows,
        }
      )
      .then((res) => {
        alert("Record Updated Successfully");
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  
  };

  const handleNavigate = () => {
    const url = `${mainRoute}/downloadengineerchallanpdf/${item.challanNumber}?type=externalReturnableChallan`;
    window.open(url, '_blank');
  };
  

  return (
    <div className="border-2 p-2 shadow-md">
      
      <TableContainer sx={{ paddingY: 0 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
           
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200, fontWeight: 800 }}
                align="center"
              >
                Challan No:{item.challanNumber}
              </StyledTableCell>

              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center"
              >
                P Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Serial No.
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                In Leiu
              </StyledTableCell>

              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center"
              >
                Accepted by Store
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center"
              >
                Send By Store
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center"
              >
                Send By Eng.
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center"
              >
                Accepted By Eng.
              </StyledTableCell>

              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 400 }}
                align="center"
              >
                Activity
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {challanProducts?.Products.map((product, index) => {
              const remarks = JSON.parse(product.ActivityLog);
              const lastRemark = remarks.slice(-1);
              return (
                <StyledTableRow key={index}>
                  

                  <StyledTableCell align="center">
                    {product.status === "close" ? (
                      <span className="font-semibold text-lg">Closed</span>
                    ) : (
                      <>
                       <span className="font-semibold text-lg">Open</span>
                      </>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.productType}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.productSrNo}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.otherProductSrNo}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {product.inTime || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.EngineerRecievingTime || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.EngineerHandoverTime || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.outTime || "-"}
                  </StyledTableCell>

                  <StyledTableCell align="start">
                
                    <p className="flex gap-x-3">
                      <span className="text-sm">{lastRemark[0]?.date}</span>
                      <span className="text-sm">{lastRemark[0]?.remark}</span>
                    </p>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pb-10 px-2 w-1/2 gap-x-4 flex items-center mt-4">
       
        <Button onClick={() => handleNavigate()}
        variant="contained"
        >
Download Pdf
 </Button>
       
      </div>
    </div>
  );
};

export default Challan;








