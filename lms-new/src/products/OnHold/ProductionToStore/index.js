import React, { useEffect, useState } from "react";
import UnapprovedTable from "../UnapprovedTable";
import axios from "axios";
import { useSelector } from "react-redux";
import  secureLocalStorage  from  "react-secure-storage";

const ProductionToStore = ({ canChange, query, downloadUrl }) => {
  const [data, setData] = useState([]);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const api = () =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=productionToStore `,
        { ...userInfo.data }
      )
      .then((res) => setData(res.data.Data));
  useEffect(() => {
    api();
  }, []);
  // return <p>ProductionToStore</p>;
  return (
    <UnapprovedTable
      userInfo={userInfo}
      canChange={canChange}
      data={data}
      api={api}
      query={query}
      check="toRecieve&productionCheck=true"
      downloadUrl={downloadUrl}
    />
  );
};

export default ProductionToStore;
