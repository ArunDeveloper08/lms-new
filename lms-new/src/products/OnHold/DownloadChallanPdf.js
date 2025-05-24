import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import moment from "moment/moment";
import { Checkbox } from "@mui/material";
import { downloadPdfApi } from "./api";
import secureLocalStorage from "react-secure-storage";

const DownloadChallanPdf = () => {
  const { challanNumber } = useParams();
  const { search } = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const pdfExportComponent = useRef(null);
  console.log(challanNumber, search);
  const [companyName, setCompanyName] = useState("PES Electrical Pvt Ltd");
  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      const res = await downloadPdfApi(challanNumber, search);
      if (res) {
        setData(res);
      }
      setLoading(false);
      console.log(res);
      return res;
    };
    apiCall();
  }, []);
  // if (!data.challanNumber) {
  //   return <div className="">No Data Found</div>;
  // }
  console.log("data", data.challanDetails);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"))?.data;

  const statusOfChallan = data?.challanDetails?.some(
    (item) => item.status === "open"
  );
  // // console.log({ statusOfChallan });
  const allRemark = JSON.parse(data?.challanDetails?.[0].Remarks || "{}");
  console.log(">>", allRemark[allRemark.length - 1]?.remark);
  return loading ? (
    <div className="h-full w-full grid place-items-center">
      <p>Loading Content</p>
    </div>
  ) : data?.challanNumber ? (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="mt-[10px] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none mb-5 focus:shadow-outline "
          onClick={() => {
            if (pdfExportComponent.current) {
              pdfExportComponent.current.save();
            }
          }}>
          Download PDF
        </button>
      </div>
      <div className="float-right">
        <select
          className="w-[200px] rounded h-[40px] border-gray-700 border-[1px] "
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}>
          <option value="Pes Electrical Pvt. Ltd">
            Pes Electrical Pvt. Ltd
          </option>
          <option value="Pes Online Services">Pes Online Services</option>
          <option value="Perfect Engineer Services">
            Perfect Engineer Services
          </option>
        </select>
      </div>
      <PDFExport ref={pdfExportComponent}>
        <div className="mx-auto w-fit">
          <div className="flex flex-col aspect-[1/1.4] w-[600px] border-[1px] border-black ">
            <div className="w-full text-center mx-auto my-2">
              <p className="text-[13px] font-sans font-bold underline mt-2 flex justify-center">
                {companyName}
              </p>

              <p className="text-[12px] font-sans font-semibold">
                Internal Returnable Inward / Outward Challan
              </p>
              <p className="text-[12px] font-sans font-semibold border-b-[1px] border-black">
                Original / Duplicate / Triplicate
              </p>

              <p className="text-[12px] font-sans font-semibold">
                Address : Plot No.1 , Village Mirzapur , Sector-73 , Faridabad
              </p>
            </div>
            <div className="w-full flex justify-between items-center border-t-[1px] border-black px-5 py-2">
              <div className="flex">
                <p className="text-[11px] font-sans font-semibold">
                  Challan No  JC: &nbsp;
                </p>
                <p className="text-[11px] font-sans font-semibold">
                  {data.challanNumber}
                </p>
              </div>
              <p className="text-[11px] font-sans font-semibold">
                <span className="text-[11px] font-sans font-semibold">
                  Challan Status :
                </span>{" "}
                {statusOfChallan ? " Pending" : "Close"}
              </p>
              <div className="flex">
                <p className="text-[11px] font-sans font-semibold">
                  Date : &nbsp;
                </p>
                <p className="text-[11px] font-sans font-semibold">
                  {/* {moment(
                    data.challanDetails[0] && data?.challanDetails[0].outTime
                  ).format("MMM Do YYYY, h:mm:ss A")} */}

                  {moment(
                    data.challanDetails[0] && data?.challanDetails[0]?.createdAt
                  ).format("Do MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="flex px-5 ">
              <p className="text-[11px] font-sans font-semibold">
                Total Product :
              </p>
              <p className="text-[11px] font-sans font-semibold">
                {data?.challanDetails?.length}
              </p>
            </div>
            <table className="table-for-pdf">
              <thead>
                <tr>
                  <th className="">Sr No.</th>
                  <th className="">P Name</th>
                  <th className="">Send By Store</th>
                  <th className="">Accepted By Pro.</th>
                  <th className="">Send By Pro.</th>
                  <th className="">Accepted by Store</th>
                </tr>
              </thead>
              <tbody>
                {data?.challanDetails.map((item, key) => {
                  return (
                    <tr key={key} className="text-center">
                      <td>{item.productSrNo}</td>
                      <td>{item.productType}</td>
                      <td>{item.outTime ?? "-"}</td>
                      <td>{item.ProductionInTime ?? "-"}</td>
                      <td>{item.ProductionOutTime ?? "-"}</td>
                      <td>{item.inTime ?? "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex-1"></div>

            {/* <p className="text-lg font-sans font-bold ml-5">Remark:{data.challanDetails[0].Remarks}</p> */}
            <p className="text-[11px] font-sans font-semibold px-4">
              Remark:{" "}
              {
                JSON.parse(data.challanDetails[0].Remarks)[
                  JSON.parse(data.challanDetails[0].Remarks).length - 1
                ].remark
              }
            </p>
            <div className="flex justify-between mb-2 items-end px-4">
              <p className="text-[11px] font-sans font-semibold">
                Receiver's Signature
              </p>
              <p className="text-[11px] font-sans font-semibold">
                Delivered By:
              </p>
              <p className="text-[11px] font-sans font-semibold flex text-center flex-col">
                <span>{userInfo?.name}</span>
                <span>(Authorised Signature)</span>
              </p>
            </div>
          </div>
          ;
        </div>
      </PDFExport>
    </>
  ) : (
    <div className="error">No Data Found</div>
  );
};

export default DownloadChallanPdf;
