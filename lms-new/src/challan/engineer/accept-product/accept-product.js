
// import React, { useEffect, useState } from "react";
// import {
//   Autocomplete,
//   Badge,
//   Button,
//   Checkbox,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import RemarkModal from "./modal";
// import { ProductList } from "../../../constants/ProductList";
// import qs from "query-string";
// import secureLocalStorage from "react-secure-storage";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#191818",
//     color: theme.palette.common.white,
//     paddingX: 0,
//     minWidth: 200,
//     fontWeight: 800,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     padding: 0,
//     minWidth: 200,
//     textAlign: "center",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: "#ddd",
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// let oldList = [...ProductList];
// oldList.shift();
// const newList = [["Three Phase Meter", " "], ...ProductList];

// const AcceptProducts = () => {
//   const pageSize = [5, 10, 20, 50, 100];
//   const a = JSON.parse(secureLocalStorage.getItem("info"));

//   const initialState = {
//     location: "siteToStore",
//     Employee_Id: "",
//     // category: "3-phaseMeter",
//     Meter_Serial_No: "",
//     challanNumber: "",
//     category: "3-phaseMeter",
//   };

//   const [engineer, setEngineer] = useState([]);
//   const [state, setState] = useState({
//     data: [],
//     loading: false,
//     error: "",
//   });

//   const [selectedRows, setSelectedRows] = useState([]);

//   const [modal, setModal] = useState({
//     data: [],
//     open: false,
//   });

//   const [query, setQuery] = useState(initialState);
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

//   const getEngineer = () => {
//     axios
//       .get(`${window.MyApiRoute}employee/names`)
//       .then((res) => {
//         const engineerData = res.data.data.filter(
//           (employee) => employee?.Designation === "engineer"
//         );

//         setEngineer(engineerData);
//       })
//       .catch((err) => {
//         console.log("Error", err);
//       });
//   };

//   const handleChangeQuery = (name, value) => {
//     setQuery((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const getProducts = async () => {
//     try {
//       setState((prevState) => ({ ...prevState, loading: true }));
//       const url = qs.stringifyUrl({
//         url: `${window.MyApiRoute}record/get`,
//         query,
//       });
//       const { data } = await axios.post(url, userInfo);
//       setState((prevState) => ({ ...prevState, data: data, error: "" }));
//     } catch (error) {
//       setState((prevState) => ({ ...prevState, error: error.message }));
//     } finally {
//       setState((prevState) => ({ ...prevState, loading: false }));
//     }
//   };

//   useEffect(() => {
//     getEngineer();
//     getProducts();
//   }, [query]);

//   const handleCheckboxChange = (event, item) => {
//     const { checked } = event.target;
//     if (checked) {
//       setSelectedRows((prevSelectedRows) => [...prevSelectedRows, item]);
//     } else {
//       setSelectedRows((prevSelectedRows) =>
//         prevSelectedRows.filter((selectedItem) => selectedItem !== item)
//       );
//     }
//   };

//   const openModal = () => {
//     setModal({
//       data: selectedRows,
//       open: true,
//       userInfo: userInfo,
//     });
//   };
//   //  console.log("modal",modal)
//   return (
//     <section>
//       {modal.open && (
//         <RemarkModal
//           modal={modal}
//           setModal={setModal}
//           setSelectedRows={setSelectedRows}
//           getProducts={getProducts}
//           query={query.category}
//         />
//       )}
//       <main className="flex justify-around items-center py-2">
//         <Autocomplete
//           // onChange={(e, f) => console.log(f)}
//           onChange={(e, f) =>
//             handleChangeQuery("Employee_Id", f?.Employee_Id ?? "")
//           }
//           className="w-[250px]"
//           name="selectEngineer"
//           options={engineer.map((option) => option)}
//           getOptionLabel={(option) =>
//             `${option.Name.toUpperCase()} , ID: ${option.Employee_Id} `
//           }
//           renderInput={(params) => (
//             <TextField {...params} label="Select Engineer" />
//           )}
//         />
//         <TextField
//           label="Challan Number"
//           onChange={(e) => handleChangeQuery("challanNumber", e.target.value)}
//           placeholder="Challan Number"
//         />

