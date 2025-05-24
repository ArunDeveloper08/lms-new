import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import MainModal from "../companyStore/MainModal";

// import { useNavigate } from "react-router-dom";

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

const ProductionModal2 = ({ opens, setOpens, checkedItems }) => {
  const [open, setOpen] = useState("");

  // const navigate = useNavigate();
  const handleClose = () => {
    setOpens(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  console.log("checkedItems", checkedItems);
  return (
    <>
      <div>
        <Dialog
          open={opens}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen
        >
          <DialogContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={handleClose}>
                <CloseIcon sx={{ fontSize: "50px", color: "black" }} />
              </Button>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{ padding: "0px", height: "45px" }}
              >
         Edit
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      sx={{ paddingX: 0, minWidth: "150px", align: "center" }}
                      align="center"
                    >
                      Serial No.
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ paddingX: 0, minWidth: "120px", align: "center" }}
                      align="center"
                    >
                      Category
                    </StyledTableCell>

                    <StyledTableCell
                      sx={{ paddingX: 0, minWidth: "150px", align: "center" }}
                      align="center"
                    >
                      Job Card No
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="left">
                      Remarks
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkedItems &&
                    checkedItems.map((item, index) => {
                      console.log("item", item);
                      const activity = JSON.parse(item.ActivityLog);
                      console.log(activity);
                      return (
                        <>
                          <StyledTableRow>
                            <StyledTableCell
                              sx={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              {" "}
                              {item.Sr_NO}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              {" "}
                              {item.Category}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              {" "}
                              {item.Job_Card_No}
                            </StyledTableCell>
                            <StyledTableCell
                              sx={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              {activity?.map((item, i) => {
                                return (
                                  <p
                                    key={i}
                                    className="grid grid-cols-2 gap-x-5 text-left"
                                  >
                                    <span className="w-[150px]">
                                      {item.date}
                                    </span>
                                    <span className="w-[200px]">
                                      {item.remark}
                                    </span>
                                  </p>
                                );
                              })}
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </div>
      <MainModal
        // setChecked={setChecked}
        // api={api}
        checked={checkedItems}
        open={open}
        setOpen={setOpen}
        // checkedItems={checkedItems}
      />
    </>
  );
};

export default ProductionModal2;
