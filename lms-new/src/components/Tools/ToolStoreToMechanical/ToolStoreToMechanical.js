import React, { useContext, useEffect, useState } from "react";
import UnapproveTable from "../UnapproveTable";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import secureLocalStorage from "react-secure-storage";
import { getTotalToolsCountAsync } from "../../../redux/actions";

const ToolStoreToMechanical = ({ canChange , query , downloadUrl }) => {
  const [data, setData] = useState([]);

  const { tool } = useContext(DataContext);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
  

  const api = () => {
    axios
      .post(
        `${window.MyApiRoute}tool/get?location=storeToMechanical&Employee_Id=${userInfo?.data.Employee_Id}&ToolID=${tool?.id}`,
        userInfo.data
      )
      .then((res) => {
        setData(res?.data?.data);
  
      
      })
      .catch((error) => {
        console.log(error);
      
      });
  };
  useEffect(() => {
    api();
  }, [tool]);



  return (
    <div>
      <UnapproveTable
        userInfo={userInfo}
        data={data}
        query={query}
        api={api}
        downloadUrl={downloadUrl}
        canChange={canChange}
        tool={tool}
        check="location=recieve"
      />
    </div>
  );
};

export default ToolStoreToMechanical;
