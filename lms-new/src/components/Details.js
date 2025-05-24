// import { Button } from "@mui/material";
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import secureLocalStorage from "react-secure-storage";
// import CeoSopModal from "./sop/CeoSop";
// import { mainRoute } from "../App";

// const Details = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const a = JSON.parse(secureLocalStorage.getItem("info"));

//   return (
//     !(location.pathname === `${mainRoute}`) &&
//     a && (
//       <>
//         <div className="flex py-2 justify-around items-center space-x-0">
//           <div className="sm:flex">
//             <p
//             onClick={()=>navigate(`${mainRoute}/home`)}
//               className={`py-2 cursor-pointer text-sm px-3 mr-2 text-center font-semibold text-white sm:text-xl ${
//                 a.isAdmin ? " bg-green-500" : "bg-blue-500"
//               } rounded-md`}
//             >
//               {a.isAdmin ? "Admin" : "Employee"}
//             </p>
//             <p className="py-2 text-[12px] font-semibold sm:text-xl">
//               Name : &nbsp;{a.data.name.toUpperCase()}
//             </p>
//           </div>
//           <div className="sm:flex">
//             <p
//               className={`sm:py-2 text-sm text-blue-500 font-semibold sm:text-3xl rounded-md`}
//             >
//               PORTAL:&nbsp;&nbsp;
//             </p>
//             <p className="py-2 text-sm s font-semibold sm:text-3xl">
//               {a.data.Designation.toUpperCase()}
//             </p>
//           </div>
//           <div className="sm:flex">
//             <p
//               className={`py-2 text-sm px-3 mr-2 text-center font-semibold text-white sm:text-xl cursor-pointer ${
//                 a.isAdmin ? " bg-green-500" : "bg-blue-500"
//               } rounded-md`}
//               onClick={() => navigate(`${mainRoute}/sop`)}
//             >
//               S.O.P
//             </p>
//             <p
//               className={`py-2 text-sm px-3 mr-2 text-center font-semibold text-white sm:text-xl cursor-pointer ${
//                 a.isAdmin ? " bg-green-500" : "bg-blue-500"
//               } rounded-md`}
//               onClick={() => navigate(`${mainRoute}/productsop`)}
//             >
//               Product SOP
//             </p>
//           </div>

//           <Button
//             onClick={() => {
//               navigate(`${mainRoute}`);
//               secureLocalStorage.clear();
//             }}
//             color="error"
//             sx={{ margin: "0 auto", display: "block" }}
//             variant="contained"
//           >
//             Logout
//           </Button>
//         </div>
//         {open && <CeoSopModal open={open} setOpen={setOpen} />}
//       </>
//     )
//   );
// };
// export default Details;
// Details.js
// Details.js
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import CeoSopModal from "./sop/CeoSop";
import { mainRoute } from "../App";

const normalizePath = (path) => path.replace(/\/+$/, "");
const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const a = JSON.parse(secureLocalStorage.getItem("info"));

  useEffect(() => {
    console.log("Screen Width:", window.innerWidth);
  }, []);
    if (
    normalizePath(location.pathname) === normalizePath(mainRoute) ||
    !a
  )
    return null;
  
  return (
    !(location.pathname === `${mainRoute}`) &&
    a && (
      <>
        <div className="flex flex-col sm:flex-row py-2 px-3 sm:px-6 justify-between items-center gap-2 sm:gap-6 bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-xl border border-gray-200 w-full">
          {/* User Info & Portal Info */}
          <div className="flex flex-row flex-wrap sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Admin/Employee Badge - Hidden on Mobile */}
            <p
              role="button"
              tabIndex={0}
              onClick={() => navigate(`${mainRoute}/home`)}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`${mainRoute}/home`)
              }
              className={`hidden sm:inline-block py-1.5 px-3 text-xs sm:text-sm md:text-base font-semibold text-white text-center rounded-lg cursor-pointer transition-transform transform hover:scale-105 duration-300 shadow-md ${
                a?.isAdmin
                  ? "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              } min-w-[70px]`}
            >
              {a?.isAdmin ? "Admin" : "Employee"}
            </p>

            {/* Name */}
            {/* Name and Designation in same row on mobile */}
            <div className="w-full sm:w-auto flex justify-between sm:justify-start items-center">
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 font-serif text-left sm:text-left">
                <span className="font-bold text-gray-900">Name:</span>{" "}
                {a.data.name.toUpperCase()}
              </p>
              <p className="text-xs sm:hidden font-medium text-gray-800 font-serif text-right">
                <span className="font-bold text-blue-600">Designation:</span>{" "}
                {a.data.Designation.toUpperCase()}
              </p>
            </div>

            {/* Portal Info - Hidden on Mobile for compact view */}
            <div className="hidden sm:flex items-center gap-2">
              <p className="text-xs sm:text-sm md:text-base font-bold text-blue-600 font-serif">
                PORTAL:
              </p>
              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 font-serif truncate">
                {a.data.Designation.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
            {/* S.O.P */}
            <p
              role="button"
              tabIndex={0}
              onClick={() => navigate(`${mainRoute}/sop`)}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`${mainRoute}/sop`)
              }
              className={`py-1.5 px-3 text-xs sm:text-sm md:text-base font-semibold text-white text-center rounded-lg cursor-pointer transition-transform transform hover:scale-105 duration-300 shadow-md ${
                a.isAdmin
                  ? "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              } min-w-[90px]`}
            >
              S.O.P
            </p>

            {/* Product SOP */}
            <p
              role="button"
              tabIndex={0}
              onClick={() => navigate(`${mainRoute}/productsop`)}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`${mainRoute}/productsop`)
              }
              className={`py-1.5 px-3 text-xs sm:text-sm md:text-base font-semibold text-white text-center rounded-lg cursor-pointer transition-transform transform hover:scale-105 duration-300 shadow-md ${
                a?.isAdmin
                  ? "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              } min-w-[110px]`}
            >
              Product SOP
            </p>

            {/* Logout Button */}
            <Button
              onClick={() => {
                navigate(`${mainRoute}`);
                secureLocalStorage.clear();
              }}
              sx={{
                minWidth: "90px",
                padding: "6px 12px",
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                borderRadius: "0.5rem",
                textTransform: "none",
                background: "linear-gradient(to right, #ef4444, #dc2626)",
                color: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  background: "linear-gradient(to right, #dc2626, #b91c1c)",
                },
                transition: "all 0.3s ease",
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              }}
              variant="contained"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* CeoSopModal */}
        {open && <CeoSopModal open={open} setOpen={setOpen} />}
      </>
    )
  );
};

export default Details;
