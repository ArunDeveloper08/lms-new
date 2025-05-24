import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import moment from "moment/moment";
import { Checkbox } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import { downloadToolPdfApi } from "../../../products/OnHold/api";

const RejectedToolChallanPdf = () => {
  const { challanNumber } = useParams();
  const { search } = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const pdfExportComponent = useRef(null);
  const [companyName, setCompanyName] = useState("PES Electrical Pvt Ltd");
  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      const res = await downloadToolPdfApi(challanNumber, search);
      console.log("res", res);
      if (res) {
        setData(res[0]);
      }
      setLoading(false);

      return res;
    };
    apiCall();
  }, []);
  // if (!data.challanNumber) {
  //   return <div className="">No Data Found</div>;
  // }

  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

  const statusOfChallan = data?.Products?.some(
    (item) => item.status === "open"
  );
  // // console.log({ statusOfChallan });
  return loading ? (
    <div className="h-full w-full grid place-items-center">
      <p>Loading Content</p>
    </div>
  ) : data?.challanNumber ? (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="my-[10px] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
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
      <div className="w-fit mx-auto">
        <PDFExport ref={pdfExportComponent}>
          <div className="flex flex-col aspect-[1/1.4] w-[600px] border-[2px] border-black ">
            <div className="w-full text-center mx-auto mt-2 mb-2">
              <p className="text-[13px] font-sans font-bold underline mt-2 flex justify-center">
                {companyName}
              </p>
              <p className="text-[13px] font-sans font-bold">
                Internal Returnable Inward / Outward Challan
              </p>
              <p className="text-[13px] font-sans font-bold border-b-[1px] border-black">
                Original / Duplicate / Triplicate
              </p>

              <p className="text-[13px] font-sans font-semibold">
                Address : Plot No.1 , Village Mirzapur , Sector-73 , Faridabad
              </p>
            </div>
            <div className="w-[100%] mx-auto flex justify-between items-center border-t-[1px] border-black px-5 py-2">
              <div className="flex">
                <p className="text-[11px] font-sans font-semibold">
                  Challan No :
                </p>
                <p className="text-[11px] font-sans font-semibold">
                  {data.challanNumber}
                </p>
              </div>
              <p className="text-[11px] font-sans font-semibold">
                <span className="text-[11px] font-sans font-semibold">
                  Challan Status :
                </span>
                {statusOfChallan ? " Pending" : "Close"}
              </p>
              <div className="flex">
                <p className="text-[11px] font-sans font-semibold">
                  Issue To :
                </p>
                <p className="text-[11px] font-sans font-semibold">
                  {data?.Name}
                </p>
              </div>
              <div className="flex">
                <p className="text-[11px] font-sans font-semibold">Date :</p>
                <p className="text-[11px] font-sans font-semibold">
                  {data.Products[0] && data?.Products[0].storeOutTime}
                </p>
              </div>
            </div>
            <div className="flex px-5 ">
              <p className="text-[11px] font-sans font-semibold">
                Total Product :
              </p>
              <p className="text-[11px] font-sans font-semibold">
                {data?.Products?.length}
              </p>
            </div>
            <table className="table-for-pdf">
              <thead>
                <tr>
                  <th className="">Sr No.</th>
                  <th className=""> Tool Name</th>
                  <th className="">Send By Store</th>
                  <th className="">Accepted By CEO</th>
                </tr>
              </thead>
              <tbody>
                {data?.Products?.map((item, key) => {
                  return (
                    <tr key={key} className="text-center">
                      <td>{item.SerialNumber}</td>
                      <td>{item.ToolName}</td>
                      <td>{item.storeOutTime ?? "-"}</td>
                      <td>{item.departmentInTime ?? "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex-1"></div>
            <p className="text-[11px] font-sans font-semibold px-4">
              Remark:
              {/* {data?.Products[0].ActivityLog
                ? JSON.parse(data.Products[0].ActivityLog)?.remark
                  ?? "Default Remark"
                : "Default Remark"} */}
              {JSON.parse(data?.Products[0]?.ActivityLog)[0]?.remark}
            </p>
            <div className="flex justify-between mb-2 items-end px-4">
              <p className="text-[11px] font-sans font-semibold">
                Receiver's Signature
              </p>
              <p className="text-[11px] font-sans font-semibold">
                Delivered By:
              </p>
              <p className="text-[11px] font-sans font-semibold flex text-center flex-col">
                <span>{userInfo.name}</span>
                <span>(Authorised Signature)</span>
              </p>
            </div>
          </div>
        </PDFExport>
      </div>
    </>
  ) : (
    <div className="error">No Data Found</div>
  );
};

export default RejectedToolChallanPdf;
