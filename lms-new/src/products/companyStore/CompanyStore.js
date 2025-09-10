// import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { Badge, Button, CircularProgress } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import axios from "axios";
// import { debounce } from "lodash";
// import MainModal from "./MainModal";
// import { useSelector } from "react-redux";
// import AddNewProduct from "./AddNewProduct";
// import secureLocalStorage from "react-secure-storage";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import ExchangeProduct from "./ExchangeProduct";
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

//  const CompanyStore = () => {
//   const [open, setOpen] = useState(false);
//   const [openAdd, setOpenAdd] = useState(false);
//   const [filter, setFilter] = useState({});
//   const [site, setSite] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [search, setSearch] = useState("");
//   const [val, setVal] = useState([]);
//   const [badgeCount, setBadgeCount] = useState(0);
//   const a = JSON.parse(secureLocalStorage.getItem("info"));
//   const { selectedItem } = useSelector((state) => state.itemReducer);
//   const navigate = useNavigate();


//   const api = () =>
//     axios
//       .post(
//         window.MyApiRoute +
//           `record/get?category=${selectedItem}&location=inStore`,
//         {
//           ...a.data,
//         }
//       )
//       .then(
//         (res) => (
//           setVal(res.data.Data),
//           setData2(res.data.Data)
          
//         )
//       )
//       .catch((err) => console("Error", err.message));
//   useEffect(() => {
//     api();
//   }, [selectedItem]);
//   useEffect(() => {
//     axios
//       .get(window.MyApiRoute + "sites")
//       .then((res) => {
//         return setSite(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     const debouncedFilter = debounce(() => {
//       if (filter?.Meter_Serial_No?.trim() === "") {
//         setData2(val);
//       } else if (filter?.Meter_Serial_No) {
//         const newData = val.filter((item) =>
//           String(item.Meter_Serial_No)
//             .toUpperCase()
//             .includes(filter.Meter_Serial_No.trim().toUpperCase())
//         );
//         setData2(newData);
//       } else if (filter?.Category?.trim() === "") {
//         setData2(val);
//       } else if (filter?.Category) {
//         const newData = val.filter((item) => {
//           return item.Category?.trim()
//             .toUpperCase()
//             ?.includes(filter.Category.trim().toUpperCase());
//         });
//         setData2(newData);
//       } else {
//         setData2(val);
//       }
//     }, 50);

//     debouncedFilter(); // Invoke the debounced function immediately after defining it
//     return () => {
//       debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
//     };
//   }, [filter, val]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleFilterChange = (e) => {
//     setFilter({ ...filter, [e.target.name]: e.target.value });
//   };

//   const handleCheck = (e, item) => {
//     const isChecked = e.target.checked;
//     const newData = val?.map((valItem) =>
//       valItem.Sr_NO === item.Sr_NO
//         ? { ...valItem, checked: isChecked }
//         : valItem
//     );
//     setVal(newData);

//     if (isChecked) {
//       if (checked.length < 25) {
//         setChecked((prevChecked) => [...prevChecked, item]);
//       } else {
//         alert("You can select a maximum of 25 products");
//         e.preventDefault();
//         return;
//       }
//     } else {
//       setChecked((prevChecked) =>
//         prevChecked.filter((checkedItem) => checkedItem.Sr_NO !== item.Sr_NO)
//       );
//     }
//     const newBadgeCount = isChecked ? badgeCount + 1 : badgeCount - 1;
//     setBadgeCount(newBadgeCount);
//   };

//   const excelData =
//     data2 &&
//     data2?.map((item) => {
//       return {
//         Product_Sr_No: item.Meter_Serial_No,
//         Created_At: item.createdAt,
//         Category: item.Category,
//       };
//     });

//   const downloadExcel = (excelData) => {
//     var wb = XLSX.utils.book_new(),
//       ws = XLSX.utils.json_to_sheet(excelData);

//     XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
//     XLSX.writeFile(
//       wb,
//       `Store-Excel-${new Date().toDateString("en-GB", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       })}.xlsx`
//     );
//   };
//   return (
//     <>
//       {/* <div
//         className={`pt-3 flex ${
//           a.data.Designation === "storekeeper" ? "w-1/1" : ""
//         } px-8 pb-3 flex justify-between`}
//       >
//         {a.data.Designation === "storekeeper" && (
//           <>
//             <Button
//               variant="contained"
//               onClick={() => downloadExcel(excelData)}
//             >
//               Excel
//             </Button>
          
