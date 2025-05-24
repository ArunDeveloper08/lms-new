import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import SingleChallan from "./single-challan";
import { useNavigate } from "react-router-dom";
import { mainRoute } from "../../App";

const CreateChallan = () => {
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
          SiteName: product.SiteName,
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
          SiteName: challan.siteName,
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
          `${window.MyApiRoute}record/update?check=thirdParty`,
          {
            SiteName: challan.siteName,
            ...userData,
          }
        )
        .then((res) => {
          api();
          navigate(
            `${mainRoute}/thirdpartychallanpdf/${res.data?.challanNumber}?type=thirdPartyReturnableChallan&SiteName=${challan.siteName}`
          );
        });
    }
  };
  return (
    <div className="mt-5">
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

export default CreateChallan;
