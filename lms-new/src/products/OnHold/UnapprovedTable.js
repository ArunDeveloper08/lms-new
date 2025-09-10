// import React, { useState, useEffect, Fragment } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import CheckBox from "@mui/material/Checkbox";
// import {
//   Badge,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import RemarkModal from "./RemarkModal";
// import { useNavigate } from "react-router-dom";
// import { downloadPdfApi } from "./api";
// import ExchangeProduct from "../companyStore/ExchangeProduct";
// import { mainRoute } from "../../App";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
//   // "&:nth-of-type(odd)":{
//   //   color:'white'
//   // }
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: "#b80f768f",
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
// const UnapprovedTable = ({
//   data = [],
//   userInfo = {},
//   check,
//   canChange,
//   api,
//   query,
//   downloadUrl,
//   exchangeableProductListQuery,
//   exchangeUpdatedQuery,
// }) => {
//   const navigate = useNavigate();
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [search, setSearch] = useState("");
//   const [modalProps, setModalProps] = useState({
//     open: false,
//     data: [],
//     title: "unapproved",
//     check: check,
//     userInfo,
//   });
//   const [openModal, setOpenModal] = useState({
//     open: false,
//     check: check,
//   });
//   const [remarkModalOpen, setRemarkModalOpen] = useState(false);
//   const [selectedRemarks, setSelectedRemarks] = useState([]);

//   const checkboxLabel = { inputProps: { "aria-label": "Checkbox demo" } };
//   const handleCheck = (e, item) => {
//     if (e.target.checked) {
//       setSelectedRows((prevSelectedRows) => [...prevSelectedRows, item]);
//     } else {
//       setSelectedRows((prevSelectedRows) =>
//         prevSelectedRows.filter((row) => row !== item)
//       );
//     }
//   };
//   const handleOpenModal = () => {
//     setModalProps((p) => ({ ...p, open: true, data: selectedRows }));
//     setSelectedRows([]);
//   };

//   const handlePdfDownload = (challanNumber) => {
//     const url = `${downloadUrl}/${challanNumber}?type=${query}`;
//     window.open(url, "_blank");
//   };

//   const handleRemarkClick = (remarks) => {
//     setSelectedRemarks(remarks);
//     setRemarkModalOpen(true);
//   };
//   const handleClose = () => {
//     setRemarkModalOpen(false);
//   };
  
//   return (
//     <Fragment>
//       <div className="w-full overflow-scroll">
//         <div className="flex justify-around p-2">
//           <input
//             name="Meter_Serial_No"
//             onChange={(e) => setSearch(e.target.value)}
//             className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//             placeholder="Serial Number"
//           />
//           {userInfo.data.Designation === "storekeeper" &&
//             query === "externalReturnableChallan" && (
//               <Button
//                 variant="contained"
//                 onClick={() => setOpenModal((p) => ({ open: true, query }))}
//               >
//                 Exchange Product
//               </Button>
//             )}
//         </div>
//         <TableContainer
//           className="p-0"
//           sx={{ height: (window.innerHeight * 3) / 4 }}
//           component={Paper}
//         >
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {canChange && (
//                   <StyledTableCell
//                     sx={{ paddingX: 0, minWidth: 100 }}
//                     align="center"
//                   >
//                     Options
//                   </StyledTableCell>
//                 )}
//                 {query === "Rejected" ? (
//                   " "
//                 ) : (
//                   <StyledTableCell
//                     sx={{ paddingX: 0, minWidth: 150 }}
//                     align="center"
//                   >
//                     PDF
//                   </StyledTableCell>
//                 )}

//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                   Category
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 150 }}
//                   align="center"
//                 >
//                   Serial No.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                   Job Card No
//                 </StyledTableCell>

//                 {userInfo.data.Designation === "engineer" && (
//                   <StyledTableCell
//                     sx={{ paddingX: 0, minWidth: 100 }}
//                     align="center"
//                   >
//                     Issue To
//                   </StyledTableCell>
//                 )}

//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                   Challan No.
//                 </StyledTableCell>

