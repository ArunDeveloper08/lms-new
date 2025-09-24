// import React, { useEffect, useState } from "react";
// import PdfContainer from "./PdfContainer";
// import Doc from "./DocService";
// import { useLocation, useSearchParams } from "react-router-dom";
// import  secureLocalStorage  from  "react-secure-storage";
// import axios from "axios";
// const CsrDownload = () => {
//   // const location = useLocation();
//   // const [data] = useState(location.state.data);
//    const [searchParams] = useSearchParams();
//   const csrNo = searchParams.get("csr");

//   const [data, setData] = useState(null);



//   useEffect(() => {
//     if (csrNo) {
//       axios
//         .post(`${window.MyApiRoute}meterTransfer/getCsr`, { CSr_NO: csrNo })
//         .then((res) => {
//           if (res.data.ApiStatus === "TRUE") {
//             setData(res.data.Data?.[0]); // Assuming array of result
//           } else {
//             alert("Failed to fetch CSR data");
//           }
//         })
//         .catch((err) => {
//           console.error("Error fetching CSR:", err);
//           alert("Error fetching CSR");
//         });
//     }
//   }, [csrNo]);

//   if (!data) return <p className="text-center py-10">Loading...</p>;
 
//   const createPdf = (html) => Doc.createPdf(html);

//   return (
//     <PdfContainer createPdf={createPdf}>
//       <div className="aspect-[1/1.41] relative px-5 w-[600px] mx-auto border-2 border-black scroll-x-hidden ">
//         <p className="text-center font-semibold text-5xl py-3 border-b-[2px] border-black p-1 ">
//           Pes Online Services
//         </p>
//         <h1 className="text-center font-semibold text-3xl py-2 bg-gray-400 border-b-[2px] border-black p-1 ">
//           Customer Service Report
//         </h1>
//         <div className="ml-3 text-gray-1200 text-sm font-semibold">
//           {/* <p>PES ONLINE SERVICES </p> */}
//           <p>
//             106 1<sup>st</sup> floor, SSR Corporate Park , 13/6 Mathura Road,
//             NS-2 Faridabad Pin-121003
//           </p>
//           <p>Phone : 9650016127 , 9821981112</p>
//           <p>Mail Id: support@pesonline.co.in, accounts@pesonline.co.in</p>
//           <p>GSTIN - 06ANWPY8563B2Z7</p>
//         </div>
//         <hr />
//         <div className="border-b-[0.5px] border-black border-t-[0.5px]">
//           <p className=" text-center border-b-[0.5px] border-black font-semibold text-lg bg-gray-400 ">
//             Customer Detail
//           </p>
//           <section>
//             <div className="flex justify-between items-center text-sm bg-gray-300 py-1 px-3 border-b-[0.5px] border-black ">
//               <div className="   flex">
//                 <p className="font-bold text-xs"> CSR No: </p>
//                 <p className="pl-1 text-xs"> {data.CSr_NO} </p>
//               </div>
//               <div className="  flex">
//                 <p className="font-bold text-xs"> Ticket No: </p>
//                 <p className="pl-1 text-xs">{data.TicketNo}</p>
//               </div>
//               <div className="  flex">
//                 <p className="font-bold text-[12px]">Meter Serial No / Id:</p>
//                 <p className="pl-1 text-[11px]"> {data.MeterSerialNo} </p>
//               </div>
//               <div className=" flex">
//                 <label className="!text-black ml-5 font-bold text-xs">
//                   Date :
//                 </label>
//                 <p className="pl-1 text-xs">
//                   {new Date(data.createdAt).toLocaleString()}
//                   &nbsp;
//                 </p>
//               </div>
//             </div>
//             <div className="border-b-[0.5px] border text-sm border-b-black px-3 p-1 grid grid-cols-7">
//               <div className="flex col-span-3">
//                 <p className="font-bold">Customer Name : </p>
//                 <p className="pl-2"> {data.Customer_Name} </p>
//               </div>
//               <div className="flex col-span-2">
//                 <p className="font-bold">Mobile No : </p>
//                 <p className="pl-2"> {data.MobileNo} </p>
//               </div>
//               <div className="flex col-span-2">
//                 <p className="font-bold">Flat No : </p>
//                 <p className="pl-2"> {data.FlatNo} </p>
//               </div>
//             </div>
//             <div className="border  border-b-[0.5px] border-b-black">
//               <div className="text-sm relative flex w-4/5 py-2">
//                 <p className="!text-black px-3 font-bold">
//                   Sitename & Address:
//                 </p>
//                 <p className="w-full" rows="3">
//                   {data.Address}
//                 </p>
//               </div>
//             </div>
//             <div>
//               <div className="text-sm border-b-[0.5px] border border-b-black p-3">
//                 <span className="font-bold pr-2">
//                   Complaint Reported By CRM:
//                 </span>
//                 <span className=""> {data.ComplaintReportedBy} </span>
//               </div>
//               <div className="text-sm border-b-[0.5px] p-3 border border-b-black">
//                 <span className="font-bold pr-1 ">
//                   Problem Identified By Service Engineer:
//                 </span>
//                 <span className="">
//                   {data.ProblemIdentifiedByServiceEngineer}
//                 </span>
//               </div>
//               <div className="text-sm border-b-[0.5px] p-3 border border-b-black">
//                 <span className="font-bold pr-1">
//                   Problem Recitified By Service Engineer:
//                 </span>
//                 <span className="">
//                   {data.ProblemRectifiedByServiceEngineer}
//                 </span>
//               </div>
//               <div className="text-sm border-b-[0.5px] p-3 border border-b-black">
//                 <span className="font-bold pr-1">
//                   Problem Identified By Lab Engineer
//                 </span>
//                 <span className="">{data.CustomerRemarks}</span>
//               </div>
//               <div className="text-sm border-b-[0.5px] p-3 border border-b-black">
//                 <span className="font-bold pr-1">
//                 Problem Recitified by Lab Engineer
//                 </span>
//                 <span className="">{data.AttendedEngineerRemarks}</span>
//               </div>
             
