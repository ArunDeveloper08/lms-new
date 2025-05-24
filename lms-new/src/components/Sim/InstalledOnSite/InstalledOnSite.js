// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { Button } from "@mui/material";
// import InstalledOnSiteModal from "./InstalledOnSiteModal";
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
// const InstalledOnSite = () => {
//   const info = JSON.parse(secureLocalStorage.getItem("info"));
//   const [data, setData] = useState([]);
//   const [modal, setModal] = useState({
//     open: false,
//     data: {},
//   });

//   const api = () =>
//     axios
//       .post(window.MyApiRoute + "sim/get?check=usedOnSite", {
//         ...info.data,
//       })
//       .then((res) => setData(res.data.data))
//       .catch((err) => console.log(err));
//   useEffect(() => {
//     api();
//   }, []);
//   // console.log({ data });
//   const handleSend = (data) => {
//     setModal({
//       open: true,
//       data: data,
//     });
//   };
//   return (
//     <>
//       <TableContainer sx={{ maxHeight: "75vh", paddingY: 0 }} component={Paper}>
//         <Table aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell sx={{ padding: 0 }} align="center">
//                 Options
//               </StyledTableCell>
//               <StyledTableCell sx={{ padding: 0 }} align="center">
//                 Sim No.
//               </StyledTableCell>
//               <StyledTableCell sx={{ paddingX: 0 }} align="center">
//                 IMEI No.
//               </StyledTableCell>{" "}
//               <StyledTableCell sx={{ paddingX: 0 }} align="center">
//                 Site name
//               </StyledTableCell>{" "}
//               <StyledTableCell sx={{ paddingX: 0 }} align="center">
//                 Activity Log
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data?.map((a, index) => {
//               const logs = JSON.parse(a.ActivityLog);
//               return (
//                 <StyledTableRow>
//                   <StyledTableCell align="center">
//                     <Button onClick={() => handleSend(a)} variant="contained">
//                       Recieve
//                     </Button>
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {a.PhoneNumber ?? "-"}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {a.IMEI ?? "-"}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {a.Site_Name ?? "-"}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {logs.map((log) => (
//                       <p className="flex space-x-5 justify-center">
//                         <span>Date:{log.date}</span>
//                         <span>Remark:{log.remark}</span>
//                       </p>
//                     ))}
//                   </StyledTableCell>
//                 </StyledTableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <InstalledOnSiteModal api={api} setModal={setModal} modal={modal} />
//     </>
//   );
// };

// export default InstalledOnSite;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InstalledOnSiteModal from "./InstalledOnSiteModal";
import secureLocalStorage from "react-secure-storage";
import { debounce } from "lodash";
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
const InstalledOnSite = () => {
  const info = JSON.parse(secureLocalStorage.getItem("info"));
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [data2, setData2] = useState([]);
  const [site, setSite] = useState([]);
  const [all, setAll] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    data: {},
  });

  const api = () =>
    axios
      .post(window.MyApiRoute + "sim/get?check=usedOnSite", {
        ...info.data,
      })
      .then((res) => {
        setData(res.data.data);
        setAll(res.data.data);
        setData2(res.data.data);
      })

      .catch((err) => console.log(err));
  useEffect(() => {
    api();
  }, []);

  const handleSend = (data) => {
    setModal({
      open: true,
      data: data,
    });
  };
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (filter?.Sim_Number?.trim() === "") {
        setData2(all);
      } else if (filter?.Sim_Number) {
        const newData = all.filter((item) =>
          String(item.PhoneNumber)
            .toUpperCase()
            .includes(filter.Sim_Number.trim().toUpperCase())
        );
        setData2(newData);
      } else if (filter?.IMEI_Number === "") {
        setData2(all);
      } else if (filter?.IMEI_Number) {
        const newData = all.filter((item) =>
          String(item.IMEI).includes(filter.IMEI_Number)
        );
        setData2(newData);
      } else if (filter?.Site_Name === "") {
        setData2(all);
      } else if (filter?.Site_Name) {
        const newData = all.filter((item) =>
          String(item.Site_Name).includes(filter.Site_Name)
        );
        setData2(newData);
      }
    }, 400);

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [filter]);
  useEffect(() => {
    api();
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        return setSite(res.data.data), console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleFilterChange = (e) => {
    setFilter({ [e.target.name]: e.target.value });
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "200px",
      },
    },
  };
  return (
    <>
      <div className="flex justify-around">
        <div className="w-[300px]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Site Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Site Name"
              name="Site_Name"
              onChange={(e) => handleFilterChange(e)}
              value={filter.Site_Name ?? ""}
              MenuProps={MenuProps}>
              <MenuItem value="">Site Name</MenuItem>
              {site?.map((a, b) => {
                return (
                  <MenuItem key={b} value={a.SiteName}>
                    {a.SiteName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <input
            name="IMEI_Number"
            value={filter.IMEI_Number ?? ""}
            onChange={(e) => handleFilterChange(e)}
            className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
            placeholder="IMEI No."
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around pb-3"></div>
      <TableContainer sx={{ maxHeight: "75vh", paddingY: 0 }} component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              {info.data.Designation == "storekeeper" && (
                <StyledTableCell sx={{ padding: 0 }} align="center">
                  Options
                </StyledTableCell>
              )}
              <StyledTableCell sx={{ padding: 0 }} align="center">
                Sim No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                IMEI No.
              </StyledTableCell>{" "}
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Site name
              </StyledTableCell>{" "}
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Activity Log
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2?.map((a, index) => {
              let logs = [
                {
                  date: "12-12-2000",
                  remark: "Error while parsing Activity Log",
                },
              ];
              try {
                logs = JSON.parse(a.ActivityLog);
              } catch (error) {
                console.log("error", error);
              }
              return (
                <StyledTableRow>
                  {info.data.Designation == "storekeeper" && (
                    <StyledTableCell align="center">
                      <Button onClick={() => handleSend(a)} variant="contained">
                        Recieve
                      </Button>
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">
                    {a.PhoneNumber ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.IMEI ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Site_Name ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {logs.map((log) => (
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
      </TableContainer>
      <InstalledOnSiteModal api={api} setModal={setModal} modal={modal} />
    </>
  );
};

export default InstalledOnSite;
