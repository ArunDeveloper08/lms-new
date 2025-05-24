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
import OtherProductModal from "./other-product-modal";
import { mainRoute } from "../../App";

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
    backgroundColor: "#b80f768f",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SingleChallanActions = ({ item, actions }) => {
 
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
    console.log("onModalOpen", row);
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
    // console.log("handleSubmit", selectedRows);
  };

  const handleNavigate = () => {
    const url = `${mainRoute}/downloadengineerchallanpdf/${item.challanNumber}?type=externalReturnableChallan`;
    window.open(url, '_blank');
  };
  

  return (
    <div className="border-2 p-2 shadow-md">
      
      {modal.open && (
        <OtherProductModal
          setChallanProducts={setChallanProducts}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          modal={modal}
          setModal={setModal}
        />
      )}
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
                        <Button
                          variant="outlined"
                          onClick={() => onModalOpen(product)}
                          disabled={product.status === "close"}
                          sx={{ marginRight: 2, textTransform: "none" }}
                        >
                          Other
                        </Button>
                        <button
                          onClick={(e) => {
                            if (product.inTime === null) {
                              e.preventDefault();
                              return alert(
                                "Please accept the product in store First "
                              );
                            }
                          }}
                        >
                          <Checkbox
                            onChange={() => toggleSelectedRows(product)}
                            disabled={product.status === "close"}
                          />
                        </button>
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
      <div className="pb-10 px-2 w-1/2 gap-x-4 flex items-center ">
        <div className="flex flex-1 gap-x-4 items-center">
          <p className="font-bold">Remark:</p>
          <textarea
            rows={3}
            className="border border-gray-700 w-full rounded-md p-[4px]"
            placeholder="Remark"
            name="remark"
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        <Button onClick={() => handleNavigate()}
        variant="contained"
        >
                      Download Pdf
                    </Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SingleChallanActions;







