// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Dialog from "./DialogModal";
// import { Button } from "@mui/material";
// import EmployeeSimDialog from "./EmployeeSimDialog";
// import secureLocalStorage from "react-secure-storage";
// import { mainRoute } from "../App";

// const Main = () => {
//   const [open, setOpen] = useState(false);
//   const [openSimDialog, setOpenSimDialog] = useState(false);
//   const navigate = useNavigate();
//   const a = JSON.parse(secureLocalStorage.getItem("info"));
//   const handleAddPerson = () => {
//     a.isAdmin && navigate(`${mainRoute}/addpeople`);
//   };
//   const handleAddWork = () => {
//     navigate(`${mainRoute}/addWork`);
//   };

//   return (
//     <>
      // <div className="grid place-items-center w-[100vw] h-[80vh]">
      //   <div className="animate__animated animate__flipInY max-w-sm rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r from-red-500 to-gray-700 min-w-[300px]">
      //     <img
      //       className="w-full my-10 md:my-20 image-css px-5"
      //       src="https://www.peselectricals.com/image/bg.png"
      //       alt="Pes Electrical Pvt Ltd."
      //     />
      //     <div className="grid grid-cols-2 justify-center w-fit mx-auto gap-5 pb-10 items-center font-semibold">
      //       {a?.isAdmin && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={handleAddPerson}
      //         >
      //           Add Person
      //         </button>
      //       )}
       
      //       {a?.data?.Designation != "engineer" && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={() => navigate(`${mainRoute}/view`)}
      //         >
      //           View Work
      //         </button>
      //       )}

      //       {!a?.isAdmin && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={() =>
      //             a.isAdmin
      //               ? navigate(`${mainRoute}/csrlist`)
      //               : navigate(`${mainRoute}/csr`)
      //           }
      //         >
      //           MRR Form
      //           {/* Customer Service Report */}
      //         </button>
      //       )}
      //       {!a?.isAdmin && (
      //         <button
      //           onClick={() => navigate(`${mainRoute}/csrform`)}
      //           className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md "
      //         >
      //           CSR Report
      //         </button>
      //       )}
      //       <button
      //         className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //         onClick={() => navigate(`${mainRoute}/store`)}
      //       >
      //         Store
      //       </button>
      //       {a?.data?.Designation === "engineer" && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={() => setOpenSimDialog(true)}
      //         >
      //           Installation
      //         </button>
      //       )}
      //       {/* { (a.data.Designation === "engineer") && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={ () => navigate("/installsim") }
      //         >
      //           Install Sim
      //         </button>
      //       ) } */}

      //       {a?.isAdmin && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={() => navigate(`${mainRoute}/viewemployee`)}
      //         >
      //           All Employee
      //         </button>
      //       )}
      //       {(a?.data?.Designation === "storekeeper" || a?.isAdmin) && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={() => navigate(`${mainRoute}/dealer`)}
      //         >
      //           Dealer
      //         </button>
      //       )}
      //       {(a?.data.Designation === "storekeeper" || a?.isAdmin) && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={() => navigate(`${mainRoute}/Consumables`)}
      //         >
      //           Consumables
      //         </button>
      //       )}

      //       {/* {(a.data.Designation === "storekeeper" ||
      //         a.data.Designation === "production") && (
      //           <button
      //             className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //             onClick={() => navigate("/challanhistory")}
      //           >
      //             Challan
      //           </button>
      //         )} */}
      //       {(a?.data.Designation === "storekeeper" ||
      //         a?.data.Designation === "production") && (
      //         <button
      //           className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //           onClick={() => navigate(`${mainRoute}/challan`)}
      //         >
      //           Challan
      //         </button>
      //       )}

      //       <button
      //         className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
      //         onClick={() => navigate(`${mainRoute}/landingpage`)}
      //       >
      //         Tools
      //       </button>

      //       {a?.data.Designation === "engineer" && (
      //         <button
      //           onClick={() => navigate(`${mainRoute}/view-engineer-challan`)}
      //           className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md "
      //         >
      //           View Challan
      //         </button>
      //       )}
      //       {a?.data?.Designation === "engineer" && (
      //         <button
      //           onClick={() => navigate(`${mainRoute}/activity`)}
      //           className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md "
      //         >
      //           Activity Log
      //         </button>
      //       )}
      //     </div>
      //   </div>
      // </div>
