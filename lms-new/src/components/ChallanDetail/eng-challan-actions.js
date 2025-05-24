// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import Table from "@mui/material/Table";
// // import TableBody from "@mui/material/TableBody";
// // import TableContainer from "@mui/material/TableContainer";
// // import TableHead from "@mui/material/TableHead";
// // import TableRow from "@mui/material/TableRow";
// // import Paper from "@mui/material/Paper";
// // import { styled } from "@mui/material/styles";
// // import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// // import { Button, Checkbox } from "@mui/material";
// // import Box from "@mui/material/Box";
// // import Typography from "@mui/material/Typography";
// // import Modal from "@mui/material/Modal";
// // import { TextField } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// // import secureLocalStorage from "react-secure-storage";
// // import EngOtherProductModal from "./eng-other-product-modal";

// // const StyledTableCell = styled(TableCell)(({ theme }) => ({
// //   [`&.${tableCellClasses.head}`]: {
// //     backgroundColor: "#191818",
// //     color: theme.palette.common.white,
// //   },
// //   [`&.${tableCellClasses.body}`]: {
// //     fontSize: 14,
// //   },
// // }));

// // const StyledTableRow = styled(TableRow)(({ theme }) => ({
// //   "&:nth-of-type(odd)": {
// //     backgroundColor: "#ddd",
// //   },
// //   "&:last-child td, &:last-child th": {
// //     border: 0,
// //   },
// // }));

// // const EngChallanActions = ({ item, actions }) => {
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [remark, setRemark] = useState("");
// //   const navigate = useNavigate();
// //   const [challanProducts, setChallanProducts] = useState(item);
// //   const [modal, setModal] = useState({
// //     open: false,
// //     data: {}
// //   });
// //   useEffect(() => {
// //     setChallanProducts(item);
// //   }, [item]);
// //   const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
// //   const toggleSelectedRows = (row) => {

// //     const updatedSelectedRows = [...selectedRows];
// //     let selected = updatedSelectedRows.some(item => item.id === row.id);
// //     if (selected) {
// //       const removed = updatedSelectedRows.filter(item => item.id !== row.id);
// //       setSelectedRows(removed);
// //     } else {
// //       updatedSelectedRows.push(row);
// //       setSelectedRows(updatedSelectedRows);
// //     }
// //   };
// //   // if (!actions) return null;
// //   // console.log('toggleSelectedRows', selectedRows);

// //   const onModalOpen = (row) => {
// //     if (row.EngineerRecievingTime === null) {
// //       return alert("Please accept the product in Customer Site first");
// //     }
// //     console.log('onModalOpen', row);
// //     setModal({
// //       open: true,
// //       data: row,
// //     });
// //   };
// //   const handleSubmit = () => {
// //     console.log({
// //       ...userInfo,
// //       remark: remark,
// //       sim: selectedRows,
// //     });
// //     axios
// //       .put(`${window.MyApiRoute}record/update?check=return`, {
// //         ...userInfo,
// //         remark: remark,
// //         sim: selectedRows,
// //       })
// //       .then((res) => {
// //         alert("Record Updated Successfully");
// //         navigate(0);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   };
// //   console.log('challanProducts', challanProducts);
// //   return (
// //     <div className="border-2 p-2 shadow-md">
// //       {
// //         modal.open && <EngOtherProductModal setChallanProducts={setChallanProducts} setSelectedRows={setSelectedRows} selectedRows={selectedRows} modal={modal} setModal={setModal} />
// //       }
// //       <TableContainer sx={{ paddingY: 0 }} component={Paper}>
// //         <Table stickyHeader aria-label="sticky table">
// //           <TableHead>
// //             <TableRow>
// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 200, fontWeight: 800 }}
// //                 align="center"
// //               >
// //                 <p className="flex flex-col">
// //                   <span> Challan No: {item.challanNumber}</span>
// //                   <span> Issued To: {challanProducts?.Products[0]?.issueToEngineer}</span>
// //                 </p>
// //               </StyledTableCell>
// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 200 }}
// //                 align="center"
// //               >
// //                 P Name
// //               </StyledTableCell>
// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 100 }}
// //                 align="center"
// //               >
// //                 Serial No.
// //               </StyledTableCell>
// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 100 }}
// //                 align="center"
// //               >
// //                 In Leiu
// //               </StyledTableCell>

// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 200 }}
// //                 align="center"
// //               >
// //                 Send By Store
// //               </StyledTableCell>
// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 200 }}
// //                 align="center"
// //               >
// //                 Accepted By Eng.
// //               </StyledTableCell>
// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 200 }}
// //                 align="center"
// //               >
// //                 Send By Eng.
// //               </StyledTableCell>
// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 200 }}
// //                 align="center"
// //               >
// //                 Accepted by Store
// //               </StyledTableCell>