//             </div>
//           </section>
//         </div>
//         <div className="absolute bottom-10 w-[calc(100%-40px)]">
//           <div className="grid grid-cols-2 place-items-center text-sm font-bold">
//             <div>
//               <p className="text-center "></p>
//               <p>Customer Name & Signature</p>
//             </div>
//             <div>
//               <p className="text-center">{data.EmployeeName}</p>
//               <p>Engineer Name & Signature</p>
//             </div>
//           </div>
//           <p className="text-center font-bold py-3 border-black border-t-[1px]">
//             **This is a Computer generated Report. Hence, No Signature
//             Required**
//           </p>
//         </div>
//       </div>
//     </PdfContainer>
//   );
// };

// export default CsrDownload;


import React, { useEffect, useState } from "react";
import PdfContainer from "./PdfContainer";
import Doc from "./DocService";
import { useSearchParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const CsrDownload = () => {
  const [searchParams] = useSearchParams();
  const csrNo = searchParams.get("csr");

  const [data, setData] = useState(null);

  useEffect(() => {
  //  console.log("CSRNO" ,csrNo )
    if (csrNo) {
      axios
        .post(`${window.MyApiRoute}meterTransfer/getCsr`, { CSr_NO: csrNo })
        .then((res) => {
          if (res.data.ApiStatus === "TRUE") {
          //  console.log("inside loop" , res.data.Data[0])
            setData(res?.data?.Data?.[0]);
          } else {
            alert("Failed to fetch CSR data");
          }
        })
        .catch((err) => {
          console.error("Error fetching CSR:", err);
          alert("Error fetching CSR");
        });
    }
  }, [csrNo]);
  //console.log("data" , data)

  if (!data) return <p className="text-center py-10">Loading...</p>;

  const createPdf = (html) => Doc.createPdf(html);

  return (
    <PdfContainer createPdf={createPdf}>
      <div className="w-full max-w-[600px] mx-auto aspect-[1/1.41] px-3 sm:px-5 border-2 border-black flex flex-col scroll-x-hidden">
        {/* Header */}
        <p className="text-center font-semibold text-3xl sm:text-5xl py-3 border-b-[2px] border-black p-1">
          Pes Online Services
        </p>
        <h1 className="text-center font-semibold text-xl sm:text-3xl py-2 bg-gray-400 border-b-[2px] border-black p-1">
          Customer Service Report
        </h1>
        <div className="ml-3 text-gray-1200 text-xs sm:text-sm font-semibold">
          <p>
            106 1<sup>st</sup> floor, SSR Corporate Park, 13/6 Mathura Road,
            NS-2 Faridabad Pin-121003
          </p>
          <p>Phone: 9650016127, 9821981112</p>
          <p>Mail Id: support@pesonline.co.in, accounts@pesonline.co.in</p>
          <p>GSTIN - 06ANWPY8563B2Z7</p>
        </div>
        <hr />

        {/* Customer Details Section */}
        <div className="border-b-[0.5px] border-black border-t-[0.5px]">
          <p className="text-center border-b-[0.5px] border-black font-semibold text-base sm:text-lg bg-gray-400">
            Customer Detail
          </p>
          <section>
            {/* CSR No, Ticket No, Meter Serial No, Date */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm bg-gray-300 py-1 px-3 border-b-[0.5px] border-black">
              <div className="flex">
                <p className="font-bold text-[10px] sm:text-xs">CSR No:</p>
                <p className="pl-1 text-[10px] sm:text-xs">{data.CSr_NO}</p>
              </div>
              <div className="flex">
                <p className="font-bold text-[10px] sm:text-xs">Ticket No:</p>
                <p className="pl-1 text-[10px] sm:text-xs">{data.TicketNo}</p>
              </div>
              <div className="flex">
                <p className="font-bold text-[10px] sm:text-[12px]">
                  Meter Serial No / Id:
                </p>
                <p className="pl-1 text-[9px] sm:text-[11px]">
                  {data.MeterSerialNo}
                </p>
              </div>
              <div className="flex">
                <label className="!text-black font-bold text-[10px] sm:text-xs">
                  Date:
                </label>
                <p className="pl-1 text-[10px] sm:text-xs">
                  {new Date(data.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Customer Name, Mobile No, Flat No */}
            <div className="border-b-[0.5px] border text-xs sm:text-sm border-b-black px-3 p-1 grid grid-cols-1 sm:grid-cols-7">
              <div className="flex col-span-3">
                <p className="font-bold">Customer Name:</p>
                <p className="pl-2">{data.Customer_Name}</p>
              </div>
              <div className="flex col-span-2">
                <p className="font-bold">Mobile No:</p>
                <p className="pl-2">{data.MobileNo}</p>
              </div>
              <div className="flex col-span-2">
                <p className="font-bold">Flat No:</p>
                <p className="pl-2">{data.FlatNo}</p>
              </div>
            </div>

            {/* Address */}
            <div className="border border-b-[0.5px] border-b-black">
              <div className="text-xs sm:text-sm relative flex w-full sm:w-4/5 py-2">
                <p className="!text-black px-3 font-bold">
                  Sitename & Address:
                </p>
                <p className="w-full">{data.Address}</p>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <div className="text-xs sm:text-sm border-b-[0.5px] border border-b-black p-3">
                <span className="font-bold pr-2">
                  Complaint Reported By CRM:
                </span>
                <span>{data.ComplaintReportedBy}</span>
              </div>
              <div className="text-xs sm:text-sm border-b-[0.5px] p-3 border border-b-black">
                <span className="font-bold pr-1">
                  Problem Identified By Service Engineer:
                </span>
                <span>{data.ProblemIdentifiedByServiceEngineer}</span>
              </div>
              <div className="text-xs sm:text-sm border-b-[0.5px] p-3 border border-b-black">
                <span className="font-bold pr-1">
                  Problem Rectified By Service Engineer:
                </span>
                <span>{data.ProblemRectifiedByServiceEngineer}</span>
              </div>
              <div className="text-xs sm:text-sm border-b-[0.5px] p-3 border border-b-black">
                <span className="font-bold pr-1">
                  Problem Identified By Lab Engineer:
                </span>
                <span>{data.CustomerRemarks}</span>
              </div>
              <div className="text-xs sm:text-sm border-b-[0.5px] p-3 border border-b-black">
                <span className="font-bold pr-1">
                  Problem Rectified by Lab Engineer:
                </span>
                <span>{data.AttendedEngineerRemarks}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="grid pt-6 sm:pt-10 grid-cols-1 sm:grid-cols-2 place-items-center text-xs sm:text-sm font-bold">
            <div>
              <p className="text-center"></p>
              <p>Customer Name & Signature</p>
            </div>
            <div>
              <p className="text-center">{data.EmployeeName}</p>
              <p>Engineer Name & Signature</p>
            </div>
          </div>
          <p className="text-center font-bold py-3 border-black border-t-[1px] text-[10px] sm:text-sm">
            **This is a Computer generated Report. Hence, No Signature
            Required**
          </p>
        </div>
      </div>
    </PdfContainer>
  );
};

export default CsrDownload;