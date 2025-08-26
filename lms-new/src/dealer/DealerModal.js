import {
  Box,
  Button,
  Modal,
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
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { companiesDetails } from "../constants/companiesDetails";
import  secureLocalStorage  from  "react-secure-storage";
import { mainRoute } from "../App";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DealerModal = ({ open, setOpen, checked }) => {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState("");
  const [dealer, setDealer] = useState("");
  const [remark, setRemark] = useState("");
  const [dealerCode, setDealerCode] = useState("");
  const [all, setAll] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const Employee = JSON.parse(secureLocalStorage.getItem("info"));
  const { Employee_Id } = Employee.data;

  const meterSerialNumbers = {
    "3-phaseMeter": [],
    "1-phaseMeter": [],
    modem: [],
    homeDisplayunit: [],
    DGIndicator: [],
    DTRH: [],
    wifiDongle: [],
    wavezigbeeModem: [],
    ParkfloorDCU: [],
    NewDCU: [],
    ZigbeeRF: [],
    InjectorController: [],
    InjectorAVR: [],
    PLCCReciever: [],
    "Drill/HammerMachine": [],
    "smart-3-phaseMeter": [],
    "smart-1-phaseMeter": [],
    "RF2-TTL": [],
    "RF2-485": [],
  };

  checked.forEach((item) => {
    const { Meter_Serial_No, Category } = item;
    if (Category === "3-phaseMeter") {
      meterSerialNumbers["3-phaseMeter"].push(Meter_Serial_No);
    } else if (Category === "1-phaseMeter") {
      meterSerialNumbers["1-phaseMeter"].push(Meter_Serial_No);
    } else if (Category === "modem") {
      meterSerialNumbers["modem"].push(Meter_Serial_No);
    } else if (Category === "homeDisplayunit") {
      meterSerialNumbers["homeDisplayunit"].push(Meter_Serial_No);
    } else if (Category === "DGIndicator") {
      meterSerialNumbers["DGIndicator"].push(Meter_Serial_No);
    } else if (Category === "DTRH") {
      meterSerialNumbers["DTRH"].push(Meter_Serial_No);
    } else if (Category === "wifiDongle") {
      meterSerialNumbers["wifiDongle"].push(Meter_Serial_No);
    } else if (Category === "wavezigbeeModem") {
      meterSerialNumbers["wavezigbeeModem"].push(Meter_Serial_No);
    } else if (Category === "ParkfloorDCU") {
      meterSerialNumbers["ParkfloorDCU"].push(Meter_Serial_No);
    } else if (Category === "NewDCU") {
      meterSerialNumbers["NewDCU"].push(Meter_Serial_No);
    } else if (Category === "ZigbeeRF") {
      meterSerialNumbers["ZigbeeRF"].push(Meter_Serial_No);
    } else if (Category === "InjectorController") {
      meterSerialNumbers["InjectorController"].push(Meter_Serial_No);
    } else if (Category === "InjectorAVR") {
      meterSerialNumbers["InjectorAVR"].push(Meter_Serial_No);
    } else if (Category === "PLCCReciever") {
      meterSerialNumbers["PLCCReciever"].push(Meter_Serial_No);
    } else if (Category === "smart-3-phaseMeter") {
      meterSerialNumbers["smart-3-phaseMeter"].push(Meter_Serial_No);
    } else if (Category === "smart-1-phaseMeter") {
      meterSerialNumbers["smart-1-phaseMeter"].push(Meter_Serial_No);
    }
  });

  const meterNumbersByCategory = checked.reduce((acc, item) => {
    const { Meter_Serial_No, Category } = item;
    if (!acc[Category]) {
      acc[Category] = [];
    }
    acc[Category].push(Meter_Serial_No);
    return acc;
  }, {});

  const products = checked.map((item) => ({
    category: item.Category,
    Meter_Serial_No: item.Meter_Serial_No,
  }));

  useEffect(() => {
    axios
      .get(window.MyApiRoute + "dealer/get")
      .then((res) => {
        setDealers(res.data.details);
      //  console.log(res.data.details);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleChange = (item) => {
  //  console.log("dealerId", item);
    axios
      .get(window.MyApiRoute + `dealer/getone?dealerId=${item}`)
      .then((res) => {
        setDealer(res.data.details);
        setDealerCode(res.data.details.ID);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const handleSubmit = () => {
    const data = {
      Employee_Id,
      dealerCode,
      products,
      remark,
    };
    axios
      .put(
        window.MyApiRoute + "record/update?check=dealer",
        data
      )
      .then((res) => {
        setAll(res.data);
        if (res.data) {
          navigate(
            `${mainRoute}/downloadDealerchallanpdf/${res.data.challanDetail.challanNumber}?type=externalNonReturnableChallan`
          );
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: 800,
            height: 500,
            overflow: "scroll",
            overflowY: "auto",
          }}
        >
          <div className="flex justify-between items-center">
            <select
              className="border-black border-[1px] w-[200px] px-4 py-3 mt-1 mb-2 bg-slate-200 rounded"
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value={null}>Select Dealer</option>
              {dealers &&
                dealers.map((dealer, i) => (
                  <>
                    <option key={i} value={dealer.ID}>
                      {dealer.name}
                    </option>
                  </>
                ))}
            </select>
            <select
              className="border-black border-[1px] w-[200px] px-4 py-3 mt-1 mb-2
               bg-slate-200 rounded"
            >
              <option value={null}>Select Company Name</option>
              {companiesDetails.map((company, i) => (
                <>
                  <option key={i} value={company}>
                    {company.name}
                  </option>
                </>
              ))}
            </select>
            <p>Non-Returnable challan</p>

            {/* <select className="border-black border-[1px] w-[200px] px-4 py-3 mt-1 mb-2 bg-slate-200 rounded">
              <option value={null}>Select Company Name</option>
              <option>Non-Returanable Challan</option>
              <option>Returanable Challan</option>
            </select> */}
          </div>
          {dealer && (
            <div>
              <div className="border-[1px] border-slate-700 w-[720px]  mx-auto mt-1">
                <div className="flex justify-between border-b-[1px] border-black items-center pr-3 h-[30px]">
                  <h1 className="ml-3"> Challan No. {} </h1>
                  <h1> Customer Code: </h1>
                  <h1> Date: {new Date().toDateString().slice(0, 16)}</h1>
                </div>
                <div className="p-2">
                  <div className="flex space-x-3">
                    <p>Name:</p>
                    <p className="font-semibold">{dealer.name}</p>
                  </div>
                  <div className="flex space-x-3">
                    <p>Address:</p>
                    <p className="font-semibold">{dealer.address}</p>
                  </div>
                  {/* <div>
                    <h1 className="semibold text-xl ml-3">Name :</h1>
                    <h1 className="semibold text-xl ml-3">Address :</h1>
                  </div>
                  <div className=" mt-2">
                    <h1>{dealer.name}</h1>
                    <h1>{dealer.address}</h1>
                  </div> */}
                </div>
              </div>
            </div>
          )}

          <TableContainer sx={{ margin: "0 auto" }} component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow sx={{ background: "black" }}>
                  <TableCell align="center" sx={{ padding: 0, color: "#fff" }}>
                    S.No.
                  </TableCell>
                  <TableCell align="center" sx={{ paddingX: 0, color: "#fff" }}>
                    Serial No
                  </TableCell>
                  <TableCell align="center" sx={{ paddingX: 0, color: "#fff" }}>
                    Category
                  </TableCell>
                  <TableCell align="center" sx={{ paddingX: 2, color: "#fff" }}>
                    Quantity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(meterNumbersByCategory).map(
                  ([category, meterNumbers], index) => (
                    <StyledTableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center" sx={{ width: 250 }}>
                        {meterNumbers.join(", ")}
                      </TableCell>
                      <TableCell align="center">{category}</TableCell>
                      <TableCell align="center">
                        {meterNumbers.length}
                      </TableCell>
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TextField
            label="Remark"
            multiline
            fullWidth
            sx={{ marginTop: 3 }}
            onChange={(e) => setRemark(e.target.value)}
          />

          <div className="flex justify-center mt-4">
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DealerModal;

// {
//   "Employee_Id": "100",
//     "dealerCode": "111",
//     "products":[{"category": "1-phaseMeter", "Sr_NO":"1"}, {"category":"1-phaseMeter", "Sr_NO":"10"}],
//     "remark" : "return by postman"
//     // "Password": "1011"
//  }
