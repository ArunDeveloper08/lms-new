import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";

const Edit = () => {
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState(state);
  // console.log("location", location.state);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("data---->", data);
  };

  return (
    <div className="md:w-3/4 mx-auto my-20 px-10 animate__animated  animate__backInDown">
      <form
        className="animate_animated  animate_backInDown"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
          <div>
            <label
              htmlFor="Meter_Serial_No."
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Meter Serial No.
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              id="Meter_Serial_No."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Serial No."
              required
            />
          </div>
          <div>
            <label
              htmlFor="Meter_ID"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Meter ID
            </label>
            <input
              type="text"
              name="price"
              value={data.price}
              onChange={(e) => handleChange(e)}
              id="Meter_ID"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="332"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Flat_No."
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Flat No.
            </label>
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={(e) => handleChange(e)}
              id="Flat_No."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Flat No."
              required
            />
          </div>
          <div>
            <label
              htmlFor="Tower_Name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tower Name
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              id="Tower_Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tower Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Group_ID."
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Group ID.
            </label>
            <input
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              type="text"
              id="Group_ID."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Group ID."
              required
            />
          </div>
          <div>
            <label
              htmlFor="DG_Shifting"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              DG Shifting
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              id="DG_Shifting"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="332"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Customer_Unique_ID"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Customer Unique ID.
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              id="Customer_Unique_ID"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Customer Unique ID."
              required
            />
          </div>
          <div>
            <label
              htmlFor="Support_Engineer_Name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Support Engineer Name
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              id="Support_Engineer_Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Support Engineer Name"
              required
            />
          </div>
        </div>

        <div className="grid mb-5 mt-8 justify-start sm:justify-center sm:grid-cols-2 lg:grid-cols-4 space-y-3 sm:space-y-0 ">
          <div className="flex items-center justify-between sm:justify-start space-x-6 h-5">
            <label
              htmlFor="Meter_Status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Meter Status
            </label>
            <input
              id="Meter_Status"
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start space-x-6 h-5">
            <label
              htmlFor="GD_Status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              GD Status
            </label>
            <input
              id="GD_Status"
              type="checkbox"
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <div className="flex items-center justify-between sm:justify-start space-x-6 h-5">
            <label
              htmlFor="Online_Status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Online Status
            </label>
            <input
              id="Online_Status"
              type="checkbox"
              name="title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          {/* <div className="flex items-center justify-center space-x-6 h-5">
            <label
              htmlFor="Meter_Status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Meter Status
            </label>
            <input
              id="Meter_Status"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div> */}
        </div>
        <div className="mb-6">
          <label
            htmlFor="remark"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Remark
          </label>
          <textarea
            type="text"
            name="title"
            value={data.title}
            onChange={(e) => handleChange(e)}
            id="remark"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Remark Here"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
