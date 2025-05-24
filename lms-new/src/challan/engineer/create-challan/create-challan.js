// import React, { useState } from "react";
// import AddProductModal from "./addProductModal";
// import { Button } from "@mui/material";
// import ChallanList from "./challan-list";

// const CreateChallan = () => {
//   const [modal, setModal] = useState(false);
//   return (
//     <div>
//       <AddProductModal modal={modal} setModal={setModal} api={() => {}} />
//       <div className="flex justify-center my-2">
//         <Button variant="contained" onClick={() => setModal(true)}>
//           Add Product To Challan
//         </Button>
//       </div>
//       {/* <ChallanList /> */}
//     </div>
//   );
// };

// export default CreateChallan;

import React, { useEffect, useState } from "react";
import AddProductModal from "./addProductModal";
import { Button } from "@mui/material";
import ChallanList from "./challan-list";
import SingleChallan from "./single-challan";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const CreateChallan = () => {
  const [modal, setModal] = useState(false);
  const { data: userData } = JSON.parse(secureLocalStorage.getItem("info"));
  const [allChallan, setAllChallan] = useState([]);
  const navigate = useNavigate();
  const deleteItem = async (product) => {
    try {
      await axios.post(
        `${window.MyApiRoute}record/delete?location=tempEngineerDetailsDelete`,
        {
          command: "delOne",
          id: product.id,
          engineerId: product.Employee_Id,
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
        `${window.MyApiRoute}record/get?category=3-phaseMeter&location=engineerTempCart`,
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
    console.log("delete", challan);
    const confirm = window.confirm(
      "Are you sure you want to remove the Challan?"
    );
    if (confirm) {
      await axios.post(
        `${window.MyApiRoute}record/delete?location=tempEngineerDetailsDelete`,
        {
          command: "delAll",
          engineerId: challan.Employee_Id,
          ...userData,
        }
      );
      api();
    }
  };
  const submitChallan = async (challan) => {
    console.log(challan)
    const confirm = window.confirm(
      "Are you sure you want to create the Challan?"
    );
    if (confirm) {
      await axios
        .put(`${window.MyApiRoute}record/update?check=toSiteEngineer`, {
          engineerName: challan.engineerName,
          engineerId: challan.Employee_Id,
          ...userData,
        })
        .then((res) => {
          api();

          const newTab = window.open(
            `/downloadengineerchallanpdf/${res.data?.challanNumber}?type=externalReturnableChallan`,
            "_blank"
            // `/thirdpartychallanpdf/${res.data?.challanNumber}?type=thirdPartyReturnableChallan&SiteName=${challan.dealerName}`,
            // "_blank"
          );
          // You may want to focus on the new tab, although modern browsers might do this automatically
          if (newTab) {
            newTab.focus();
          }
        });
    }
  };

  return (
    <div>
      <AddProductModal modal={modal} setModal={setModal} api={api} />
      <div className="flex justify-center my-2">
        <Button variant="contained" onClick={() => setModal(true)}>
          Add Product To Challan
        </Button>
      </div>
      {/* <ChallanList /> */}
      {allChallan &&
        allChallan?.map((single) => {
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
    </div>
  );
};

export default CreateChallan;
