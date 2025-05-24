import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AllSimList from "../../components/Sim/AllSimList";
import axios from "axios";
import InStore from "../../components/Sim/store/InStore";
import ProductionTab from "../../components/Sim/ProductionTab";
import InSiteStore from "../../components/Sim/InSiteStore/InSiteStore";
import RejectedSim from "../../components/Sim/RejectedSim";
import Defective from "../../components/Sim/Defective";
import InstalledOnSite from "../../components/Sim/InstalledOnSite/InstalledOnSite";
import { useSelector } from "react-redux";
import ProductTab from "./ProductTab";
import secureLocalStorage from "react-secure-storage";
const SimTab = () => {
  const [value, setValue] = useState("1");
  const [count, setCount] = useState({});
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const { selectedItem } = useSelector((state) => state.itemReducer);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios
      .get(window.MyApiRoute + "sim/getcount")
      .then((res) => {
        return setCount(res.data), console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectedItem]);
  //  /sim/getcount
  // POST -- "sim/addnew" -- To create a new Sim
  // Put -- "sim/update'  --  To update the -- query= check = toRequire
  // get -- sim/get

  if (selectedItem === "sim") {
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
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Company Store(${count.inStore ?? ""})`}
                value="1"
              />
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Production Floor(${count.production ?? ""})`}
                value="2"
              />
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Customer Site (${count.onSiteStore ?? ""})`}
                value="3"
              />
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Rejected (${count.rejected ?? ""})`}
                value="4"
              />
              {/* <Tab sx={ { fontWeight: 800, padding: 0 } } label={ `Defective (${ count.sd ?? "" })` } value="5" /> */}
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Installed On Sites(${count.onSite ?? ""})`}
                value="6"
              />
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`All (${count.allSim ?? ""})`}
                value="7"
              />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: 0 }} value="1">
            <InStore />
          </TabPanel>
          <TabPanel sx={{ paddingX: 0 }} value="2">
            <ProductionTab />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="3">
            <InSiteStore />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="4">
            <RejectedSim />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="5">
            <Defective />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="6">
            <InstalledOnSite />
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="7">
            <AllSimList />
          </TabPanel>
        </TabContext>
      </Box>
    );
  } else {
    return <ProductTab />;
  }
};

export default SimTab;
