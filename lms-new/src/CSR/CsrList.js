

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useNavigate } from "react-router-dom";
// import { Button, Typography, Pagination } from "@mui/material";
// import secureLocalStorage from "react-secure-storage";
// import { mainRoute } from "../App";

// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// };

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     background: "linear-gradient(to right, #1a3c34, #2e5e54)",
//     color: theme.palette.common.white,
//     fontFamily: "'Playfair Display', 'Georgia', serif",
//     fontSize: "0.9rem",
//     padding: "8px 4px",
//     [theme.breakpoints.down("sm")]: {
//       fontSize: "0.75rem",
//       padding: "6px 2px",
//     },
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: "0.85rem",
//     padding: "6px 4px",
//     [theme.breakpoints.down("sm")]: {
//       fontSize: "0.7rem",
//       padding: "4px 2px",
//     },
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: "#f5f0e1",
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
//   "&:hover": {
//     backgroundColor: "#e8e1c9",
//   },
// }));

// const CsrList = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [meterSerialNo, setMeterSerialNo] = useState("");
//   const [csrNo, setCsrNo] = useState("");
//   const [address, setAddress] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [submittedStartDate, setSubmittedStartDate] = useState("");
//   const [submittedEndDate, setSubmittedEndDate] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const a = JSON.parse(secureLocalStorage.getItem("info"));

//   const debouncedMeterSerialNo = useDebounce(meterSerialNo, 300);
//   const debouncedCsrNo = useDebounce(csrNo, 300);
//   const debouncedAddress = useDebounce(address, 300);

//   // Reset page to 1 when non-date filters change
//   useEffect(() => {
//     setPage(1);
//   }, [debouncedMeterSerialNo, debouncedCsrNo, debouncedAddress]);

//   // Handle date filter submission
//   const handleDateSubmit = (e) => {
//     e.preventDefault();
//     setSubmittedStartDate(startDate);
//     setSubmittedEndDate(endDate);
//     setPage(1); // Reset page to 1 on date submission
//   };

