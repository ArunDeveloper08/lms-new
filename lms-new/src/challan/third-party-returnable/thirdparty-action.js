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
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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
    paddingY: "0px 0px",
  },
}));

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 600,
    height: 400,
    overflowY: "scroll",
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#b80f768f",
    paddingY: 0,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    paddingY: 0,
  },
}));

const ThirdPartyActions = ({
  item,
  actions,
  showOtherProducts,
  searchChallan,
  queryCheck,
}) => {
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
    console.log(row);
    const updatedSelectedRows = [...selectedRows];
    let selected = updatedSelectedRows.some((item) => item.id === row.id);
    // if already selected, then remove
    if (selected) {
      const removed = updatedSelectedRows.filter((item) => item.id !== row.id);
      setSelectedRows(removed);
    } else {
      // if not, then add
      updatedSelectedRows.push(row);
      // setChallanProducts((p) => {
      //   return {
      //     ...p,
      //     Products: p.Products.map((product) => {
      //       if (product.id === row.id) {
      //         return {
      //           ...product,
      //           sameProduct: true,
      //         };
      //       }
      //       return product;
      //     }),
      //   };
      // });
      setSelectedRows(updatedSelectedRows);
    }
  };
  // if (!actions) return null;
  // console.log('toggleSelectedRows', selectedRows);

  const onModalOpen = (row) => {
    // if (row.inTime === null) {
    //   return alert("Please accept the product in store First ");
    // }
    console.log("onModalOpen", row);
    setModal({
      open: true,
      data: row,
    });
  };
  const handleSubmit = () => {
    // console.log(selectedRows, remark);
    // const otherSrNoList = {};
    // const sameOtherproductSerialNumber = () => selectedRows.map();
    axios
      .put(`${window.MyApiRoute}record/update?check=${queryCheck}`, {
        ...userInfo,
        remark: remark,
        sim: selectedRows,
      })
      .then((res) => {
        alert(res.data.message);
        // alert("Record Updated Successfully");
        searchChallan();

        // navigate(0);
      })
      .catch((error) => {
        console.log(error);
        alert(error.data.message);
      });
  };
  // const handleNavigate = () => {
  //   const url = `/thirdpartychallanpdf/${item.challanNumber}?type=thirdPartyReturnableChallan&SiteName=${item.dealerName}`;
  //   window.open(url, "_blank");
  // };

  const handleNavigate = () => {
    const url = `${mainRoute}/thirdpartychallanpdf/${item.challanNumber}?type=thirdPartyReturnableChallan&SiteName=${item.dealerName}`;
    window.location.href = url; // 👈 opens in the same tab
  };
  
  return (
    <div className=" shadow-md">
      {modal.open && (
        <OtherProductModal
          showOtherProducts={showOtherProducts}
          setChallanProducts={setChallanProducts}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          modal={modal}
          setModal={setModal}
        />
      )}
      <TableContainer sx={{ marginBottom: 3 }} component={Paper}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200, fontWeight: 800 }}
                align="center">
                <p>Challan No:{item.challanNumber}</p>
                <p className="text-xs">{item.dealerName}</p>
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                P Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center">
                Serial No.
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center">
                In Leiu
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                Send By Store
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                Accepted By Dealer
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                Send By Dealer
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                Accepted by Store
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 400 }}
                align="center">
                Activity
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {challanProducts?.Products.map((product, index) => {
              let remarks = "Error While Getting Remarks";
              try {
                remarks = JSON.parse(product?.ActivityLog);
              } catch (error) {}
              //  const lastRemark = remarks?.slice(-1);
              return (
                <StyledTableRow key={index}>
                  {/* <StyledTableCell align="center">
                    {product.status === "close" ? (
                      <span className="font-semibold text-lg">Close</span>
                    ) : (
                      <span className="font-semibold text-lg">Open</span>
                    )}
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    {product.status === "close" ? (
                      <span className="font-semibold text-lg">Closed</span>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          onClick={() => onModalOpen(product)}
                          disabled={product.status === "close"}
                          sx={{ marginRight: 2, textTransform: "none" }}>
                          Other
                        </Button>
                        <button
                          onClick={(e) => {
                            // if (product.inTime === null) {
                            //   e.preventDefault();
                            //   return alert(
                            //     "Please accept the product in store First "
                            //   );
                            // }
                          }}>
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
                    {product?.otherProductSrNo}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.sendByStore || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.acceptedByDealer || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.sendByDealer || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.acceptedByStore || "-"}
                  </StyledTableCell>
                  <CustomWidthTooltip
                    placement="left"
                    title={
                      <div>
                        {remarks?.map((item, index) => (
                          <p key={index} className="flex gap-x-3">
                            <span className="text-sm">{item?.date}</span>
                            <span className="text-sm">{item?.remark}</span>
                          </p>
                        ))}
                      </div>
                    }>
                    <StyledTableCell align="left">
                      {remarks?.length > 0 && (
                        <p className="flex gap-x-3">
                          <span className="text-sm">
                            {remarks[remarks?.length - 1]?.date}
                          </span>
                          <span className="text-sm">
                            {remarks[remarks?.length - 1]?.remark}
                          </span>
                        </p>
                      )}
                    </StyledTableCell>
                  </CustomWidthTooltip>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className="flex justify-center">
        <Button variant="contained" onClick={handleNavigate}>
          Download pdf
        </Button>
      </div> */}
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
        <Button onClick={() => handleNavigate()} variant="contained">
          Download Pdf
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ThirdPartyActions;
