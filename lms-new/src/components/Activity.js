import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import  secureLocalStorage  from  "react-secure-storage";
import { mainRoute } from "../App";
const Activity = () => {
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [row, setRow] = useState({
    WorkAllocated: "",
    WorkDone: "",
    WorkPending: "",
    WorkOrderNumber: "",
    SiteName: "",
  });
  // console.log(row);
  const [site, setSite] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = () => {
    if (
      row.SiteName === null ||
      row.SiteName.trim() === "" ||
      row.WorkOrderNumber.trim() === ""
    ) {
      return alert("Please select Site Name and Ticket Number");
    }
    // console.log(row);
    // api call
    axios
      .post(`${window.MyApiRoute}activity/add`, {
        ...row,
        Employee_Id: a.Employee_Id,
      })
      .then((res) => {
        navigate(`${mainRoute}/view`);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const sites = () =>
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        return setSite(res.data.data);
        // , console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  useEffect(() => {
    sites();
  }, []);
  const handleSelect = (a, b) => {
    setRow({ ...row, [a]: b });
  };
  return (
    <div className="mx-auto overflow-x-hidden">
      <div className="md:w-3/4 mx-auto px-10">
        <div className="animate_animated  animate_backInDown">
          <p className="text-center text-3xl ">Activity Log</p>
          <div className="grid gap-6 mb-6">
            <Autocomplete
              onChange={(e, f) => handleSelect("SiteName", f)}
              fullWidth
              // freesolo
              className="pt-3"
              name="SiteName"
              // value={ data.Site_Name }
              options={site?.map((option) => option?.SiteName)}
              renderInput={(params) => <TextField {...params} label="Site" />}
            />
            <div>
              <label
                htmlFor="Meter_ID"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ticket No:
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="WorkOrderNumber"
                id="Flat_no"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ticket Number"
              />
            </div>
            <div>
              <label
                htmlFor="Meter_Serial_No."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Work Allocated:
              </label>
              <textarea
                type="text"
                onChange={handleChange}
                name="WorkAllocated"
                rows={5}
                id="Meter_Serial_No."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Work Allocated"
              />
            </div>
            <div>
              <label
                htmlFor="CustomerMobileNo."
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Work Done:
              </label>
              <textarea
                type="text"
                onChange={handleChange}
                rows={5}
                name="WorkDone"
                id="Meter_Serial_No."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Work Done"
              />
            </div>
            <div>
              <label
                htmlFor="Meter_ID"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Work Pending:
              </label>
              <textarea
                type="text"
                onChange={handleChange}
                name="WorkPending"
                rows={5}
                id="Meter_ID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Work Pending"
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

export default Activity;
