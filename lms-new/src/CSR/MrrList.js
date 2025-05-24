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
// import { Button } from "@mui/material";
// import  secureLocalStorage  from  "react-secure-storage";
// import { mainRoute } from "../App";

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
// const MrrList = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState(false);
//   const [text, setText] = useState("");
//   const [text2, setText2] = useState("");
//   const a = JSON.parse(secureLocalStorage.getItem("info"));

//   useEffect(() => {
//     axios
//       .get(
//         `${window.MyApiRoute}metertransfer/getall?Employee_Id=${a.data.Employee_Id}`
//       )
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   const handleEdit = (row, index) => {
   
//     navigate(`${mainRoute}/MrrEdit`, { state: row });
//   };
//   const handlePDF = (data, index) => {
//     navigate(`${mainRoute}/csrdownload`, { state: { data } });
//   };
//   const handleFilterChange = (e) => {
//     setText(e.target.value);
//   };
//   const handleFilterChange2 = (e) => {
//     setText2(e.target.value);
//   };
//   return (
//     data && (
//       <div>
//         <div style={{ display: "flex", justifyContent: "space-around" }}>
//           <div
//             className={`pt-3 flex ${
//               data.Designation === "storekeeper" ? "w-1/2" : ""
//             } px-8 pb-3 flex justify-between`}
//           >
//             <input
//               debounce={300}
//               onChange={(e) => handleFilterChange(e)}
//               // value={filter.Meter_Serial_No ?? ""}
//               className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//               placeholder="Old Serial No."
//             />
//           </div>
//           <div
//             className={`pt-3 flex ${
//               data.Designation === "storekeeper" ? "w-1/2" : ""
//             } px-8 pb-3 flex justify-between`}
//           >
//             <input
//               debounce={300}
//               onChange={(e) => handleFilterChange2(e)}
//               // value={filter.Meter_Serial_No ?? ""}
//               className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//               placeholder="New Serial No."
//             />
//           </div>
//         </div>

//         <TableContainer sx={{ height: "62vh" }} component={Paper}>
//           <Table
//             stickyHeader
//             // sx={{ minWidth: "1500px" }}
//             aria-label="customized table"
//           >
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell
//                   sx={{ paddingY: 1, minWidth: 100 }}
//                   align="center"
//                   style={{
//                     position: "sticky",
//                     width: "15px",
//                     zIndex: "1500",
//                     left: 0,
//                     backgroundColor: "#000000",
//                   }}
//                 >
//                   S No.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 100, padding: "3px" }}
//                   align="center"
//                 >
//                   Old serial No.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   New Serial No.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 120, padding: "3px" }}
//                   align="center"
//                 >
//                   Customer Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 120, padding: "3px" }}
//                   align="center"
//                 >
//                   Employee Name
//                 </StyledTableCell>

//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   Address
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 100, padding: "3px" }}
//                   align="center"
//                 >
//                   Flat No.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 100, padding: "3px" }}
//                   align="center"
//                 >
//                   Old Make
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 100, padding: "3px" }}
//                   align="center"
//                 >
//                   Old Model
//                 </StyledTableCell>

//                 <StyledTableCell
//                   sx={{ minWidth: 100, padding: "3px" }}
//                   align="center"
//                 >
//                   Old Digital ID
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 170, padding: "3px" }}
//                   align="center"
//                 >
//                   Old Meter Mains(KWH)
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   Old Meter DG(KWH)
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 100, padding: "3px" }}
//                   align="center"
//                 >
//                   New Make
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 100, padding: "3px" }}
//                   align="center"
//                 >
//                   New Model
//                 </StyledTableCell>

//                 <StyledTableCell
//                   sx={{ minWidth: 100, padding: "3px" }}
//                   align="center"
//                 >
//                   New Digital Id
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 170, padding: "3px" }}
//                   align="center"
//                 >
//                   New Meter Mains(KWH)
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   New Meter DG(KWH)
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 200, padding: "3px" }}
//                   align="center"
//                 >
//                   Server Updated CRM Name
//                 </StyledTableCell>

//                 <StyledTableCell
//                   sx={{ minWidth: 200, padding: "3px" }}
//                   align="center"
//                 >
//                   Problem detected By Engineer
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   Attented Engineer Report
//                 </StyledTableCell>

//                 <StyledTableCell
//                   sx={{ minWidth: 170, padding: "3px" }}
//                   align="center"
//                 >
//                   Customer Remarks
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 170, padding: "3px" }}
//                   align="center"
//                 >
//                   Date & Time
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   Edit
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   PDF
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.message
//                 .filter((item) => item.OldSerialNo?.includes(text))
//                 .filter((item) => item.NewSerialNo?.includes(text2))
//                 .map((row, index) => (
//                   <StyledTableRow key={index}>
//                     <StyledTableCell
//                       align="center"
//                       sx={{ padding: 1.5 }}
//                       scope="row"
//                       style={{
//                         position: "sticky",
//                         width: "15px",
//                         zIndex: "1100",
//                         left: 0,
//                         background: "#dfcaaf ",
//                       }}
//                     >
//                       {row.ServiceReportNo ? row.ServiceReportNo : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.OldSerialNo ? row.OldSerialNo : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.NewSerialNo ? row.NewSerialNo : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.Customer_Name ? row.Customer_Name : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.EmployeeName ? row.EmployeeName : "-"}
//                     </StyledTableCell>

