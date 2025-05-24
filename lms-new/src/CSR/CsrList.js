// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
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
// const CsrList = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState(false);
//   const [text, setText] = useState("");
//   const a = JSON.parse(secureLocalStorage.getItem("info"));

//   useEffect(() => {
//     axios
//       .get(
//         `${window.MyApiRoute}report?Employee_Id=${a.data.Employee_Id}`
//       )
//       .then((res) => {
//         setData(res.data);
//         console.log("res", res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleEdit = (row, index) => {
//     navigate(`${mainRoute}/csrEdit`, { state: row });

//     // console.log("edit data",row)
//   };
//   const handlePDF = (data) => {
//     navigate(`${mainRoute}/csrformdownload`, { state: { data } });
//   };
//   // console.log("admin", a.isAdmin);
//   const handleFilterChange = (e) => {
//     setText(e.target.value);
//   };

//   return (
//     data && (
//       <div style={{ overflowY: "hidden" }}>
//         <div
//           className={`pt-3 flex ${
//             data.Designation === "storekeeper" ? "w-1/2" : ""
//           } px-8 pb-3 flex justify-between`}
//         >
//           <input
//             name="Meter_Serial_No"
//             debounce={300}
//             onChange={(e) => handleFilterChange(e)}
//             // value={filter.Meter_Serial_No ?? ""}
//             className="border-2 py-2 px-2 w-[300px] border-gray-500 rounded"
//             placeholder="Meter ID"
//           />
//         </div>
//         <TableContainer
//           sx={{ height: "62vh", overflowX: "auto", overflowY: "auto" }}
//         >
//           <Table
//             stickyHeader
//             sx={{ minWidth: "1500px" }}
//             aria-label="customized table"
//           >
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell
//                   style={{
//                     position: "sticky",
//                     width: "15px",
//                     zIndex: "1500",
//                     left: 0,
//                     backgroundColor: "#000000",
//                   }}
//                   sx={{ paddingY: 1, minWidth: 100 }}
//                   align="center"
//                 >
//                   Sr No.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   Meter Id
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 170, padding: "3px" }}
//                   align="center"
//                 >
//                   Customer Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 170, padding: "3px" }}
//                   align="center"
//                 >
//                   Employee Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 150, padding: "3px" }}
//                   align="center"
//                 >
//                   Customer Mobile No.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 120, padding: "3px" }}
//                   align="center"
//                 >
//                   Flat No
//                 </StyledTableCell>

//                 <StyledTableCell
//                   sx={{ minWidth: 120, padding: "3px" }}
//                   align="center"
//                 >
//                   Address
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 200, padding: "3px" }}
//                   align="center"
//                 >
//                   Complaint Reported By CRM
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 270, padding: "3px" }}
//                   align="center"
//                 >
//                   Problem Identified By Service Engineer
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 270, padding: "3px" }}
//                   align="center"
//                 >
//                   Problem Recitified By Service Engineer
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 250, padding: "3px" }}
//                   align="center"
//                 >
//                   Attented Engineer Remarks
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 300, padding: "3px" }}
//                   align="center"
//                 >
//                   Customer Remarks
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{ minWidth: 200, padding: "3px" }}
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
//                 .filter((product) => product.MeterSerialNo?.includes(text))
//                 .map((row, index) => (
//                   <StyledTableRow key={index}>
//                     <StyledTableCell
//                       align="center"
//                       sx={{ padding: 1.5 }}
//                       style={{
//                         position: "sticky",
//                         width: "15px",
//                         zIndex: "1100",
//                         left: 0,
//                         background: "#dfcaaf ",
//                       }}
//                       scope="row"
//                     >
//                       {row.CSr_NO ? row.CSr_NO : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.MeterSerialNo ? row.MeterSerialNo : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.Customer_Name ? row.Customer_Name : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.EmployeeName ? row.EmployeeName : "-"}
//                     </StyledTableCell>

//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.MobileNo ? row.MobileNo : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.FlatNo ? row.FlatNo : "-"}
//                     </StyledTableCell>

