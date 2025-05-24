// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import secureLocalStorage from "react-secure-storage";
// import * as XLSX from "xlsx";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { styled } from "@mui/material/styles";
// import { Link } from "react-router-dom";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     paddingX: 8, // Added padding for better mobile display
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

// const AllChallan = () => {
//   const [data, setData] = useState([]);
//   const [real, setReal] = useState([]);
//   const [value, setValue] = useState("engineer");
//   const [search, setSearch] = useState("");
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

//   useEffect(() => {
//     axios
//       .post(
//         `${window.MyApiRoute}tool/get?location=challanDetails&issueToLocation=${
//           value || "engineer"
//         }`,
//         userInfo
//       )
//       .then((res) => {
//         // console.log("data", res.data.Data);
//         setData(res.data.Data);
//         setReal(res.data.Data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, [value]);
//   useEffect(() => {
//     const time = setTimeout(() => {
//       setData(() => {
//         if (!search) {
//           return real;
//         }
//         return real.filter((item) =>
//           item.Name.toLowerCase().includes(search.trim().toLowerCase())
//         );
//       });
//     }, 1000);

//     return () => {
//       clearTimeout(time);
//     };
//   }, [search, real]);

//   const engineerChallan =
//     userInfo.Designation === "engineer" ||
//     (userInfo.Designation === "storekeeper" && value === "engineer");
//   const productionChallan =
//     userInfo.Designation === "production" ||
//     (userInfo.Designation === "storekeeper" && value === "production");
//   const mechanicalChallan =
//     userInfo.Designation === "Mechanical" ||
//     (userInfo.Designation === "storekeeper" && value === "mechanical");
//   const rejectedChallan =
//     userInfo.Designation === "CEO" ||
//     (userInfo.Designation === "storekeeper" && value === "rejected");

//   const handleOnExport = (data) => {

//     const productsDetails = data.flatMap(item =>
//       item.Products.filter(product => product.status === "open")
//     );

//      var wb = XLSX.utils.book_new(),
//        ws = XLSX.utils.json_to_sheet(productsDetails);

//      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
//      XLSX.writeFile(
//        wb,
//        `Excel-${new Date().toDateString("en-GB", {
//          day: "numeric",
//          month: "short",
//          year: "numeric",
//        })}.xlsx`
//      );
//    };

//   return (
//     <div>
//       <div className="flex justify-around items-center">
//         {userInfo.Designation === "storekeeper" && (
//           <select
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             className="w-[300px] rounded h-[50px] border-gray-700 border-[1px] ml-10"
//             name="Engineer">
//             <option value="engineer">Engineer Challan</option>
//             <option value="production">Production Challan</option>
//             <option value="mechanical">Mechanical Challan</option>
//             <option value="rejected">Rejected Challan</option>
//           </select>
//         )}
//         <input
//           name="engineerName"
//           onChange={(e) => setSearch(e.target.value)}
//           className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//           placeholder="Engineer Name"
//         />

//         <button className="bg-green-600 py-2 px-5 rounded-sm text-white font-medium"
//          onClick={()=>handleOnExport(data)}
//         >
//           Excel
//         </button>

//       </div>

//       {data?.map((item, index) => {
//         return (
//           <div key={index} className="mb-5">
//             <div className="flex justify-center font-semibold mt-3">
//               <p className="text-xl">Challan No. {item.challanNumber}</p>
//             </div>

//             <TableContainer
//               sx={{ width: "95%", margin: "0 auto" }}
//               component={Paper}>
//               <Table aria-label="customized table">
//                 <TableHead>
//                   <TableRow>
//                     <StyledTableCell align="center">
//                       {item.Name}
//                     </StyledTableCell>
//                     <StyledTableCell>Serial No.</StyledTableCell>
//                     <StyledTableCell>Status</StyledTableCell>
//                     <StyledTableCell align="center">View</StyledTableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {item?.Products?.map((challan, index) => (
//                     <StyledTableRow key={index}>
//                       {/* <StyledTableCell align="center">
//                         {challan.Name}
//                       </StyledTableCell> */}
//                       <StyledTableCell align="center">
//                         {challan.ToolName}
//                       </StyledTableCell>
//                       <StyledTableCell>{challan.SerialNumber}</StyledTableCell>
//                       <StyledTableCell>{challan.status}</StyledTableCell>

