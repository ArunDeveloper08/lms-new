import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import SendIcon from "@mui/icons-material/Send";
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import SendEngineerModal from "./SendEngineerModal";
import { getTotalToolsCountAsync } from "../../redux/actions";
import { useDispatch } from "react-redux";

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

const EngineerTool = ({ tool }) => {
  const [open, setOpen] = useState(false);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [challanNumber , setChallanNumber] = useState("")

  const [badgeCount, setBadgeCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}tool/get?Employee_Id=${userInfo?.Employee_Id}&location=engineer&ToolID=${tool?.id}`,
        userInfo
      )
      .then((res) => {
        setData(res.data.data);
        dispatch(getTotalToolsCountAsync(tool?.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tool, open]);

  const handleCheck = (e, item) => {
    setChallanNumber(item.challanNumber)
    const isChecked = e.target.checked;

    setChecked((prevChecked) => {
      if (isChecked) {
        return [...prevChecked, item.SerialNumber ];
      } else {
        return prevChecked.filter((serial) => serial !== item.SerialNumber);
      }
    });
 
    const newBadgeCount = isChecked ? badgeCount + 1 : badgeCount - 1;
    setBadgeCount(newBadgeCount);
  };

  const handleOpenModal = () => {
    setBadgeCount(0);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-center">
        <p className="font-bold bg-blue-600 text-white text-lg px-5 py-1 rounded-sm">
          {tool?.ToolName}
        </p>
      </div>
      <>
        <TableContainer sx={{ marginY: 4, marginX: 1 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {
                  userInfo.Designation==="engineer" && 
                  <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 200 }}
                  align="center"
                >
                  Option
                </StyledTableCell>
                }
             

                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 200 }}
                  align="center"
                >
                  Tool Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 200 }}
                  align="center"
                >
                  Challan Number
                </StyledTableCell>
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
                  Remark
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data[0]?.map((item, index) => {
                const remarks = JSON.parse(item?.ActivityLog);
                return (
                  <StyledTableRow key={index}>
                    {
                      userInfo.Designation==="engineer" &&
                      <StyledTableCell align="center">
                      <input
                        className="cursor-pointer px-2"
                        checked={checked?.includes(item?.SerialNumber)}
                        onChange={(e) => handleCheck(e, item)}
                        type="checkbox"
                      />
                    </StyledTableCell>
                    }
                

                    <StyledTableCell align="center">
                      {item?.ToolName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item?.challanNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item?.SerialNumber}
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
      </>

      {badgeCount > 0 && tool?.id && (
        <p className="fixed cursor-pointer bottom-10 right-10">
          <Badge
            color="primary"
            badgeContent={badgeCount}
            onClick={handleOpenModal}
          >
            <SendIcon sx={{ color: "#1976d2", fontSize: 40 }} />
          </Badge>
        </p>
      )}
      <SendEngineerModal
        open={open}
        setOpen={setOpen}
        checked={checked}
        challanNumber={challanNumber}
        tool={tool}
        setBadgeCount={setBadgeCount}
      />
    </div>
  );
};
export default EngineerTool;
