import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import File from "./File";
import CsrList from "./MrrList";
import  secureLocalStorage  from  "react-secure-storage";
const MrrTab = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="fullWidth"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="MRR Form" value="1" />
            <Tab label="MRR List" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <File />
        </TabPanel>
        <TabPanel sx={{ paddingX: 0 }} value="2">
          <CsrList />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default MrrTab;