//           </>
//         )}

//         <input
//           name="Meter_Serial_No"
//           debounce={300}
//           onChange={(e) => handleFilterChange(e)}
//           value={filter.Meter_Serial_No ?? ""}
//           className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//           placeholder="Serial Numbers"
//         />
//         <select
//           name="Category"
//           debounce={300}
//           onChange={(e) => handleFilterChange(e)}
//           value={filter?.Category}
//           className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//           placeholder="Serial Number"
//         >
//           <option value="">Category</option>
//           <option value="A">Class A</option>
//           <option value="B">Class B</option>
//         </select>
//         <h1> No. of Products : {data2?.length ?? 0}</h1>
//         <div>
//           {a.data.Designation === "storekeeper" && (
//             <Button onClick={() => setOpenAdd(true)} variant="contained">
//               Add New
//             </Button>
//           )}
//         </div>
//       </div> */}
//       <div
//   className={`pt-3 flex flex-col sm:flex-row sm:items-center gap-3 px-4 pb-3 sm:justify-between ${
//     a.data.Designation === "storekeeper" ? "w-full" : ""
//   }`}
// >
//   {a.data.Designation === "storekeeper" && (
//     <Button
//       variant="contained"
//       onClick={() => downloadExcel(excelData)}
//       sx={{ width: { xs: "100%", sm: "auto" } }}
//     >
//       Excel
//     </Button>
//   )}

//   <input
//     name="Meter_Serial_No"
//     debounce={300}
//     onChange={(e) => handleFilterChange(e)}
//     value={filter.Meter_Serial_No ?? ""}
//     className="border-2 py-2 px-5 w-full sm:w-[300px] border-gray-500 rounded"
//     placeholder="Serial Numbers"
//   />

//   <select
//     name="Category"
//     debounce={300}
//     onChange={(e) => handleFilterChange(e)}
//     value={filter?.Category}
//     className="border-2 py-2 px-5 w-full sm:w-[300px] border-gray-500 rounded"
//   >
//     <option value="">Category</option>
//     <option value="A">Class A</option>
//     <option value="B">Class B</option>
//   </select>

//   <h1 className="text-center sm:text-left">No. of Products: {data2?.length ?? 0}</h1>

//   <div>
//     {a.data.Designation === "storekeeper" && (
//       <Button
//         onClick={() => setOpenAdd(true)}
//         variant="contained"
//         sx={{ width: { xs: "100%", sm: "auto" } }}
//       >
//         Add New
//       </Button>
//     )}
//   </div>
// </div>
//       <div className="flex">
//         <TableContainer
//           sx={{ width: "700px", margin: "0 auto" }}
//           component={Paper}
//         >
//           <Table aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="center" sx={{ padding: 0 }}>
//                   Category
//                 </StyledTableCell>
//                 <StyledTableCell align="center" sx={{ paddingX: 0 }}>
//                   Serial No
//                 </StyledTableCell>