//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.Address ? row.Address : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.flatNo ? row.flatNo : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.OldMake ? row.OldMake : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.OldModel ? row.OldModel : "-"}
//                     </StyledTableCell>

//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.OldDigitalId ? row.OldDigitalId : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.oldMeterMains ? row.oldMeterMains : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.oldMeterDg ? row.oldMeterDg : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.NewMake ? row.NewMake : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.NewModel ? row.NewModel : "-"}
//                     </StyledTableCell>

//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.NewDigitalId ? row.NewDigitalId : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.newMeterMains ? row.newMeterMains : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.newMeterDg ? row.newMeterDg : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.serverUpdatedCRMName
//                         ? row.serverUpdatedCRMName
//                         : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.ProblemDetectedByEngineer
//                         ? row.ProblemDetectedByEngineer
//                         : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.attentedEngineerReport
//                         ? row.attentedEngineerReport
//                         : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.CustomerRemarks ? row.CustomerRemarks : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {new Date(row.createdAt).toLocaleString()}
//                     </StyledTableCell>

//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       <Button
//                         variant="contained"
//                         onClick={() => handleEdit(row, index)}
//                       >
//                         Edit
//                       </Button>
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       <Button
//                         variant="contained"
//                         onClick={() => handlePDF(row, index)}
//                       >
//                         PDF
//                       </Button>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     )
//   );
// };
// export default MrrList;
// MrrList.js
// MrrList.js
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
import { Button, Typography } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import { mainRoute } from "../App";

// Custom hook for debouncing input
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

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(to right, #1a3c34, #2e5e54)", // Classic teal gradient
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
    backgroundColor: "#f5f0e1", // Soft off-white for classic look
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#e8e1c9", // Subtle hover effect
  },
}));

