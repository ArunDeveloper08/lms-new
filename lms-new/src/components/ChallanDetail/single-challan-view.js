import React, { useRef } from 'react';
import { PDFExport } from "@progress/kendo-react-pdf";
import moment from "moment/moment";
import { Checkbox } from "@mui/material";
const SingleChallanView = ({ item, userInfo }) => {
    const pdfExportComponent = useRef(null);
    const statusOfChallan = item?.Products?.some(
        (item) => item.status === "open"
    );
    return (
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
                    <div className="w-full text-center mx-auto mt-2 mb-2">
                        <p className="text-xl font-sans font-bold">
                            External Returnable Inward / Outward Challan
                        </p>
                        <p className="text-md font-sans font-bold border-b-[3px] border-black">
                            Original / Duplicate / Triplicate
                        </p>
                        <p className="text-lg font-sans font-bold underline mt-2">
                            PES Electrical Pvt.Ltd
                        </p>
                        <p className="text-md font-sans font-semibold">
                            Address : Plot No.1 , Village Mirzapur , Sector-73 , Faridabad
                        </p>
                    </div>
                    <div className="w-[100%] mx-auto flex justify-between items-center border-t-[3px] border-black px-5 py-2">
                        <div className="flex">
                            <p className="text-md font-sans font-bold">Challan No : &nbsp;</p>
                            <p className="text-md font-sans font-semibold">
                                {item.challanNumber}
                            </p>
                        </div>
                        <p className="text-md font-sans font-semibold">
                            <span className="text-md font-sans font-bold">
                                Challan Status :
                            </span>{" "}
                            {statusOfChallan ? " Pending" : "Close"}
                        </p>
                        <div className="flex">
                            <p className="text-md font-sans font-bold">Issue To : &nbsp;</p>
                            <p className="text-md font-sans font-semibold">
                                {item?.Products[0]?.issueToEngineer}
                            </p>
                        </div>
                        <div className="flex">
                            <p className="text-md font-sans font-bold">Date : &nbsp;</p>
                            <p className="text-md font-sans font-semibold">
                                {moment().format("MMM Do YYYY, h:mm:ss A")}
                            </p>
                        </div>
                    </div>
                    <table className="table-for-pdf">
                        <thead>
                            <tr>
                                <th className="w-[15%]">Sr No.</th>
                                <th className="w-[10%]">P Code</th>
                                <th className="w-[40%]">P Name</th>
                                <th className="w-[15%]">Jc No.</th>
                                <th className="w-[10%]">Eng-IN</th>
                                <th className="w-[10%]">Eng-Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item?.Products.map((item, key) => {
                                return (
                                    <tr key={key} className="text-center">
                                        <td>{item.productSrNo}</td>
                                        <td>-</td>
                                        <td>{item.productType}</td>
                                        <td>-</td>
                                        <td>
                                            <Checkbox
                                                disabled
                                                style={{
                                                    color: "black",
                                                }}
                                                checked={item.outFlag}
                                                size="small"
                                                sx={{ padding: 0 }}
                                            />
                                        </td>
                                        <td>
                                            <Checkbox
                                                disabled
                                                checked={item.inFlag}
                                                size="small"
                                                style={{
                                                    color: "black",
                                                }}
                                                sx={{ padding: 0 }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <table className="table-for-pdf">
                        <thead>
                            <tr>
                                <th className="w-[12%]">Sr No.</th>
                                <th className="w-[22%]">Send By Store</th>
                                <th className="w-[22%]">Accepted By Eng.</th>
                                <th className="w-[22%]">Send By Eng.</th>
                                <th className="w-[22%]">Accepted by Store</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item?.Products.map((item, key) => {
                                // const date = Date(item.outTime);
                                // console.log(date, item.outTime);
                                return (
                                    <tr key={key} className="text-center">
                                        <td>{item.productSrNo}</td>
                                        <td>{item.outTime ?? "-"}</td>
                                        <td>{item.EngineerRecievingTime ?? "-"}</td>
                                        <td>{item.EngineerHandoverTime ?? "-"}</td>
                                        <td>{item.inTime ?? "-"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="flex-1"></div>
                    <p className="text-lg font-sans font-bold ml-5">Remark:{JSON.parse(item.Products[0].ActivityLog)[JSON.parse(item.Products[0].ActivityLog)?.length - 1].remark ?? ""} </p>
                    <div className="flex justify-between mb-5 items-end px-4">
                        <p className="text-lg font-sans font-bold">Receiver's Signature</p>
                        <p className="text-lg font-sans font-bold">Delivered By:</p>
                        <p className="text-lg font-sans font-bold flex text-center flex-col">
                            <span>{userInfo.name}</span>
                            <span>(Authorised Signature)</span>
                        </p>
                    </div>
                </div>
            </PDFExport>
        </>
    );
};

export default SingleChallanView;