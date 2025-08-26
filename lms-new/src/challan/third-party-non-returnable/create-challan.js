// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import secureLocalStorage from "react-secure-storage";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import DealerThirdPartyNonChallan from "./create-nonReturnable-challan";
// import ThirdNonParty from "./create-nonReturnable-challan";
// import ThirdNonPartyModal from "./create-nonReturnable-challan";

// const ThirdPartyNonCreateChallan = () => {
//   const { data: userData } = JSON.parse(secureLocalStorage.getItem("info"));
//   const [allChallan, setAllChallan] = useState([]);
//   const navigate = useNavigate();
//   const deleteItem = async (product) => {
//     try {
//       await axios.post(`${window.MyApiRoute}dealerPO/delTemp`, {
//         list: [product.tempid],
//         ...userData,
//       });
//     } catch (error) {
//       alert("Error deleting the third party Items !");
//     }finally{
//        api();
//     }
//   };
//   const api = async () => {
//     try {
//       const { data } = await axios.post(
//         `${window.MyApiRoute}dealerPO/getTemp`,
//         userData
//       );
//       setAllChallan(data.data);
//     } catch (error) {
//       alert("Error while getting the data");
//     }
//   };
//   useEffect(() => {
//     api();
//   }, []);
//   const removeItem = async (product) => {
//     const confirm = window.confirm(
//       `Are you sure, you want to remove item from PO No - ${product.PO_Number} , Sr NO-${product.productSrNo}`
//     );
//     if (confirm) {
//       await deleteItem(product);
//       console.log(
//         `removing item from PO No - ${product.PO_Number} , Sr NO-${product.productSrNo}`
//       );
//     }
//   };
//   const deleteChallan = async (challan) => {
//     const confirm = window.confirm(
//       "Are you sure you want to remove the Challan?"
//     );
//     if (confirm) {
//       try {
//         await axios.post(`${window.MyApiRoute}dealerPO/delTemp`, {
//           list: challan.map((item) => item.tempid),
//           ...userData,
//         });
//       } catch (error) {
//         alert("Error while getting the data");
//       }finally{
//          api();
//       }
//     }
//   };
//   const submitChallan = async (challan) => {
//     const confirm = window.confirm(
//       "Are you sure you want to create the Challan?"
//     );
//     console.log(challan);
//     if (confirm) {
//       await axios
//         .put(
//           `${window.MyApiRoute}record/update?check=thirdPartyNonReturnable`,
//           {
//             list: challan[1].map((item) => item.tempid),
//             ...userData,
//           }
//         )
//         .then((res) => {
//          api();
//           // window.open(`/thirdpartychallan-non-return/${res.data?.challanNumber}`,'_blank')
//           window.open(
//             `/thirdpartychallan-non-return/${res.data?.challanNumber}?type=thirdPartyNonReturnableChallan`,
//             "_blank"
//           );
//           // navigate(
//           //     `/thirdpartychallan-non-return/${res.data?.challanNumber}`,
//           //     {}
//           // );
//         });
//     }
//   };

//   const [modal, setModal] = useState({
//     open: false,
//     type: "",
//   });

//   const [partyModal, setPartyModal] = useState({
//     open: false,
//   });

//   return (
//     <div className="mt-5">
//       <div className="flex justify-center mb-2">
//         <Button
//           variant="contained"
//           onClick={() => setPartyModal((p) => ({ ...p, open: true }))}
//           color="primary"
//         >
//           Third Party Non-Returnable (sale)
//         </Button>
//       </div>
//       {allChallan?.map((single) => {
//         return (
//           <SingleChallan
//             submitChallan={submitChallan}
//             deleteChallan={deleteChallan}
//             removeItem={removeItem}
//             single={single}
//             key={single.siteName}
//           />
//         );
//       })}

//       {partyModal.open && (
//         <ThirdNonPartyModal
//           api={api}
//           setPartyModal={setPartyModal}
//           partyModal={partyModal}
//           // setOpen={setOpen}
//           // setBadgeCount={setBadgeCount}
//           // setChecked={setChecked}
//         />
//       )}
//     </div>
//   );
// };

// export default ThirdPartyNonCreateChallan;

// export const SingleChallan = ({
//   single,
//   removeItem,
//   deleteChallan,
//   submitChallan,
// }) => {
//   // console.log(single);
//   return (
//     <div className="w-4/5 mx-auto mb-5">
//       <table className="table-for-challan">
//         <thead>
//           <tr>
//             <th>{single[0]}</th>
//             <th>Dealer Name</th>
//             <th>PO Number</th>
//             <th>Product Type</th>
//             <th>Product Sr NO</th>
//           </tr>
//         </thead>
//         <tbody>
//           {single?.[1]?.map((product) => (
//             <tr key={product.tempid}>
//               <td>
//                 <Button
//                   onClick={() => removeItem(product)}
//                   variant="contained"
//                   sx={{ paddingY: "2px", boxShadow: "none" }}
//                   size="small"
//                 >
//                   Remove item
//                 </Button>{" "}
//               </td>
//               <td className="capitalize">{product.name}</td>
//               <td>{product.PO_Number}</td>
//               <td>{product.ProductType}</td>
//               <td>{product.productSrNo}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex gap-x-5 py-2">
//         <Button
//           size="small"
//           variant="contained"
//           onClick={() => deleteChallan(single?.[1])}
//           color="error"
//         >
//           Cancel Challan
//         </Button>
//         <Button
//           size="small"
//           onClick={() => submitChallan(single)}
//           variant="contained"
//           color="success"
//         >
//           Create Challan
//         </Button>
//       </div>
//     </div>
//   );
// };
import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DealerThirdPartyNonChallan from "./create-nonReturnable-challan";
import ThirdNonParty from "./create-nonReturnable-challan";
import ThirdNonPartyModal from "./create-nonReturnable-challan";
import { mainRoute } from "../../App";