const MrrList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null); // Initialize as null for loading state
  const [error, setError] = useState(null); // Handle API errors
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const a = JSON.parse(secureLocalStorage.getItem("info"));

  // Debounce filter inputs
  const debouncedText = useDebounce(text, 300);
  const debouncedText2 = useDebounce(text2, 300);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${window.MyApiRoute}metertransfer/getall?Employee_Id=${a.data.Employee_Id}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setData([]); // Set empty array to trigger "No Data" message
      }
    };

    fetchData();
  }, []);

  // Handlers
  const handleEdit = (row, index) => {
    navigate(`${mainRoute}/MrrEdit`, { state: row });
  };

  // const handlePDF = (data, index) => {
  //   navigate(`${mainRoute}/csrdownload`, { state: { data } });
  // };
  const handlePDF = (data) => {
  const url = `${mainRoute}/csrdownload?serviceReportNumber=${data.ServiceReportNo}`;
  window.open(url, '_blank');
};


  const handleFilterChange = (e) => {
    setText(e.target.value);
  };

  const handleFilterChange2 = (e) => {
    setText2(e.target.value);
  };

  // Filter data based on debounced input
  const filteredData = data?.message
    ?.filter((item) => item.OldSerialNo?.toLowerCase().includes(debouncedText.toLowerCase()))
    ?.filter((item) => item.NewSerialNo?.toLowerCase().includes(debouncedText2.toLowerCase())) || [];

  // Loading state
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

  // Error state
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

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)", // Subtle gradient background
        minHeight: "100vh",
        p: { xs: 1, sm: 2 },
      }}
    >
      {/* Filter Inputs (Always Visible) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
          gap: { xs: 1, sm: 2 },
          p: { xs: 1, sm: 2 },
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          mb: 2,
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
          <input
            onChange={handleFilterChange}
            value={text}
            className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Old Serial No."
            style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
          <input
            onChange={handleFilterChange2}
            value={text2}
            className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="New Serial No."
            style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}
          />
        </Box>
      </Box>

      {/* No Data Message (Below Inputs) */}
      {filteredData.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh", // Matches table/card area height
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
          {/* Desktop: Table View */}
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
                    <StyledTableCell align="center">S No.</StyledTableCell>
                    <StyledTableCell align="center">Old Serial No.</StyledTableCell>
                    <StyledTableCell align="center">New Serial No.</StyledTableCell>
                    <StyledTableCell align="center">Customer Name</StyledTableCell>
                    <StyledTableCell align="center">Employee Name</StyledTableCell>
                    <StyledTableCell align="center">Address</StyledTableCell>
                    <StyledTableCell align="center">Flat No.</StyledTableCell>
                    <StyledTableCell align="center">Old Make</StyledTableCell>
                    <StyledTableCell align="center">Old Model</StyledTableCell>
                    <StyledTableCell align="center">Old Digital ID</StyledTableCell>
                    <StyledTableCell align="center">Old Meter Mains(KWH)</StyledTableCell>
                    <StyledTableCell align="center">Old Meter DG(KWH)</StyledTableCell>
                    <StyledTableCell align="center">New Make</StyledTableCell>
                    <StyledTableCell align="center">New Model</StyledTableCell>
                    <StyledTableCell align="center">New Digital Id</StyledTableCell>
                    <StyledTableCell align="center">New Meter Mains(KWH)</StyledTableCell>
                    <StyledTableCell align="center">New Meter DG(KWH)</StyledTableCell>
                    <StyledTableCell align="center">Server Updated CRM Name</StyledTableCell>
                    <StyledTableCell align="center">Problem Detected By Engineer</StyledTableCell>
                    <StyledTableCell align="center">Attended Engineer Report</StyledTableCell>
                    <StyledTableCell align="center">Customer Remarks</StyledTableCell>
                    <StyledTableCell align="center">Date & Time</StyledTableCell>
                    <StyledTableCell align="center">Edit</StyledTableCell>
                    <StyledTableCell align="center">PDF</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {row.ServiceReportNo || "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.OldSerialNo || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.NewSerialNo || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.Customer_Name || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.EmployeeName || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.Address || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.flatNo || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.OldMake || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.OldModel || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.OldDigitalId || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.oldMeterMains || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.oldMeterDg || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.NewMake || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.NewModel || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.NewDigitalId || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.newMeterMains || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.newMeterDg || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.serverUpdatedCRMName || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.ProblemDetectedByEngineer || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.attentedEngineerReport || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.CustomerRemarks || "-"}</StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(row.createdAt).toLocaleString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(row, index)}
                          sx={{
                            background: "linear-gradient(to right, #1a3c34, #2e5e54)",
                            color: "#fff",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            "&:hover": {
                              background: "linear-gradient(to right, #2e5e54, #1a3c34)",
                            },
                            fontSize: { xs: "0.7rem", md: "0.875rem" },
                            padding: { xs: "4px 8px", md: "6px 12px" },
                          }}
                        >
                          Edit
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => handlePDF(row, index)}
                          sx={{
                            background: "linear-gradient(to right, #d4af37, #b8972e)",
                            color: "#fff",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            "&:hover": {
                              background: "linear-gradient(to right, #b8972e, #d4af37)",
                            },
                            fontSize: { xs: "0.7rem", md: "0.875rem" },
                            padding: { xs: "4px 8px", md: "6px 12px" },
                          }}
                        >
                          PDF
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Mobile: Card View */}
          <Box sx={{ display: { xs: "block", md: "none" }, p: 1 }}>
            {filteredData.map((row, index) => (
              <Paper
                key={index}
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
                  S No: {row.ServiceReportNo || "-"}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Old Serial:</strong> {row.OldSerialNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>New Serial:</strong> {row.NewSerialNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Customer:</strong> {row.Customer_Name || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Employee:</strong> {row.EmployeeName || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Address:</strong> {row.Address || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Flat No:</strong> {row.flatNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Old Make:</strong> {row.OldMake || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Old Model:</strong> {row.OldModel || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Old Digital ID:</strong> {row.OldDigitalId || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Old Mains (KWH):</strong> {row.oldMeterMains || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Old DG (KWH):</strong> {row.oldMeterDg || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>New Make:</strong> {row.NewMake || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>New Model:</strong> {row.NewModel || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>New Digital ID:</strong> {row.NewDigitalId || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>New Mains (KWH):</strong> {row.newMeterMains || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>New DG (KWH):</strong> {row.newMeterDg || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>CRM Name:</strong> {row.serverUpdatedCRMName || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Problem:</strong> {row.ProblemDetectedByEngineer || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Engineer Report:</strong> {row.attentedEngineerReport || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Remarks:</strong> {row.CustomerRemarks || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Date:</strong> {new Date(row.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 1, justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(row, index)}
                    sx={{
                      background: "linear-gradient(to right, #1a3c34, #2e5e54)",
                      color: "#fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      "&:hover": {
                        background: "linear-gradient(to right, #2e5e54, #1a3c34)",
                      },
                      fontSize: "0.7rem",
                      padding: "4px 8px",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handlePDF(row, index)}
                    sx={{
                      background: "linear-gradient(to right, #d4af37, #b8972e)",
                      color: "#fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      "&:hover": {
                        background: "linear-gradient(to right, #b8972e, #d4af37)",
                      },
                      fontSize: "0.7rem",
                      padding: "4px 8px",
                    }}
                  >
                    PDF
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MrrList;