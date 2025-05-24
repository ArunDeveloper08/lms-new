import React, { useEffect, useState } from "react";
import UnapprovedTable from "../UnapprovedTable";
import axios from "axios";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";

const EngineerToStore = ({ canChange, query, downloadUrl }) => {
  const [data, setData] = useState([]);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));

  const api = () => {
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=siteToStore`,
        { ...userInfo.data }
      )
      .then((res) => {
        setData(res?.data?.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    api();
  }, []);
  return (
    <>
      <UnapprovedTable
        userInfo={userInfo}
        data={data}
        api={api}
        query={query}
        downloadUrl={downloadUrl}
        canChange={canChange}
        check="toRecieve&siteCheck=true"
        // Props for getting exchange product Serial number modal
        // first getting the same product from the query which is used to get the product in table
        exchangeableProductListQuery="installedAndCustomerSite" // get the other product
        exchangeUpdatedQuery="updateWrongProductFromEngineer" // query for post route updating the product
      />
    </>
  );
};

export default EngineerToStore;