const ThirdPartyNonCreateChallan = () => {
  const { data: userData } = JSON.parse(secureLocalStorage.getItem("info"));
  const [allChallan, setAllChallan] = useState([]);
  const navigate = useNavigate();

  const deleteItem = async (product) => {
    try {
      await axios.post(`${window.MyApiRoute}dealerPO/delTemp`, {
        list: [product.tempid],
        ...userData,
      });
    } catch (error) {
      alert("Error deleting the third party Items !");
    } finally {
      api();
    }
  };

  const api = async () => {
    try {
      const { data } = await axios.post(
        `${window.MyApiRoute}dealerPO/getTemp`,
        userData
      );
      setAllChallan(data.data);
    } catch (error) {
      alert("Error while getting the data");
    }
  };

  useEffect(() => {
    api();
  }, []);

  const removeItem = async (product) => {
    const confirm = window.confirm(
      `Are you sure, you want to remove item from PO No - ${product.PO_Number} , Sr NO-${product.productSrNo}`
    );
    if (confirm) {
      await deleteItem(product);
      console.log(
        `removing item from PO No - ${product.PO_Number} , Sr NO-${product.productSrNo}`
      );
    }
  };

  const deleteChallan = async (challan) => {
    const confirm = window.confirm(
      "Are you sure you want to remove the Challan?"
    );
    if (confirm) {
      try {
        await axios.post(`${window.MyApiRoute}dealerPO/delTemp`, {
          list: challan.map((item) => item.tempid),
          ...userData,
        });
      } catch (error) {
        alert("Error while getting the data");
      } finally {
        api();
      }
    }
  };

  const submitChallan = async (challan) => {
    const confirm = window.confirm(
      "Are you sure you want to create the Challan?"
    );
    //console.log(challan);
    if (confirm) {
      await axios
        .put(
          `${window.MyApiRoute}record/update?check=thirdPartyNonReturnable`,
          {
            list: challan[1].map((item) => item.tempid),
            ...userData,
          }
        )
        .then((res) => {
          api();
          window.open(
            `${mainRoute}/thirdpartychallan-non-return/${res.data?.challanNumber}?type=thirdPartyNonReturnableChallan`,
            "_blank"
          );
          // navigate(
          //     `${mainRoute}/thirdpartychallan-non-return/${res.data?.challanNumber}`,
          //     {}
          // );
        });
    }
  };

  const [modal, setModal] = useState({
    open: false,
    type: "",
  });

  const [partyModal, setPartyModal] = useState({
    open: false,
  });

  return (
    <div className="mt-5">
      <div className="flex justify-center mb-2">
        <Button
          variant="contained"
          onClick={() => setPartyModal((p) => ({ ...p, open: true }))}
          color="primary"
        >
          Third Party Non-Returnable (sale)
        </Button>
      </div>
      {allChallan?.map((single) => {
        return (
          <SingleChallan
            submitChallan={submitChallan}
            deleteChallan={deleteChallan}
            removeItem={removeItem}
            single={single}
            key={single.siteName}
          />
        );
      })}

      {partyModal.open && (
        <ThirdNonPartyModal
          api={api}
          setPartyModal={setPartyModal}
          partyModal={partyModal}
        />
      )}
    </div>
  );
};

export default ThirdPartyNonCreateChallan;

export const SingleChallan = ({
  single,
  removeItem,
  deleteChallan,
  submitChallan,
}) => {
  return (
    <div className="w-4/5 mx-auto mb-5">
      <table className="table-for-challan">
        <thead>
          <tr>
            <th>{single[0]}</th>
            <th>Dealer Name</th>
            <th>PO Number</th>
            <th>Product Type</th>
            <th>Product Sr NO</th>
          </tr>
        </thead>
        <tbody>
          {single?.[1]?.map((product) => (
            <tr key={product.tempid}>
              <td>
                <Button
                  onClick={() => removeItem(product)}
                  variant="contained"
                  sx={{ paddingY: "2px", boxShadow: "none" }}
                  size="small"
                >
                  Remove item
                </Button>{" "}
              </td>
              <td className="capitalize">{product.name}</td>
              <td>{product.PO_Number}</td>
              <td>{product.ProductType}</td>
              <td>{product.productSrNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-x-5 py-2">
        <Button
          size="small"
          variant="contained"
          onClick={() => deleteChallan(single?.[1])}
          color="error"
        >
          Cancel Challan
        </Button>
        <Button
          size="small"
          onClick={() => submitChallan(single)}
          variant="contained"
          color="success"
        >
          Create Challan
        </Button>
      </div>
    </div>
  );
};