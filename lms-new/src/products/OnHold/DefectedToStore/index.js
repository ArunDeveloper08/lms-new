import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UnapprovedTable from "../UnapprovedTable";
import  secureLocalStorage  from  "react-secure-storage";

const DefectedToStore = ({ canChange, query, downloadUrl }) => {
  const [data, setData] = useState([]);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const api = () =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=defectiveToStore`,
        { ...userInfo.data }
      )
      .then((res) => setData(res.data.Data));
  useEffect(() => {
    api();
  }, []);
  // return <p>StoreUnapproved</p>;
  return (
    <UnapprovedTable
      userInfo={userInfo}
      canChange={canChange}
      query={query}
      data={data}
      api={api}
      check="toRecieve&defectiveCheck=true"
      downloadUrl={downloadUrl}
    />
  );
};

export default DefectedToStore;
