// import { Divider } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// const config = [
//   // {
//   //   name: "Outward ",
//   //   path: "create-challan",
//   // },
//   // {
//   //   name: " Inward  ",
//   //   path: "initiate-by-store",
//   // },
//   {
//     name: "Inward",
//     path: "create-challan-by-dealer",
//   },

//   {
//     name: "Outward",
//     path: "initiate-by-dealer",
//   },
// ];
// const ThirdPartyReturnablePage = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [selectedOption, setSelectedOption] = useState(
//     "create-challan-by-dealer"
//   );

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//     navigate(option, { replace: true });
//     // You can perform other actions here based on the selected option
//   };
//   useEffect(() => {
//     // Extract the challan type from the current pathname
//     const pathSegments = pathname.split("/");
//     const currentChallanType = pathSegments[3];
//     // when the user in on the -- /challan/third-party-returnable route only
//     if (currentChallanType === undefined) {
//       navigate(`/challan/third-party-returnable/${selectedOption}`, {
//         replace: true,
//       });
//       return;
//     }
//     console.log(pathSegments);
//     // Update the selected value in the component state
//     setSelectedOption(currentChallanType);
//   }, []);

//   return (
//     <>
//       <div className="flex w-full justify-around">
//         {/* <div
//        className="w-[50%] bg-green-500"
//       >
//         <div className="flex justify-center">

//         <p className="text-white text-2xl font-bold ">Initiate By Store</p>
//         </div>
//         </div> */}
//         <div className="bg-red-500 w-full py-2">
//           <div className="flex justify-center">
//             <p className="text-white text-2xl font-bold ">Initiate By Dealer</p>
//           </div>
//         </div>
//       </div>
//       <Divider />
//       <div className="flex grid-grid-cols-4 w-full">
//         <div className="tabs-for-challan flex w-full justify-between">
//           {config.map((option) => (
//             <label
//               key={option.name}
//               className={`tab-box cursor-pointer py-2 text-center font-bold w-full ${selectedOption === option.path
//                   ? "bg-red-100 rounded-md border-b-2 border-red-700"
//                   : " border-b-2"
//                 }`}>
//               <input
//                 type="radio"
//                 name="tab-input"
//                 className="tab-input hidden"
//                 checked={selectedOption === option.path}
//                 onChange={() => handleOptionChange(option.path)}
//               />
//               <div>{option.name}</div>
//             </label>
//           ))}
//         </div>
//       </div>
//       <Outlet />
//     </>
//   );
// };

// export default ThirdPartyReturnablePage;
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { mainRoute } from "../../App";

const config = [
  {
    name: "Inward",
    path: "create-challan-by-dealer",
  },
  {
    name: "Outward",
    path: "initiate-by-dealer",
  },
];

const ThirdPartyReturnablePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedOption, setSelectedOption] = useState("create-challan-by-dealer");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    navigate(`${mainRoute}/challan/third-party-returnable/${option}`, { replace: true });
  };

  useEffect(() => {
    // Extract the challan type from the current pathname
    const pathSegments = pathname.split("/");
    const currentChallanType = pathSegments[4]; // Adjusted for /erp/challan/third-party-returnable/<type>
    // when the user in on the -- /erp/challan/third-party-returnable route only
    if (currentChallanType === undefined) {
      navigate(`${mainRoute}/challan/third-party-returnable/${selectedOption}`, {
        replace: true,
      });
      return;
    }
    console.log(pathSegments);
    // Update the selected value in the component state
    setSelectedOption(currentChallanType);
  }, []);

  return (
    <>
      <div className="flex w-full justify-around">
        <div className="bg-red-500 w-full py-2">
          <div className="flex justify-center">
            <p className="text-white text-2xl font-bold ">Initiate By Dealer</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex grid-grid-cols-4 w-full">
        <div className="tabs-for-challan flex w-full justify-between">
          {config.map((option) => (
            <label
              key={option.name}
              className={`tab-box cursor-pointer py-2 text-center font-bold w-full ${
                selectedOption === option.path
                  ? "bg-red-100 rounded-md border-b-2 border-red-700"
                  : " border-b-2"
              }`}
            >
              <input
                type="radio"
                name="tab-input"
                className="tab-input hidden"
                checked={selectedOption === option.path}
                onChange={() => handleOptionChange(option.path)}
              />
              <div>{option.name}</div>
            </label>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ThirdPartyReturnablePage;