//         <TextField
//           label="Product SrNo"
//           onChange={(e) => handleChangeQuery("Meter_Serial_No", e.target.value)}
//           placeholder="Product SrNo"
//         />
//         <Autocomplete
//           onChange={(e, f) => handleChangeQuery("category", f?.[1] ?? "")}
//           defaultValue={newList[0]}
//           className="w-[250px]"
//           name="Select Product"
//           options={newList.slice(2, 30).map((option) => option)}
//           getOptionLabel={(option) => option[0]}
//           renderInput={(params) => (
//             <TextField {...params} label="Select Product" />
//           )}
//         />

//         {/* <Button onClick={getProducts} variant="contained">
//           Search
//         </Button> */}
//       </main>
//       <div>
//         <TableContainer sx={{ marginBottom: 3 }} component={Paper}>
//           <Table aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="center">Select</StyledTableCell>
//                 <StyledTableCell align="center">Challan No.</StyledTableCell>
//                 <StyledTableCell align="center">Product Sr No.</StyledTableCell>

//                 <StyledTableCell align="center">Engineer Name</StyledTableCell>
//                 <StyledTableCell align="center">Engineer ID</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {state.loading ? (
//                 <StyledTableRow>
//                   <StyledTableCell
//                     colSpan={6}
//                     className="w-full h-[300px] animate-pulse !text-3xl !text-center"
//                   >
//                     Loading ...
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ) : state.error ? (
//                 <StyledTableRow>
//                   <StyledTableCell
//                     colSpan={6}
//                     className="w-full h-[300px] !text-3xl !text-center"
//                   >
//                     Some Error Occured
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ) : state?.data?.Data?.length ? (
//                 state?.data.Data?.filter(item => item.Meter_Serial_No).map((item, index) => {
//                   return (
//                     <StyledTableRow key={index}>
//                       <StyledTableCell>
//                         <Checkbox
//                           onChange={(event) =>
//                             handleCheckboxChange(event, item)
//                           }
//                         />
//                       </StyledTableCell>
//                       <StyledTableCell>{item.challanNumber}</StyledTableCell>
//                       <StyledTableCell>{item.Meter_Serial_No}</StyledTableCell>

//                       <StyledTableCell>{item.IssueForEngineer}</StyledTableCell>
//                       <StyledTableCell>{item.Employee_Id}</StyledTableCell>
//                     </StyledTableRow>
//                   );
//                 })
//               ) : (
//                 <StyledTableRow>
//                   <StyledTableCell
//                     colSpan={6}
//                     className="w-full h-[300px] !text-3xl !text-center"
//                   >
//                     No Data Found
//                   </StyledTableCell>
//                 </StyledTableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//       <div className="flex px-10 justify-between items-center">
//         <Badge badgeContent={selectedRows.length} color="error">
//           <Button onClick={openModal} variant="contained">
//             Submit
//           </Button>
//         </Badge>
//         <div className="flex items-center gap-x-4"></div>
//       </div>
//     </section>
//   );
// };

// export default AcceptProducts;
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import RemarkModal from "./modal";
import { ProductList } from "../../../constants/ProductList";
import qs from "query-string";
import secureLocalStorage from "react-secure-storage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#191818",
    color: theme.palette.common.white,
    paddingX: 0,
    minWidth: 200,
    fontWeight: 800,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 0,
    minWidth: 200,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ddd",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let oldList = [...ProductList];
oldList.shift();
const newList = [["Three Phase Meter", " "], ...ProductList];

const AcceptProducts = () => {
  const pageSize = [5, 10, 20, 50, 100];
  const a = JSON.parse(secureLocalStorage.getItem("info"));

  const initialState = {
    location: "siteToStore",
    Employee_Id: "",
    // category: "3-phaseMeter",
    Meter_Serial_No: "",
    challanNumber: "",
    category: "3-phaseMeter",
  };

  const [engineer, setEngineer] = useState([]);
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: "",
  });

  const [selectedRows, setSelectedRows] = useState([]);

  const [modal, setModal] = useState({
    data: [],
    open: false,
  });

  const [query, setQuery] = useState(initialState);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

  const getEngineer = () => {
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => {
        const engineerData = res.data.data.filter(
          (employee) => employee?.Designation === "engineer"
        );

        setEngineer(engineerData);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleChangeQuery = (name, value) => {
    setQuery((prevState) => ({ ...prevState, [name]: value }));
  };

  const getProducts = async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const url = qs.stringifyUrl({
        url: `${window.MyApiRoute}record/get`,
        query,
      });
      const { data } = await axios.post(url, userInfo);
      setState((prevState) => ({ ...prevState, data: data, error: "" }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error.message }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    getEngineer();
    getProducts();
  }, [query]);

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, item]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  const openModal = () => {
    setModal({
      data: selectedRows,
      open: true,
      userInfo: userInfo,
    });
  };
  //  console.log("modal",modal)
  return (
    <section>
      {modal.open && (
        <RemarkModal
          modal={modal}
          setModal={setModal}
          setSelectedRows={setSelectedRows}
          getProducts={getProducts}
          query={query.category}
        />
      )}
      <main className="flex justify-around items-center py-2">
        <Autocomplete
          // onChange={(e, f) => console.log(f)}
          onChange={(e, f) =>
            handleChangeQuery("Employee_Id", f?.Employee_Id ?? "")
          }
          className="w-[250px]"
          name="selectEngineer"
          options={engineer.map((option) => option)}
          getOptionLabel={(option) =>
            `${option.Name.toUpperCase()} , ID: ${option.Employee_Id} `
          }
          renderInput={(params) => (
            <TextField {...params} label="Select Engineer" />
          )}
        />
        <TextField
          label="Challan Number"
          onChange={(e) => handleChangeQuery("challanNumber", e.target.value)}
          placeholder="Challan Number"
        />

        <TextField
          label="Product SrNo"
          onChange={(e) => handleChangeQuery("Meter_Serial_No", e.target.value)}
          placeholder="Product SrNo"
        />
        <Autocomplete
          onChange={(e, f) => handleChangeQuery("category", f?.[1] ?? "")}
          defaultValue={newList[0]}
          className="w-[250px]"
          name="Select Product"
          options={newList.slice(2, 30).map((option) => option)}
          getOptionLabel={(option) => option[0]}
          renderInput={(params) => (
            <TextField {...params} label="Select Product" />
          )}
        />

        {/* <Button onClick={getProducts} variant="contained">
          Search
        </Button> */}
      </main>
      <div>
        <TableContainer sx={{ marginBottom: 3 }} component={Paper}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Select</StyledTableCell>
                <StyledTableCell align="center">Challan No.</StyledTableCell>
                <StyledTableCell align="center">Product Sr No.</StyledTableCell>

                <StyledTableCell align="center">Engineer Name</StyledTableCell>
                <StyledTableCell align="center">Engineer ID</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.loading ? (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={6}
                    className="w-full h-[300px] animate-pulse !text-3xl !text-center"
                  >
                    Loading ...
                  </StyledTableCell>
                </StyledTableRow>
              ) : state.error ? (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={6}
                    className="w-full h-[300px] !text-3xl !text-center"
                  >
                    Some Error Occured
                  </StyledTableCell>
                </StyledTableRow>
              ) : state?.data?.Data?.length ? (
                state?.data.Data?.filter(item => item.Meter_Serial_No).map((item, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Checkbox
                          onChange={(event) =>
                            handleCheckboxChange(event, item)
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>{item.challanNumber}</StyledTableCell>
                      <StyledTableCell>{item.Meter_Serial_No}</StyledTableCell>

                      <StyledTableCell>{item.IssueForEngineer}</StyledTableCell>
                      <StyledTableCell>{item.Employee_Id}</StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={6}
                    className="w-full h-[300px] !text-3xl !text-center"
                  >
                    No Data Found
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex px-10 justify-between items-center">
        <Badge badgeContent={selectedRows.length} color="error">
          <Button onClick={openModal} variant="contained">
            Submit
          </Button>
        </Badge>
        <div className="flex items-center gap-x-4"></div>
      </div>
    </section>
  );
};

export default AcceptProducts;