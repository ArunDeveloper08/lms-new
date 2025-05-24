


import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EngineerChallan from "./EngineerChallan";
import StoreChallan from "./StoreChallan";
import secureLocalStorage from "react-secure-storage";
import EnggChallanTable from "./Engg-Challan-Table";
import StoreChallanTable from "./Store-Challan-Table";
import CreateChallan from "./create-challan";
import { mainRoute } from "../../App";

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

const ChallanDetail = () => {
  const [data2, setData2] = useState([]);
  const { data } = JSON.parse(secureLocalStorage.getItem("info"));
  const storedChallanType = secureLocalStorage.getItem("challanType");
  const [challanType, setChallanType] = useState(
    storedChallanType || "internal returnable challan"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(secureLocalStorage.getItem("Tab") || "1");

  useEffect(() => {
    secureLocalStorage.setItem("challanType", challanType);
  }, [challanType]);
  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}record/get?category=3-phaseMeter&location=getChallanDetails&challanType=${challanType}`,
        data
      )
      .then((res) => {
        setData2(res.data?.Data || []);
      })
      .catch((err) => console.log(err));
  }, [challanType]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    secureLocalStorage.setItem("Tab", newValue);
  };
  return (
    <div>
      <div className={`flex justify-around `}>
        <select
          name="Category"
          debounce={300}
          onChange={(e) => setChallanType(e.target.value)}
          value={challanType ?? ""}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Serial Number"
        >
          <option value="internal returnable challan">
            Production Internal Returnable Challan
          </option>
          <option value="non-returnable challan">
            Production Non-Returnable Challan
          </option>
          <option value="external returnable challan">
            Engineer Returnable Challan
          </option>
          <option value="third party returnable challan">
            Third Party Returnable Challan
          </option>
        </select>
        {challanType === "external returnable challan" ? (
          ""
        ) : (
          <select
            name="Status"
            debounce={300}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm ?? ""}
            className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          >
            <option value="">All Status</option>
            <option value="open">open</option>
            <option value="close">close</option>
          </select>
        )}
      </div>

      {(
        challanType === "external returnable challan" ||
        challanType === "third party returnable challan"
      ) ? (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              extcolor="primary"
              variant="fullWidth"
              indicatorColor="secondary"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Current Challan`}
                value="1"
              />
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Initiate by Store `}
                value="2"
              />
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Initiate by Engineer `}
                value="3"
              />
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Challan History`}
                value="4"
              />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: 0 }} value="1">
            {/* <EngineerChallan /> */}
            <CreateChallan />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="2">
          <StoreChallanTable />
          
          </TabPanel>
          <TabPanel sx={{ paddingX: 0 }} value="3">
          <EnggChallanTable />
          </TabPanel>
        </TabContext>
      ) : (
        <TableContainer
          sx={{ width: "800px", margin: "0 auto", paddingTop: 5 }}
          component={Paper}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                  Challan No.
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ paddingX: 0 }}>
                  Status
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <React.Fragment>
                {data2 &&
                  data2
                    .filter((item) =>
                      item.Status?.toLowerCase().includes(
                        searchTerm?.toLowerCase()
                      )
                    )
                    .map((challan, index) => {
                      return (
                        <>
                          <StyledTableRow key={index}>
                            <StyledTableCell align="center" colSpan={1}>
                              {challan.challanNumber}
                            </StyledTableCell>
                            <StyledTableCell align="center" colSpan={1}>
                              <Link
                                to={`${mainRoute}/download${challanType === "non-returnable challan"
                                  ? "production"
                                  : ""
                                  }challanpdf/${challan.challanNumber}?type=${challanType === "non-returnable challan"
                                    ? "internalNonReturnableChallan"
                                    : "internalReturnableChallan"
                                  }`}
                                className="no-underline bg-sky-600 text-white border-black px-3 
                              rounded-md py-2"
                              >
                                {challanType === "non-returnable challan"
                                  ? "close"
                                  : challan.Status}
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        </>
                      );
                    })}
              </React.Fragment>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ChallanDetail;
