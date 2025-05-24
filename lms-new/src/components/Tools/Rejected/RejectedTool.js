import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

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
    backgroundColor: "#b80f768f",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RejectedTool = ( ) => {
  const [engineer, setEngineer] = useState([]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [moreDetails, setMoreDetails] = useState({
    EngineerID: "",
    remark: "",
    ToolID: "",
  });
  const [tools, setTools] = useState([]);
  const [tool, setTool] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}tool/get?location=InDustbin&ToolID=${moreDetails.ToolID || ""}`,
        userInfo
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [moreDetails]);

  useEffect(() => {
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => {
        const engineerData = res.data.data.filter(
          (employee) => employee?.Designation === "engineer"
        );

        setEngineer(engineerData);
      })
      .catch((err) => console.log({ err }));
  }, []);

  useEffect(() => {
    axios
      .get(`${window.MyApiRoute}mastertool/get`)
      .then((res) => {
        setTools(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSelect = (a, b) => {
    setMoreDetails((p) => ({ ...p, [a]: b }));
  };
  return (
    <div>
      <div>
        <div className="flex justify-around mt-[10px]">
        <input
            name="SerialNumber"
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          />
          <div>
            <Autocomplete
              //   onChange={(event, selectedTool) => setTool(selectedTool || null)}
              onChange={(e, selectedOption) =>
                handleSelect("ToolID", selectedOption?.id)
              }
              className="w-[300px] ml-10"
              name="Engineer"
              value={tool?.ToolName}
              options={tools}
              getOptionLabel={(option) => option?.ToolName || ""}
              renderInput={(params) => (
                <TextField
                  key={params}
                  value={tool?.ToolName}
                  {...params}
                  label="Select Tools"
                />
              )}
            />
          </div>
        </div>
      </div>

      <TableContainer sx={{ marginY: 4, marginX: 4 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Tool ID
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 200 }}
                align="center"
              >
                Tool Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 150 }}
                align="center"
              >
                Serial Number
              </StyledTableCell>
         
           
           
           
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 400 }}
                align="center"
              >
                Remark
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data[0]?.filter((item)=>item?.SerialNumber.toString().includes(search))?.map((item, index) => {
              const remarks = JSON.parse(item?.ActivityLog);

              return (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {item.ToolID}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.ToolName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.SerialNumber}
                  </StyledTableCell>
             
                
                  <StyledTableCell align="center">
                    {remarks?.map((a, b) => {
                      return (
                        <p key={b} className="space-x-3">
                          <span>Date: {a?.date}</span>
                          <span>Remark: {a?.remark}</span>
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
  );
};

export default RejectedTool;
