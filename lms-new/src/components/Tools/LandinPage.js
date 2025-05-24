// import Box from "@mui/material/Box";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import React, { useEffect, useState } from "react";
// import Tools from "./Tools";
// import Hold from "./Hold";
// import secureLocalStorage from "react-secure-storage";
// import axios from "axios";
// import { Autocomplete, TextField } from "@mui/material";
// import { DataContext } from "./context/DataProvider";
// import { useContext } from "react";
// import EngineerTool from "./EngineerTool";
// import AllTools from "./AllTools";
// import RejectedTool from "./Rejected/RejectedTool";
// import ProductionTool from "./ProductionTool";
// import MechanicalTool from "./MechanicalTool";
// import { useDispatch, useSelector } from "react-redux";
// import { getTotalToolsCountAsync } from "../../redux/actions";
// import AllChallan from "./ToolChallan/AllChallan";

// const LandinPage = () => {
//   const a = JSON.parse(secureLocalStorage.getItem("info"));
//   const dispatch = useDispatch();
//   const { toolsCounts } = useSelector((state) => state?.toolsTotalReducer);

//   const [value, setValue] = useState(() => {
//     const storedTab = secureLocalStorage.getItem("tabNumber");

//     return storedTab || "4";

//     // return storedTab || (a?.data?.Designation === "storekeeper" ? "1" : "3");
//     // return storedTab || (a.data.Designation === "CEO" ? "2" : (a.data.Designation === "storekeeper" ? "1" : "3"));
//   });

//   const [tools, setTools] = useState([]);
//   const [open, setOpen] = useState(false);
//   const { tool, setTool } = useContext(DataContext);
//   const {searchChallan , setSearchChallan} = useContext(DataContext);

//   const handleChange = (_, newValue) => {
//     setValue(newValue);
//     secureLocalStorage.setItem("tabNumber", newValue);
//   };

//   useEffect(() => {

//     dispatch(getTotalToolsCountAsync(tool?.id ));
//   }, [tool, dispatch, setTool]);

//   useEffect(() => {
//     axios
//       .get(`${window.MyApiRoute}mastertool/get`)
//       .then((res) => {
//         setTools(res.data.message);
//         if (res.data.message.length > 0) {
//           setTool(res.data.message[0]);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   return (
//     <div>
//       {(value !== "5" && value !=="8") && (
//         <select
//           onChange={(e) =>
//             setTool(tools.find((item) => item.ToolName === e.target.value))
//           }
//           value={tool?.ToolName || ""}
//           className="w-[300px] rounded h-[50px] border-gray-700 border-[1px] ml-10"
//           name="Engineer"
//         >
//           {tools.map((item, index) => (
//             <option key={index} value={item?.ToolName}>
//               {item?.ToolName}
//             </option>
//           ))}
//         </select>
//       )}

//        {
//         value === "2" && (
//           <input
//           name="ChallanNumber"
//           onChange={(e) => setSearchChallan(e.target.value)}
//           className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded float-right"
//           placeholder="Challan Number"
//         />
//         )
//        }

//       <Box sx={{ width: "105%", typography: "body1" }}>
//         <TabContext value={value}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <TabList
//           extcolor="primary"
//           variant="fullWidth"
//           indicatorColor="secondary"
//           onChange={handleChange}
//           aria-label="lab API tabs example"
//         >
//           {(a.data.Designation === "storekeeper" ||
//             a?.data.Designation === "CEO") && (
//             <Tab
//               sx={{ fontWeight: 800, padding: 0 }}
//               label={`  Company Store(${toolsCounts?.storeCount}) `}
//               value="1"
//             />
//           )}

//           {(a.data.Designation === "engineer" ||
//             a?.data.Designation === "CEO" ||   a.data.Designation === "storekeeper" ) && (
//             <Tab
//               sx={{ fontWeight: 800, padding: 0 }}
//               label={`Engineer Tool(${toolsCounts?.engineerCount})`}
//               value="3"
//             />
//           )}
//           {(a.data.Designation === "production" ||
//             a.data.Designation === "storekeeper" ||
//             a?.data.Designation === "CEO") && (
//             <Tab
//               sx={{ fontWeight: 800, padding: 0 }}
//               label={`Production Tool(${toolsCounts?.productionCount})`}
//               value="6"
//             />
//           )}
//           {(a.data.Designation === "Mechanical" ||
//             a.data.Designation === "storekeeper" ||
//             a?.data.Designation === "CEO") && (
//             <Tab
//               sx={{ fontWeight: 800, padding: 0 }}
//               label={`Mechanical Tool(${toolsCounts?.mechanicalCount})`}
//               value="7"
//             />
//           )}
//           <Tab
//             sx={{ fontWeight: 800, padding: 0 }}
//             label={`All Tool(${toolsCounts?.TotalToolCount})`}
//             value="4"
//           />

