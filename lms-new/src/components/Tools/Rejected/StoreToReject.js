import React, { useContext, useEffect, useState } from 'react'
import UnapproveTable from '../UnapproveTable';
import axios from 'axios';
import { DataContext } from '../context/DataProvider';
import secureLocalStorage from 'react-secure-storage';


const   StoreToReject = ({ canChange, query, downloadUrl }) => {
  const [data, setData] = useState([]);
  const {tool}=useContext(DataContext)
   const userInfo = JSON.parse(secureLocalStorage.getItem("info"));
 
   const api = () =>
     axios
       .post(
         `${window.MyApiRoute}tool/get?location=storeToRejected&ToolID=${tool?.id}`,
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
    <div>
         <UnapproveTable
        userInfo={userInfo}
        data={data}
        query={query}
        downloadUrl={downloadUrl}
        canChange={canChange}
        check="location=sendToDustbin"
        tool={tool}
        api={api}
      />
    </div>
  )
}

export default StoreToReject