//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 600 }}
//                   align="center"
//                 >
//                   ActivityLog
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data &&
//                 data
//                   ?.filter((item) =>
//                     item.Meter_Serial_No?.toLowerCase().includes(
//                       search?.toLowerCase()
//                     )
//                   )
//                   .map((a, b) => {
//                     // let log = [
//                     //   {
//                     //     date: "12-12-2000",
//                     //     remark: "Error while parsing Activity Log",
//                     //   },
//                     // ];
//                     // try {
//                     //   log = JSON.parse(a.ActivityLog);
//                     // } catch (error) {
//                     //   console.log("error", error);
//                     // }

//                     let log = [];

//                     if (a?.ActivityLog) {
//                       try {
//                         log = JSON.parse(a?.ActivityLog) || [];
//                       } catch (error) {
//                         log = [{ date: "12-12-1212", remark: "Null" }];
//                       }
//                     } else {
//                       log = [{ date: "12-12-1212", remark: "Null" }];
//                     }

//                     // Get the last remark safely
//                     const lastRemark = log.length
//                       ? log[log.length - 1]
//                       : null;

//                     if (userInfo.data.Designation === "engineer") {
//                       log?.splice(0, log?.length - 1);
//                     }
//                     return (
//                       <StyledTableRow key={b}>
//                         {canChange && (
//                           <StyledTableCell align="center">
//                             <CheckBox
//                               {...checkboxLabel}
//                               size="small"
//                               checked={selectedRows.includes(a)} // Check if the item is in selectedRows
//                               onChange={(e) => handleCheck(e, a)}
//                             />
//                           </StyledTableCell>
//                         )}
//                         {query === "Rejected" ? (
//                           ""
//                         ) : (
//                           <StyledTableCell sx={{ paddingY: 1 }} align="center">
//                             <Button
//                               onClick={() =>
//                                 handlePdfDownload(
//                                   a.challanNumber,
//                                   a.ProductionToStore
//                                 )
//                               }
//                               sx={{
//                                 fontSize: 10,
//                               }}
//                               variant="contained"
//                             >
//                               Download Pdf
//                             </Button>
//                           </StyledTableCell>
//                         )}

//                         <StyledTableCell sx={{ paddingY: 1 }} align="center">
//                           {a.Category}
//                         </StyledTableCell>
//                         <StyledTableCell align="center">
//                           {a.Meter_Serial_No}
//                         </StyledTableCell>
//                         <StyledTableCell align="center">
//                           {a.Job_Card_No}
//                         </StyledTableCell>
//                         {userInfo.data.Designation === "engineer" && (
//                           <StyledTableCell align="center">
//                             {a.IssueForEngineer}
//                           </StyledTableCell>
//                         )}

//                         <StyledTableCell align="center">
//                           {a.challanNumber}
//                         </StyledTableCell>

//                         <StyledTableCell
//                           align="center"
//                           onClick={() => handleRemarkClick(log)}
//                           className="cursor-pointer"
//                         >
//                           {/* {log?.map((a, b) => {
//                             return (
//                               <p key={b} className="space-x-3">
//                                 <span>Date: {a.date}</span>
//                                 <span>Remark: {a.remark}</span>
//                               </p>
//                             );
//                           })} */}

//                           {lastRemark
//                             ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}`
//                             : "No Remarks"}
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     );
//                   })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {selectedRows.length ? (
//           <p
//             onClick={handleOpenModal}
//             className="fixed cursor-pointer bottom-10 right-10 "
//           >
//             <Badge color="primary" badgeContent={selectedRows.length}>
//               <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
//             </Badge>
//           </p>
//         ) : (
//           ""
//         )}
//       </div>
//       {modalProps.open && (
//         <RemarkModal
//           setSelectedRows={setSelectedRows}
//           setModalProps={setModalProps}
//           modalProps={modalProps}
//           api={api}
//         />
//       )}
//       {openModal && (
//         <ExchangeProduct
//           data={data}
//           api={api}
//           openModal={openModal}
//           setOpenModal={setOpenModal}
//           exchangeableProductListQuery={exchangeableProductListQuery}
//           exchangeUpdatedQuery={exchangeUpdatedQuery}
//         />
//       )}

