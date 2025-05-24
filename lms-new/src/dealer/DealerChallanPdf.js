import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import { downloadPdfApi } from "../products/OnHold/api";
import  secureLocalStorage  from  "react-secure-storage";

const DealerChallanPdf = () => {
  const { challanNumber } = useParams();
  const { search } = useLocation();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const pdfExportComponent = useRef(null);
  console.log(challanNumber, search);
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
  console.log(data);
  const meterNumbersByCategory = data?.products?.reduce((acc, item) => {
    const { product, category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    if (category === "1-phaseMeter" && product && product.Meter_Serial_No) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "3-phaseMeter" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (category === "modem" && product && product.Meter_Serial_No) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "homeDisplayunit" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "DGIndicator" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (category === "DTRH" && product && product.Meter_Serial_No) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "wifiDongle" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "wavezigbeeModem" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "ParkfloorDCU" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (category === "NewDCU" && product && product.Meter_Serial_No) {
      acc[category].push(product.Meter_Serial_No);
    } else if (category === "ZigbeeRF" && product && product.Meter_Serial_No) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "InjectorController" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "InjectorAVR" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "PLCCReciever" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "smart-3-phaseMeter" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    } else if (
      category === "smart-1-phaseMeter" &&
      product &&
      product.Meter_Serial_No
    ) {
      acc[category].push(product.Meter_Serial_No);
    }

    return acc;
  }, {});
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

  // // console.log({ statusOfChallan });
  return loading ? (
    <div className="h-full w-full grid place-items-center">
      <p>Loading Content</p>
    </div>
  ) : data?.challanNumber ? (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="mt-[10px] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          onClick={() => {
            if (pdfExportComponent.current) {
              pdfExportComponent.current.save();
            }
          }}
        >
          Download PDF
        </button>
      </div>
      <PDFExport ref={pdfExportComponent}>
        <div className="w-[850px] flex flex-col h-[1090px] mx-auto border-[3px] border-black mt-2">
          <p className=" flex text-2xl justify-center mt-1">
            PES Electrical Pvt Ltd.
          </p>
          <div className="border-[1px] border-slate-700 mx-8 mb-4">
            <div className="border-b-[1px] items-center flex border-black h-[35px]">
              <p className="ml-3">Dealer Id : {data?.dealerDetails?.ID} </p>
            </div>
            <div className="flex border-b-[1px] border-slate-700 justify-between pr-3 h-[30px]">
              <p className="ml-3">Challan No. {data?.challanNumber} </p>
              <p> Date: {new Date().toDateString().slice(0, 16)}</p>
            </div>
            <div>
              <div className="flex gap-x-3">
                <p className="font-semibold ml-3">Name :</p>
                <p>{data?.dealerDetails?.name}</p>
              </div>
              <div className="flex items-start gap-x-3">
                <p className="font-semibold ml-3">Address :</p>
                <p>{data?.dealerDetails?.address}</p>
              </div>
            </div>
          </div>
          <table className="mx-8">
            <thead>
              <tr className="border-2 border-black border-r-0">
                <th className="border-r-2 border-black">S.no</th>
                <th className="border-r-2 border-black">Meter Serial No.</th>
                <th className="border-r-2 border-black">Category</th>
                <th className="border-r-2 border-black">Quantity</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {Object.keys(meterNumbersByCategory).map((category, index) => (
                <tr
                  className="border-2 border-black border-right-0"
                  key={index}
                >
                  <td className="border-r-2 border-black">{index + 1}</td>
                  <td className="border-r-2 border-black">
                    {meterNumbersByCategory[category].join(", ")}
                  </td>
                  <td className="border-r-2 border-black">{category}</td>
                  <td className="border-r-2 border-black">
                    {meterNumbersByCategory[category].length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex-1" />
          <div className="mx-8 mb-3 flex items-start gap-x-3">
            <p className="font-semibold">Note:</p>
            <p>Note:</p>
          </div>
          <div className="flex justify-between items-end  mx-8 mb-5">
            <p className="text-lg font-sans font-semibold">
              Receiver's Signature
            </p>
            <p className="text-lg font-sans font-semibold">Delivered By:</p>
            <p className="text-lg font-sans font-semibold flex text-center flex-col">
              <span>{userInfo.name}</span>
              <span>(Authorised Signature)</span>
            </p>
          </div>
        </div>
      </PDFExport>
    </>
  ) : (
    <div className="error">No Data Found</div>
  );
};

export default DealerChallanPdf;
