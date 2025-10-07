// import React, { useState, useEffect, Fragment, useContext } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import CheckBox from "@mui/material/Checkbox";
// import { Badge, Button } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// import { useNavigate } from "react-router-dom";
// import EngineerAcceptModal from "./ToolStoreToEngineer/EngineerAcceptModal";
// import { DataContext } from "./context/DataProvider";
// import secureLocalStorage from "react-secure-storage";
// // import { downloadPdfApi } from "./api";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: "#b80f768f",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
// const UnapproveTable = ({
//   data = [],
//   userInfo = {},
//   check,
//   canChange,
//   api,
//   query,
//   downloadUrl,
//   tool,
// }) => {
//   const navigate = useNavigate();
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [search, setSearch] = useState(""); // State to keep track of selected rows
//   // const [searchChallan, setSearchChallan] = useState(""); // State to keep track of selected rows
//   const {searchChallan } = useContext(DataContext);
//   const user = JSON.parse(secureLocalStorage.getItem("info")).data;
//   const [modalProps, setModalProps] = useState({
//     open: false,
//     data: [],
//     title: "unapproved",
//     check: check,
//     userInfo,
//   });
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
//     // const url = `${downloadUrl}/${challanNumber}?type=${query}`;
//     // window.open(url, "_blank");
//     navigate(`${downloadUrl}/${challanNumber}?type=${query}`)
//   };

//   return (
//     <Fragment>
//       <div className="w-full h-[75vh] overflow-scroll">
//         <div className="ml-2 mb-1">
//           <input
//             name="SerialNumber"
//             onChange={(e) => setSearch(e.target.value)}
//             className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//             placeholder="Serial Number"
//           />

//         </div>

//         <TableContainer sx={{ paddingY: 0, maxHeight: 380 }} component={Paper}>
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

//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                    PDF
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                   challan No.
//                 </StyledTableCell>
//                 {
//                   user.Designation==="storekeeper" &&
//                   <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                 Name
//                 </StyledTableCell>
//                 }

//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                   Tool Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                   SerialNumber
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 100 }}
//                   align="center"
//                 >
//                   Remark
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
// <TableBody>
//   {data[0]
//     ?.filter((item) =>
//       item.SerialNumber?.toString()
//         .toLowerCase()
//         .includes(search?.toLowerCase())
//     )
//     ?.filter((item) =>
//       item.challanNumber?.toString()
//         .toLowerCase()
//         .includes(searchChallan?.toLowerCase())
//     )
//     .map((a, b) => {
//       const log = JSON.parse(a.ActivityLog);

//       return (
//         <StyledTableRow key={b}>
//           {canChange && (
//             <StyledTableCell align="center">
//               <CheckBox
//                 {...checkboxLabel}
//                 size="small"
//                 checked={selectedRows.includes(a)}
//                 onChange={(e) => handleCheck(e, a)}
//               />
//             </StyledTableCell>
//           )}

//           <StyledTableCell sx={{ paddingY: 1 }} align="center">

//           <Button variant="contained"
//           onClick={()=>handlePdfDownload(a?.challanNumber)}
//           > Pdf</Button>

//           </StyledTableCell>
//           <StyledTableCell sx={{ paddingY: 1 }} align="center">

//               {
//                a?.challanNumber?.toString()
//               }
//           </StyledTableCell>
//           {
//             user.Designation==="storekeeper" &&
//             <StyledTableCell sx={{ paddingY: 1 }} align="center">

//               {
//                a?.Name
//               }
//           </StyledTableCell>
//           }

//           <StyledTableCell sx={{ paddingY: 1 }} align="center">
//             {/* {userInfo.data.Designation === "storekeeper"
//               ? tool?.ToolName
//               : a.ToolName} */}
//               {
//                 tool?.ToolName
//               }
//           </StyledTableCell>
//           <StyledTableCell align="center">
//             {a.SerialNumber}
//           </StyledTableCell>
//           <StyledTableCell align="center">
//             {log.map((a, b) => {
//               return (
//                 <p key={b} className="space-x-3">
//                   <span>Date: {a?.date}</span>
//                   <span>Remark: {a?.remark}</span>
//                 </p>
//               );
//             })}
//           </StyledTableCell>
//         </StyledTableRow>
//       );
//     })}
// </TableBody>
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
//         <EngineerAcceptModal
//           setSelectedRows={setSelectedRows}
//           setModalProps={setModalProps}
//           modalProps={modalProps}
//           tool={tool}
//           api={api}
//           selectedRows={selectedRows}

