import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
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

const AllTools = ({tool}) => {
  const [engineer, setEngineer] = useState([]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [moreDetails, setMoreDetails] = useState({
    EngineerID: "",
    remark: "",
    ToolID: "",
  });
  const [tools, setTools] = useState([]);
  // const [tool, setTool] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
   const [remarkModalOpen, setRemarkModalOpen] = useState(false);
    const [selectedRemarks, setSelectedRemarks] = useState([]);
  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}tool/get?location=all&ToolID=${
         tool?.id
        }&Employee_Id=${moreDetails?.EngineerID || ""}`,
        userInfo
      )
      .then((res) => {
      
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [moreDetails,tool]);

  useEffect(() => {
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => {
        // const engineerData = res.data.data.filter(
        //   (employee) => employee?.Designation === "engineer"
        // );

        setEngineer(res?.data?.data);
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
  const handleRemarkClick = (remarks) => {
    setSelectedRemarks(remarks);
    setRemarkModalOpen(true);
  };
  const handleClose = () => {
    setRemarkModalOpen(false);
  };
  return (
    <div>
      <div>
        <div className="flex justify-around mt-[10px]">
          <div>
            <Autocomplete
              onChange={(e, selectedOption) =>
                handleSelect("EngineerID", selectedOption?.Employee_Id)
              }
              className="min-w-[200px]"
              name="IssueForEngineer"
              options={engineer}
              getOptionLabel={(option) => option?.Name}
              renderInput={(params) => (
                <TextField {...params} label="Select  Name" />
              )}
            />
          </div>
          <input
            name="SerialNumber"
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 py-2 px-5 max-w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          />
          <div>
            {/* <Autocomplete
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
            /> */}
          </div>
        </div>
      </div>

      <TableContainer sx={{ marginY: 4, marginX: 1 }} component={Paper}>
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
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Challan Number
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
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Engineer Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                In Store
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                In Production
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                In Mecahnical
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 120 }}
                align="center"
              >
               store-To-Rej
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                On Site
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Store-To-Pro
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 100 }}
                align="center"
              >
                Pro-To-Store
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 120 }}
                align="center"
              >
                Store-To-Mech
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 120 }}
                align="center"
              >
                Mech-To-Store
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 120 }}
                align="center"
              >
                Store-To-Engg
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 120 }}
                align="center"
              >
                Engg-To-Store
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
             // const remarks = JSON.parse(item?.ActivityLog);
             const remarks = JSON.parse(item?.ActivityLog) || [];
             const lastRemark = remarks.length ? remarks[remarks.length - 1] : null;

              return (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {item.ToolID}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.challanNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.ToolName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.SerialNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.Name ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.InStore ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.InProduction ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.InMechanical ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.StoreToRejected ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.OnField ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.StoreToProduction ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.ProductionToStore ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.StoreToMechanical ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.MechanicalToStore ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.StoreToEnginner ? 1 : 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.EngineerToStore ? 1 : 0}
                  </StyledTableCell>
               
                  <StyledTableCell align="center"
                    className="cursor-pointer text-blue-600 "
                    onClick={() => handleRemarkClick(remarks)}
                  
                  >
                    {/* {remarks?.map((a, b) => {
                      return (
                        <p key={b} className="space-x-3">
                          <span>Date: {a?.date}</span>
                          <span>Remark: {a?.remark}</span>
                        </p>
                      );
                    })} */}
                      {lastRemark ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}` : "No Remarks"}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
            <Dialog open={remarkModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
              <DialogTitle>All Remarks</DialogTitle>
              <DialogContent>
                {selectedRemarks?.map((log, index) => (
                  <p key={index} className="mt-2">
                    <strong>Date:</strong> {log.date} <br />
                    <strong>Remark:</strong> {log.remark}
                  </p>
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
    </div>
  );
};

export default AllTools;
