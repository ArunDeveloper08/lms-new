import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import StoreToDealerModal from "./StoreToDealerModal/StoreToDealerModal";
import secureLocalStorage from "react-secure-storage";
import { mainRoute } from "../App";

const SendProductDealer = () => {
  const params = useSearchParams()[0];
  const { state } = useLocation();
  const dealerId = params.get("dealerId");
  const poNumber = params.get("poNumber");
  const encodedPoNumber = encodeURIComponent(poNumber);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [productType, setProductType] = useState("");
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}record/get?dealerId=${dealerId}&poNumber=${encodedPoNumber}&location=getDetailsByPoAndDealer&category=modem`,
        userInfo
      )
      .then((res) => {
        console.log(res.data.Data);
        setData(res.data?.Data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleButtonClick = (item) => {
    window.open(
      `${mainRoute}/thirdpartychallan-non-return/${item?.challanNumber}?type=thirdPartyNonReturnableChallan`,
      "_blank"
    );
  };

  return (
    <div>
      {data && (
        <TableContainer>
          <Table>
            <TableHead sx={{ background: "black", color: "white" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }} align="center">
                  Challan No.
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.map((item, index) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell align="center">
                          {item?.challanNumber}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={() => handleButtonClick(item)}>
                            open pdf
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {open && (
        <StoreToDealerModal
          open={open}
          setOpen={setOpen}
          checked={checked}
          productType={productType}
          setChecked={setChecked}
        />
      )}
    </div>
  );
};

export default SendProductDealer;
