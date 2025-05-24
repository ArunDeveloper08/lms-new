import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import moment from "moment/moment";
import secureLocalStorage from "react-secure-storage";
import { downloadPdfApi } from "../../products/OnHold/api";

const PAGE_BREAK_THRESHOLD = 25; // Insert a page break after every 10 rows

const ThirdPartyNonChallan = () => {
  const userInfo = JSON.parse(secureLocalStorage.getItem("info"))?.data;
  const { challanNumber } = useParams();
  const { search } = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const pdfExportComponent = useRef(null);
  const [companyName, setCompanyName] = useState("PES Electrical Pvt Ltd");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await downloadPdfApi(challanNumber, search);
      if (res) {
        setData(res);
      }
      setLoading(false);
    };
    fetchData();
  }, [challanNumber, search]);

  const statusOfChallan = data?.challanDetails?.some(
    (item) => item.status === "open"
  );

  const handleDownloadPdf = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return loading ? (
    <div className="h-full w-full grid place-items-center">
      <p>Loading Content...</p>
    </div>
  ) : data?.challanNumber ? (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="my-[10px] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDownloadPdf}>
          Download PDF
        </button>
      </div>
      <div className="float-right">
        <select
          className="w-[200px] rounded h-[40px] border-gray-700 border-[1px]"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}>
          <option value="PES Electrical Pvt Ltd">PES Electrical Pvt Ltd</option>
          <option value="PES Online Services">PES Online Services</option>
          <option value="Perfect Engineer Services">
            Perfect Engineer Services
          </option>
        </select>
      </div>
      <div className="w-fit mx-auto">
        <PDFExport paperSize="A4" margin={0} ref={pdfExportComponent}>
          {data?.challanDetails?.map((item, index) => {
            const shouldInsertPageBreak = index % PAGE_BREAK_THRESHOLD === 0;
            if (!shouldInsertPageBreak) return;
            let newData = data?.challanDetails.slice(
              index,
              Math.min(data.challanDetails.length, index + PAGE_BREAK_THRESHOLD)
            );
            console.log(newData);
            return (
              <ChallanLayout
                userInfo={userInfo}
                statusOfChallan={statusOfChallan}
                companyName={companyName}
                data={data}>
                {newData?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="text-center">
                        <td>{item.productSrNo}</td>
                        <td>{item.productType}</td>
                        <td>{item.storeOutTime ?? "-"}</td>
                        <td>{item.dealerInTime ?? "-"}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </ChallanLayout>
            );
          })}
          {/* <ChallanLayout userInfo={userInfo} statusOfChallan={statusOfChallan} companyName={companyName} data={data}>
            {data?.challanDetails?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <tr className="text-center">
                    <td>{item.productSrNo}</td>
                    <td>{item.productType}</td>
                    <td>{item.storeOutTime ?? "-"}</td>
                    <td>{item.dealerInTime ?? "-"}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </ChallanLayout> */}
        </PDFExport>
      </div>
    </>
  ) : (
    <div className="error">No Data Found</div>
  );
};

export default ThirdPartyNonChallan;

const ChallanLayout = ({
  data,
  companyName,
  statusOfChallan,
  userInfo,
  children,
}) => {
  return (
    <div className="flex mb-10 flex-col aspect-[1/1.4] w-[600px] border-[2px] border-black">
      <div className="w-full text-center mx-auto mt-2">
        <p className="text-[13px] font-sans font-bold">{companyName}</p>
        <p className="text-[13px] font-sans font-bold border-b-[1px] border-black">
          Address: Plot No.1, Village Mirzapur, Sector-73, Faridabad
        </p>
        <p className="text-[12px] font-sans font-semibold underline mt-2">
          Third Party Non Returnable Outward Challan
        </p>
        <p className="text-[12px] font-sans font-semibold">
          Original / Duplicate / Triplicate
        </p>
        <div className="text-[11px] flex flex-col items-start px-5 font-sans font-semibold border-t-[1px] border-black">
          <p>
            Party Name:{" "}
            {data?.challanDetails?.[0]?.issueToDealerName
              ?.toString()
              ?.toUpperCase()}
          </p>
          <p>PO No: {data?.challanDetails?.[0]?.issueToPO}</p>
        </div>
      </div>
      <div className="w-[100%] mx-auto flex justify-between items-center border-t-[1px] border-black px-5 py-2">
        <div className="flex">
          <p className="text-[11px] font-sans font-semibold">Challan No:</p>
          <p className="text-[11px] font-sans font-semibold">
            {data.challanNumber}
          </p>
        </div>
        <p className="text-[11px] font-sans font-semibold">
          Challan Status: {statusOfChallan ? "Pending" : "Closed"}
        </p>
        <div className="flex">
          <p className="text-[11px] font-sans font-senst">Date:</p>
          <p className="text-[11px] font-sans font-senst">
            {moment(data?.challanDetails?.[0]?.createdAt).format("Do MMM YYYY")}
          </p>
        </div>
      </div>
      <div className="flex px-5">
        <p className="text-[11px] font-sans font-semibold">Total Products:</p>
        <p className="text-[11px] font-sans font-semibold">
          {data?.challanDetails?.length}
        </p>
      </div>
      <table className="table-for-pdf">
        <thead>
          <tr>
            <th className="">Sr No.</th>
            <th className="">Product Name</th>
            <th className="">Send By Store</th>
            <th className="">Accepted By Dealer</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      <div className="flex-1 " />
      <div className="flex">
        <p className="text-[11px] font-sans font-semibold px-4">Remark:</p>
        <p className="text-[11px]">
          {JSON.parse(data?.challanDetails?.[0]?.ActivityLog)?.pop()?.remark ??
            ""}
        </p>
      </div>
      <div className="flex justify-between mb-2 items-end px-4">
        <p className="text-[11px] font-sans font-senst">Receiver's Signature</p>
        <p className="text-[11px] font-sans font-senst">Delivered By:</p>
        <p className="text-[11px] font-sans font-senst flex text-center flex-col">
          <span>{userInfo?.name}</span>
          <span>(Authorised Signature)</span>
        </p>
      </div>
    </div>
  );
};
