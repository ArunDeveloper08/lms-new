import {
  Autocomplete,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNewToolModal from "./AddNewToolModal";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
import secureLocalStorage from "react-secure-storage";
import Modals from "./Modal";
import AddNewTool from "./AddNewTool";
import { useDispatch, useSelector } from "react-redux";
import { getTotalToolsCountAsync } from "../../redux/actions";
import CreateEngineerToolChallan from "./CreateEngineerToolChallan";
import { useNavigate } from "react-router-dom";
import { mainRoute } from "../../App";

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

const Tools = ({ tools, tool, setTool, setTools, setOpen, open }) => {
  const navigate = useNavigate();
  const [toolName, setToolName] = useState([]);
  const [checked, setChecked] = useState([]);
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const [badgeCount, setBadgeCount] = useState(0);
  const [opens, setOpens] = useState(false);
  const [yes, setYes] = useState(false);
 
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState({});
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}tool/get/?ToolID=${tool?.id}&location=store`,
        userInfo.data
      )
      .then((res) => {
        // console.log(res.data.data.map(item=>({...item,checked:false})))
        setToolName(res?.data.data);
        dispatch(getTotalToolsCountAsync(tool?.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tool, open, opens]);

  const handleCheck = (e, item) => {
    const isChecked = e.target.checked;
    console.log(isChecked);
  
    let newObj = {
      ToolID: item.ToolID,
      SerialNumber: item.SerialNumber,
    };
    if (!isChecked) {
      setChecked((p) => {
        const afterRemoving = p.filter((item) => {
          if (
            item.ToolID === newObj.ToolID &&
            item.SerialNumber === newObj.SerialNumber
          ) {
            return false;
          } else {
            return true;
          }
        });
      
        return afterRemoving;
      });
    } else {
      setChecked((p) => {
    
        return [...p, newObj];
      });
    }
    
    const newBadgeCount = isChecked ? badgeCount + 1 : badgeCount - 1;

    setBadgeCount(newBadgeCount);
  };
  const handleRemarkClick = (remarks) => {
    setSelectedRemarks(remarks);
    setRemarkModalOpen(true);
  };
  const handleClose = () => {
    setRemarkModalOpen(false);
  };


  return (
    <>
      {a.data.Designation === "storekeeper" && (
        <div className="mt-5">
          <div className="flex justify-around">
            <Button variant="contained" onClick={() => setOpen(!open)}>
              Add Product SrNo.
            </Button>
            <div className="">
              <p className="font-bold bg-blue-600 text-white text-lg px-5 py-1 rounded-sm">
                {tool?.ToolName}
              </p>
            </div> 

           <Button 
           variant="contained"
           onClick={() => navigate(`${mainRoute}/createengineertoolchallan`)}
           >
            Create Engineer Challan
            </Button>

            <Button variant="contained" onClick={() => setYes(!yes)}>
              Add Tool Group
            </Button>
          </div>
        </div>
      )}

      {tool?.ToolName ? (
        <>
          <TableContainer sx={{ marginY: 4, marginX: 1 }} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {userInfo.data.Designation === "storekeeper" && (
                    <StyledTableCell
                      sx={{ paddingX: 0, minWidth: 200 }}
                      align="center"
                    >
                      Option
                    </StyledTableCell>
                  )}

                  <StyledTableCell
                    sx={{ paddingX: 0, minWidth: 200 }}
                    align="center"
                  >
                    Serial Number
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ paddingX: 0, minWidth: 200 }}
                    align="center"
                  >
                    In Store
                  </StyledTableCell>

                  <StyledTableCell
                    sx={{ paddingX: 0, minWidth: 200 }}
                    align="center"
                  >
                    Remark
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toolName?.map((item, index) => {
                 // const remarks = JSON.parse(item?.ActivityLog);
                 const remarks = JSON.parse(item?.ActivityLog) || [];
                 const lastRemark = remarks.length ? remarks[remarks.length - 1] : null;
                  const handleSelectCheck = checked.some(
                    (i) =>
                      i.ToolID === item.ToolID &&
                      i.SerialNumber === item.SerialNumber
                  );
                  return (
                    <StyledTableRow key={index}>
                      {userInfo.data.Designation === "storekeeper" && (
                        <StyledTableCell align="center">
                          <input
                            className="cursor-pointer px-2"
                            checked={handleSelectCheck}
                            onChange={(e) => handleCheck(e, item)}
                            type="checkbox"
                          />
                        </StyledTableCell>
                      )}

                      <StyledTableCell align="center">
                        {item.SerialNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.InStore ? 1 : 0}
                      </StyledTableCell>

                      {/* <StyledTableCell align="center">
                        {remarks?.map((a, b) => {
                          return (
                            <p key={b} className="space-x-3">
                              <span>Date: {a?.date}</span>
                              <span>Remark: {a?.remark}</span>
                            </p>
                          );
                        })}
                      </StyledTableCell> */}
                       <TableCell 
                      align="center" 
                      className="cursor-pointer text-blue-600 "
                      onClick={() => handleRemarkClick(remarks)}
                    >
                      {lastRemark ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}` : "No Remarks"}
                    </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        ""
      )}

      {badgeCount > 0 && (
        <p className="fixed cursor-pointer bottom-10 right-10">
          <Badge
            color="primary"
            badgeContent={badgeCount}
            onClick={() => setOpens(!opens)}
          >
            <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
          </Badge>
        </p>
      )}

      <AddNewToolModal open={open} setOpen={setOpen} tool={tool} />
      <Modals opens={opens} setOpens={setOpens} tool={tool} checked={checked} setBadgeCount={setBadgeCount} 
      setChecked={setChecked}
      />
      <AddNewTool setYes={setYes} yes={yes} tool={tool} />
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
      
    </>
  );
};

export default Tools;
