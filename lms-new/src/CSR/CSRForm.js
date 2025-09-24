import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import "../../src/input.css";
import  secureLocalStorage  from  "react-secure-storage";
import { mainRoute } from "../App";

const CSRForm = () => {
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const mockData = JSON.parse(secureLocalStorage.getItem("dummycsrform"));
  const [row, setRow] = useState(
    mockData ?? {
      Customer_Name: "",
      TicketNo: "",
      SiteName: "",
      Address: "",
      MobileNo: "",
      FlatNo: "",
      ComplaintReportedBy: "",
      ProblemIdentifiedByServiceEngineer: "",
      ProblemRectifiedByServiceEngineer: "",
      AttendedEngineerRemarks: "",
      CustomerRemarks: "",
      MeterSerialNo: "",
    }
  );
  // const [site, setSite] = useState([]);
  const navigate = useNavigate();
  const data = new Date().toISOString().slice(0, 10);
  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = () => {
    if (row.MeterSerialNo.trim() === "") {
      return alert("Please Enter Meter Serial Number");
    }
    // api call
    secureLocalStorage.setItem("dummycsrform", JSON.stringify(row));
    axios
      .post(`${window.MyApiRoute}report`, {
        ...row,
        Employee_Id: a.Employee_Id,
        name: a.name,
      })
      .then((res) => {
        navigate(`${mainRoute}/csrformdownload?csr=${res?.data?.data.CSr_NO}`, { state: res.data });
    
      })
      .catch((err) => console.log(err));
    // navigate("/csrformdownload");
  };
  // const sites = () =>
  //   axios
  //     .get(window.MyApiRoute + "sites")
  //     .then((res) => {
  //       return setSite(res.data.data), console.log(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // useEffect(() => {
  //   sites();
  // }, []);
  const handleSelect = (a, b) => {
    setRow({ ...row, [a]: b });
  };
  return (
    <div className="mx-auto overflow-x-hidden">
      <p className="text-center font-bold mt-2 p-2 text-gray-800 border-[1px] border-black bg-gray-400">
        Customer Service Report
      </p>
      <div className=" border-[1px] overflow-x-hidden border-black p-3 w-[900px] md:w-3/4 mx-auto my-10 px-10 bg-gray-200">
        <p className="mx-1 text-sm  text-gray-900 font-semibold">
          PES ONLINE SERVICE
        </p>
        <p className="mx-1 text-sm text-gray-900">
          TF-3 Vishnu Palace, Sec-20B, Ajronda Chowk,Faridabad-121004
        </p>
        <p className="mx-1 text-sm text-gray-900">Phone1 - 9650016127</p>
        <p className="mx-1 text-sm text-gray-900">Phone2 - 9821981112</p>
        <p className="mx-1 text-sm text-gray-900">
          Support@pesonline.co.in account@pesonline.co.in
        </p>
        <p className="mx-1 text-sm text-gray-900">Faridabad-Haryana-121004</p>
      </div>
      <div className="md:w-3/4 mx-auto my-10 px-10">
        <div className="animate_animated  animate_backInDown">
          {/* <div>
                        <label
                            htmlFor="Meter_ID"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Date :
                        </label>
                        <input
                            type="date"
                            // onChange={ handleChange }
                            value={ data }
                            onChange={ (e, f) => console.log(e.target.value, f) }
                            name="MainDate"
                            id="Meter_ID"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Address"
                        />
                    </div> */}
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
                name="Customer_Name"
                value={row.Customer_Name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Customer Name"
              />
            </div>
            <div>
              <label
                htmlFor="CustomerMobileNo."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer Mobile No:
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={row.MobileNo}
                name="MobileNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Customer Mobile No"
              />
            </div>

            <div>
              <label
                htmlFor="Meter_ID"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Flat No. :
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="FlatNo"
                value={row.FlatNo}
                id="Flat_no"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flat_No"
              />
            </div>
            <div>
              <label
                htmlFor="MeterSerialNo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meter Serial No / Id
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="MeterSerialNo"
                value={row.MeterSerialNo}
                id="MeterSerialNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Meter Serial Number"
              />
            </div>
            {/* <Autocomplete
              onChange={(e, f) => handleSelect("SiteName", f)}
              fullWidth
              // freesolo
              className="pt-3"
              name="SiteName"
              // value={ data.Site_Name }
              options={site?.map((option) => option?.SiteName)}
              renderInput={(params) => <TextField {...params} label="Site" />}
            /> */}
            {/* <div>
                            <label
                                htmlFor="Customer_Unique_ID"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Complaint Reported By CRM:
                            </label>
                            <input
                                type="text"
                                onChange={ handleChange }
                                name="complaintReportedByCrm"
                                id="Customer_Unique_ID"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Complaint Reported By CRM"
                            />
                        </div> */}
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2 mt-2">
            <div>
              <label
                htmlFor="Meter_Serial_No."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ticket No:
              </label>
              <input
                type="number"
                min={0}
                onChange={handleChange}
                value={row.TicketNo}
                name="TicketNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="TicketNo"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Meter_ID"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sitename & Address:
            </label>
            <textarea
              rows={4}
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
              htmlFor="remark"
              className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Complaint Reported By CRM:
            </label>
            <textarea
              type="text"
              onChange={handleChange}
              name="ComplaintReportedBy"
              value={row.ComplaintReportedBy}
              rows={4}
              id="remark"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Complaint Reported By CRM"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="remark"
              className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Problem Identified By Service Engineer:
            </label>
            <textarea
              type="text"
              onChange={handleChange}
              name="ProblemIdentifiedByServiceEngineer"
              value={row.ProblemIdentifiedByServiceEngineer}
              rows={4}
              id="remark"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Detail Problem Reported "
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ServiceEngineerReport"
              className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Problem Recitified By Service Engineer:
            </label>
            <textarea
              type="text"
              onChange={handleChange}
              name="ProblemRectifiedByServiceEngineer"
              value={row.ProblemRectifiedByServiceEngineer}
              rows={4}
              id="ServiceEngineerReport"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Reported By"
            />
          </div>
         
          <div className="mb-6">
            <label
              htmlFor="CustomerRemarks"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Problem Identified By Lab Engineer:
            </label>
            <textarea
              type="text"
              name="CustomerRemarks"
              onChange={handleChange}
              value={row.CustomerRemarks}
              rows={4}
              id="CustomerRemarks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Customer Remarks"
            />
             <div className="mb-6 mt-2">
            <label
              htmlFor="attentedEngineerRemarks"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Problem Recitified by Lab Engineer
            </label>
            <textarea
              type="text"
              name="AttendedEngineerRemarks"
              onChange={handleChange}
              value={row.AttendedEngineerRemarks}
              rows={4}
              id="attentedEngineerRemarks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Attented Engineer Remarks"
            />
          </div>
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

export default CSRForm;