// //               <StyledTableCell
// //                 sx={{ paddingX: 0, minWidth: 400 }}
// //                 align="center"
// //               >
// //                 Activity
// //               </StyledTableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {
// //               challanProducts?.Products.map((product, index) => {
// //                 const remarks = JSON.parse(product.ActivityLog);
// //                 const lastRemark = remarks?.slice(-1);
// //                 return (
// //                   <StyledTableRow key={index}>
// //                     <StyledTableCell
// //                       align="center"
// //                     >
// //                       {
// //                         product.status === "close" ? <span className="font-semibold text-lg">Closed</span> : <>
// //                           <Button
// //                             variant="outlined"
// //                             onClick={() => onModalOpen(product)}
// //                             disabled={product.status === "close"}
// //                             sx={{ marginRight: 2, textTransform: "none" }}
// //                           >
// //                             Other
// //                           </Button>
// //                           <button onClick={(e) => {
// //                             if (product.EngineerRecievingTime === null) {
// //                               e.preventDefault();
// //                               return alert("Please accept the product in Customer Site first");
// //                             }
// //                           }}>
// //                             <Checkbox onChange={() => toggleSelectedRows(product)} disabled={product.status === "close"} />
// //                           </button>
// //                         </>
// //                       }

// //                     </StyledTableCell>
// //                     <StyledTableCell align="center">
// //                       {product.productType}
// //                     </StyledTableCell>
// //                     <StyledTableCell align="center">
// //                       {product.productSrNo}
// //                     </StyledTableCell>
// //                     <StyledTableCell align="center">
// //                       {product.otherProductSrNo}
// //                     </StyledTableCell>

// //                     <StyledTableCell align="center">
// //                       {product.outTime || "-"}
// //                     </StyledTableCell>
// //                     <StyledTableCell align="center">
// //                       {product.EngineerRecievingTime || "-"}
// //                     </StyledTableCell>
// //                     <StyledTableCell align="center">
// //                       {product.EngineerHandoverTime || "-"}
// //                     </StyledTableCell>
// //                     <StyledTableCell align="center">
// //                       {product.inTime || "-"}
// //                     </StyledTableCell>
// //                     <StyledTableCell align="start">
// //                       {/* {
// //                          remarks.map((item, index) => (
// //                              <p className="flex gap-x-3">
// //                                  <span>{item.date}</span>
// //                                  <span>{item.remark}</span>
// //                              </p>
// //                          ))
// //                        } */}
// //                       <p className="flex gap-x-3">
// //                         <span>{lastRemark?.[0].date || ""}</span>
// //                         <span>{lastRemark?.[0].remark || ""}</span>
// //                       </p>

// //                     </StyledTableCell>
// //                   </StyledTableRow>
// //                 );
// //               })
// //             }
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //       <div className="pb-10 px-2 w-1/2 gap-x-4 flex items-center ">
// //         <div className="flex flex-1 gap-x-4 items-center">
// //           <p className="font-bold">Remark:</p>
// //           <textarea
// //             rows={3}
// //             className="border border-gray-700 w-full rounded-md p-[4px]"
// //             placeholder="Remark"
// //             name="remark"
// //             onChange={(e) => setRemark(e.target.value)}
// //           />
// //         </div>
// //         <Button onClick={handleSubmit} variant="contained">
// //           Submit
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EngChallanActions;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { Button, Checkbox } from "@mui/material";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import secureLocalStorage from "react-secure-storage";
// import EngOtherProductModal from "./eng-other-product-modal";

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
//     backgroundColor: "#ddd",
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const EngChallanActions = ({ item, actions }) => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [remark, setRemark] = useState("");
//   const navigate = useNavigate();
//   const [challanProducts, setChallanProducts] = useState(item);
//   const [modal, setModal] = useState({
//     open: false,
//     data: {}
//   });
//   useEffect(() => {
//     setChallanProducts(item);
//   }, [item]);
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
//   const toggleSelectedRows = (row) => {

//     const updatedSelectedRows = [...selectedRows];
//     let selected = updatedSelectedRows.some(item => item.id === row.id);
//     if (selected) {
//       const removed = updatedSelectedRows.filter(item => item.id !== row.id);
//       setSelectedRows(removed);
//     } else {
//       updatedSelectedRows.push(row);
//       setSelectedRows(updatedSelectedRows);
//     }
//   };
//   // if (!actions) return null;
//   // console.log('toggleSelectedRows', selectedRows);

