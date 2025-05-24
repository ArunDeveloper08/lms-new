import { useLocation, useParams } from "react-router-dom";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { CircularProgress } from "@mui/material";

const POChallan = () => {
  const { dealerid } = useParams();
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);

  // Extract poNumber from the query parameters
  const params = new URLSearchParams(search);
  const poNumber = params.get("poNumber");
  const pdfExportComponent = useRef(null);
  const [data, setData] = useState([]);
  const { detail } = data;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${window.MyApiRoute}dealerPO/getOnePo?dealerId=${dealerid}&poNumber=${poNumber}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress />
        </div>
      )}
      {data && (
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
          <PDFExport ref={pdfExportComponent}>
            <div className="w-fit mx-auto">
              <>
                <div className="flex flex-col aspect-[1/1.4] w-[600px] border-[2px] border-black ">
                  <div className="w-full text-center mx-auto mt-2 mb-2">
                    {detail?.length > 0 && detail[0]?.CompanyName}
                    <p className="text-[12px] font-sans font-bold border-b-[1px] border-black">
                      Address : Plot No.1 , Village Mirzapur , Sector-73 ,
                      Faridabad
                    </p>
                    <p className="text-[14px] font-sans font-semibold  mt-2">
                      Third Party Purchase Order
                    </p>
                    <p className="text-[12px] font-sans font-semibold">
                      Original / Duplicate / Triplicate
                    </p>
                    {/* <div className="flex justify-around border-t-[1px] border-black ">
                      <p className="text-[12px] font-sans font-semibold  ">
                        PO Number : {data?.poNumber}
                      </p>
                      <p className="text-[12px] font-sans font-semibold  ">
                        Dealer Name :{" "}
                        {detail?.length > 0 && detail[0]?.ContactPerson}
                      </p>
                    </div> */}
                    <p className="text-[12px] font-sans font-semibold border-t-[1px] border-black ">
                   Customer Name : {data?.poNumber}
                    </p>
                    <p className="text-[12px] font-sans font-semibold border-t-[1px] border-black ">
                      Dealer Name :{" "}
                      {detail?.length > 0 && detail[0]?.ContactPerson}
                    </p>
                  </div>
                  <div className="w-[100%] mx-auto flex justify-between items-center border-t-[1px] border-black px-5 py-2"></div>
                  <table className="table-for-pdf">
                    <thead>
                      <tr>
                        <th className="">P Name</th>
                        <th className="">Quantity</th>
                        <th className="">Supply Quantity</th>
                        <th className="">Balance Qunatity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data?.detail?.map((item, index) => {
                          return (
                            <>
                              <tr key={index} className="text-center">
                                <td>{item.ProductType}</td>
                                <td>{item.Quantity ?? "-"}</td>
                                <td>{item.SupplyQuantity ?? "0"}</td>
                                <td>
                                  {item.Quantity - item.SupplyQuantity ?? "-"}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="flex-1"></div>

                  <p className="text-[11px] font-sans font-semibold px-4 mb-10">
                    NOTE: {detail?.length > 0 && detail[0]?.note}
                  </p>
                </div>
              </>
            </div>
          </PDFExport>
        </>
      )}
    </>
  );
};
export default POChallan;
