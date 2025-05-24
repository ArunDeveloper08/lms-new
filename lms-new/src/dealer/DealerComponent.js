import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DealerInStore from "./DealerInStore";
import DealerProduct from "./DealerProduct";

export default function DealerComponent() {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log({ value });
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
            {/* <Tab
              sx={{ fontWeight: 800, padding: 0 }}
              label={`Product`}
              value={1}
            /> */}
            <Tab
              sx={{ fontWeight: 800, padding: 0 }}
              label={`Dealer`}
              value={2}
            />
            <Tab
              sx={{ fontWeight: 800, padding: 0 }}
              label={`On Customer`}
              value={3}
            />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0 }} value={1}>
          <DealerProduct />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value={2}>
          <DealerInStore />
        </TabPanel>
        <TabPanel sx={{ paddingX: 0 }} value={3}></TabPanel>
      </TabContext>
    </Box>
  );
}