//                 <StyledTableCell align="center" sx={{ paddingX: 0 }}>
//                   Registered On
//                 </StyledTableCell>
//                 {a.data.Designation === "storekeeper" && (
//                   <StyledTableCell align="center" sx={{ paddingX: 2 }}>
//                     Options
//                   </StyledTableCell>
//                 )}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data2 &&
//                 data2?.map((item, i) => {
//                   // const date = (new Date(item.createdAt)).toLocaleString();
//                   const date = new Date(item.createdAt);
//                   const options = {
//                     day: "2-digit",
//                     month: "2-digit",
//                     year: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     second: "2-digit",
//                     hour12: true,
//                   };
//                   const formattedDate = date.toLocaleString("en-US", options);
//                   return (
//                     <StyledTableRow key={i}>
//                       <StyledTableCell align="center">
//                         {item.Category}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {item.Meter_Serial_No}
//                       </StyledTableCell>
//                       {/* <StyledTableCell align="center">{ item.Sim_CreatedBy }</StyledTableCell> */}
//                       <StyledTableCell align="center">
//                         {formattedDate}
//                       </StyledTableCell>
//                       {a.data.Designation === "storekeeper" && (
//                         <StyledTableCell align="center">
//                           <input
//                             className="cursor-pointer"
//                             checked={item?.checked || checked.includes(item)}
//                             onChange={(e) => handleCheck(e, item)}
//                             type="checkbox"
//                           />
//                         </StyledTableCell>
//                       )}
//                     </StyledTableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {a.data.Designation === "storekeeper" && (
//           <div className="w-[600px] overflow-x-scroll">
//             <TableContainer
//               sx={{ width: "800px", margin: "0 auto" }}
//               component={Paper}
//             >
//               <Table aria-label="customized table">
//                 <TableHead>
//                   <TableRow>
//                     <StyledTableCell align="center" sx={{ padding: 0 }}>
//                       Category
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ paddingX: 0 }}>
//                       Serial No.
//                     </StyledTableCell>
//                     <StyledTableCell align="center" sx={{ paddingX: 0 }}>
//                       Activity Log
//                     </StyledTableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {checked?.map((item, i) => {
//                     const activity = JSON.parse(item.ActivityLog);
//                     return (
//                       <StyledTableRow key={i}>
//                         <StyledTableCell sx={{ minWidth: 120 }} align="center">
//                           {item.Category}
//                         </StyledTableCell>
//                         <StyledTableCell sx={{ minWidth: 120 }} align="center">
//                           {item.Meter_Serial_No}
//                         </StyledTableCell>
//                         <StyledTableCell align="center">
//                           {activity?.map((item, i) => {
//                             return (
//                               <p
//                                 key={i}
//                                 className="grid grid-cols-2 gap-x-5 text-left"
//                               >
//                                 <span className="w-[150px]">{item.date}</span>
//                                 <span className="w-[200px]">{item.remark}</span>
//                               </p>
//                             );
//                           })}
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         )}
//       </div>

//       <AddNewProduct api={api} openAdd={openAdd} setOpenAdd={setOpenAdd} />
     

//       <MainModal
//         setChecked={setChecked}
//         api={api}
//         checked={checked}
//         open={open}
//         setOpen={setOpen}
//         setBadgeCount={setBadgeCount}
//       />
//       {checked?.length ? (
//         <p
//           onClick={handleClickOpen}
//           className="fixed cursor-pointer bottom-10 right-10 "
//         >
//           <Badge color="primary" badgeContent={badgeCount}>
//             <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
//           </Badge>
//         </p>
//       ) : ( 
//         ""
//       )}
//     </>
//   );
// };

// export default CompanyStore;
  
import React, { useEffect, useState, useCallback, useRef } from "react"; // Added useRef
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Badge, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { debounce } from "lodash";
import MainModal from "./MainModal";
import { useSelector } from "react-redux";
import AddNewProduct from "./AddNewProduct";
import secureLocalStorage from "react-secure-storage";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

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