//   const onModalOpen = (row) => {
//     if (row.EngineerRecievingTime === null) {
//       return alert("Please accept the product in Customer Site first");
//     }
//     // console.log('onModalOpen', row);
//     setModal({
//       open: true,
//       data: row,
//     });
//   };
//   const handleSubmit = () => {
//     console.log({
//       ...userInfo,
//       remark: remark,
//       sim: selectedRows,
//     });
//     axios
//       .put(`${window.MyApiRoute}record/update?check=return`, {
//         ...userInfo,
//         remark: remark,
//         sim: selectedRows,
//       })
//       .then((res) => {
//         alert("Record Updated Successfully");
//         navigate(0);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   // console.log('challanProducts', challanProducts);
//   return (
//     <div className="border-2 p-2 shadow-md">
//       {
//         modal.open && <EngOtherProductModal setChallanProducts={setChallanProducts} setSelectedRows={setSelectedRows} selectedRows={selectedRows} modal={modal} setModal={setModal} />
//       }
//       <TableContainer sx={{ paddingY: 0 }} component={Paper}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 200, fontWeight: 800 }}
//                 align="center"
//               >
//                 <p className="flex flex-col">
//                   <span> Challan No: {item.challanNumber}</span>
//                   <span> Issued To: {challanProducts?.Products[0]?.issueToEngineer}</span>
//                 </p>
//               </StyledTableCell>
//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 200 }}
//                 align="center"
//               >
//                 P Name
//               </StyledTableCell>
//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 100 }}
//                 align="center"
//               >
//                 Serial No.
//               </StyledTableCell>
//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 100 }}
//                 align="center"
//               >
//                 In Leiu
//               </StyledTableCell>

//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 200 }}
//                 align="center"
//               >
//                 Send By Store
//               </StyledTableCell>
//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 200 }}
//                 align="center"
//               >
//                 Accepted By Eng.
//               </StyledTableCell>
//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 200 }}
//                 align="center"
//               >
//                 Send By Eng.
//               </StyledTableCell>
//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 200 }}
//                 align="center"
//               >
//                 Accepted by Store
//               </StyledTableCell>