//   // Fetch data when filters or page change
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${window.MyApiRoute}report`, {
//           params: {
//             Employee_Id: a.data.Employee_Id,
//             MeterSerialNo: debouncedMeterSerialNo,
//             CSr_NO: debouncedCsrNo,
//             Address: debouncedAddress,
//             startDate: submittedStartDate,
//             endDate: submittedEndDate,
//             page,
//             limit: 100,  
//           },
//         });
//         setData(res.data);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(
//           err.response?.data?.error ||
//             "Failed to load data. Please try again later."
//         );
//         setData({ message: [] });
//       }
//     };

//     fetchData();
//   }, [
//     debouncedMeterSerialNo,
//     debouncedCsrNo,
//     debouncedAddress,
//     submittedStartDate,
//     submittedEndDate,
//     page,
//     a.data.Employee_Id,
//   ]);

//   const handleEdit = (row, index) => {
//     navigate(`${mainRoute}/csrEdit`, { state: row });
//   };

//   const handlePDF = (data) => {
//     const csrNo = data.CSr_NO;
//     const url = `${mainRoute}/csrformdownload?csr=${csrNo}`;
//     window.open(url, "_blank");
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   if (data === null && !error) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
//         }}
//       >
//         <CircularProgress sx={{ color: "#1a3c34" }} />
//         <Typography
//           sx={{
//             mt: 2,
//             fontFamily: "'Playfair Display', 'Georgia', serif",
//             color: "#1a3c34",
//           }}
//         >
//           Loading Data...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: "'Playfair Display', 'Georgia', serif",
//             color: "#d32f2f",
//           }}
//         >
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
//         minHeight: "100vh",
//         p: { xs: 1, sm: 2 },
//       }}
//     >
//       {/* <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           p: { xs: 1, sm: 2 },
//           backgroundColor: "#fff",
//           borderRadius: "8px",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//           mb: 2,
//           gap: 1,
//         }}
//       >
//         <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
//           <input
//             name="MeterSerialNo"
//             onChange={(e) => setMeterSerialNo(e.target.value)}
//             value={meterSerialNo}
//             className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             placeholder="Meter Serial No"
//             style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}
//           />
//         </Box>
//         <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
//           <input
//             name="CSr_NO"
//             onChange={(e) => setCsrNo(e.target.value)}
//             value={csrNo}
//             className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             placeholder="CSR No"
//             style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}
//           />
//         </Box>
//         <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
//           <input
//             name="Address"
//             onChange={(e) => setAddress(e.target.value)}
//             value={address}
//             className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             placeholder="Address"
//             style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}
//           />
//         </Box>
//         <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
//           <input
//             type="date"
//             name="startDate"
//             onChange={(e) => setStartDate(e.target.value)}
//             value={startDate}
//             className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             placeholder="Start Date"
//             style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}
//           />
//         </Box>
//         <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
//           <input
//             type="date"
//             name="endDate"
//             onChange={(e) => setEndDate(e.target.value)}
//             value={endDate}
//             className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             placeholder="End Date"
//             style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}
//           />
//         </Box>
//         <Box
//           sx={{
//             width: { xs: "100%", sm: "300px" },
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <Button
//             variant="contained"
//             onClick={handleDateSubmit}
//             sx={{
//               background: "linear-gradient(to right, #1a3c34, #2e5e54)",
//               color: "#fff",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               "&:hover": {
//                 background: "linear-gradient(to right, #2e5e54, #1a3c34)",
//               },
//               fontFamily: "'Roboto', 'Helvetica', sans-serif",
//               fontSize: { xs: "0.8rem", sm: "0.875rem" },
//               padding: { xs: "6px 12px", sm: "8px 16px" },
//               width: "100%",
//             }}
//           >
//             Submit
//           </Button>
//             <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
        
        
//           <p  className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
           
//             style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}>
            
//             Total Report : {data?.totalRecords}
//             </p> 
          
//         </Box>
//         </Box>
//       </Box> */}

//       <Box
//   sx={{
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: { xs: "center", sm: "space-between" },
//     p: { xs: 1, sm: 2 },
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     mb: 2,
//     gap: { xs: 1, sm: 2 },
//   }}
// >
//   <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 400px)" } }}>
//     <input
//       name="MeterSerialNo"
//       onChange={(e) => setMeterSerialNo(e.target.value)}
//       value={meterSerialNo}
//       className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//       placeholder="Meter Serial No"
//       style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
//     />
//   </Box>
//   <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 400px)" } }}>
//     <input
//       name="CSr_NO"
//       onChange={(e) => setCsrNo(e.target.value)}
//       value={csrNo}
//       className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//       placeholder="CSR No"
//       style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
//     />
//   </Box>
//   <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 400px)" } }}>
//     <input
//       name="Address"
//       onChange={(e) => setAddress(e.target.value)}
//       value={address}
//       className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//       placeholder="Address"
//       style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
//     />
//   </Box>
//   <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 400px)" } }}>
//     <input
//       type="date"
//       name="startDate"
//       onChange={(e) => setStartDate(e.target.value)}
//       value={startDate}
//       className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//       placeholder="Start Date"
//       style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
//     />
//   </Box>
//   <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 400px)" } }}>
//     <input
//       type="date"
//       name="endDate"
//       onChange={(e) => setEndDate(e.target.value)}
//       value={endDate}
//       className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//       placeholder="End Date"
//       style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
//     />
//   </Box>
//   <Box
//     sx={{
//       width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 400px)" },
//       display: "flex",
//       alignItems: "center",
//     }}
//   >
//     <Button
//       variant="contained"
//       onClick={handleDateSubmit}
//       sx={{
//         background: "linear-gradient(to right, #1a3c34, #2e5e54)",
//         color: "#fff",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         "&:hover": {
//           background: "linear-gradient(to right, #2e5e54, #1a3c34)",
//         },
//         fontFamily: "'Roboto', 'Helvetica', sans-serif",
//         fontSize: { xs: "0.75rem", sm: "0.875rem" },
//         padding: { xs: "6px 12px", sm: "8px 16px" },
//         width: "100%",
//       }}
//     >
//       Submit
//     </Button>
//   </Box>
//   <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 400px)" } }}>
//     <Box
//       className=" py-1.5 px-4 w-full  "
//       sx={{
//         fontFamily: "'Roboto', 'Helvetica', sans-serif",
//         fontSize: { xs: "0.75rem", sm: "0.875rem" },
//         display: "flex",
//         alignItems: "center",
//         color: "#374151", // Matches input text color (gray-700)
//       }}
//     >
//       Total Report: {data?.totalRecords}
//     </Box>
//   </Box>
// </Box>

//       {data?.message?.length === 0 ? (
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "70vh",
//             backgroundColor: "#fff",
//             borderRadius: "8px",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//           }}
//         >
//           <Typography
//             sx={{
//               fontFamily: "'Playfair Display', 'Georgia', serif",
//               color: "#1a3c34",
//               fontSize: "1.2rem",
//             }}
//           >
//             No Data Available
//           </Typography>
//         </Box>
//       ) : (
//         <>
//           <Box sx={{ display: { xs: "none", md: "block" } }}>
//             <TableContainer
//               component={Paper}
//               sx={{
//                 maxHeight: "70vh",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Table stickyHeader aria-label="customized table">
//                 <TableHead>
//                   <TableRow>
//                     <StyledTableCell
//                       align="center"
//                       sx={{
//                         minWidth: 80,
//                         position: "sticky",
//                         left: 0,
//                         zIndex: 100,
//                         background:
//                           "linear-gradient(to right, #1a3c34, #2e5e54)",
//                       }}
//                     >
//                       Sr No.
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 100 }}>
//                       Edit
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 100 }}>
//                       PDF
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 120 }}>
//                       Meter Id
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 150 }}>
//                       Customer Name
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 150 }}>
//                       Employee Name
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 130 }}>
//                       Customer Mobile No.
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 100 }}>
//                       Flat No
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 100 }}>
//                       Address
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 180 }}>
//                       Complaint Reported By CRM
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 200 }}>
//                       Problem Identified By Service Engineer
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 180 }}>
//                       Problem Rectified By Service Engineer
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 180 }}>
//                       Attended Engineer Remarks
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 200 }}>
//                       Customer Remarks
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ minWidth: 150 }}>
//                       Date & Time
//                     </StyledTableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {data?.message?.map((row, index) => (
//                     <StyledTableRow key={index}>
//                       <StyledTableCell
//                         align="center"
//                         sx={{
//                           position: "sticky",
//                           left: 0,
//                           zIndex: 50,
//                           backgroundColor: "#f5f0e1",
//                         }}
//                       >
//                         {row.CSr_NO || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         <Button
//                           variant="contained"
//                           onClick={() => handleEdit(row, index)}
//                           sx={{
//                             background:
//                               "linear-gradient(to right, #1a3c34, #2e5e54)",
//                             color: "#fff",
//                             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                             "&:hover": {
//                               background:
//                                 "linear-gradient(to right, #2e5e54, #1a3c34)",
//                             },
//                             fontSize: { xs: "0.7rem", md: "0.875rem" },
//                             padding: { xs: "4px 8px", md: "6px 12px" },
//                           }}
//                         >
//                           Edit
//                         </Button>
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         <Button
//                           variant="contained"
//                           onClick={() => handlePDF(row)}
//                           sx={{
//                             background:
//                               "linear-gradient(to right, #d4af37, #b8972e)",
//                             color: "#fff",
//                             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                             "&:hover": {
//                               background:
//                                 "linear-gradient(to right, #b8972e, #d4af37)",
//                             },
//                             fontSize: { xs: "0.7rem", md: "0.875rem" },
//                             padding: { xs: "4px 8px", md: "6px 12px" },
//                           }}
//                         >
//                           PDF
//                         </Button>
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.MeterSerialNo || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.Customer_Name || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.EmployeeName || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.MobileNo || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.FlatNo || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.Address || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.ComplaintReportedBy || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.ProblemIdentifiedByServiceEngineer || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.ProblemRectifiedByServiceEngineer || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.AttendedEngineerRemarks || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {row.CustomerRemarks || "-"}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {new Date(row.createdAt).toLocaleString()}
//                       </StyledTableCell>
//                     </StyledTableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={handlePageChange}
//                 sx={{
//                   "& .MuiPaginationItem-root": {
//                     fontFamily: "'Roboto', 'Helvetica', sans-serif",
//                     color: "#1a3c34",
//                   },
//                   "& .Mui-selected": {
//                     background: "linear-gradient(to right, #1a3c34, #2e5e54)",
//                     color: "#fff",
//                   },
//                 }}
//               />
//             </Box>
//           </Box>

//           <Box sx={{ display: { xs: "block", md: "none" }, p: 1 }}>
//             {data?.message?.map((row, index) => (
//               <Paper
//                 key={index}
//                 sx={{
//                   mb: 1,
//                   p: 1.5,
//                   borderRadius: "8px",
//                   backgroundColor: "#f5f0e1",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontFamily: "'Playfair Display', 'Georgia', serif",
//                     fontSize: "0.9rem",
//                     fontWeight: "bold",
//                     color: "#1a3c34",
//                     mb: 1,
//                   }}
//                 >
//                   Sr No: {row.CSr_NO || "-"}
//                 </Typography>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Meter ID:</strong> {row.MeterSerialNo || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Customer:</strong> {row.Customer_Name || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Employee:</strong> {row.EmployeeName || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Mobile No:</strong> {row.MobileNo || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Flat No:</strong> {row.FlatNo || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Address:</strong> {row.Address || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Complaint:</strong> {row.ComplaintReportedBy || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Problem Identified:</strong>{" "}
//                     {row.ProblemIdentifiedByServiceEngineer || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Problem Rectified:</strong>{" "}
//                     {row.ProblemRectifiedByServiceEngineer || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Engineer Remarks:</strong>{" "}
//                     {row.AttendedEngineerRemarks || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Customer Remarks:</strong>{" "}
//                     {row.CustomerRemarks || "-"}
//                   </Typography>
//                   <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
//                     <strong>Date:</strong>{" "}
//                     {new Date(row.createdAt).toLocaleString()}
//                   </Typography>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     gap: 1,
//                     mt: 1,
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   <Button
//                     variant="contained"
//                     onClick={() => handleEdit(row, index)}
//                     sx={{
//                       background: "linear-gradient(to right, #1a3c34, #2e5e54)",
//                       color: "#fff",
//                       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                       "&:hover": {
//                         background:
//                           "linear-gradient(to right, #2e5e54, #1a3c34)",
//                       },
//                       fontSize: "0.7rem",
//                       padding: "4px 8px",
//                     }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="contained"
//                     onClick={() => handlePDF(row)}
//                     sx={{
//                       background: "linear-gradient(to right, #d4af37, #b8972e)",
//                       color: "#fff",
//                       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                       "&:hover": {
//                         background:
//                           "linear-gradient(to right, #b8972e, #d4af37)",
//                       },
//                       fontSize: "0.7rem",
//                       padding: "4px 8px",
//                     }}
//                   >
//                     PDF
//                   </Button>
//                 </Box>
//               </Paper>
//             ))}
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={handlePageChange}
//                 sx={{
//                   "& .MuiPaginationItem-root": {
//                     fontFamily: "'Roboto', 'Helvetica', sans-serif",
//                     color: "#1a3c34",
//                   },
//                   "& .Mui-selected": {
//                     background: "linear-gradient(to right, #1a3c34, #2e5e54)",
//                     color: "#fff",
//                   },
//                 }}
//               />
//             </Box>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default CsrList;
import axios from "axios";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Pagination, Select, MenuItem, FormControl, InputLabel } from "@mui/material"; // Added Select, MenuItem, FormControl, InputLabel
import secureLocalStorage from "react-secure-storage";
import { mainRoute } from "../App";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(to right, #1a3c34, #2e5e54)",
    color: theme.palette.common.white,
    fontFamily: "'Playfair Display', 'Georgia', serif",
    fontSize: "0.9rem",
    padding: "8px 4px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
      padding: "6px 2px",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.85rem",
    padding: "6px 4px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
      padding: "4px 2px",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f0e1",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#e8e1c9",
  },
}));

const CsrList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [meterSerialNo, setMeterSerialNo] = useState("");
  const [csrNo, setCsrNo] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submittedStartDate, setSubmittedStartDate] = useState("");
  const [submittedEndDate, setSubmittedEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // New state for status filter
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const a = JSON.parse(secureLocalStorage.getItem("info"));

  const debouncedMeterSerialNo = useDebounce(meterSerialNo, 300);
  const debouncedCsrNo = useDebounce(csrNo, 300);
  const debouncedAddress = useDebounce(address, 300);

  // Reset page to 1 when non-date/status filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedMeterSerialNo, debouncedCsrNo, debouncedAddress, statusFilter]); // Added statusFilter here

  // Handle date filter submission
  const handleDateSubmit = (e) => {
    e.preventDefault();
    setSubmittedStartDate(startDate);
    setSubmittedEndDate(endDate);
    setPage(1); // Reset page to 1 on date submission
  };

  // Fetch data when filters or page change
  const fetchData = async () => {
    try {
      const res = await axios.get(`${window.MyApiRoute}report`, {
        params: {
          Employee_Id: a.data.Employee_Id,
          MeterSerialNo: debouncedMeterSerialNo,
          CSr_NO: debouncedCsrNo,
          Address: debouncedAddress,
          startDate: submittedStartDate,
          endDate: submittedEndDate,
          status: statusFilter, // Pass the status filter to the API
          page,
          limit: 100,
        },
      });
      setData(res.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err.response?.data?.error ||
          "Failed to load data. Please try again later."
      );
      setData({ message: [] });
    }
  };
  useEffect(() => {

    fetchData();
  }, [
    debouncedMeterSerialNo,
    debouncedCsrNo,
    debouncedAddress,
    submittedStartDate,
    submittedEndDate,
    statusFilter, // Added statusFilter to dependency array
    page,
    a.data.Employee_Id,
  ]);

  const handleEdit = (row) => {
    navigate(`${mainRoute}/csrEdit`, { state: row });
  };

  const handlePDF = (data) => {
    const csrNo = data.CSr_NO;
    const url = `${mainRoute}/csrformdownload?csr=${csrNo}`;
    window.open(url, "_blank");
  };

  const handleCloseComplaint = async (row) => {
    if (window.confirm(`Are you sure you want to close complaint #${csrNo}?`)) {
      const { Status, ...rowWithoutStatus } = row;
      try {
        const res = await axios.put(`${window.MyApiRoute}report`, {
            ...rowWithoutStatus,
        Employee_Id: a.Employee_Id,
        name: a.name,
        Status: "Close"
        });
        if (res) {
          alert(`Complaint #${csrNo} successfully closed!`);
          await fetchData();
          // Refresh data to update the table
        
          //setPage(1); // Go back to first page if needed, or simply refetch
          
        }
      } catch (err) {
        console.error("Error closing complaint:", err);
        alert(`Failed to close complaint #${csrNo}. Please try again.`);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (data === null && !error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
        }}
      >
        <CircularProgress sx={{ color: "#1a3c34" }} />
        <Typography
          sx={{
            mt: 2,
            fontFamily: "'Playfair Display', 'Georgia', serif",
            color: "#1a3c34",
          }}
        >
          Loading Data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            color: "#d32f2f",
          }}
        >
          {error}
        </Typography>
      </Box>
    );
  }