//                       <StyledTableCell align="center">
//                         {engineerChallan && (
//                           <Link
//                             to={`/downloadengineertoolchallanpdf/${challan.challanNumber}?type=internalReturnableChallan`}
//                             className="no-underline bg-sky-600 text-white border-black px-3 rounded-md py-2">
//                             View
//                           </Link>
//                         )}
//                         {productionChallan && (
//                           <Link
//                             to={`/downloadproductiontoolchallanpdf/${challan.challanNumber}?type=internalReturnableChallan`}
//                             className="no-underline bg-sky-600 text-white border-black px-3 rounded-md py-2">
//                             View
//                           </Link>
//                         )}
//                         {mechanicalChallan && (
//                           <Link
//                             to={`/downloadmechanicaltoolchallanpdf/${challan.challanNumber}?type=internalReturnableChallan`}
//                             className="no-underline bg-sky-600 text-white border-black px-3 rounded-md py-2">
//                             View
//                           </Link>
//                         )}
//                         {rejectedChallan && (
//                           <Link
//                             to={`/downloadrejectedtoolchallanpdf/${challan.challanNumber}?type=internalReturnableChallan`}
//                             className="no-underline bg-sky-600 text-white border-black px-3 rounded-md py-2">
//                             View
//                           </Link>
//                         )}
//                       </StyledTableCell>
//                     </StyledTableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default AllChallan;

import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import * as XLSX from "xlsx";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { mainRoute } from "../../../App";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingX: 8,
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

const AllChallan = () => {
  const [data, setData] = useState([]);
  const [real, setReal] = useState([]);
  const [value, setValue] = useState("engineer");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // New state for status filter
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}tool/get?location=challanDetails&issueToLocation=${
          value || "engineer"
        }`,
        userInfo
      )
      .then((res) => {
        setData(res.data.Data);
        setReal(res.data.Data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [value]);

  useEffect(() => {
    const time = setTimeout(() => {
      setData(() => {
        if (!search) {
          return real;
        }
        return real.filter((item) =>
          item.Name.toLowerCase().includes(search.trim().toLowerCase())
        );
      });
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [search, real]);

  // Function to filter challans based on status
  const filteredData = data
    .map((item) => ({
      ...item,
      Products: item.Products.filter((product) =>
        statusFilter === "all" ? true : product.status === statusFilter
      ),
    }))
    .filter((item) => item.Products.length > 0); // Remove empty challans

  const handleOnExport = () => {
    const productsDetails = data.flatMap((item) =>
      item.Products.filter((product) => product.status === "open")
    );

    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(productsDetails);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, `Challan-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div>
      {/* <div className="flex justify-around items-center">
        {userInfo.Designation === "storekeeper" && (
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-[300px] rounded h-[50px] border-gray-700 border-[1px] ml-10"
            name="Engineer">
            <option value="engineer">Engineer Challan</option>
            <option value="production">Production Challan</option>
            <option value="mechanical">Mechanical Challan</option>
            <option value="rejected">Rejected Challan</option>
          </select>
        )}

        <input
          name="engineerName"
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Search by Name"
        />

      
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-2 w-[200px] border-gray-500 rounded"
        >
          <MenuItem value="all">All Challans</MenuItem>
          <MenuItem value="open">Open Challans</MenuItem>
          <MenuItem value="close">Closed Challans</MenuItem>
        </Select>

        <button className="bg-green-600 py-2 px-5 rounded-sm text-white font-medium"
          onClick={handleOnExport}
        >
          Export Excel
        </button>
      </div> */}
      <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center gap-3 p-4">
        {userInfo.Designation === "storekeeper" && (
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full sm:w-[300px] h-[50px] rounded border-gray-700 border-[1px] sm:ml-10"
            name="Engineer"
          >
            <option value="engineer">Engineer Challan</option>
            <option value="production">Production Challan</option>
            <option value="mechanical">Mechanical Challan</option>
            <option value="rejected">Rejected Challan</option>
          </select>
        )}

        <input
          name="engineerName"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[300px] border-2 py-2 px-5 border-gray-500 rounded"
          placeholder="Search by Name"
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-[200px] border-2 border-gray-500 rounded"
        >
          <MenuItem value="all">All Challans</MenuItem>
          <MenuItem value="open">Open Challans</MenuItem>
          <MenuItem value="close">Closed Challans</MenuItem>
        </Select>

        <button
          className="bg-green-600 py-2 px-5 rounded-sm text-white font-medium w-full sm:w-auto"
          onClick={handleOnExport}
        >
          Export Excel
        </button>
      </div>

      {filteredData?.map((item, index) => {
        return (
          <div key={index} className="mb-5">
            <div className="flex justify-center font-semibold mt-3">
              <p className="text-xl">Challan No. {item.challanNumber}</p>
            </div>

            <TableContainer
              sx={{ width: "95%", margin: "0 auto" }}
              component={Paper}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      {item.Name}
                    </StyledTableCell>
                    <StyledTableCell>Serial No.</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell align="center">View</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item?.Products?.map((challan, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {challan.ToolName}
                      </StyledTableCell>
                      <StyledTableCell>{challan.SerialNumber}</StyledTableCell>
                      <StyledTableCell>{challan.status}</StyledTableCell>
                      <StyledTableCell align="center">
                        <a
                          href={`${mainRoute}/downloadengineertoolchallanpdf/${challan.challanNumber}?type=internalReturnableChallan`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline bg-sky-600 text-white border-black px-3 rounded-md py-2"
                        >
                          View
                        </a>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      })}
    </div>
  );
};

export default AllChallan;
