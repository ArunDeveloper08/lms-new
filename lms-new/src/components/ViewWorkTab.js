import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import View from "./View";
import ViewMeterRecord from "./ViewMeterRecord";
import CsrList from "../CSR/CsrList";
import MrrList from "../CSR/MrrList";
import SimHistoryEmployee from "./Sim/SimHistoryEmployee";
import ProductHistoryEmployee from "./Sim/ProductHistoryEmployee";
import  secureLocalStorage  from  "react-secure-storage";
const ViewWorkTab = () => {
  const info = JSON.parse(secureLocalStorage.getItem("info"));
  console.log({ info });
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            extcolor="primary"
            variant="fullWidth"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label={`Meter Installation`} value="1" />
            <Tab label={`Activity Log`} value="2" />
            {info.isAdmin && <Tab label={`CSR Report`} value="3" />}
            {info.isAdmin && <Tab label={`MRR Report`} value="4" />}
            {info.data.Designation === "engineer" && (
              <Tab label={`Sim History`} value="5" />
            )}
            {info.data.Designation === "engineer" && (
              <Tab label={`Products List`} value="6" />
            )}
          </TabList>
        </Box>
        <TabPanel sx={{ paddingX: 0 }} value="1">
          <ViewMeterRecord />
        </TabPanel>
        <TabPanel sx={{ paddingX: 0 }} value="2">
          <View />
        </TabPanel>
        {info.isAdmin && (
          <>
            <TabPanel sx={{ paddingX: 0 }} value="3">
              <CsrList />
            </TabPanel>
            <TabPanel sx={{ paddingX: 0 }} value="4">
              <MrrList />
            </TabPanel>
          </>
        )}
        {info.data.Designation === "engineer" && (
          <TabPanel sx={{ padding: 0 }} value="5">
            <SimHistoryEmployee />
          </TabPanel>
        )}
        {info.data.Designation === "engineer" && (
          <TabPanel sx={{ padding: 0 }} value="6">
            <ProductHistoryEmployee />
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
};

export default ViewWorkTab;
// Remark: Bhanu - activity Log
