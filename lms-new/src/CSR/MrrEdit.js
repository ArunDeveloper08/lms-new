import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../src/input.css";
import  secureLocalStorage  from  "react-secure-storage";

const MrrEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const edit = location.state;

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;
  const a = JSON.parse(secureLocalStorage.getItem("info"))?.data;
  const [row, setRow] = useState(edit);
  //   const [ row, setRow ] = useState({
  //     Customer_Name: "",
  //     Address: "",
  //     OldMake: "",
  //     NewMake: "",
  //     OldModel: "",
  //     NewModel: "",
  //     OldSerialNo: "",
  //     NewSerialNo: "",
  //     OldDigitalId: "",
  //     NewDigitalId: "",
  //     oldMeterMains: "",
  //     oldMeterDg: "",
  //     newMeterMains: "",
  //     newMeterDg: "",
  //     attentedEngineerReport: "",
  //     flatNo: "",
  //     serverUpdatedCRMName: "",
  //     CustomerRemarks: "",
  //     ProblemDetectedByEngineer: "",
  //     TicketNumber: "",
  //   });

  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = () => {
    console.log(row);
    axios
      .put(`${window.MyApiRoute}metertransfer/update`, {
        ...row,
        ...a,
      })
      .then((res) => {
        navigate(-1);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mx-auto overflow-x-hidden">
      <p className="text-center font-bold mt-2 p-2 text-gray-800 border-[1px] border-black bg-gray-400">
        Customer Meter Replacement Report
      </p>
      <div className="md:w-3/4 mx-auto my-10 px-10">
        <div className="animate_animated  animate__backInDown">
          <div className="grid gap-6 mb-6 md:grid-cols-2 mt-2">
            <div>
              <label
                htmlFor="Meter_Serial_No."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer Name:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.Customer_Name}
                name="Customer_Name"
                id="Meter_Serial_No."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Customer Name"
              />
            </div>
            <div>
              <label
                htmlFor="FLat_No"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Flat No:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.flatNo}
                name="flatNo"
                id="Flat_No."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flat No"
              />
            </div>
            <div>
              <label
                htmlFor="FLat_No"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ticket No:
              </label>
              <input
                type="number"
                min={0}
                onChange={handleChange}
                value={row.TicketNumber}
                name="TicketNumber"
                id="Flat_No."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flat No"
              />
            </div>
            <div>
              <label
                htmlFor="oldMake"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Make:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.OldMake}
                name="OldMake"
                id="oldMake."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" Old Make"
              />
            </div>
            <div>
              <label
                htmlFor="oldModel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Model:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.OldModel}
                name="OldModel"
                id="oldModel"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Old Model"
              />
            </div>
            <div>
              <label
                htmlFor="oldSerialNo."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Serial No.:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.OldSerialNo}
                name="OldSerialNo"
                id="oldSerialNo."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Old Serial No."
              />
            </div>
            <div>
              <label
                htmlFor="oldDigitalId."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Digital Id.:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.OldDigitalId}
                name="OldDigitalId"
                id="oldDigitalId."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Old Digital Id."
              />
            </div>
            <div>
              <label
                htmlFor="oldMeterMains."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Meter Mains (KWH):
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.oldMeterMains}
                name="oldMeterMains"
                id="oldMeterMains"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Old Meter Mains (KWH)"
              />
            </div>
            <div>
              <label
                htmlFor="oldMeterDG."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Meter DG (KWH):
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.oldMeterDg}
                name="oldMeterDg"
                id="oldMeterDg"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Old Meter DG (KWH)"
              />
            </div>
            <div>
              <label
                htmlFor="newMake"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Make:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.NewMake}
                name="NewMake"
                id="newMake."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" New Make"
              />
            </div>
            <div>
              <label
                htmlFor="newModel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Model:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.NewModel}
                name="NewModel"
                id="newModel"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Model"
              />
            </div>
            <div>
              <label
                htmlFor="newSerialNo."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Serial No.:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.NewSerialNo}
                name="NewSerialNo"
                id="newSerialNo."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Serial No."
              />
            </div>
            <div>
              <label
                htmlFor="newDigitalId."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Digital Id.:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.NewDigitalId}
                name="NewDigitalId"
                id="newDigitalId."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Digital Id."
              />
            </div>
            <div>
              <label
                htmlFor="newDigitalId."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Meter Mains(KWH).:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.newMeterMains}
                name="newMeterMains"
                id="newDigitalId."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Digital Id."
              />
            </div>
            <div>
              <label
                htmlFor="newDigitalId."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Meter DG(KWH).:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.newMeterDg}
                name="newMeterDg"
                id="newDigitalId."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Digital Id."
              />
            </div>
            <div>
              <label
                htmlFor="serverUpdatedCrmName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Server Updated CRM Name:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.serverUpdatedCRMName}
                name="serverUpdatedCRMName"
                id="serverUpdatedCrmName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Server Updated CRM Name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Meter_ID"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address:
            </label>
            <textarea
              type="text"
              onChange={handleChange}
              value={row.Address}
              name="Address"
              id="Meter_ID"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Address"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="problemDetectedByEngineer"
              className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Problem detected By Engineer:
            </label>
            <textarea
              type="text"
              onChange={handleChange}
              value={row.ProblemDetectedByEngineer}
              name="ProblemDetectedByEngineer"
              id="remark"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[75px]"
              placeholder="Problem detected By Engineer"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="attentedEngineerReport"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Attented Engineer Report:
            </label>
            <textarea
              type="text"
              name="attentedEngineerReport"
              value={row.attentedEngineerReport}
              onChange={handleChange}
              id="attentedEngineerReport"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Attented Engineer Report"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="CustomerRemarks"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Customer Remarks:
            </label>
            <textarea
              type="text"
              name="CustomerRemarks"
              value={row.CustomerRemarks}
              onChange={handleChange}
              id="CustomerRemarks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Customer Remarks"
            />
          </div>
          <button
            type="submit"
            onClick={handleOnSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default MrrEdit;