//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.Address ? row.Address : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.ComplaintReportedBy ? row.ComplaintReportedBy : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.ProblemIdentifiedByServiceEngineer
//                         ? row.ProblemIdentifiedByServiceEngineer
//                         : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.ProblemRectifiedByServiceEngineer
//                         ? row.ProblemRectifiedByServiceEngineer
//                         : "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ padding: 0 }} align="center">
//                       {row.AttendedEngineerRemarks
//                         ? row.AttendedEngineerRemarks
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

// export default CsrList;

// CsrList.js
// CsrList.js
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
  const [text, setText] = useState("");
  const a = JSON.parse(secureLocalStorage.getItem("info"));

  const debouncedText = useDebounce(text, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${window.MyApiRoute}report?Employee_Id=${a.data.Employee_Id}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setData([]);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (row, index) => {
    navigate(`${mainRoute}/csrEdit`, { state: row });
  };

  // const handlePDF = (data) => {
  //   navigate(`${mainRoute}/csrformdownload`, { state: { data } });
  // };

  const handlePDF = (data) => {
  const csrNo = data.CSr_NO;
  const url = `${mainRoute}/csrformdownload?csr=${csrNo}`;
  window.open(url, "_blank"); // opens in new tab
};


  const handleFilterChange = (e) => {
    setText(e.target.value);
  };

  const filteredData = data?.message
    ?.filter((product) => product.MeterSerialNo?.toLowerCase().includes(debouncedText.toLowerCase())) || [];

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
          justifyContent: "center",
          p: { xs: 1, sm: 2 },
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          mb: 2,
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
          <input
            name="Meter_Serial_No"
            onChange={handleFilterChange}
            value={text}
            className="border-2 py-1.5 px-4 w-full border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Meter ID"
            style={{ fontFamily: "'Roboto', 'Helvetica', sans-serif" }}
          />
        </Box>
      </Box>

      {filteredData.length === 0 ? (
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
                        background: "linear-gradient(to right, #1a3c34, #2e5e54)",
                      }}
                    >
                      Sr No.
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 120 }}>Meter Id</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 150 }}>Customer Name</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 150 }}>Employee Name</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 130 }}>Customer Mobile No.</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 100 }}>Flat No</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 100 }}>Address</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 180 }}>Complaint Reported By CRM</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 200 }}>Problem Identified By Service Engineer</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 180 }}>Problem Rectified By Service Engineer</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 180 }}>Attended Engineer Remarks</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 200 }}>Customer Remarks</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 150 }}>Date & Time</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 100 }}>Edit</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 100 }}>PDF</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <StyledTableRow key={index}>
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
                      <StyledTableCell align="center">{row.MeterSerialNo || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.Customer_Name || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.EmployeeName || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.MobileNo || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.FlatNo || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.Address || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.ComplaintReportedBy || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.ProblemIdentifiedByServiceEngineer || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.ProblemRectifiedByServiceEngineer || "-"}</StyledTableCell>
                      <StyledTableCell align="center">{row.AttendedEngineerRemarks || "-"}</StyledTableCell>
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
                          onClick={() => handlePDF(row)}
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
                  Sr No: {row.CSr_NO || "-"}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Meter ID:</strong> {row.MeterSerialNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Customer:</strong> {row.Customer_Name || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Employee:</strong> {row.EmployeeName || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Mobile No:</strong> {row.MobileNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Flat No:</strong> {row.FlatNo || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Address:</strong> {row.Address || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Complaint:</strong> {row.ComplaintReportedBy || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Problem Identified:</strong> {row.ProblemIdentifiedByServiceEngineer || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Problem Rectified:</strong> {row.ProblemRectifiedByServiceEngineer || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Engineer Remarks:</strong> {row.AttendedEngineerRemarks || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#333" }}>
                    <strong>Customer Remarks:</strong> {row.CustomerRemarks || "-"}
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
                    onClick={() => handlePDF(row)}
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

export default CsrList;
