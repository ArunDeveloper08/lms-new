import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UnapprovedTable from "../UnapprovedTable";
import  secureLocalStorage  from  "react-secure-storage";

const StoreToDefective = ({ canChange, query, downloadUrl }) => {
  const [data, setData] = useState([]);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const api = () =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=storeToDefective`,
        { ...userInfo.data }
      )
      .then((res) => setData(res.data.Data));
  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <UnapprovedTable
        userInfo={userInfo}
        data={data}
        canChange={canChange}
        api={api}
        query={query}
        check="recieveInDefective"
        downloadUrl={downloadUrl}
      />
    </>
  );
};

export default StoreToDefective;
