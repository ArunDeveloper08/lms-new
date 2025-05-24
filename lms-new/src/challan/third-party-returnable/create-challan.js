// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import secureLocalStorage from "react-secure-storage";

// import { useNavigate } from "react-router-dom";
// import SingleChallan from "../../components/ChallanDetail/single-challan";
// import { Button } from "@mui/material";
// import DealerThirdPartyChallan from "./create-challan-by-dealer-components/create-returnable-challan";

// const ThirdPartyCreateChallan = () => {
//   const { data: userData } = JSON.parse(secureLocalStorage.getItem("info"));
//   const [allChallan, setAllChallan] = useState([]);
//   const navigate = useNavigate();
//   const deleteItem = async (product) => {
//     try {
//       await axios.post(
//         `${window.MyApiRoute}record/delete?location=tempThirdPartyDetailsDelete`,
//         {
//           command: "delOne",
//           id: product.id,
//           dealerId: product.dealerId,
//           ...userData,
//         }
//       );
//       api();
//     } catch (error) {
//       alert("Error deleting the third party Items !");
//     }
//   };
//   const api = async () => {
//     try {
//       const { data } = await axios.post(
//         `${window.MyApiRoute}record/get?category=3-phaseMeter&location=thirdPartyTempCart`,
//         userData
//       );
//       setAllChallan(data.Data);
//     } catch (error) {
//       alert("Error while getting the data");
//     }
//   };
//   useEffect(() => {
//     api();
//   }, []);

//   const removeItem = async (product) => {
//     const confirm = window.confirm("Are you sure you want to remove the item?");
//     if (confirm) {
//       await deleteItem(product);
//       console.log("Removing item ", product);
//     }
//   };
//   const deleteChallan = async (challan) => {
   
//     const confirm = window.confirm(
//       "Are you sure you want to remove the Challan?"
//     );
//     if (confirm) {
//       await axios.post(
//         `${window.MyApiRoute}record/delete?location=tempThirdPartyDetailsDelete`,
//         {
//           command: "delAll",
//           dealerId: challan.dealerId,
//           ...userData,
//         }
//       );
//       api();
//     }
//   };
//   const submitChallan = async (challan) => {
//     const confirm = window.confirm(
//       "Are you sure you want to create the Challan?"
//     );
//     if (confirm) {
//       await axios
//         .put(`${window.MyApiRoute}record/update?check=thirdParty`, {
//           dealerName: challan.dealerName,
//           dealerId: challan.dealerId,
//           ...userData,
//         })
//         .then((res) => {
//           api();
//           const newTab = window.open(
//             `/thirdpartychallanpdf/${res.data?.challanNumber}?type=thirdPartyReturnableChallan&SiteName=${challan.dealerName}`,
//             "_blank"
//           );
//           // You may want to focus on the new tab, although modern browsers might do this automatically
//           if (newTab) {
//             newTab.focus();
//           }
//         });
//     }
//   };

//   // for addind products
//   const [addProductModal, setAddProductModal] = useState({
//     open: false,
//     type: "",
//   });
//   const openAddProduct = (type) => {
//     setAddProductModal({
//       open: true,
//       type: type,
//     });
//   };
//   return (
//     <div className="mt-5">
//       <div className="flex justify-center mb-2">
//         <Button
//           variant="contained"
//           onClick={() => openAddProduct("oldProduct")}>
//           dealer Returnable challan
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

//       {addProductModal.open && (
//         <DealerThirdPartyChallan
//           api={api}
//           addProductModal={addProductModal}
//           setAddProductModal={setAddProductModal}
//         />
//       )}
//     </div>
//   );
// };

// export default ThirdPartyCreateChallan;

import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import SingleChallan from "../../components/ChallanDetail/single-challan";
import { Button } from "@mui/material";
import DealerThirdPartyChallan from "./create-challan-by-dealer-components/create-returnable-challan";
import { mainRoute } from "../../App";


const ThirdPartyCreateChallan = () => {
  const { data: userData } = JSON.parse(secureLocalStorage.getItem("info"));
  const [allChallan, setAllChallan] = useState([]);
  const navigate = useNavigate();

  const deleteItem = async (product) => {
    try {
      await axios.post(
        `${window.MyApiRoute}record/delete?location=tempThirdPartyDetailsDelete`,
        {
          command: "delOne",
          id: product.id,
          dealerId: product.dealerId,
          ...userData,
        }
      );
      api();
    } catch (error) {
      alert("Error deleting the third party Items !");
    }
  };

  const api = async () => {
    try {
      const { data } = await axios.post(
        `${window.MyApiRoute}record/get?category=3-phaseMeter&location=thirdPartyTempCart`,
        userData
      );
      setAllChallan(data.Data);
    } catch (error) {
      alert("Error while getting the data");
    }
  };

  useEffect(() => {
    api();
  }, []);

  const removeItem = async (product) => {
    const confirm = window.confirm("Are you sure you want to remove the item?");
    if (confirm) {
      await deleteItem(product);
      console.log("Removing item ", product);
    }
  };

  const deleteChallan = async (challan) => {
    const confirm = window.confirm(
      "Are you sure you want to remove the Challan?"
    );
    if (confirm) {
      await axios.post(
        `${window.MyApiRoute}record/delete?location=tempThirdPartyDetailsDelete`,
        {
          command: "delAll",
          dealerId: challan.dealerId,
          ...userData,
        }
      );
      api();
    }
  };

  const submitChallan = async (challan) => {
    const confirm = window.confirm(
      "Are you sure you want to create the Challan?"
    );
    if (confirm) {
      await axios
        .put(`${window.MyApiRoute}record/update?check=thirdParty`, {
          dealerName: challan.dealerName,
          dealerId: challan.dealerId,
          ...userData,
        })
        .then((res) => {
          api();
          const newTab = window.open(
            `${mainRoute}/thirdpartychallanpdf/${res.data?.challanNumber}?type=thirdPartyReturnableChallan&SiteName=${challan.dealerName}`,
            "_blank"
          );
          // You may want to focus on the new tab, although modern browsers might do this automatically
          if (newTab) {
            newTab.focus();
          }
        });
    }
  };

  // for addind products
  const [addProductModal, setAddProductModal] = useState({
    open: false,
    type: "",
  });
  const openAddProduct = (type) => {
    setAddProductModal({
      open: true,
      type: type,
    });
  };

  return (
    <div className="mt-5">
      <div className="flex justify-center mb-2">
        <Button
          variant="contained"
          onClick={() => openAddProduct("oldProduct")}
        >
          dealer Returnable challan
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

      {addProductModal.open && (
        <DealerThirdPartyChallan
          api={api}
          addProductModal={addProductModal}
          setAddProductModal={setAddProductModal}
        />
      )}
    </div>
  );
};

export default ThirdPartyCreateChallan;