//       <Dialog
//         open={remarkModalOpen}
//         onClose={handleClose}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>All Remarks</DialogTitle>
//         <DialogContent>
//           {selectedRemarks?.map((log, index) => (
//             <p key={index} className="mt-2">
//               <strong>Date:</strong> {log.date} <br />
//               <strong>Remark:</strong> {log.remark}
//             </p>
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button> 
//         </DialogActions>
//       </Dialog>
//     </Fragment>
//   );
// };

// export default UnapprovedTable;


import React, { useState, useEffect, Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CheckBox from "@mui/material/Checkbox";
import {
  Badge,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RemarkModal from "./RemarkModal";
import { useNavigate } from "react-router-dom";
import { downloadPdfApi } from "./api";
import ExchangeProduct from "../companyStore/ExchangeProduct";
import { mainRoute } from "../../App";

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

const UnapprovedTable = ({
  data = [],
  userInfo = {},
  check,
  canChange,
  api,
  query,
  downloadUrl,
  exchangeableProductListQuery,
  exchangeUpdatedQuery,
}) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [modalProps, setModalProps] = useState({
    open: false,
    data: [],
    title: "unapproved",
    check: check,
    userInfo,
  });
  const [openModal, setOpenModal] = useState({
    open: false,
    check: check,
  });
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState([]);

  const checkboxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleCheck = (e, item) => {
    if (e.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, item]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row !== item)
      );
    }
  };

  const handleOpenModal = () => {
    setModalProps((p) => ({ ...p, open: true, data: selectedRows }));
    setSelectedRows([]);
  };

  const handlePdfDownload = (challanNumber) => {
    const url = `${downloadUrl}/${challanNumber}?type=${query}`;
    window.open(url, "_blank");
  };

  const handleRemarkClick = (remarks) => {
    setSelectedRemarks(remarks);
    setRemarkModalOpen(true);
  };

  const handleClose = () => {
    setRemarkModalOpen(false);
  };
  
  return (
    <Fragment>
      <div className="w-full overflow-scroll">
        <div className="flex justify-around p-2">
          <input
            name="Meter_Serial_No"
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          />
          {userInfo.data.Designation === "storekeeper" &&
            query === "externalReturnableChallan" && (
              <Button
                variant="contained"
                onClick={() => setOpenModal((p) => ({ open: true, query }))}
              >
                Exchange Product
              </Button>
            )}
        </div>
        <TableContainer
          className="p-0"
          sx={{ height: (window.innerHeight * 3) / 4 }}
          component={Paper}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {canChange && (
                  <StyledTableCell sx={{ paddingX: 0, minWidth: 100 }} align="center">
                    Options
                  </StyledTableCell>
                )}
                {query === "Rejected" ? (
                  " "
                ) : (
                  <StyledTableCell sx={{ paddingX: 0, minWidth: 150 }} align="center">
                    PDF
                  </StyledTableCell>
                )}
                <StyledTableCell sx={{ paddingX: 0, minWidth: 100 }} align="center">
                  Category
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0, minWidth: 150 }} align="center">
                  Serial No.
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0, minWidth: 100 }} align="center">
                  Job Card No
                </StyledTableCell>
                {userInfo.data.Designation === "engineer" && (
                  <StyledTableCell sx={{ paddingX: 0, minWidth: 100 }} align="center">
                    Issue To
                  </StyledTableCell>
                )}
                <StyledTableCell sx={{ paddingX: 0, minWidth: 100 }} align="center">
                  Challan No.
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0, minWidth: 600 }} align="center">
                  ActivityLog
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data
                  ?.filter((item) =>
                    item.Meter_Serial_No?.toLowerCase().includes(
                      search?.toLowerCase()
                    )
                  )
                  .map((a, b) => {
                    let log = [];
                    if (a?.ActivityLog) {
                      try {
                        log = JSON.parse(a?.ActivityLog) || [];
                      } catch (error) {
                        log = [{ date: "12-12-1212", remark: "Null" }];
                      }
                    } else {
                      log = [{ date: "12-12-1212", remark: "Null" }];
                    }

                    // --- MODIFICATION START ---
                    const lastRemark = log.length ? log[log.length - 1] : null;
                    let displayRemark = lastRemark; // By default, show the last remark

                    if (lastRemark && typeof lastRemark.remark === 'string') {
                      const remarkText = lastRemark.remark.toLowerCase();
                      // Check if the last remark contains the filter phrases
                      if (remarkText.includes("return to store") 
                        || remarkText.includes("submit in store")
                        || remarkText.includes("submite in store")
                        || remarkText.includes("submited in store")
                        || remarkText.includes("Send to store")
                      
                      ) {
                        // If it matches, try to show the previous remark instead
                        if (log.length > 1) {
                          displayRemark = log[log.length - 2]; // Show the second-to-last remark
                        } else {
                          displayRemark = null; // No previous remark to show
                        }
                      }
                    }
                    // --- MODIFICATION END ---

                    // Note: The original 'log' is passed to the modal, so full history is always available there.
                    // The engineer view logic is now applied to a copy to not affect the modal data.
                    let engineerViewLog = [...log];
                    if (userInfo.data.Designation === "engineer") {
                      engineerViewLog.splice(0, engineerViewLog.length - 1);
                    }
                    
                    return (
                      <StyledTableRow key={b}>
                        {canChange && (
                          <StyledTableCell align="center">
                            <CheckBox
                              {...checkboxLabel}
                              size="small"
                              checked={selectedRows.includes(a)}
                              onChange={(e) => handleCheck(e, a)}
                            />
                          </StyledTableCell>
                        )}
                        {query === "Rejected" ? (
                          ""
                        ) : (
                          <StyledTableCell sx={{ paddingY: 1 }} align="center">
                            <Button
                              onClick={() =>
                                handlePdfDownload(
                                  a.challanNumber,
                                  a.ProductionToStore
                                )
                              }
                              sx={{ fontSize: 10 }}
                              variant="contained"
                            >
                              Download Pdf
                            </Button>
                          </StyledTableCell>
                        )}

                        <StyledTableCell sx={{ paddingY: 1 }} align="center">
                          {a.Category}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {a.Meter_Serial_No}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {a.Job_Card_No}
                        </StyledTableCell>
                        {userInfo.data.Designation === "engineer" && (
                          <StyledTableCell align="center">
                            {a.IssueForEngineer}
                          </StyledTableCell>
                        )}
                        <StyledTableCell align="center">
                          {a.challanNumber}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          onClick={() => handleRemarkClick(log)} // Pass the original full log to the modal
                          className="cursor-pointer"
                        >
                          {/* Render the determined displayRemark */}
                          {displayRemark
                            ? `Date: ${displayRemark.date}, Remark: ${displayRemark.remark}`
                            : "No relevant remarks"}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedRows.length ? (
          <p
            onClick={handleOpenModal}
            className="fixed cursor-pointer bottom-10 right-10 "
          >
            <Badge color="primary" badgeContent={selectedRows.length}>
              <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
            </Badge>
          </p>
        ) : (
          ""
        )}
      </div>
      {modalProps.open && (
        <RemarkModal
          setSelectedRows={setSelectedRows}
          setModalProps={setModalProps}
          modalProps={modalProps}
          api={api}
        />
      )}
      {openModal && (
        <ExchangeProduct
          data={data}
          api={api}
          openModal={openModal}
          setOpenModal={setOpenModal}
          exchangeableProductListQuery={exchangeableProductListQuery}
          exchangeUpdatedQuery={exchangeUpdatedQuery}
        />
      )}
      <Dialog
        open={remarkModalOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>All Remarks</DialogTitle>
        <DialogContent>
          {selectedRemarks?.map((log, index) => (
            <p key={index} className="mt-2">
              <strong>Date:</strong> {log.date} <br />
              <strong>Remark:</strong> {log.remark}
            </p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button> 
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default UnapprovedTable;