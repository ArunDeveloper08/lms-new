// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import secureLocalStorage from "react-secure-storage";
// import SendIcon from "@mui/icons-material/Send";
// import {
//   Badge,
//   Button,
//   Table,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";

// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import Paper from "@mui/material/Paper";

// import SendEngineerModal from "./SendEngineerModal";
// import { getTotalToolsCountAsync } from "../../redux/actions";
// import { useDispatch } from "react-redux";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#191818",
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
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const EngineerTool = ({ tool }) => {
//   const [open, setOpen] = useState(false);
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
//   const [data, setData] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [challanNumber , setChallanNumber] = useState("")

//   const [badgeCount, setBadgeCount] = useState(0);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     axios
//       .post(
//         `${window.MyApiRoute}tool/get?Employee_Id=${userInfo?.Employee_Id}&location=engineer&ToolID=${tool?.id}`,
//         userInfo
//       )
//       .then((res) => {
//         setData(res.data.data);
//         dispatch(getTotalToolsCountAsync(tool?.id));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [tool, open]);

//   const handleCheck = (e, item) => {
//     setChallanNumber(item.challanNumber)
//     const isChecked = e.target.checked;

//     setChecked((prevChecked) => {
//       if (isChecked) {
//         return [...prevChecked, item.SerialNumber ];
//       } else {
//         return prevChecked.filter((serial) => serial !== item.SerialNumber);
//       }
//     });
 
//     const newBadgeCount = isChecked ? badgeCount + 1 : badgeCount - 1;
//     setBadgeCount(newBadgeCount);
//   };

//   const handleOpenModal = () => {
//     setBadgeCount(0);
//     setOpen(true);
//   };

//   return (
//     <div>
//       <div className="flex justify-center">
//         <p className="font-bold bg-blue-600 text-white text-lg px-5 py-1 rounded-sm">
//           {tool?.ToolName}
//         </p>
//       </div>
//       <>
//         <TableContainer sx={{ marginY: 4, marginX: 1 }} component={Paper}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {
//                   userInfo.Designation==="engineer" && 
//                   <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 200 }}
//                   align="center"
//                 >
//                   Option
//                 </StyledTableCell>
//                 }
             

//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 200 }}
//                   align="center"
//                 >
//                   Tool Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 200 }}
//                   align="center"
//                 >
//                   Challan Number
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 200 }}
//                   align="center"
//                 >
//                   Serial Number
//                 </StyledTableCell>

//                 <StyledTableCell
//                   sx={{ paddingX: 0, minWidth: 200 }}
//                   align="center"
//                 >
//                   Remark
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data[0]?.map((item, index) => {
//                 const remarks = JSON.parse(item?.ActivityLog);
//                 return (
//                   <StyledTableRow key={index}>
//                     {
//                       userInfo.Designation==="engineer" &&
//                       <StyledTableCell align="center">
//                       <input
//                         className="cursor-pointer px-2"
//                         checked={checked?.includes(item?.SerialNumber)}
//                         onChange={(e) => handleCheck(e, item)}
//                         type="checkbox"
//                       />
//                     </StyledTableCell>
//                     }
                

//                     <StyledTableCell align="center">
//                       {item?.ToolName}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {item?.challanNumber}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {item?.SerialNumber}
//                     </StyledTableCell>

//                     <StyledTableCell align="center">
//                       {remarks?.map((a, b) => {
//                         return (
//                           <p key={b} className="space-x-3">
//                             <span>Date: {a?.date}</span>
//                             <span>Remark: {a?.remark}</span>
//                           </p>
//                         );
//                       })}
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </>

//       {badgeCount > 0 && tool?.id && (
//         <p className="fixed cursor-pointer bottom-10 right-10">
//           <Badge
//             color="primary"
//             badgeContent={badgeCount}
//             onClick={handleOpenModal}
//           >
//             <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
//           </Badge>
//         </p>
//       )}
//       <SendEngineerModal
//         open={open}
//         setOpen={setOpen}
//         checked={checked}
//         challanNumber={challanNumber}
//         tool={tool}
//         setBadgeCount={setBadgeCount}
//       />
//     </div>
//   );
// };
// export default EngineerTool;
import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import SendIcon from "@mui/icons-material/Send";
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Modal,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { getTotalToolsCountAsync } from "../../redux/actions";
import SendEngineerModal from "./SendEngineerModal";

// Define a custom theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
    },
  },
});

// Styled components with theme access
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#191818",
    color: "#ffffff",
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
      padding: "8px 4px",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
      padding: "6px 4px",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#b80f768f",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#f9fafb",
    },
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  p: 3,
  overflowY: "auto",
  borderRadius: 3,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "95%",
    p: 2,
    borderRadius: 2,
  },
};