// console.log("a" , a)
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
        minHeight: "100vh",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "space-between" },
          p: { xs: 1, sm: 2 },
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          mb: 2,
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 280px)" } }}>
          <input
            name="MeterSerialNo"
            onChange={(e) => setMeterSerialNo(e.target.value)}
            value={meterSerialNo}
            className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Meter Serial No"
            style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 280px)" } }}>
          <input
            name="CSr_NO"
            onChange={(e) => setCsrNo(e.target.value)}
            value={csrNo}
            className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="CSR No"
            style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 280px)" } }}>
          <input
            name="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Address"
            style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 200px)" } }}>
          <input
            type="date"
            name="startDate"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Start Date"
            style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 200px)" } }}>
          <input
            type="date"
            name="endDate"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="End Date"
            style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif", fontSize: "0.875rem" }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 200px)" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleDateSubmit}
            sx={{
              background: "linear-gradient(to right, #1a3c34, #2e5e54)",
              color: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:hover": {
                background: "linear-gradient(to right, #2e5e54, #1a3c34)",
              },
              fontFamily: "'Roboto', 'Helvetica', sans-serif",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              padding: { xs: "6px 12px", sm: "8px 16px" },
              width: "100%",
            }}
          >
            Submit
          </Button>
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 150px)" } }}>
          <FormControl
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray-400",
                },
                "&:hover fieldset": {
                  borderColor: "teal-500",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "teal-500",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputBase-input": {
                padding: "8.5px 14px",
                fontFamily: "'Roboto', 'Helvetica', sans-serif",
                fontSize: "0.875rem",
              },
              "& .MuiInputLabel-root": {
                fontFamily: "'Roboto', 'Helvetica', sans-serif",
                fontSize: "0.875rem",
                color: "#374151",
              },
            }}
          >
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Close">Close</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "min(100%, 300px)", md: "min(100%, 150px)" } }}>
          <Box
            className=" py-1.5 px-4 w-full"
            sx={{
              fontFamily: "'Roboto', 'Helvetica', sans-serif",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              display: "flex",
              alignItems: "center",
              color: "#374151", // Matches input text color (gray-700)
              height: "100%", // Ensure it takes full height
              border: "2px solid #D1D5DB", // Mimic input border
              borderRadius: "8px", // Mimic input border-radius
            }}
          >
            Total Reports: {data?.totalRecords}
          </Box>
        </Box>
      </Box>

      {data?.message?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              color: "#1a3c34",
              fontSize: "1.2rem",
            }}
          >
            No Data Available
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "70vh",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Table stickyHeader aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      align="center"
                      sx={{
                        minWidth: 80,
                        position: "sticky",
                        left: 0,
                        zIndex: 100,
                        background:
                          "linear-gradient(to right, #1a3c34, #2e5e54)",
                      }}
                    >
                      Sr No.
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 100 }}>
                      Actions
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 120 }}>
                      Meter Id
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 150 }}>
                      Customer Name
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 150 }}>
                      Employee Name
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 130 }}>
                      Customer Mobile No.
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 100 }}>
                      Flat No
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 100 }}>
                      Address
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 180 }}>
                      Complaint Reported By CRM
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 200 }}>
                      Problem Identified By Service Engineer
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 180 }}>
                      Problem Rectified By Service Engineer
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 180 }}>
                      Attended Engineer Remarks
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 200 }}>
                      Customer Remarks
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 150 }}>
                      Status
                    </StyledTableCell> {/* New Status Column */}
                    <StyledTableCell align="center" sx={{ minWidth: 150 }}>
                      Date & Time
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.message?.map((row) => (
                    <StyledTableRow key={row.CSr_NO}>
                      <StyledTableCell
                        align="center"
                        sx={{
                          position: "sticky",
                          left: 0,
                          zIndex: 50,
                          backgroundColor: "#f5f0e1",
                        }}
                      >
                        {row.CSr_NO || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                          {(row.Status === "Open" || row.Status == null) && (
                            <Button
                              variant="contained"
                              onClick={() => handleEdit(row)}
                              sx={{
                                background:
                                  "linear-gradient(to right, #1a3c34, #2e5e54)",
                                color: "#fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                "&:hover": {
                                  background:
                                    "linear-gradient(to right, #2e5e54, #1a3c34)",
                                },
                                fontSize: { xs: "0.6rem", md: "0.75rem" },
                                padding: { xs: "3px 6px", md: "4px 8px" },
                                minWidth: 'auto',
                              }}
                            >
                              Edit
                            </Button>
                          )}
                          {(row.Status === "Open" || row.Status == null ) && (
                            <Button
                              variant="contained"
                              onClick={() => handleCloseComplaint(row)}
                              sx={{
                                background:
                                  "linear-gradient(to right, #e0a800, #c89600)", // Yellow/Orange for Close
                                color: "#fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                "&:hover": {
                                  background:
                                    "linear-gradient(to right, #c89600, #e0a800)",
                                },
                                fontSize: { xs: "0.6rem", md: "0.75rem" },
                                padding: { xs: "3px 6px", md: "4px 8px" },
                                minWidth: 'auto',
                              }}
                            >
                              Close
                            </Button>
                          )}
                          {(row.Status === "Close" || row.Status === "Open" ||  row.Status == null) && ( // Show PDF for both Open and Closed
                            <Button
                              variant="contained"
                              onClick={() => handlePDF(row)}
                              sx={{
                                background:
                                  "linear-gradient(to right, #d4af37, #b8972e)",
                                color: "#fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                "&:hover": {
                                  background:
                                    "linear-gradient(to right, #b8972e, #d4af37)",
                                },
                                fontSize: { xs: "0.6rem", md: "0.75rem" },
                                padding: { xs: "3px 6px", md: "4px 8px" },
                                minWidth: 'auto',
                              }}
                            >
                              PDF
                            </Button>
                          )}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.MeterSerialNo || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Customer_Name || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.EmployeeName || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.MobileNo || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.FlatNo || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Address || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.ComplaintReportedBy || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.ProblemIdentifiedByServiceEngineer || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.ProblemRectifiedByServiceEngineer || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.AttendedEngineerRemarks || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.CustomerRemarks || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.Status || "Open"} {/* Display Status */}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(row.createdAt).toLocaleString()}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontFamily: "'Roboto', 'Helvetica', sans-serif",
                    color: "#1a3c34",
                  },
                  "& .Mui-selected": {
                    background: "linear-gradient(to right, #1a3c34, #2e5e54)",
                    color: "#fff",
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" }, p: 1 }}>
            {data?.message?.map((row) => (
              <Paper
                key={row.CSr_NO}
                sx={{
                  mb: 1,
                  p: 1.5,
                  borderRadius: "8px",
                  backgroundColor: "#f5f0e1",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "#1a3c34",
                    mb: 1,
                  }}
                >
                  Sr No: {row.CSr_NO || "-"}
                  <span style={{float: 'right', color: row.Status === "Close" ? 'red' : 'green'}}>{row.Status || "Open"}</span>
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Meter ID:</strong> {row.MeterSerialNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Customer:</strong> {row.Customer_Name || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Employee:</strong> {row.EmployeeName || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Mobile No:</strong> {row.MobileNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Flat No:</strong> {row.FlatNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Address:</strong> {row.Address || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Complaint:</strong> {row.ComplaintReportedBy || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Problem Identified:</strong>{" "}
                    {row.ProblemIdentifiedByServiceEngineer || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Problem Rectified:</strong>{" "}
                    {row.ProblemRectifiedByServiceEngineer || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Engineer Remarks:</strong>{" "}
                    {row.AttendedEngineerRemarks || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Customer Remarks:</strong>{" "}
                    {row.CustomerRemarks || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333", width: '100%' }}>
                    <strong>Date:</strong>{" "}
                    {new Date(row.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  {row.Status === "Open" && (
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(row)}
                      sx={{
                        background: "linear-gradient(to right, #1a3c34, #2e5e54)",
                        color: "#fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        "&:hover": {
                          background:
                            "linear-gradient(to right, #2e5e54, #1a3c34)",
                        },
                        fontSize: "0.7rem",
                        padding: "4px 8px",
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {(row.Status === "Open" && a.data?.Designation == "CRM")&& (
                    <Button
                      variant="contained"
                      onClick={() => handleCloseComplaint(row)}
                      sx={{
                        background:
                          "linear-gradient(to right, #e0a800, #c89600)", // Yellow/Orange for Close
                        color: "#fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        "&:hover": {
                          background:
                            "linear-gradient(to right, #c89600, #e0a800)",
                        },
                        fontSize: "0.7rem",
                        padding: "4px 8px",
                      }}
                    >
                      Close
                    </Button>
                  )}
                  {(row.Status === "Close" || row.Status === "Open") && (
                    <Button
                      variant="contained"
                      onClick={() => handlePDF(row)}
                      sx={{
                        background: "linear-gradient(to right, #d4af37, #b8972e)",
                        color: "#fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        "&:hover": {
                          background:
                            "linear-gradient(to right, #b8972e, #d4af37)",
                        },
                        fontSize: "0.7rem",
                        padding: "4px 8px",
                      }}
                    >
                      PDF
                    </Button>
                  )}
                </Box>
              </Paper>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontFamily: "'Roboto', 'Helvetica', sans-serif",
                    color: "#1a3c34",
                  },
                  "& .Mui-selected": {
                    background: "linear-gradient(to right, #1a3c34, #2e5e54)",
                    color: "#fff",
                  },
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CsrList;