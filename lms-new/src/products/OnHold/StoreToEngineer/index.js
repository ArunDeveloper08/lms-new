import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UnapprovedTable from "../UnapprovedTable";
import  secureLocalStorage  from  "react-secure-storage";

const StoreToEngineer = ({ canChange, query, downloadUrl }) => {
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  const [data, setData] = useState("");
  const api = () => {
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=storeToSite`,
        userInfo.data
      )
      .then((res) => setData(res?.data?.Data))

      .catch((err) => console.log(err));
  };
  useEffect(() => {
    api();
  }, []);

  return (
    <div>
      {data && (
        <UnapprovedTable
          userInfo={userInfo}
          data={data}
          canChange={canChange}
          api={api}
          query={query}
          check="recieveOnSite"
          downloadUrl={downloadUrl}
        />
      )}
    </div>
  );
};

export default StoreToEngineer;