const RemarksModal = ({ open, onClose, remarks }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="remarks-modal-title">
      <Box sx={modalStyle}>
        <Typography
          id="remarks-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 600,
            color: "#1f2937",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          All Remarks
        </Typography>
        {remarks?.length > 0 ? (
          remarks.map((remark, index) => (
            <Box key={index} sx={{ mb: 2, borderBottom: "1px solid #e5e7eb", pb: 1 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                <strong>Date:</strong> {remark.date}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                <strong>Remark:</strong> {remark.remark}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            No remarks available.
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 2,
            width: "100%",
            bgcolor: "#1f2937",
            "&:hover": { bgcolor: "#374151" },
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const EngineerTool = ({ tool }) => {
  const [open, setOpen] = useState(false);
  const [remarksModalOpen, setRemarksModalOpen] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState([]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"))?.data;
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [challanNumber, setChallanNumber] = useState("");
  const [badgeCount, setBadgeCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}tool/get?Employee_Id=${userInfo?.Employee_Id}&location=engineer&ToolID=${tool?.id}`,
        userInfo
      )
      .then((res) => {
        setData(res.data.data);
        dispatch(getTotalToolsCountAsync(tool?.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tool, open]);

  const handleCheck = (e, item) => {
    setChallanNumber(item.challanNumber);
    const isChecked = e.target.checked;

    setChecked((prevChecked) => {
      if (isChecked) {
        return [...prevChecked, item.SerialNumber];
      } else {
        return prevChecked.filter((serial) => serial !== item.SerialNumber);
      }
    });

    const newBadgeCount = isChecked ? badgeCount + 1 : badgeCount - 1;
    setBadgeCount(newBadgeCount);
  };

  const handleOpenModal = () => {
    setBadgeCount(0);
    setOpen(true);
  };

  const handleOpenRemarksModal = (remarks) => {
    setSelectedRemarks(remarks);
    setRemarksModalOpen(true);
  };

  const handleCloseRemarksModal = () => {
    setRemarksModalOpen(false);
    setSelectedRemarks([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
        <div className="flex justify-center mb-4">
          <p className="font-bold bg-blue-600 text-white  py-1 rounded-sm sm:bg-blue-600 sm:text-lg sm:px-5 sm:py-1 bg-gradient-to-r from-blue-700 to-blue-500 text-sm px-4">
            {tool?.ToolName}
          </p>
        </div>
        <TableContainer
          sx={{
            marginY: 4,
            marginX: { xs: 0, sm: 1 },
            boxShadow: { xs: "0 2px 8px rgba(0, 0, 0, 0.1)", sm: "none" },
            borderRadius: { xs: 2, sm: 0 },
          }}
          component={Paper}
        >
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: { xs: 600, sm: 0 } }}>
            <TableHead>
              <TableRow>
                {userInfo.Designation === "engineer" && (
                  <StyledTableCell sx={{ paddingX: 1, minWidth: { xs: 60, sm: 80 } }} align="center">
                    Option
                  </StyledTableCell>
                )}
                <StyledTableCell sx={{ paddingX: 1, minWidth: { xs: 100, sm: 120 } }} align="center">
                  Tool Name
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 1, minWidth: { xs: 100, sm: 120 } }} align="center">
                  Challan Number
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 1, minWidth: { xs: 100, sm: 120 } }} align="center">
                  Serial Number
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 1, minWidth: { xs: 120, sm: 150 } }} align="center">
                  Remark
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.[0]?.map((item, index) => {
                const remarks = JSON.parse(item?.ActivityLog || "[]");
                const lastRemark = remarks[remarks.length - 1];
                return (
                  <StyledTableRow key={index}>
                    {userInfo.Designation === "engineer" && (
                      <StyledTableCell align="center">
                        <input
                          className="cursor-pointer scale-125"
                          checked={checked?.includes(item?.SerialNumber)}
                          onChange={(e) => handleCheck(e, item)}
                          type="checkbox"
                        />
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="center">{item?.ToolName}</StyledTableCell>
                    <StyledTableCell align="center">{item?.challanNumber}</StyledTableCell>
                    <StyledTableCell align="center">{item?.SerialNumber}</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ cursor: remarks.length > 0 ? "pointer" : "default" }}
                      onClick={() => remarks.length > 0 && handleOpenRemarksModal(remarks)}
                    >
                      {lastRemark ? (
                        <p className="text-xs sm:text-sm">
                          <span>Date: {lastRemark.date}</span>
                          <br />
                          <span>Remark: {lastRemark.remark}</span>
                        </p>
                      ) : (
                        "-"
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {badgeCount > 0 && tool?.id && (
          <p className="fixed bottom-4 right-4 sm:bottom-4 sm:right-4 transition-transform hover:scale-110">
            <Badge
              color="primary"
              badgeContent={badgeCount}
              onClick={handleOpenModal}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  height: { xs: 20, sm: 22 },
                  minWidth: { xs: 20, sm: 22 },
                },
              }}
            >
              <SendIcon sx={{ color: "#1976d2", fontSize: { xs: 48, sm: 40 } }} />
            </Badge>
          </p>
        )}
        <SendEngineerModal
          open={open}
          setOpen={setOpen}
          checked={checked}
          challanNumber={challanNumber}
          tool={tool}
          setBadgeCount={setBadgeCount}
        />
        <RemarksModal
          open={remarksModalOpen}
          onClose={handleCloseRemarksModal}
          remarks={selectedRemarks}
        />
      </div>
    </ThemeProvider>
  );
};

export default EngineerTool;