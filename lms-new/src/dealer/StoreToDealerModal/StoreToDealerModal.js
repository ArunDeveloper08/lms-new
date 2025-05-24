import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Badge } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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

const StoreToDealerModal = ({
  open,
  setOpen,
  checked,
  productType,
  setChecked,
}) => {
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const [moreDetails, setMoreDetails] = useState({
    remark: "",
    SerialNumber: checked,
  });
  const [val, setVal] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${productType}&location=inStore`,
        {
          ...a.data,
        }
      )
      .then(
        (res) => (
          setVal(res.data.Data),
          setData2(res.data.Data)
          
        )
      )
      .catch((err) => alert("Error", err.message));
  }, []);

  const handleSelect = (a, b) => {
    setMoreDetails((p) => ({ ...p, [a]: b }));
  };

 

  const handleCheck = (e, item) => {
    const isChecked = e.target.checked;
    const newData = val.map((valItem) =>
      valItem.Sr_NO === item.Sr_NO
        ? { ...valItem, checked: isChecked }
        : valItem
    );
    setVal(newData);
    if (isChecked) {
      
        setChecked((prevChecked) => [...prevChecked, item]);
      
    } else {
      setChecked((prevChecked) =>
        prevChecked.filter((checkedItem) => checkedItem.Sr_NO !== item.Sr_NO)
      );
    }
  };
  
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(p=>!p)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: 900,
            height: 600,
          }}
        >
            <h1 className="text-xl flex justify-center font-bold">{productType}</h1>
          <TableContainer
            sx={{ width: "700px", margin: "0 auto" }}
            component={Paper}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ padding: 0 }}>
                    Category
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                    Serial No
                  </StyledTableCell>
                  {/* <StyledTableCell align="center" sx={ { paddingX: 0 } }>Registered By</StyledTableCell> */}
                  <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                    Registered On
                  </StyledTableCell>
                  {a.data.Designation === "storekeeper" && (
                    <StyledTableCell align="center" sx={{ paddingX: 2 }}>
                      Options
                    </StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data2?.map((item, i) => {
                  // const date = (new Date(item.createdAt)).toLocaleString();
                  const date = new Date(item.createdAt);
                  const options = {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  };
                  const formattedDate = date.toLocaleString("en-US", options);
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">
                        {item.Category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.Meter_Serial_No}
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">{ item.Sim_CreatedBy }</StyledTableCell> */}
                      <StyledTableCell align="center">
                        {formattedDate}
                      </StyledTableCell>
                      {a.data.Designation === "storekeeper" && (
                        <StyledTableCell align="center">
                          <input
                            className="cursor-pointer"
                            checked={item?.checked ? true : false}
                            onChange={(e) => handleCheck(e, item)}
                            type="checkbox"
                          />
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

         
        </Box>
        {/* {checked && checked.length ? (
          <p className="fixed cursor-pointer bottom-10 right-10 ">
            <Badge color="primary" badgeContent={checked.length}>
              <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
            </Badge>
          </p>
        ) : (
          ""
        )} */}
      </Modal>
    </div>
  );
};

export default StoreToDealerModal;