const CompanyStore = () => {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [filter, setFilter] = useState({});
  const [site, setSite] = useState([]);
  const [data2, setData2] = useState([]);
  const [checked, setChecked] = useState([]);
  const [allStoreData, setAllStoreData] = useState([]);
  const [badgeCount, setBadgeCount] = useState(0);

  // FIX: Initialize `userInfo` state once from secureLocalStorage
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const info = secureLocalStorage.getItem("info");
      return info ? JSON.parse(info) : null;
    } catch (error) {
      console.error("Failed to parse user info from local storage", error);
      return null;
    }
  });

  const { selectedItem } = useSelector((state) => state.itemReducer);
  const navigate = useNavigate();

  // Helper function to parse ActivityLog and find the latest date
  const getLatestRemarkDate = useCallback((activityLogString) => {
    try {
      const activities = JSON.parse(activityLogString);
      if (!Array.isArray(activities) || activities.length === 0) {
        return null;
      }

      const latestDate = activities.reduce((latest, current) => {
        const currentDate = new Date(current.date);
        return latest === null || currentDate > latest ? currentDate : latest;
      }, null);

      return latestDate;
    } catch (e) {
      console.error("Error parsing ActivityLog:", e, activityLogString);
      return null;
    }
  }, []); // No dependencies, so this function itself is stable

  // Refactored api call to only run when selectedItem changes or userInfo.data changes
  const fetchDataAndSort = useCallback(() => {
    // Only proceed if userInfo and userInfo.data are available
    if (!userInfo || !userInfo.data) {
      // Optionally handle the case where user info isn't ready
      console.warn("User info not available, skipping data fetch.");
      return;
    }

    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=inStore`,
        {
          ...userInfo.data, // Use the stable userInfo.data
        }
      )
      .then((res) => {
        const rawData = res.data.Data;
        if (Array.isArray(rawData)) {
          const sortedData = [...rawData].sort((itemA, itemB) => {
            const dateA = getLatestRemarkDate(itemA.ActivityLog);
            const dateB = getLatestRemarkDate(itemB.ActivityLog);

            if (dateA && dateB) {
              return dateB.getTime() - dateA.getTime();
            }
            if (dateA) return -1;
            if (dateB) return 1;
            return 0;
          });

          setAllStoreData(sortedData);
          setData2(sortedData);
        } else {
          console.error("API response data is not an array:", res.data);
          setAllStoreData([]);
          setData2([]);
        }
      })
      .catch((err) => console.error("Error fetching data:", err.message));
  }, [selectedItem, userInfo?.data, getLatestRemarkDate]); // Depend on userInfo.data (it's stable now)

  useEffect(() => {
    fetchDataAndSort(); // Call the fetch function once on mount and when selectedItem/userInfo.data changes
  }, [fetchDataAndSort]); // Depend on the memoized fetchDataAndSort

  useEffect(() => {
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        setSite(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []); // This runs only once on mount

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      let filtered = [...allStoreData];

      if (filter?.Meter_Serial_No && filter.Meter_Serial_No.trim() !== "") {
        filtered = filtered.filter((item) =>
          String(item.Meter_Serial_No)
            .toUpperCase()
            .includes(filter.Meter_Serial_No.trim().toUpperCase())
        );
      }

      if (filter?.Category && filter.Category.trim() !== "") {
        filtered = filtered.filter((item) => {
          return item.Category?.trim()
            .toUpperCase()
            ?.includes(filter.Category.trim().toUpperCase());
        });
      }
      setData2(filtered);
    }, 50);

    debouncedFilter();
    return () => {
      debouncedFilter.cancel();
    };
  }, [filter, allStoreData]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleCheck = (e, item) => {
    const isChecked = e.target.checked;

    setAllStoreData((prevData) =>
      prevData.map((valItem) =>
        valItem.Sr_NO === item.Sr_NO
          ? { ...valItem, checked: isChecked }
          : valItem
      )
    );

    if (isChecked) {
      if (checked.length < 25) {
        setChecked((prevChecked) => [...prevChecked, item]);
        setBadgeCount((prevCount) => prevCount + 1);
      } else {
        alert("You can select a maximum of 25 products");
        e.preventDefault();
        setAllStoreData((prevData) =>
          prevData.map((valItem) =>
            valItem.Sr_NO === item.Sr_NO
              ? { ...valItem, checked: false }
              : valItem
          )
        );
      }
    } else {
      setChecked((prevChecked) =>
        prevChecked.filter((checkedItem) => checkedItem.Sr_NO !== item.Sr_NO)
      );
      setBadgeCount((prevCount) => prevCount - 1);
    }
  };

  const excelData =
    data2 &&
    data2?.map((item) => {
      const latestDate = getLatestRemarkDate(item.ActivityLog);
      const formattedLatestDate = latestDate
        ? latestDate.toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        : "N/A";

      return {
        Product_Sr_No: item.Meter_Serial_No,
        Created_At: new Date(item.createdAt).toLocaleString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
        Category: item.Category,
        "Last Remark Date": formattedLatestDate,
      };
    });

  const downloadExcel = (excelData) => {
    if (excelData.length === 0) {
      alert("No data to export to Excel.");
      return;
    }
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(wb, ws, "CompanyStoreData");
    XLSX.writeFile(
      wb,
      `CompanyStore-Excel-${new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}.xlsx`
    );
  };
  return (
    <>
      <div
        className={`pt-3 flex flex-col sm:flex-row sm:items-center gap-3 px-4 pb-3 sm:justify-between ${
          userInfo?.data?.Designation === "storekeeper" ? "w-full" : "" // Use userInfo for rendering logic
        }`}
      >
        {userInfo?.data?.Designation === "storekeeper" && (
          <Button
            variant="contained"
            onClick={() => downloadExcel(excelData)}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Excel
          </Button>
        )}

        <input
          name="Meter_Serial_No"
          onChange={(e) => handleFilterChange(e)}
          value={filter.Meter_Serial_No ?? ""}
          className="border-2 py-2 px-5 w-full sm:w-[300px] border-gray-500 rounded"
          placeholder="Serial Numbers"
        />

        <select
          name="Category"
          onChange={(e) => handleFilterChange(e)}
          value={filter?.Category ?? ""}
          className="border-2 py-2 px-5 w-full sm:w-[300px] border-gray-500 rounded"
        >
          <option value="">Category</option>
          <option value="A">Class A</option>
          <option value="B">Class B</option>
        </select>

        <h1 className="text-center sm:text-left">
          No. of Products: {data2?.length ?? 0}
        </h1>

        <div>
          {userInfo?.data?.Designation === "storekeeper" && (
            <Button
              onClick={() => setOpenAdd(true)}
              variant="contained"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Add New
            </Button>
          )}
        </div>
      </div>
      <div className="flex">
        <TableContainer
          sx={{ width: "700px", margin: "0 auto" }}
          component={Paper}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" sx={{ padding: 0 }}>
                  Category
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                  Serial No
                </StyledTableCell>

                <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                  Registered On
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                  Last Remark Date
                </StyledTableCell>
                {userInfo?.data?.Designation === "storekeeper" && (
                  <StyledTableCell align="center" sx={{ paddingX: 2 }}>
                    Options
                  </StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data2 &&
                data2?.map((item, i) => {
                  const registeredDate = new Date(item.createdAt);
                  const options = {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  };
                  const formattedRegisteredDate = registeredDate.toLocaleString(
                    "en-US",
                    options
                  );

                  const latestRemarkDate = getLatestRemarkDate(
                    item.ActivityLog
                  );
                  const formattedLatestRemarkDate = latestRemarkDate
                    ? latestRemarkDate.toLocaleString("en-US", options)
                    : "N/A";

                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">
                        {item.Category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.Meter_Serial_No}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {formattedRegisteredDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {formattedLatestRemarkDate}
                      </StyledTableCell>
                      {userInfo?.data?.Designation === "storekeeper" && (
                        <StyledTableCell align="center">
                          <input
                            className="cursor-pointer"
                            checked={item?.checked || false}
                            onChange={(e) => handleCheck(e, item)}
                            type="checkbox"
                          />
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {userInfo?.data?.Designation === "storekeeper" && (
          <div className="w-[600px] overflow-x-scroll">
            <TableContainer
              sx={{ width: "800px", margin: "0 auto" }}
              component={Paper}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ padding: 0 }}>
                      Category
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                      Serial No.
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                      Activity Log
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checked?.map((item, i) => {
                    const activity = item.ActivityLog
                      ? JSON.parse(item.ActivityLog)
                      : [];
                    return (
                      <StyledTableRow key={i}>
                        <StyledTableCell sx={{ minWidth: 120 }} align="center">
                          {item.Category}
                        </StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 120 }} align="center">
                          {item.Meter_Serial_No}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {activity?.map((logItem, index) => {
                            return (
                              <p
                                key={index}
                                className="grid grid-cols-2 gap-x-5 text-left"
                              >
                                <span className="w-[150px]">
                                  {logItem.date}
                                </span>
                                <span className="w-[200px]">
                                  {logItem.remark}
                                </span>
                              </p>
                            );
                          })}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>

      <AddNewProduct
        api={fetchDataAndSort}
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
      />

      <MainModal
        setChecked={setChecked}
        api={fetchDataAndSort} // Changed to fetchDataAndSort
        checked={checked}
        open={open}
        setOpen={setOpen}
        setBadgeCount={setBadgeCount}
      />
      {checked?.length ? (
        <p
          onClick={handleClickOpen}
          className="fixed cursor-pointer bottom-10 right-10 "
        >
          <Badge color="primary" badgeContent={badgeCount}>
            <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
          </Badge>
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default CompanyStore;