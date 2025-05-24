import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Badge } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { debounce } from "lodash";
import  secureLocalStorage  from  "react-secure-storage";
import InCompleteSimDialog from "./InCompleteSimDialog";
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

const InCompleteSim = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [filter, setFilter] = useState({});
  const [site, setSite] = useState([]);
  const [data2, setData2] = useState([]);
  const [checked, setChecked] = useState([]);
  const [val, setVal] = useState([]);
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  useEffect(() => {
    axios
      .post(window.MyApiRoute + "sim/get?check=allInStore", {
        ...a.data,
      })
      .then((res) => (setVal(res.data.data), setData2(res.data.data)))
      .catch((err) => console.log("error"));
  }, [refresh]);
  useEffect(() => {
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        return setSite(res.data.data);
        // console.log(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (filter?.Sim_Number?.trim() === "") {
        setData2(val);
      } else if (filter?.Sim_Number) {
        const newData = val.filter((item) =>
          String(item.PhoneNumber)
            .toUpperCase()
            .includes(filter.Sim_Number.trim().toUpperCase())
        );
        setData2(newData);
      } else if (filter?.IMEI_Number === "") {
        setData2(val);
      } else if (filter?.IMEI_Number) {
        const newData = val.filter((item) =>
          String(item.IMEI).includes(filter.IMEI_Number)
        );
        setData2(newData);
      } else {
        setData2(val);
      }
    }, 50);

    debouncedFilter(); // Invoke the debounced function immediately after defining it

    return () => {
      debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
    };
  }, [filter, val]);
  const handleClickOpen = () => {
    setOpen(true);
  };
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
  const handleCheck = (e, item) => {
    const isChecked = e.target.checked;
    const newData = val.map((valItem) =>
      valItem.Sr_NO === item.Sr_NO
        ? { ...valItem, checked: isChecked }
        : valItem
    );
    setVal(newData);

    if (isChecked) {
      setChecked((prevChecked) => [...prevChecked, item]);
    } else {
      setChecked((prevChecked) =>
        prevChecked.filter((checkedItem) => checkedItem.Sr_NO !== item.Sr_NO)
      );
    }
  };
  return (
    <>
      <div
        className={`pt-3 flex ${
          a.data.Designation === "storekeeper" ? "w-1/2" : ""
        } flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around pb-3`}
      >
        <input
          name="Sim_Number"
          debounce={300}
          onChange={(e) => handleFilterChange(e)}
          value={filter.Sim_Number ?? ""}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Sim No."
        />
        <input
          name="IMEI_Number"
          value={filter.IMEI_Number ?? ""}
          onChange={(e) => handleFilterChange(e)}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="IMEI No."
        />
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
                  Sim No.
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                  IMEI No.
                </StyledTableCell>
                {/* <StyledTableCell align="center" sx={ { paddingX: 0 } }>Registered By</StyledTableCell> */}
                <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                  Registered On
                </StyledTableCell>
                {a.data.Designation === "storekeeper" && (
                  <StyledTableCell align="center" sx={{ paddingX: 2 }}>
                    Options
                  </StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data2?.map((item, i) => {
                // const date = (new Date(item.createdAt)).toLocaleString();
                const date = new Date(item.createdAt);
                const options = {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                };
                const formattedDate = date.toLocaleString("en-US", options);
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">
                      {item.PhoneNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.IMEI}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">{ item.Sim_CreatedBy }</StyledTableCell> */}
                    <StyledTableCell align="center">
                      {formattedDate}
                    </StyledTableCell>
                    {a.data.Designation === "storekeeper" && (
                      <StyledTableCell align="center">
                        <input
                          className="cursor-pointer"
                          checked={item?.checked ? true : false}
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
        {a.data.Designation === "storekeeper" && (
          <div className="w-[600px] overflow-x-scroll">
            <TableContainer
              sx={{ width: "800px", margin: "0 auto" }}
              component={Paper}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ padding: 0 }}>
                      Sim No.
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                      IMEI No.
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                      Activity Log
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checked?.map((item, i) => {
                    const activity = JSON.parse(item.ActivityLog);
                    console.log(activity);
                    return (
                      <StyledTableRow key={i}>
                        <StyledTableCell align="center">
                          {item.PhoneNumber}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.IMEI}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {activity?.map((item, i) => {
                            return (
                              <p
                                key={i}
                                className="grid grid-cols-2 gap-x-5 text-left"
                              >
                                <span className="w-[150px]">{item.date}</span>
                                <span className="w-[200px]">{item.remark}</span>
                              </p>
                            );
                          })}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center"><input className='cursor-pointer' checked={ item?.checked ? true : false } onChange={ (e) => handleCheck(e, item) } type="checkbox" /></StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
      {/* <ProductionModal setOpen={ setOpen } open={ open } /> */}
      <InCompleteSimDialog
        setChecked={setChecked}
        setRefresh={setRefresh}
        checked={checked}
        open={open}
        setOpen={setOpen}
      />
      {checked.length ? (
        <p
          onClick={handleClickOpen}
          className="fixed cursor-pointer bottom-10 right-10 "
        >
          <Badge color="primary" badgeContent={checked.length}>
            <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
          </Badge>
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default InCompleteSim;
