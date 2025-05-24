import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

import { useNavigate } from "react-router-dom";
import SingleChallan from "./single-challan";
const ChallanList = () => {
  const { data: userData } = JSON.parse(secureLocalStorage.getItem("info"));
  const [allChallan, setAllChallan] = useState([]);
  const navigate = useNavigate();
  const deleteItem = async (product) => {
    try {
      await axios.post(
        `${window.MyApiRoute}record/delete?location=tempByDealerThirdPartyDetailsDelete`,
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
        `${window.MyApiRoute}record/get?category=3-phaseMeter&location=tempThirdPartyDetailsByDealers`,
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
        `${window.MyApiRoute}record/delete?location=tempByDealerThirdPartyDetailsDelete`,
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
        .put(
          `${window.MyApiRoute}record/update?check=thirdPartyChallanByDealer`,
          {
            dealerName: challan.dealerName,
            dealerId: challan.dealerId,
            ...userData,
          }
        )
        .then((res) => {
          api();
          const newTab = window.open(
            `/thirdpartychallanpdf/${res.data?.challanNumber}?type=thirdPartyReturnableChallan&SiteName=${challan.dealerName}`,
            "_blank"
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
    </div>
  );
};

export default ChallanList;
