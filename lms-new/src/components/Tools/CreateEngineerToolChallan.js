import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import AddProductEngineerModal from "./AddProductEngineerModal";
import ChallanTable from "./ChallanTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mainRoute } from "../../App";

const CreateEngineerToolChallan = () => {
  const [modal, setModal] = useState(false);
  const { data: userData } = JSON.parse(secureLocalStorage.getItem("info"));
  const [allChallan, setAllChallan] = useState([]);
//  const navigate = useNavigate();
  const deleteItem = async (product) => {
    try {
      await axios.post(`${window.MyApiRoute}tool/removeTempToolItem`, {
        // command: "delOne",
        // id: product.id,
        // engineerId: product.Employee_Id,
        ...product,
        ...userData,
      });
      api();
    } catch (error) {
      alert("Error deleting the third party Items !");
    }
  };
  const api = async () => {
    try {
      const { data } = await axios.post(
        `${window.MyApiRoute}tool/getEngineerCartData`,
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
     // console.log("Removing item ", product);
    }
  };

  const deleteChallan = async (challan) => {
    // console.log("delete", challan);
    const confirm = window.confirm(
      "Are you sure you want to remove the Challan?"
    );
    if (confirm) {
      await axios.post(`${window.MyApiRoute}tool/clearAllChallan`, {
        command: "delAll",
        engineerId: challan.Employee_Id,
        ...userData,
        ...challan,
      });
      api();
    }
  };
  const submitChallan = async (challan) => {
    // console.log(challan)
    const confirm = window.confirm(
      "Are you sure you want to create the Challan?"
    );
    if (confirm) {
      await axios
        .post(`${window.MyApiRoute}tool/createChallan`, {
          engineerName: challan.engineerName,
          engineerId: challan.Employee_Id,
          ...userData,
          ...challan,
        })
        .then((res) => {
          api();

          const newTab = window.open(
            `${mainRoute}/downloadengineertoolchallanpdf/${res.data.challanNumber}?type=internalReturnableChallan`,
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
      <div className="flex justify-center my-2">
        <Button variant="contained" onClick={() => setModal(true)}>
          Add Product To Challan
        </Button>
      </div>
      <AddProductEngineerModal modal={modal} setModal={setModal} api={api} />

      {allChallan &&
        allChallan?.map((single) => {
          return (
            <ChallanTable
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

export default CreateEngineerToolChallan;
