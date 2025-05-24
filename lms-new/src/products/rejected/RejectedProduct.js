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
import { Button, CircularProgress } from "@mui/material";
import RejectedProductModal from "./RejectedProductModal";
import { useSelector } from "react-redux";
import MainModal1 from "../MainModal/MainModal1";
import { debounce } from "lodash";
import  secureLocalStorage  from  "react-secure-storage";
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
const RejectedProduct = () => {
  const info = JSON.parse(secureLocalStorage.getItem("info"));
  const [data, setData] = useState([]);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [filter, setFilter] = useState({});
  const [val, setVal] = useState([]);
  const [open, setOpen] = useState({
    open: false,
    from: "rejected",
    to: "",
    value: {},
  });
  const [modal, setModal] = useState({
    open: false,
    data: {},
  });
  const api = (order) =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=rejected&sort=${
            order || "DESC"
          }`,
        {
          ...info.data,
        }
      )
      .then((res) => {
        setVal(res.data.Data);
        setData(res.data.Data);
      })
      .catch((err) => console.log(err));
  useEffect(() => {
    api();
  }, [selectedItem]);
  const handleClick = (item) => {
    setModal({
      open: true,
      data: item,
    });
  };
  const handleRecieve = (e, v) => {
    setOpen({
      ...open,
      open: true,
      value: v,
    });
  };

  const handleFilterChange = (e) => {
    setFilter({ [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (filter?.Meter_Serial_No?.trim() === "") {
        setData(val);
      } else if (filter?.Meter_Serial_No) {
        const newData = val.filter((item) =>
          String(item.Meter_Serial_No)
            .toUpperCase()
            .includes(filter.Meter_Serial_No.trim().toUpperCase())
        );
        setData(newData);
      } else {
        setData(val);
      }
    }, 50);

    debouncedFilter(); // Invoke the debounced function immediately after defining it
    return () => {
      debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
    };
  }, [filter, val]);

  return (
    <>
      {/* <div
        className={`pt-3 flex ${
          info.data.Designation === "storekeeper" ? "w-1/1" : ""
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
        <h1> No. of Products : {data?.length ?? 0}</h1>
        <select
          onChange={(e) => api(e.target.value)}
          className="border-2 w-[200px]"
        >
          <option value="DESC">New to Old</option>
          <option value="ASC">Old to New</option>
        </select>
      </div>
      <TableContainer sx={{ maxHeight: "67vh", paddingY: 0 }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
     
              <StyledTableCell sx={{ padding: 0 }} align="center">
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
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Activity Logs
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length &&
              data?.map((item, index) => {
                const remark = JSON.parse(item.ActivityLog);
                return (
                  <StyledTableRow key={index}>
      
                    <StyledTableCell align="center">
                      {item.Category ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Meter_Serial_No ?? "-"}
                    </StyledTableCell>
            
                    <StyledTableCell align="center">
                      {item.Meter_Id ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {item.Job_Card_No ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {remark.map((log) => (
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
      <div
  className={`pt-3 flex flex-col sm:flex-row sm:items-center gap-3 px-4 pb-3 sm:justify-between ${
    info.data.Designation === "storekeeper" ? "w-full" : ""
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
  <h1 className="text-center sm:text-left">No. of Products: {data?.length ?? 0}</h1>
  <select
    onChange={(e) => api(e.target.value)}
    className="border-2 w-full sm:w-[200px] rounded py-2 px-5 border-gray-500"
  >
    <option value="DESC">New to Old</option>
    <option value="ASC">Old to New</option>
  </select>
</div>
<TableContainer sx={{ maxHeight: "67vh", paddingY: 0 }} component={Paper}>
  <Table aria-label="customized table">
    <TableHead>
      <TableRow>
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
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 200, sm: 300 } }} align="center">
          Activity Logs
        </StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data?.length ? (
        data.map((item, index) => {
          const remark = JSON.parse(item.ActivityLog);
          return (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{item.Category ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{item.Meter_Serial_No ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{item.Meter_Id ?? "-"}</StyledTableCell>
              <StyledTableCell sx={{ paddingY: 1 }} align="center">
                {item.Job_Card_No ?? "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {remark.map((log) => (
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
          <StyledTableCell colSpan={5} align="center">
            No Data Available
          </StyledTableCell>
        </StyledTableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
      <MainModal1 api={api} open={open} setOpen={setOpen} />
      <RejectedProductModal api={api} setModal={setModal} modal={modal} />
    </>
  );
};

export default RejectedProduct;
