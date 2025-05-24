import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../Add.css";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";
import { mainRoute } from "../../App";
const MeterEdit = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  // location?.state?.Site_Name ?? navigate("/home");
  const edita = location.state;
  // useEffect(() => {
  //   location?.state?.Site_Name ?? navigate("/home");
  // }, [ location, navigate ]);
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  // console.log("location", location.state);
  const [sites, setSites] = useState([]);
  const [val, setVal] = useState(edita);
  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };
  console.log("Meter Edit", location.state);

  const handleSubmit = () => {
    axios
      .put(`${window.MyApiRoute}record/update`, val)
      .then((res) => {
    
        alert(res.data.message);
        navigate(`${mainRoute}/home`);
      })
      .catch((err) => alert(err.message));
  };
  const siteApi = () => {
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
    
        return setSites(res.data.data);
      })
      .catch((err) => {
        alert("Some Error Occured", err.message);
      });
  };
  useEffect(() => {
    siteApi();
  }, []);
  console.log(val);
  return (
    <div className="md:w-3/4 mx-auto md:px-10">
      <div className="animate__animated  animate__backInDown px-10 md:px-0">
        <p className="text-center text-3xl">
          Meter Updation - Meter Serial No: {edita.Meter_Serial_No}
        </p>
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
          <div>
            <label
              htmlFor="Meter_Id"
              className="block  mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Meter Id.
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              value={val.Meter_Id}
              name="Meter_Id"
              id="Meter_Id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Meter Id"
            />
          </div>
          {sites.length && (
            <div className="flex items-end">
              <Autocomplete
                onChange={(e, f) => setVal({ ...val, Site_Name: f ?? "" })}
                fullWidth
                className=""
                name="SiteName"
                value={val.Site_Name}
                options={sites?.map((option) => option?.SiteName)}
                renderInput={(params) => (
                  <TextField {...params} label="Site Name" />
                )}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="Flat_No"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Flat No.
            </label>
            <input
              type="text"
              id="Flat_No"
              value={val.Flat_No}
              name="Flat_No"
              onChange={(e) => handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Flat No."
            />
          </div>
          {/* <div>
            <label
              htmlFor="Tower_Name"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Tower Name
            </label>
            <input
              type="text"
              id="Tower_Name"
              onChange={(e) => handleChange(e)}
              name="Tower_Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tower Name"
            />
          </div> */}
          <div>
            <label
              htmlFor="Customer_Unique_Id"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Customer Unique ID.
            </label>
            <input
              type="url"
              id="Customer_Unique_Id"
              onChange={(e) => handleChange(e)}
              value={val.Customer_Unique_Id}
              name="Customer_Unique_Id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Customer Unique ID."
            />
          </div>
          <div>
            <label
              htmlFor="Customer_Name"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Customer Name
            </label>
            <input
              type="url"
              id="Customer_Name"
              onChange={(e) => handleChange(e)}
              value={val.Customer_Name}
              name="Customer_Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Customer Name"
            />
          </div>
          {/*                             
          <div>
            <label
              htmlFor="Supported_Engineer"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Support Engineer Name
            </label>
            <input
              type="text"
              id="Supported_Engineer"
              name="Supported_Engineer"
              onChange={(e) => handleChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Support Engineer Name"
            />
          </div> 
           <div> 
            <label
              htmlFor="Job_Card_No"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Job Card No
            </label>
            <input
              type="text  "
              id="Job_Card_No"
              onChange={(e) => handleChange(e)}
              name="Job_Card_No"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Support Engineer Name"
            />
          </div> 
          */}
        </div>
        {/* <div className="grid mb-5 mt-8 justify-start sm:justify-center sm:grid-cols-2 lg:grid-cols-4 space-y-3 sm:space-y-0 ">
          <div className="flex items-center justify-between sm:justify-start space-x-6 h-5">
            <label
              htmlFor="Online"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Online Status
            </label>
            <input
              id="Online"
              name="Online"
              type="checkbox"
              onChange={handleSelect}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start space-x-6 h-5">
            <label
              htmlFor="DG_Shifting"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              DG Shifting
            </label>
            <input
              id="DG_Shifting"
              name="DG_Shifting"
              type="checkbox"
              onChange={handleSelect}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start space-x-6 h-5">
            <label
              htmlFor="Basic_Installation"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Basic Installation
            </label>
            <input
              id="Basic_Installation"
              name="Basic_Installation"
              type="checkbox"
              onChange={handleSelect}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
        </div> */}
        <div className="mb-6">
          <label
            htmlFor="remark"
            className="block mb-1 pl-1 text-lg font-medium text-gray-900 dark:text-white"
          >
            Remark
          </label>
          <textarea
            type="text"
            id="remark"
            name="remark"
            rows={3}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Remark Here"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MeterEdit;
