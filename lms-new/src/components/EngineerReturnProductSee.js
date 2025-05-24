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
import EngineerProductModal from "./EngineerProductModal";
import  secureLocalStorage  from  "react-secure-storage";
import { mainRoute } from "../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

const EngineerReturnProductSee = () => {
  const navigate = useNavigate();

  const { challanNumber } = useLocation().state;
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [serialNo , setSerialNo]=useState([]);
  const [eng, setEng] = React.useState({
    productSrNo: "",
    productType: "",
    remark: "",
  });
  const [selectedRows, setSelectedRows] = useState([]); 

  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedRowIndex(null);
  // };

  const handleChange = (e) => {
    setEng({ ...eng, [e.target.name]: e.target.value });
  };

  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const data = { challanNumber, ...userInfo };


  const api = () => {
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=modem&type=externalReturnableChallan&location=getDetailsByChallanNumber`,
        data
      )
      .then((res) => {
      
        const responseData = res?.data?.Data.challanDetails;
        if (Array.isArray(responseData)) {
          setDetails(responseData);
        } else {
          console.error("API response is not an array:", responseData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    api();
  }, []);

  // const Sumbit = () => {
  //   if (selectedRowIndex !== null) {
  //     const updatedDetails = [...details];
  //     const item = details[selectedRowIndex];
  //     updatedDetails[selectedRowIndex] = {
  //       ...item,
      
  //       returnableSerialNo: eng.productSrNo,
  //     };

  //     updatedDetails.forEach((item) => {
  //       if (!item.returnableSerialNo) {
  //         item.returnableSerialNo = "";
        
  //       }
  //     }); 

  //     console.log("Updated details:", updatedDetails);
  //     setDetails(updatedDetails);
  //     setOpen(false);
  //     setSelectedRowIndex(null);
  //   }
  // };
  const toggleRowSelection = (index) => {
    const updatedSelectedRows = [...selectedRows];
    if (updatedSelectedRows.includes(index)) {
      const rowIndex = updatedSelectedRows.indexOf(index);
      updatedSelectedRows.splice(rowIndex, 1);
    } else {
      updatedSelectedRows.push(index);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const isRowSelected = (index) => {
    return selectedRows.includes(index);
  };

  const SubmitData = () => {
    const selectedDetails = details
      .filter((item, index) => isRowSelected(index)) // Filter only selected rows
      .map((item) => ({
        ...item,
        
        returnableSerialNo: item.returnableSerialNo || "", // Ensure returnableSerialNo is not null
      }));

    if (eng.remark === "") {
      alert("Please enter remark");
      return;
    }

    if (selectedDetails.length > 0) {
      axios
        .put(`${window.MyApiRoute}record/update?${userInfo.Designation==="storekeeper" ?"check=sendToSite": "check=return"}`, {
          ...userInfo,
          remark: eng.remark,
          sim: selectedDetails,
        })
        .then((res) => {
      
          alert("Record Updated Successfully");
          navigate(`${mainRoute}/home`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("No rows selected to submit.");
    }
  };


 

  return (
    <div>
      <TableContainer sx={{ paddingY: 0 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Options
              </StyledTableCell>

              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Status
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Challan No.
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
                Returnable Serial No.
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Category
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details &&
              details?.map((item, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell
                      align="center"
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                          setOpen(true);
                          setSelectedRowIndex(index); // Set the selected row index
                        }}
                      >
                        Return
                      </Button>

                      <Checkbox
                        checked={isRowSelected(index)}
                        onChange={() => toggleRowSelection(index)}
                        disabled={item.status === "close"}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.challanNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.productSrNo}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.returnableSerialNo || "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.productType}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 20px 20px 0",
          width: "40%",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontFamily: "cursive",
            fontWeight: 500,
          }}
        >
          Remark :
        </Typography>
        <textarea
          className="border border-gray-700 w-[70%] h-[60px] rounded-sm p-[4px]"
          placeholder="Remark"
          name="remark"
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button onClick={SubmitData} variant="contained">
          Submit
        </Button>
      </Box>
      {
        open&&<EngineerProductModal details={details} setDetails={setDetails} selectedRowIndex={selectedRowIndex} setSelectedRowIndex={setSelectedRowIndex} setEng={setEng} eng={eng} setOpen={setOpen} open={open} userInfo={userInfo}/>
      }
      
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Return Other Product
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              margin: "20px 20px 20px 0",
            }}
          >
            <Typography sx={{display:"flex", alignItems:"center"}}>Product serial No.</Typography>
            <TextField
              placeholder="Serial No."
              name="productSrNo"
              onChange={handleChange}
            />
          </Box>
          {
            userInfo.name==="storekeeper"

          }

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              margin: "20px 20px 20px 0",
            }}
          >
            <Typography>Product Category.</Typography>
            <TextField
              placeholder="Category"
              name="productType"
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "50px 20px 20px 0",
            }}
          >
            <Button variant="contained" onClick={Sumbit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal> */}
    </div>
  );
};

export default EngineerReturnProductSee;
