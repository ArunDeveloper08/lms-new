import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import SendIcon from "@mui/icons-material/Send";
import { Badge, Box, Modal, Typography } from "@mui/material";
import DealerModal from "./DealerModal";
import Loader from "../constants/Loader";
import secureLocalStorage from "react-secure-storage";

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

const ShowProductTable = ({ data, selectedProduct }) => {
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheck = (item) => {
  
    const isChecked = checked.some(
      (checkedItem) => checkedItem.Sr_NO === item.Sr_NO + selectedProduct
    );

    if (isChecked) {
      setChecked((prevChecked) =>
        prevChecked.filter(
          (checkedItem) => checkedItem.Sr_NO !== item.Sr_NO + selectedProduct
        )
      );
    } else {
      const itemWithCategory = {
        ...item,
        Category: selectedProduct,
        Sr_NO: item.Sr_NO + selectedProduct,
      };
      setChecked((prevChecked) => [...prevChecked, itemWithCategory]);
    }
  };
  

  useEffect(() => {}, [checked]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Typography className="text-gray-700  flex justify-center py-2 px-2">
        <span className="text-xl font-semibold">{selectedProduct}</span>
      </Typography>
      <div className="ml-20">
        <input
          className="border-2 py-2 px-3 w-[300px] border-gray-500 rounded mb-1 ml-6 "
          type="text"
          placeholder=" Serial No"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {data ? (
        <>
          <TableContainer
            sx={{ width: "900px", margin: "0 auto" }}
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
                  <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                    Registered On
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ paddingX: 2 }}>
                    Options
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data
                    ?.filter((item) =>
                      item.Meter_Serial_No?.toLowerCase().includes(
                        searchTerm?.toLowerCase()
                      )
                    )
                    .map((item, i) => {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell align="center">
                            {item.Category}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.Meter_Serial_No}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.createdAt.slice(0, 10)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <input
                              className="cursor-pointer"
                              checked={checked.some(
                                (checkedItem) =>
                                  checkedItem.Sr_NO ===
                                  item.Sr_NO + selectedProduct
                              )}
                              onChange={() => handleCheck(item)}
                              type="checkbox"
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Loader data={data} />
      )}

      {checked.length ? (
        <p
          onClick={handleClickOpen}
          className="fixed cursor-pointer bottom-10 right-10 "
        >
          <Badge color="primary" badgeContent={checked.length}>
            <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
          </Badge>
        </p>
      ) : (
        ""
      )}

      <DealerModal open={open} setOpen={setOpen} checked={checked} />
    </div>
  );
};

export default ShowProductTable;