//         />
//       )}
//     </Fragment>
//   );
// };

// export default UnapproveTable;
import React, { useState, useEffect, Fragment, useContext } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useNavigate } from "react-router-dom";
import EngineerAcceptModal from "./ToolStoreToEngineer/EngineerAcceptModal";
import { DataContext } from "./context/DataProvider";
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UnapproveTable = ({
  data = [],
  userInfo = {},
  check,
  canChange,
  api,
  query,
  downloadUrl,
  tool,
}) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const { searchChallan } = useContext(DataContext);
  const user = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [modalProps, setModalProps] = useState({
    open: false,
    data: [],
    title: "unapproved",
    check: check,
    userInfo,
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

  // const handlePdfDownload = (challanNumber) => {
  //   navigate(`${downloadUrl}/${challanNumber}?type=${query}`);
  // };
  const handlePdfDownload = (challanNumber) => {
    const url = `${downloadUrl}/${challanNumber}?type=${query}`;
    window.open(url, "_blank"); // Opens in a new tab
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
      <div className="w-full h-[75vh] overflow-scroll">
        <div className="ml-2 mb-1">
          <input
            name="SerialNumber"
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 py-2 px-5 w-full max-w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          />
        </div>

        <TableContainer
          sx={{ paddingY: 0, maxHeight: 380, overflowX: "auto" }}
          component={Paper}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {canChange && (
                  <StyledTableCell
                    sx={{ paddingX: 0, minWidth: 100 }}
                    align="center"
                  >
                    Options
                  </StyledTableCell>
                )}

                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  PDF
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  challan No.
                </StyledTableCell>
                {user.Designation === "storekeeper" && (
                  <StyledTableCell
                    sx={{ paddingX: 0, minWidth: 100 }}
                    align="center"
                  >
                    Name
                  </StyledTableCell>
                )}

                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Tool Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  SerialNumber
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Remark
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data[0]
                ?.filter((item) =>
                  item.SerialNumber?.toString()
                    .toLowerCase()
                    .includes(search?.toLowerCase())
                )
                ?.filter((item) =>
                  item.challanNumber
                    ?.toString()
                    .toLowerCase()
                    .includes(searchChallan?.toLowerCase())
                )
                .map((a, b) => {
                  // let log = [
                  //   {
                  //     date: "12-12-2000",
                  //     remark: "Error while parsing Activity Log",
                  //   },
                  // ];
                  // try {
                  //   log = JSON.parse(a.ActivityLog);
                  // } catch (error) {
                  //   console.log("error", error);
                  // }
                  let logs = [];

                  if (a?.ActivityLog) {
                    try {
                      logs = JSON.parse(a.ActivityLog) || [];
                    } catch (error) {
                      logs = [{ date: "12-12-1212", remark: "Null" }];
                    }
                  } else {
                    logs = [{ date: "12-12-1212", remark: "Null" }];
                  }

                  // Get the last remark safely
                  const lastRemark = logs.length ? logs[logs.length - 1] : null;

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

                      <StyledTableCell sx={{ paddingY: 1 }} align="center">
                        <Button
                          variant="contained"
                          onClick={() => handlePdfDownload(a?.challanNumber)}
                        >
                          {" "}
                          Pdf
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell sx={{ paddingY: 1 }} align="center">
                        {a?.challanNumber?.toString()}
                      </StyledTableCell>
                      {user.Designation === "storekeeper" && (
                        <StyledTableCell sx={{ paddingY: 1 }} align="center">
                          {a?.Name}
                        </StyledTableCell>
                      )}

                      <StyledTableCell sx={{ paddingY: 1 }} align="center">
                        {/* {userInfo.data.Designation === "storekeeper"
                          ? tool?.ToolName
                          : a.ToolName} */}
                        {tool?.ToolName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {a.SerialNumber}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className="cursor-pointer text-blue-600 "
                        onClick={() => handleRemarkClick(logs)}
                      >
                        {/* {log.map((a, b) => {
                          return (
                            <p key={b} className="space-x-3">
                              <span>Date: {a?.date}</span>
                              <span>Remark: {a?.remark}</span>
                            </p>
                          );
                        })} */}
                        {lastRemark
                          ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}`
                          : "No Remarks"}
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
            className="fixed cursor-pointer bottom-10 right-10"
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
        <EngineerAcceptModal
          setSelectedRows={setSelectedRows}
          setModalProps={setModalProps}
          modalProps={modalProps}
          tool={tool}
          api={api}
          selectedRows={selectedRows}
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

export default UnapproveTable;
