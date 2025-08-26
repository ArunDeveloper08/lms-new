// import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { Button, Badge } from "@mui/material";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { debounce } from "lodash";
// import ProductionModal from "./ProductionModal";
// import Checkbox from "@mui/material/Checkbox";
// import SendIcon from "@mui/icons-material/Send";
// import ProductionModal2 from "./ProductionModal2";
// import ProductionRemarkModal from "./ProductionRemarkModal";

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

// const Production = () => {
//   const a = JSON.parse(secureLocalStorage.getItem("info"));
//   const { selectedItem } = useSelector((state) => state.itemReducer);
//   const isStoreKeeper = a.data.Designation === "storekeeper";
//   const [filter, setFilter] = useState({});
//   const [val, setVal] = useState([]);
//   const label = { inputProps: { "aria-label": "Checkbox demo" } };

//   const [opens, setOpens] = useState("");

//   const [checkedItems, setCheckedItems] = useState([]);

//   const handleCheckboxChange = (event, item) => {
//     const { checked } = event.target;
//     if (checked) {
//       setCheckedItems([...checkedItems, item]);
//     } else {
//       const newCheckedItems = checkedItems.filter(
//         (checkedItem) => checkedItem !== item
//       );
//       setCheckedItems(newCheckedItems);
//     }
//   };

//   const [open, setOpen] = useState({
//     open: false,
//     from: "production",
//     to: "production",
//     value: {},
//   });

//   const [open1, setOpen1] = useState({
//     open: false,
//     from: "production",
//     value: {},
//   });
//   const [apiData, setApidata] = useState([]);

//   const api = (order) =>
//     axios
//       .post(
//         window.MyApiRoute +
//           `record/get?category=${selectedItem}&location=inProduction&sort=${
//             order || "DESC"
//           }`,
//         { ...a.data }
//       )
//       .then((res) => {
//         setVal(res.data.Data);
//         setApidata(res.data.Data);
//       })

