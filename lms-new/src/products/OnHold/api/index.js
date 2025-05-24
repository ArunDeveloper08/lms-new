import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";
export const downloadPdfApi = async (challanNumber, search) => {
  //const userInfo = JSON.parse(secureLocalStorage.getItem("info") || "")?.data;
  try {
    const { data } = await axios.post(
      `${window.MyApiRoute}record/getChallan${search}&challanNumber=${challanNumber}`,
      {
     //   ...userInfo,
        challanNumber,
        
      }
    );
    return data;
  } catch (error) {
    return false;
  }
};
// export const downloadPdfApi = async (challanNumber, search) => {
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info") || "")?.data;
//   try {
//     const { data } = await axios.post(
//       `${window.MyApiRoute}record/get${search}&category=modem&location=getDetailsByChallanNumber`,
//       {
//         ...userInfo,
//         challanNumber,
//       }
//     );
//     return data.Data;
//   } catch (error) {
//     return false;
//   }
// };


export const downloadToolPdfApi = async (challanNumber, search) => {
 // const userInfo = JSON.parse(secureLocalStorage.getItem("info") || "")?.data;
  try {
    const { data } = await axios.post(
      `${window.MyApiRoute}tool/getchallan?challanNumber=${challanNumber}`,
      {
  //      ...userInfo,
        challanNumber,
      }
    );
    return data.Data;
  } catch (error) {
    return false;
  }
};
// export const downloadToolPdfApi = async (challanNumber, search) => {
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info") || "")?.data;
//   try {
//     const { data } = await axios.post(
//       `${window.MyApiRoute}tool/get?challanNumber=${challanNumber}&location=challanDetails`,
//       {
//         ...userInfo,
//         challanNumber,
//       }
//     );
//     return data.Data;
//   } catch (error) {
//     return false;
//   }
// };
