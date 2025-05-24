// import React, { useEffect, useState } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// const config = [
//   {
//     name: "Create Challan",
//     path: "create-challan",
//   },
//   // {
//   //   name: "Initiate By Engineer",
//   //   path: "initiate-by-engineer",
//   // },
//   {
//     name: "Accept Products",
//     path: "accept-products",
//   },
//   {
//     name: "Challan History",
//     path: "challan-history",
//   },
// ];
// const EngineerChallan = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const [selectedOption, setSelectedOption] = useState("create-challan");

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//     navigate(option, { replace: true });
//     // You can perform other actions here based on the selected option
//   };
//   useEffect(() => {
//     // Extract the challan type from the current pathname
//     const pathSegments = pathname.split("/");
//     const currentChallanType = pathSegments[3];
//     // when the user in on the -- /challan/engineer-returnable route only
//     console.log("currentChallanType", currentChallanType);
//     if (currentChallanType === undefined) {
//       navigate(`/challan/engineer/${selectedOption}`, {
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
//       <div className="flex grid-grid-cols-4 w-full">
//         <div className="tabs-for-challan flex w-full justify-between">
//           {config.map((option) => (
//             <label
//               key={option.name}
//               className={`tab-box py-2 text-center font-bold w-full ${
//                 selectedOption === option.path
//                   ? "bg-red-100 rounded-md border-b-2 border-red-700"
//                   : " border-b-2"
//               }`}>
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

// export default EngineerChallan;
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { mainRoute } from "../../App";

const config = [
  {
    name: "Create Challan",
    path: "create-challan",
  },
  {
    name: "Accept Products",
    path: "accept-products",
  },
  {
    name: "Challan History",
    path: "challan-history",
  },
];

const EngineerChallan = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedOption, setSelectedOption] = useState("create-challan");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    navigate(`${mainRoute}/challan/engineer/${option}`, { replace: true });
  };

  useEffect(() => {
    // Extract the challan type from the current pathname
    const pathSegments = pathname.split("/");
    const currentChallanType = pathSegments[4]; // Adjusted for /erp/challan/engineer/<type>
    console.log("currentChallanType", currentChallanType);
    if (currentChallanType === undefined) {
      navigate(`${mainRoute}/challan/engineer/${selectedOption}`, {
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
      <div className="flex grid-grid-cols-4 w-full">
        <div className="tabs-for-challan flex w-full justify-between">
          {config.map((option) => (
            <label
              key={option.name}
              className={`tab-box py-2 text-center font-bold w-full ${
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

export default EngineerChallan;