//       {/* {open && <Dialog open={open} setOpen={setOpen} />} */}
//       {openSimDialog && (
//         <EmployeeSimDialog
//           openSimDialog={openSimDialog}
//           setOpenSimDialog={setOpenSimDialog}
//         />
//       )}
//     </>
//   );
// };

// export default Main;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "./DialogModal";
import { Button } from "@mui/material";
import EmployeeSimDialog from "./EmployeeSimDialog";
import secureLocalStorage from "react-secure-storage";
import { mainRoute } from "../App";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [openSimDialog, setOpenSimDialog] = useState(false);
  const navigate = useNavigate();

  // Safely parse secureLocalStorage with error handling
  let a = null;
  try {
    const info = secureLocalStorage.getItem("info");
    if (info) {
      a = JSON.parse(info);
    }
  } catch (error) {
    console.error("Error parsing secureLocalStorage 'info':", error);
  }
  //console.log("a" , a)

  // Fallback if 'a' is null
  if (!a) {
    navigate(`${mainRoute}/`)
    const Logout = ()=>{
      secureLocalStorage.removeItem("info")
      // localStorage.removeItem('Employee_Id');
   // document.cookie = 'logged_in=; path=/; max-age=0';
        navigate(`${mainRoute}/`)
    }
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg font-roboto">
          Error: User information not found. Please log in again.
        </p>
        <button onClick = {Logout}>Logout</button>
      </div>
    );
  }
                                       
  const handleAddPerson = () => {
    a.isAdmin && navigate(`${mainRoute}/addpeople`);
  };

  const handleAddWork = () => {
    navigate(`${mainRoute}/addWork`);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="sm:hidden h-screen bg-gradient-to-b from-blue-900 to-blue-200 flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto px-4 animate__animated animate__fadeInUp">
          <div className="bg-gray-50 rounded-3xl shadow-xl p-8 space-y-8 min-h-[90vh] flex flex-col border-2 border-gradient-to-r from-yellow-200 to-yellow-600">
            <div className="text-center space-y-4">
              <img
                className="mx-auto w-32 shadow-md rounded-full ring-2 ring-yellow-200"
                src="https://www.peselectricals.com/image/bg.png"
                alt="Pes Electrical Pvt Ltd."
              />
              <div className="h-0.5 bg-gradient-to-r from-yellow-200 to-yellow-600 w-24 mx-auto"></div>
            </div>
            <div className="flex flex-col gap-4">
              {a?.isAdmin && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={handleAddPerson}
                >
                  Add Person
                </button>
              )}
              {a?.data?.Designation !== "engineer" && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => navigate(`${mainRoute}/view`)}
                >
                  View Work
                </button>
              )}
              {!a?.isAdmin && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() =>
                    a.isAdmin
                      ? navigate(`${mainRoute}/csrlist`)
                      : navigate(`${mainRoute}/csr`)
                  }
                >
                  MRR Form
                </button>
              )}
              {!a?.isAdmin && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => navigate(`${mainRoute}/csrform`)}
                >
                  CSR Report
                </button>
              )}
              <button
                className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                onClick={() => navigate(`${mainRoute}/store`)}
              >
                Store
              </button>
              {a?.data?.Designation === "engineer" && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => setOpenSimDialog(true)}
                >
                  Installation
                </button>
              )}
              {a?.isAdmin && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => navigate(`${mainRoute}/viewemployee`)}
                >
                  All Employee
                </button>
              )}
              {(a?.data?.Designation === "storekeeper" || a?.isAdmin) && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => navigate(`${mainRoute}/dealer`)}
                >
                  Dealer
                </button>
              )}
              {(a?.data?.Designation === "storekeeper" || a?.isAdmin) && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => navigate(`${mainRoute}/Consumables`)}
                >
                  Consumables
                </button>
              )}
              {(a?.data?.Designation === "storekeeper" ||
                a?.data?.Designation === "production") && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => navigate(`${mainRoute}/challan`)}
                >
                  Challan
                </button>
              )}
              <button
                className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                onClick={() => navigate(`${mainRoute}/landingpage`)}
              >
                Tools
              </button>
              {a?.data?.Designation === "engineer" && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => navigate(`${mainRoute}/view-engineer-challan`)}
                >
                  View Challan
                </button>
              )}
              {a?.data?.Designation === "engineer" && (
                <button
                  className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-lg py-3 px-4 text-base font-roboto font-medium hover:from-teal-800 hover:to-teal-700 hover:ring-2 hover:ring-yellow-200 transition-all hover:scale-105 shadow-md"
                  onClick={() => navigate(`${mainRoute}/activity`)}
                >
                  Activity Log
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Web Layout */}
      <div className="hidden sm:grid place-items-center w-[100vw] h-[80vh]">
        <div className="animate__animated animate__flipInY max-w-sm rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r from-red-500 to-gray-700 min-w-[300px]">
          <img
            className="w-full my-10 md:my-20 px-5"
            src="https://www.peselectricals.com/image/bg.png"
            alt="Pes Electrical Pvt Ltd."
          />
          <div className="grid grid-cols-2 justify-center w-fit mx-auto gap-5 pb-10 items-center font-semibold">
            {a?.isAdmin && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={handleAddPerson}
              >
                Add Person
              </button>
            )}
            {a?.data?.Designation !== "engineer" && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate(`${mainRoute}/view`)}
              >
                View Work
              </button>
            )}
            {!a?.isAdmin && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() =>
                  a.isAdmin
                    ? navigate(`${mainRoute}/csrlist`)
                    : navigate(`${mainRoute}/csr`)
                }
              >
                MRR Form
              </button>
            )}
            {!a?.isAdmin && (
              <button
                onClick={() => navigate(`${mainRoute}/csrform`)}
                className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md"
              >
                CSR Report
              </button>
            )}
            <button
              className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
              onClick={() => navigate(`${mainRoute}/store`)}
            >
              Store
            </button>
            {a?.data?.Designation === "engineer" && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => setOpenSimDialog(true)}
              >
                Installation
              </button>
            )}
            {a?.isAdmin && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate(`${mainRoute}/viewemployee`)}
              >
                All Employee
              </button>
            )}
            {(a?.data?.Designation === "storekeeper" || a?.isAdmin) && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate(`${mainRoute}/dealer`)}
              >
                Dealer
              </button>
            )}
            {(a?.data?.Designation === "storekeeper" || a?.isAdmin) && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate(`${mainRoute}/Consumables`)}
              >
                Consumables
              </button>
            )}
            {(a?.data?.Designation === "storekeeper" ||
              a?.data?.Designation === "production") && (
              <button
                className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
                onClick={() => navigate(`${mainRoute}/challan`)}
              >
                Challan
              </button>
            )}
            <button
              className="bg-gray-200 w-[100px] py-2 rounded-md duration-500 hover:bg-black hover:text-white"
              onClick={() => navigate(`${mainRoute}/landingpage`)}
            >
              Tools
            </button>
            {a?.data?.Designation === "engineer" && (
              <button
                onClick={() => navigate(`${mainRoute}/view-engineer-challan`)}
                className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md"
              >
                View Challan
              </button>
            )}
            {a?.data?.Designation === "engineer" && (
              <button
                onClick={() => navigate(`${mainRoute}/activity`)}
                className="bg-gray-200 duration-500 hover:bg-black hover:text-white py-2 w-[100px] rounded-md"
              >
                Activity Log
              </button>
            )}
          </div>
        </div>
      </div>

      {openSimDialog && (
        <EmployeeSimDialog
          openSimDialog={openSimDialog}
          setOpenSimDialog={setOpenSimDialog}
        />
      )}
    </>
  );
};

export default Main;