import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CompanyStore from "../companyStore/CompanyStore";
import Production from "../productionFloor/Production";
import CustomerSite from "../customerSite/CustomerSite";
import RejectedProduct from "../rejected/RejectedProduct";
import OnSite from "../InstalledOnSite/OnSite";
import DefectedProduct from "../defected/DefectedProduct";
import AllList from "../all/AllList";
import { useDispatch, useSelector } from "react-redux";
import OnHold from "../OnHold";
import { getTotalCountAsync } from "../../redux/actions";
import secureLocalStorage from "react-secure-storage";
import UnderProcess from "../underProcess/UnderProcess";
const ProductTab = () => {
  const [value, setValue] = useState("1");
  const [count, setCount] = useState({});
  const handleChange = (_, newValue) => {
    setValue(newValue);
    secureLocalStorage.setItem("tabNumber", newValue);
  };

  const tabNumber = JSON.parse(secureLocalStorage.getItem("tabNumber"));
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const { simCounts } = useSelector((state) => state.totalReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalCountAsync(selectedItem));
    if (
      typeof +tabNumber === "number" &&
      tabNumber !== null &&
      tabNumber !== "undefined"
    ) {
      setValue(String(tabNumber));
    }
  }, [selectedItem]);
  useEffect(() => {
    setCount(simCounts);
  }, [simCounts]);
  return (
    <>
      {Object.keys(count).length >= 1 && (
        <Box sx={{ width: "100%", typography: "body1", height: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                extcolor="primary"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                indicatorColor="secondary"
                onChange={handleChange}
                aria-label="lab API tabs example">
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`Company Store(${count.storeCount})`}
                  value="1"
                />
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`Production Floor(${count.productionCount})`}
                  value="2"
                />
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`Customer Site count(${count.customerSiteCount})`}
                  value="3"
                />
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`Under Process count(${count.underProcess})`}
                  value="9"
                />
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`Rejected count(${count.rejectedCount})`}
                  value="4"
                />
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`Defective(${count.defectiveCount})`}
                  value="5"
                />
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`Installed On Sites(${count.installedCount})`}
                  value="6"
                />
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`All count (${count.allCount})`}
                  value="7"
                />
                <Tab
                  sx={{ fontWeight: 800, paddingX: 3 }}
                  label={`UnApproved`}
                  value="8"
                />
              </TabList>
            </Box>
            <TabPanel sx={{ padding: 0 }} value="1">
              <CompanyStore />
            </TabPanel>
            <TabPanel sx={{ paddingX: 0 }} value="2">
              <Production />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="3">
              <CustomerSite />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="9">
              <UnderProcess />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="4">
              <RejectedProduct />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="5">
              <DefectedProduct />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="6">
              <OnSite />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="7">
              <AllList />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="8">
              <OnHold />
            </TabPanel>
          </TabContext>
        </Box>
      )}
    </>
  );
};

export default ProductTab;