//           <Tab
//             sx={{ fontWeight: 800, padding: 0 }}
//             label={`Unapproved`}
//             value="2"
//           />
//           {(a?.data.Designation === "CEO" ||
//             a.data.Designation === "storekeeper") && (
//             <Tab
//               sx={{ fontWeight: 800, padding: 0 }}
//               label={`Rejected Tool`}
//               value="5"
//             />
//           )}
// <Tab
//             sx={{ fontWeight: 800, padding: 0 }}
//             label={`All Challan`}
//             value="8"
//           />

//         </TabList>
//           </Box>

//   {(a.data.Designation === "storekeeper" ||
//     a?.data.Designation === "CEO") && (
//     <TabPanel sx={{ padding: 0 }} value="1">
//       <Tools
//         setTools={setTools}
//         tools={tools}
//         setTool={setTool}
//         tool={tool}
//         setOpen={setOpen}
//         open={open}
//       />
//     </TabPanel>
//   )}

//   {(a.data.Designation === "engineer" ||
//     a?.data.Designation === "CEO" ||   a.data.Designation === "storekeeper") && (
//     <TabPanel sx={{ paddingX: 0 }} value="3">
//       <EngineerTool setTool={setTool} tool={tool} />
//     </TabPanel>
//   )}
//   {(a.data.Designation === "production" ||
//     a.data.Designation === "storekeeper" ||
//     a?.data.Designation === "CEO") && (
//     <TabPanel sx={{ paddingX: 0 }} value="6">
//       <ProductionTool setTool={setTool} tool={tool} />
//     </TabPanel>
//   )}
//   {(a.data.Designation === "Mechanical" ||
//     a.data.Designation === "storekeeper" ||
//     a?.data.Designation === "CEO") && (
//     <TabPanel sx={{ paddingX: 0 }} value="7">
//       <MechanicalTool setTool={setTool} tool={tool} />
//     </TabPanel>
//   )}

//   <TabPanel sx={{ paddingX: 0 }} value="2">
//     <Hold
//       setTools={setTools}
//       tools={tools}
//       setTool={setTool}
//       tool={tool}
//     />
//   </TabPanel>
//   <TabPanel sx={{ paddingX: 0 }} value="4">
//     <AllTools setTool={setTool} tool={tool} />
//   </TabPanel>
//   <TabPanel sx={{ paddingX: 0 }} value="5">
//     <RejectedTool tool={tool} />
//   </TabPanel>

//   <TabPanel sx={{ paddingX: 0 }} value="8">
//     <AllChallan  />
//   </TabPanel>

// </TabContext>
//       </Box>
//     </div>
//   );
// };

// export default LandinPage;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tools from "./Tools";
import Hold from "./Hold";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { DataContext } from "./context/DataProvider";
import { useContext } from "react";
import EngineerTool from "./EngineerTool";
import AllTools from "./AllTools";
import RejectedTool from "./Rejected/RejectedTool";
import ProductionTool from "./ProductionTool";
import MechanicalTool from "./MechanicalTool";
import { useDispatch, useSelector } from "react-redux";
import { getTotalToolsCountAsync } from "../../redux/actions";
import AllChallan from "./ToolChallan/AllChallan";

