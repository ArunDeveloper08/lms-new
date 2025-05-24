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
// import MainModal from "../companyStore/MainModal";
// import SelectFlag from "./SelectFlag";
import AddRemark from "./AddRemark";

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

const CheckedProduct = ({
  open,
  setOpen,
  api,
  checkedItems,
  setCheckedItems,
}) => {
  const [openRemark, setOpenRemark] = useState({
    open: false,
  });
  const handleClose = () => {
    setOpen((p) => ({ ...p, open: false }));
  };
  const handleOpen = () => {
    setOpenRemark((p) => ({ ...p, open: true }));
  };
  return (
    <>
      <div>
        <Dialog
          open={open.open}
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
              Send
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
                      Remark
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
                              {item.Meter_Serial_No}
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
      <AddRemark
        api={api}
        openRemark={openRemark}
        setOpenRemark={setOpenRemark}
        setOpen={setOpen}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        // setOpenFlag={setOpenFlag}
        // checkedItems={checkedItems}
        // from={from}
        // setOpen={setOpen}
        // setFrom={setFrom}
        // setCheckedItems={setCheckedItems}
        // setOpenAddRemark={setOpenAddRemark}
        // openAddRemark={openAddRemark}
      />
      {/* <SelectFlag
        api={api}
        setOpen={setOpen}
        setCheckedItems={setCheckedItems}
        checkedItems={checkedItems}
        openFlag={openFlag}
        setOpenFlag={setOpenFlag}
      /> */}
    </>
  );
};

export default CheckedProduct;
