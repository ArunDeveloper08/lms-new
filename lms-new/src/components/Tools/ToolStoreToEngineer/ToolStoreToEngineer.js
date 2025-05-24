

import React, { useContext, useEffect, useState } from "react";
// import UnapprovedTable from "../UnapprovedTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import  secureLocalStorage  from  "react-secure-storage";
import { DataContext } from "../context/DataProvider";
import UnapproveTable from "../UnapproveTable";
import { getTotalToolsCountAsync } from "../../../redux/actions";

const ToolStoreToEngineer = ({ canChange, query, downloadUrl }) => {
  const [data, setData] = useState([]);
 const {tool}=useContext(DataContext)
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"));


  const api = () =>
    axios
      .post(
        `${window.MyApiRoute}tool/get?Employee_Id=${userInfo?.data.Employee_Id}&location=storeToEngineer&ToolID=${tool?.id}`,
        userInfo.data
        
      )
      .then((res) => {
        setData(res?.data?.data);
       
       
      
      })
      .catch((error) => {
        console.log(error);
      });
  useEffect(() => {
    api();
  }, [tool]);
 
  return (
    <>
      <UnapproveTable
        userInfo={userInfo}
        data={data}
        api={api}
        query={query}
        downloadUrl={downloadUrl}
        canChange={canChange}
        tool={tool}
        check="location=recieve"
      />
    </>
  );
};

export default ToolStoreToEngineer;