//       .catch((err) => console.log("err", err));
//   useEffect(() => {
//     api();
//   }, [selectedItem]);
//   const handleRecieve = (e, v) => {
//       setOpen({
//         ...open,
//         open: true,
//         value: [v],
//       });
//   };
//   const handleFilterChange = (e) => {
//     setFilter({ [e.target.name]: e.target.value });
//   };
//   useEffect(() => {
//     const debouncedFilter = debounce(() => {
//       if (filter?.Meter_Serial_No?.trim() === "") {
//         setApidata(val);
//       } else if (filter?.Meter_Serial_No) {
//         const newData = val.filter((item) =>
//           String(item.Meter_Serial_No)
//             .toUpperCase()
//             .includes(filter.Meter_Serial_No.trim().toUpperCase())
//         );
//         setApidata(newData);
//       } else {
//         setApidata(val);
//       }
//     }, 50);
//     debouncedFilter(); // Invoke the debounced function immediately after defining it
//     return () => {
//       debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
//     };
//   }, [filter, val]);
//   const handleSubmit = () => {
//     setOpens(true);
//   };
//   return (
//     <>
//       <div
//         className={`pt-3 flex ${
//           a.data.Designation === "storekeeper" ? "w-1/2" : ""
//         } px-8 pb-3 flex justify-between`}
//       >
//         <input
//           name="Meter_Serial_No"
//           debounce={300}
//           onChange={(e) => handleFilterChange(e)}
//           value={filter.Meter_Serial_No ?? ""}
//           className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//           placeholder="Serial Number"
//         />
//         <select
//           onChange={(e) => api(e.target.value)}
//           className="border-2 w-[200px]"
//         >
//           <option value="DESC">New to Old</option>
//           <option value="ASC">Old to New</option>
//         </select>
//       </div>
//       <TableContainer component={Paper}>
//         <Table aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell
//                 sx={{ paddingX: 0, width: "200px" }}
//                 align="center"
//               >
//                 Option
//               </StyledTableCell>
//               <StyledTableCell align="center" sx={{ padding: 0 }}>
//                 Category
//               </StyledTableCell>
//               <StyledTableCell sx={{ paddingX: 0 }} align="center">
//                 Serial No.
//               </StyledTableCell>
//               <StyledTableCell sx={{ paddingX: 0 }} align="center">
//                 ID
//               </StyledTableCell>
//               <StyledTableCell sx={{ paddingX: 0, width: 100 }} align="center">
//                 Job Card No
//               </StyledTableCell>
//               <StyledTableCell sx={{ paddingX: 0, width: 700 }} align="center">
//                 Remark
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {apiData?.length &&
//               apiData.map((c, b) => {
//                 const logs = JSON.parse(c.ActivityLog);
//                 const isChecked = checkedItems.includes(c);
//                 return (
//                   <StyledTableRow key={b}>
//                     <StyledTableCell sx={{ paddingY: 1 }} align="center">
//                       {isStoreKeeper ? (
//                         <Checkbox
//                           {...label}
//                           checked={isChecked}
//                           onChange={(e) => handleCheckboxChange(e, c)}
//                         />
//                       ) : (
//                         <Button onClick={(e) => handleRecieve(e, c)} variant="contained">Add Remark</Button>
//                       )}
//                     </StyledTableCell>
//                     <StyledTableCell
//                       sx={{ paddingY: 1, textAlign: "center" }}
//                       component="th"
//                       scope="row"
//                     >
//                       {c.Category}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ paddingY: 1 }} align="center">
//                       {c.Meter_Serial_No}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ paddingY: 1 }} align="center">
//                       {c.Meter_Id ?? "-"}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ paddingY: 1 }} align="center">
//                       {c.Job_Card_No}
//                     </StyledTableCell>
//                     <StyledTableCell sx={{ paddingY: 1 }} align="center">
//                       {logs?.map((log) => (
//                         <p className="flex space-x-5 justify-center">
//                           <span>Date:{log.date}</span>
//                           <span>Remark:{log.remark}</span>
//                         </p>
//                       ))}
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <ProductionModal
//         selectedItem={selectedItem}
//         api={api}
//         setOpen1={setOpen1}
//         open1={open1}
//       />
//       {checkedItems.length ? (
//         <Badge
//           color="primary"
//           badgeContent={checkedItems.length}
//           sx={{ position: "fixed", bottom: 10, right: 20 }}
//         >
//           <SendIcon
//             sx={{ color: "#1976d2", fontSize: 40, marginTop: "5px" }}
//             onClick={handleSubmit}
//           />
//         </Badge>
//       ) : (
//         ""
//       )}
//       <ProductionModal2
//         setOpens={setOpens}
//         opens={opens}
//         checkedItems={checkedItems}
//       />
//       <ProductionRemarkModal setOpen={setOpen} api={api} open={open}/>
//     </>
//   );
// };

// export default Production;

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button, Badge, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import ProductionModal from "./ProductionModal";
import Checkbox from "@mui/material/Checkbox";
import SendIcon from "@mui/icons-material/Send";
import ProductionModal2 from "./ProductionModal2";
import ProductionRemarkModal from "./ProductionRemarkModal";
import CheckedProduct from "./CheckedProduct";
import AddRemark from "./AddRemark";
import AddNewProduct from "../companyStore/AddNewProduct";
import AddRemarkOnly from "./AddRemarkOnly";
import  secureLocalStorage  from  "react-secure-storage";
import * as XLSX from "xlsx";

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

const Production = () => {
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const { selectedItem } = useSelector((state) => state.itemReducer);
  // const isStoreKeeper = a.data.Designation === "storekeeper";
  // const isEngineer = a.data.Designation === "engineer";
  const isProduction = a.data.Designation === "production";
  const [filter, setFilter] = useState({});
  const [val, setVal] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [addRemarkProps, setAddRemarkProps] = useState({
    open: false,
    data: [],
  });
  // const [singleItem, setSingleItem] = useState({});
  const [checkedItems, setCheckedItems] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  // const handleCheckboxChange = (event, item) => {
  //   const { checked } = event.target;
  //   if (checked) {
  //     setCheckedItems([...checkedItems, item]);
  //   } else {
  //     const newCheckedItems = checkedItems.filter(
  //       (checkedItem) => checkedItem !== item
  //     );
  //     setCheckedItems(newCheckedItems);
  //   }
  // };
  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    const totalSelectedItems = checkedItems.length;
  
    if (checked && totalSelectedItems >= 15) {
      alert("You can select a maximum of 15 products");
    } else {
      if (checked) {
        setCheckedItems([...checkedItems, item]);
      } else {
        const newCheckedItems = checkedItems.filter(
          (checkedItem) => checkedItem !== item
        );
        setCheckedItems(newCheckedItems);
      }
    }
  };
  
  const [open, setOpen] = useState({
    open: false,
    from: "production",
    to: "",
  });
  const [apiData, setApidata] = useState([]);

  const api = (order) =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=inProduction&sort=${
            order || "DESC"
          }`,
        { ...a.data }
      )
      .then((res) => {
        setVal(res.data.Data);
        setApidata(res.data.Data);
      })

      .catch((err) => console.log("err", err));
  useEffect(() => {
    api();
  }, [selectedItem]);
  // const handleRecieve = (e, v) => {
  //   setSingleItem(v);
  //   setOpenAddRemark(true);
  // };
  const handleFilterChange = (e) => {
    setFilter({ [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (filter?.Meter_Serial_No?.trim() === "") {
        setApidata(val);
      } else if (filter?.Meter_Serial_No) {
        const newData = val.filter((item) =>
          String(item.Meter_Serial_No)
            .toUpperCase()
            .includes(filter.Meter_Serial_No.trim().toUpperCase())
        );
        setApidata(newData);
      } else {
        setApidata(val);
      }
    }, 50);
    debouncedFilter(); // Invoke the debounced function immediately after defining it
    return () => {
      debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
    };
  }, [filter, val]);
  const handleSubmit = () => {
    setOpen((p) => ({ ...p, open: true }));
  };


    const excelData =
    apiData &&
    apiData?.map((item) => {
      return {
        Product_Sr_No: item.Meter_Serial_No,
        Created_At: item.createdAt,
        Category: item.Category,
      };
    });
    const downloadExcel = (excelData) => {
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(excelData);
  
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(
        wb,
        `Production-Excel-${new Date().toDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}.xlsx`
      );
    };


 
  return (
    <>
      {/* <div
        className={`pt-3 flex ${
          a.data.Designation === "storekeeper" ? "w-1/1" : ""
        } px-8 pb-3 flex justify-between`}
      >
        <input
          name="Meter_Serial_No"
          debounce={300}
          onChange={(e) => handleFilterChange(e)}
          value={filter.Meter_Serial_No ?? ""}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Serial Number"
        />

        <select
          onChange={(e) => api(e.target.value)}
          className="border-2 w-[200px]"
        >
          <option value="DESC">New to Old</option>
          <option value="ASC">Old to New</option>
        </select>
        <h1> No. of Products : {apiData?.length ?? 0}</h1>
        {a.data.Designation === "production" && (
          <Button onClick={() => setOpenAdd(true)} variant="contained">
            Add New
          </Button>
        )}
      </div> */}
      <div
  className={`pt-3 flex flex-col sm:flex-row sm:items-center gap-3 px-4 pb-3 sm:justify-between ${
    a.data.Designation === "storekeeper" ? "w-full" : ""
  }`}
>
  <input
    name="Meter_Serial_No"
    debounce={300}
    onChange={(e) => handleFilterChange(e)}
    value={filter.Meter_Serial_No ?? ""}
    className="border-2 py-2 px-5 w-full sm:w-[300px] border-gray-500 rounded"
    placeholder="Serial Number"
  />

  <select
    onChange={(e) => api(e.target.value)}
    className="border-2 w-full sm:w-[200px] rounded py-2 px-5 border-gray-500"
  >
    <option value="DESC">New to Old</option>
    <option value="ASC">Old to New</option>
  </select>

    {(a.data.Designation === "storekeeper" || a.data.Designation === "CEO" ) && (
      <Button
        variant="contained"
        onClick={() => downloadExcel(excelData)}
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        Excel
      </Button>
    )}

  <h1 className="text-center sm:text-left">No. of Products: {apiData?.length ?? 0}</h1>

  {a.data.Designation === "production" && (
    <Button
      onClick={() => setOpenAdd(true)}
      variant="contained"
      sx={{ width: { xs: "100%", sm: "auto" } }}
    >
      Add New
    </Button>
  )}
</div>
      {/* <TableContainer sx={{ maxHeight: 350 }} component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              {isProduction && (
                <StyledTableCell
                  sx={{ paddingX: 0, width: "200px" }}
                  align="center"
                >
                  Option
                </StyledTableCell>
              )}
              <StyledTableCell align="center" sx={{ padding: 0 }}>
                Category
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Serial No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                ID
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0, width: 100 }} align="center">
                Job Card No
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0, width: 700 }} align="center">
                Remark
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.length &&
              apiData?.map((c, b) => {
                const logs = JSON.parse(c.ActivityLog);
                const isChecked = checkedItems.includes(c);
                return (
                  <StyledTableRow key={b}>
       
                    {isProduction && (
                      <StyledTableCell
                        sx={{
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() =>
                            setAddRemarkProps({ open: true, data: [c] })
                          }
                          variant="contained"
                        >
                          Add Remark
                        </Button>
                        <Checkbox
                          {...label}
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(e, c)}
                        />
                      </StyledTableCell>
                    )}
                    <StyledTableCell
                      sx={{ paddingY: 1, textAlign: "center" }}
                      component="th"
                      scope="row"
                    >
                      {c.Category}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {c.Meter_Serial_No}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {c.Meter_Id ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {c.Job_Card_No}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {logs?.map((log) => (
                        <p className="flex space-x-5 justify-center">
                          <span>Date:{log.date}</span>
                          <span>Remark:{log.remark}</span>
                        </p>
                      ))}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer> */}
      <TableContainer sx={{ maxHeight: 350 }} component={Paper}>
  <Table stickyHeader aria-label="customized table">
    <TableHead>
      <TableRow>
        {isProduction && (
          <StyledTableCell
            sx={{ paddingX: 0, minWidth: { xs: 150, sm: 200 }, display: { xs: "none", sm: "table-cell" } }}
            align="center"
          >
            Option
          </StyledTableCell>
        )}
        <StyledTableCell align="center" sx={{ padding: 0, minWidth: { xs: 80, sm: 100 } }}>
          Category
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 120 } }} align="center">
          Serial No.
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 80, sm: 100 } }} align="center">
          ID
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 120 } }} align="center">
          Job Card No
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 200, sm: 300, md: 700 } }} align="center">
          Remark
        </StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {apiData?.length ? (
        apiData.map((c, b) => {
          const logs = JSON.parse(c.ActivityLog);
          const isChecked = checkedItems.includes(c);
          return (
            <StyledTableRow key={b}>
              {isProduction && (
                <StyledTableCell
                  sx={{
                    textAlign: "center",
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingY: 1,
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => setAddRemarkProps({ open: true, data: [c] })}
                    variant="contained"
                  >
                    Add Remark
                  </Button>
                  <Checkbox
                    {...label}
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(e, c)}
                  />
                </StyledTableCell>
              )}
              <StyledTableCell
                sx={{ paddingY: 1, textAlign: "center" }}
                component="th"
                scope="row"
              >
                {c.Category}
              </StyledTableCell>
              <StyledTableCell sx={{ paddingY: 1 }} align="center">
                {c.Meter_Serial_No}
              </StyledTableCell>
              <StyledTableCell sx={{ paddingY: 1 }} align="center">
                {c.Meter_Id ?? "-"}
              </StyledTableCell>
              <StyledTableCell sx={{ paddingY: 1 }} align="center">
                {c.Job_Card_No}
              </StyledTableCell>
              <StyledTableCell sx={{ paddingY: 1 }} align="center">
                {logs?.map((log) => (
                  <p className="flex flex-col sm:flex-row sm:space-x-5 justify-center">
                    <span>Date: {log.date}</span>
                    <span>Remark: {log.remark}</span>
                  </p>
                ))}
              </StyledTableCell>
            </StyledTableRow>
          );
        })
      ) : (
        <StyledTableRow>
          <StyledTableCell colSpan={isProduction ? 6 : 5} align="center">
            No Data Available
          </StyledTableCell>
        </StyledTableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>

      {checkedItems?.length ? (
        <Badge
          color="primary"
          badgeContent={checkedItems?.length}
          sx={{ position: "fixed", bottom: 10, right: 20 }}
        >
          <SendIcon
            sx={{ color: "#1976d2", fontSize: 40, marginTop: "5px" }}
            onClick={handleSubmit}
          />
        </Badge>
      ) : (
        ""
      )}
      <CheckedProduct
        api={api}
        open={open}
        setOpen={setOpen}
        setCheckedItems={setCheckedItems}
        checkedItems={checkedItems}
      />
      {/*
       <AddRemark
        api={api}
        setOpenAddRemark={setOpenAddRemark}
        openAddRemark={openAddRemark}
        singleItem={singleItem}
        setSingleItem={setSingleItem}
      /> 
      */}
      <AddNewProduct api={api} openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <AddRemarkOnly
        api={api}
        setAddRemarkProps={setAddRemarkProps}
        addRemarkProps={addRemarkProps}
      />
    </>
  );
};

export default Production;