//               <StyledTableCell
//                 sx={{ paddingX: 0, minWidth: 400 }}
//                 align="center"
//               >
//                 Activity
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {
//               challanProducts?.Products.map((product, index) => {
//                 const remarks = JSON.parse(product.ActivityLog);
//                 const lastRemark = remarks?.slice(-1);
//                 return (
//                   <StyledTableRow key={index}>
//                     <StyledTableCell
//                       align="center"
//                     >
//                       {
//                         product.status === "close" ? <span className="font-semibold text-lg">Closed</span> : <>
//                           <Button
//                             variant="outlined"
//                             onClick={() => onModalOpen(product)}
//                             disabled={product.status === "close"}
//                             sx={{ marginRight: 2, textTransform: "none" }}
//                           >
//                             Other
//                           </Button>
//                           <button onClick={(e) => {
//                             if (product.EngineerRecievingTime === null) {
//                               e.preventDefault();
//                               return alert("Please accept the product in Customer Site first");
//                             }
//                           }}>
//                             <Checkbox onChange={() => toggleSelectedRows(product)} disabled={product.status === "close"} />
//                           </button>
//                         </>
//                       }

//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {product.productType}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {product.productSrNo}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {product.otherProductSrNo}
//                     </StyledTableCell>

//                     <StyledTableCell align="center">
//                       {product.outTime || "-"}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {product.EngineerRecievingTime || "-"}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {product.EngineerHandoverTime || "-"}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {product.inTime || "-"}
//                     </StyledTableCell>
//                     <StyledTableCell align="start">
//                       {/* {
//                          remarks.map((item, index) => (
//                              <p className="flex gap-x-3">
//                                  <span>{item.date}</span>
//                                  <span>{item.remark}</span>
//                              </p>
//                          ))
//                        } */}
//                       <p className="flex gap-x-3">
//                         <span>{lastRemark?.[0].date || ""}</span>
//                         <span>{lastRemark?.[0].remark || ""}</span>
//                       </p>

//                     </StyledTableCell>
//                   </StyledTableRow>
//                 );
//               })
//             }
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <div className="pb-10 pt-5 px-2 md:w-1/2 gap-x-4 flex items-center ">
//         <div className="flex flex-1 gap-x-4 items-center">
//           <p className="font-bold">Remark:</p>
//           <textarea
//             rows={3}
//             className="border border-gray-700 w-full rounded-md p-[4px]"
//             placeholder="Remark"
//             name="remark"
//             onChange={(e) => setRemark(e.target.value)}
//           />
//         </div>
//         <Button onClick={handleSubmit} variant="contained">
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default EngChallanActions;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button, Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import EngOtherProductModal from "./eng-other-product-modal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#191818",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const EngChallanActions = ({ item, actions }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();
  const [challanProducts, setChallanProducts] = useState(item);
  const [modal, setModal] = useState({
    open: false,
    data: {},
  });
  useEffect(() => {
    setChallanProducts(item);
  }, [item]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const toggleSelectedRows = (row) => {
    const updatedSelectedRows = [...selectedRows];
    let selected = updatedSelectedRows.some((item) => item.id === row.id);
    if (selected) {
      const removed = updatedSelectedRows.filter((item) => item.id !== row.id);
      setSelectedRows(removed);
    } else {
      updatedSelectedRows.push(row);
      setSelectedRows(updatedSelectedRows);
    }
  };
  // if (!actions) return null;
  // console.log('toggleSelectedRows', selectedRows);

  const onModalOpen = (row) => {
    if (row.EngineerRecievingTime === null) {
      return alert("Please accept the product in Customer Site first");
    }
    // console.log('onModalOpen', row);
    setModal({
      open: true,
      data: row,
    });
  };
  const handleSubmit = () => {
    // console.log({
    //   ...userInfo,
    //   remark: remark,
    //   sim: selectedRows,
    // });
    axios
      .put(`${window.MyApiRoute}record/update?check=return`, {
        ...userInfo,
        remark: remark,
        sim: selectedRows,
      })
      .then((res) => {
        alert("Record Updated Successfully");
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log('challanProducts', challanProducts);
  return (
    <div className="border-2 p-2 shadow-md">
      {modal.open && (
        <EngOtherProductModal
          setChallanProducts={setChallanProducts}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          modal={modal}
          setModal={setModal}
        />
      )}
      <TableContainer sx={{ paddingY: 0 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                // sx={{ paddingX: 0, minWidth: 200, fontWeight: 800 }}
                className="min-w-[180px]"
                align="center">
                <p className="flex flex-col">
                  <span> Challan No: {item.challanNumber}</span>
                  <span>
                    Issued To: {challanProducts?.Products[0]?.issueToEngineer}
                  </span>
                </p>
              </StyledTableCell>
              <StyledTableCell
                className="px-0 w-[160px] truncate"
                align="center">
                P Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center">
                Serial No.
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center">
                In Leiu
              </StyledTableCell>

              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                Send By Store
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                Accepted By Eng.
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                Send By Eng.
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center">
                Accepted by Store
              </StyledTableCell>

              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 400 }}
                align="center">
                Activity
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {challanProducts?.Products.map((product, index) => {
              const remarks = JSON.parse(product.ActivityLog);
              const lastRemark = remarks?.slice(-1);
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {product.status === "close" ? (
                      <span className="font-semibold text-lg">Closed</span>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          onClick={() => onModalOpen(product)}
                          disabled={product.status === "close"}
                          sx={{ marginRight: 2, textTransform: "none" }}>
                          Other
                        </Button>
                        <button
                          onClick={(e) => {
                            if (product.EngineerRecievingTime === null) {
                              e.preventDefault();
                              return alert(
                                "Please accept the product in Customer Site first"
                              );
                            }
                          }}>
                          <Checkbox
                            onChange={() => toggleSelectedRows(product)}
                            disabled={product.status === "close"}
                          />
                        </button>
                      </>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.productType}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.productSrNo}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.otherProductSrNo}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {product.outTime || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.EngineerRecievingTime || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.EngineerHandoverTime || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.inTime || "-"}
                  </StyledTableCell>
                  <StyledTableCell align="start">
                    {/* {
                         remarks.map((item, index) => (
                             <p className="flex gap-x-3">
                                 <span>{item.date}</span>
                                 <span>{item.remark}</span>
                             </p>
                         ))
                       } */}
                    <p className="flex gap-x-3">
                      <span>{lastRemark?.[0].date || ""}</span>
                      <span>{lastRemark?.[0].remark || ""}</span>
                    </p>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div className="pb-10 pt-5 px-2 md:w-1/2 gap-x-4 flex items-center">
        <div className="flex flex-1 gap-x-4 items-center">
          <p className="font-bold">Remark:</p>
          <textarea
            rows={3}
            className="border border-gray-700 w-full rounded-md p-[4px]"
            placeholder="Remark"
            name="remark"
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </div> */}
      <div className="px-2 py-4 md:w-1/2 flex flex-col gap-y-3">
        {/* <div> */}
        {/* <label htmlFor="remark">Remark</label> */}
        {/* <textarea
            rows={3}
            className="border border-gray-700 w-full rounded-md p-[4px]"
            placeholder="Remark"
            name="remark"
            onChange={(e) => setRemark(e.target.value)}
          /> */}
        <TextField
          label="Remark"
          rows={4}
          multiline
          placeholder="Remark"
          className="w-full"
        />
        {/* </div> */}
        {/* <div> */}
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default EngChallanActions;
