import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Modal from "./Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal2 from "./Modal2";

const UnderProcess = () => {
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");

  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [openAdd, setOpenAdd] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}record/get?category=${selectedItem}&location=underProcess`,
        a.data
      )
      .then((res) => {
        setData(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [open, openAdd]);

  const handleOpen = (i) => {
    setItem(i.underProcessSerialNumber);
    setOpen(!open);
  };

  return (
    <>
      <div
        className={`pt-3 flex ${
          a.data.Designation === "storekeeper" ? "w-1/1" : ""
        } px-8 pb-3 flex justify-center`}
      >
        <div>
          {a.data.Designation === "storekeeper" && (
            <Button onClick={() => setOpenAdd(true)} variant="contained">
              Add New
            </Button>
          )}
        </div>
      </div>
      <TableContainer
        sx={{ width: "80%", margin: "auto", border: "dotted black 1px" }}
        className="shadow-md"
      >
        <Table>
          <TableHead sx={{ color: "white" }} className="bg-gray-600">
            <TableRow>
              {a.data.Designation === "production" && (
                <TableCell sx={{ color: "white" }} align="center">
                  Option
                </TableCell>
              )}
              <TableCell sx={{ color: "white" }} align="center">
                Serial No.
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Job Card No.
              </TableCell>

              <TableCell sx={{ color: "white" }} align="center">
                JC Created on
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data?.map((item, index) => {
              return (
                <>
                  <TableRow key={index}>
                    {a.data.Designation === "production" && (
                      <TableCell align="center">
                        <Button onClick={() => handleOpen(item)}>Send</Button>
                      </TableCell>
                    )}
                    <TableCell align="center">
                      {item.underProcessSerialNumber}
                    </TableCell>
                    <TableCell align="center">
                      {item.underProcessJobCard}
                    </TableCell>

                    <TableCell align="center">
                      {item.createdAt.slice(0, 10)}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal openAdd={openAdd} setOpenAdd={setOpenAdd} />
      {item && <Modal2 setOpen={setOpen} open={open} item={item} />}
    </>
  );
};

export default UnderProcess;
