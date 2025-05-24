// import React from "react";
// import Box from "@mui/material/Box";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import CSRForm from "./CSRForm";
// import CsrList from "./CsrList";
// import  secureLocalStorage  from  "react-secure-storage";
// const CsrTab = () => {
//   const [value, setValue] = React.useState("1");
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
    
//   };
//   return (
//     <Box sx={{ width: "100%", typography: "body1" }}>
//       <TabContext value={value}>
//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <TabList
//             variant="fullWidth"
//             onChange={handleChange}
//             aria-label="lab API tabs example"
//           >
//             <Tab label="CSR Form" value="1" />
//             <Tab label="CSR List" value="2" />
//           </TabList>
//         </Box>
//         <TabPanel value="1">
//           <CSRForm />
//         </TabPanel>
//         <TabPanel sx={{ paddingX: 0 }} value="2">
//           <CsrList />
//         </TabPanel>
//       </TabContext>
//     </Box>
//   );
// };
// export default CsrTab;


import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CSRForm from "./CSRForm";
import CsrList from "./CsrList";
import secureLocalStorage from "react-secure-storage";

const CsrTab = () => {
  // Load the initial tab value from localStorage or default to "1"
  const initialTabValue = secureLocalStorage.getItem("selectedTab") || "1";

  const [value, setValue] = React.useState(initialTabValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    secureLocalStorage.setItem("selectedTab", newValue);
  };

  useEffect(() => {
 
    setValue(initialTabValue);
  }, []); 

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="fullWidth"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="CSR Form" value="1" />
            <Tab label="CSR List" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CSRForm />
        </TabPanel>
        <TabPanel sx={{ paddingX: 0 }} value="2">
          <CsrList />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CsrTab;