const LandinPage = () => {
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const dispatch = useDispatch();
  const { toolsCounts } = useSelector((state) => state?.toolsTotalReducer);

  const [value, setValue] = useState(() => {
    const storedTab = secureLocalStorage.getItem("tabNumber");

    return storedTab || "4";
  });

  const [tools, setTools] = useState([]);
  const [open, setOpen] = useState(false);
  const { tool, setTool } = useContext(DataContext);
  const { searchChallan, setSearchChallan } = useContext(DataContext);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    secureLocalStorage.setItem("tabNumber", newValue);
  };

  useEffect(() => {
    dispatch(getTotalToolsCountAsync(tool?.id));
  }, [tool, dispatch, setTool]);

  useEffect(() => {
    axios
      .get(`${window.MyApiRoute}mastertool/get`)
      .then((res) => {
        setTools(res.data.message);
        if (res.data.message.length > 0) {
          setTool(res.data.message[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {value !== "5" && value !== "8" && (
        <select
          onChange={(e) =>
            setTool(tools.find((item) => item.ToolName === e.target.value))
          }
          value={tool?.ToolName || ""}
          className="w-full max-w-[300px] rounded h-[50px] border-gray-700 border-[1px] ml-2 mb-2"
          name="Engineer"
        >
          {tools.map((item, index) => (
            <option key={index} value={item?.ToolName}>
              {item?.ToolName}
            </option>
          ))}
        </select>
      )}

      {value === "2" && (
        <input
          name="ChallanNumber"
          onChange={(e) => setSearchChallan(e.target.value)}
          className="border-2 py-2 px-5 w-full max-w-[300px] border-gray-500 rounded mb-2 ml-2"
          placeholder="Challan Number"
        />
      )}

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
              {(a.data.Designation === "storekeeper" ||
                a?.data.Designation === "CEO") && (
                <Tab
                  sx={{ fontWeight: 800, padding: 0 }}
                  label={`Company Store(${toolsCounts?.storeCount}) `}
                  value="1"
                />
              )}

              {(a.data.Designation === "engineer" ||
                a?.data.Designation === "CEO" ||
                a.data.Designation === "storekeeper") && (
                <Tab
                  sx={{ fontWeight: 800, padding: 0 }}
                  label={`Engineer Tool(${toolsCounts?.engineerCount})`}
                  value="3"
                />
              )}

              {(a.data.Designation === "production" ||
                a.data.Designation === "storekeeper" ||
                a?.data.Designation === "CEO") && (
                <Tab
                  sx={{ fontWeight: 800, padding: 0 }}
                  label={`Production Tool(${toolsCounts?.productionCount})`}
                  value="6"
                />
              )}
              
              {(             
                a.data.Designation === "Mechanical" ||     
                a.data.Designation === "storekeeper" ||
                a?.data.Designation === "CEO") && (
                <Tab
                  sx={{ fontWeight: 800, padding: 0 }}
                  label={`Mechanical Tool(${toolsCounts?.mechanicalCount})`}
                  value="7"
                />

              )}

              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`All Tool(${toolsCounts?.TotalToolCount})`}
                value="4"
              />

              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`Unapproved`}
                value="2"
              />
              {( 
                
                a?.data.Designation === "CEO" ||
                a.data.Designation === "storekeeper") && (
                <Tab
                  sx={{ fontWeight: 800, padding: 0 }}
                  label={`Rejected Tool`}
                  value="5"
                />
              )}
              <Tab
                sx={{ fontWeight: 800, padding: 0 }}
                label={`All Challan`}
                value="8"
              />
            </TabList>
          </Box>

          {(a.data.Designation === "storekeeper" ||
            a?.data.Designation === "CEO") && (
            <TabPanel sx={{ padding: 0 }} value="1">
              <Tools
                setTools={setTools}
                tools={tools}
                setTool={setTool}
                tool={tool}
                setOpen={setOpen}
                open={open}
              />
            </TabPanel>
          )}

          {(a.data.Designation === "engineer" ||
            a?.data.Designation === "CEO" ||
            a.data.Designation === "storekeeper") && (
            <TabPanel sx={{ paddingX: 0 }} value="3">
              <EngineerTool setTool={setTool} tool={tool} />
            </TabPanel>
          )}
          {(a.data.Designation === "production" ||
            a.data.Designation === "storekeeper" ||
            a?.data.Designation === "CEO") && (
            <TabPanel sx={{ paddingX: 0 }} value="6">
              <ProductionTool setTool={setTool} tool={tool} />
            </TabPanel>
          )}
          {(a.data.Designation === "Mechanical" ||
            a.data.Designation === "storekeeper" ||
            a?.data.Designation === "CEO") && (
            <TabPanel sx={{ paddingX: 0 }} value="7">
              <MechanicalTool setTool={setTool} tool={tool} />
            </TabPanel>
          )}

          <TabPanel sx={{ paddingX: 0 }} value="2">
            <Hold
              setTools={setTools}
              tools={tools}
              setTool={setTool}
              tool={tool}
            />
          </TabPanel>
          <TabPanel sx={{ paddingX: 0 }} value="4">
            <AllTools setTool={setTool} tool={tool} />
          </TabPanel>
          <TabPanel sx={{ paddingX: 0 }} value="5">
            <RejectedTool tool={tool} />
          </TabPanel>

          <TabPanel sx={{ paddingX: 0 }} value="8">
            <AllChallan />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default LandinPage;
