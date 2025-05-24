import axios from "axios";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import secureLocalStorage from "react-secure-storage";
import { mainRoute } from "../App";
const AddPeople = () => {
  const [data, setData] = useState({
    Name: "",
    Employee_Id: "",
    Designation: "",
    MobileNo: true,
    Employee_Active_Status: true,
    isAdmin: false,
    Password: "",
  });
  const navigate = useNavigate();
  const handleSelect = (e) => {
    // console.log("er", e.target.checked);
    setData({ ...data, [e.target.name]: e.target.checked });
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.Name === "" ||
      data.Designation === "" ||
      data.Employee_Id === "" ||
      data.Password === ""
    ) {
      return alert("Please Fill all details");
    }
    axios
      // .post(`http://www.pesonline12.in/meterinstallation/employee/add`, data)
      .post(`${window.MyApiRoute}employee/add`, data)
      .then((res) => {
        // console.log(res.data);
        // if (!res.data.userExist) {
        alert(res.data.message);
        navigate(`${mainRoute}/home`);
        // } else {
        //   alert("User Exist Already");
        // }
      })
      .catch((err) => alert(err.message));
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "200px",
      },
    },
  };
  // console.log("data", data);
  return (
    <form className="w-3/4 md:w-1/2 mx-auto flex flex-col justify-center">
      <p className="text-3xl my-5 text-center font-semibold">
        Add a New person
      </p>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="Name"
          onChange={handleChange}
          id="Name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="Name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Employee Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="Employee_Id"
          id="Employee_Id"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={handleChange}
          placeholder=" "
          required
        />
        <label
          htmlFor="Employee_Id"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Employee ID
        </label>
      </div>
      {/* <div className="relative z-0 w-full mb-6 group"> */}
      <FormControl>
        <InputLabel>Designation</InputLabel>
        <Select
          fullWidth
          label="Designation"
          name="Designation"
          variant="filled"
          // MenuProps={MenuProps}
          onChange={handleChange}
          sx={{ paddingY: 0, marginBottom: 1.5 }}
        >
          <MenuItem value="storekeeper">Store</MenuItem>
          <MenuItem value="production">Production</MenuItem>
          <MenuItem value="engineer">Field Engineer</MenuItem>
          <MenuItem value="CRM">CRM</MenuItem>
          <MenuItem value="Mechanical">Mechanical</MenuItem>
        </Select>
      </FormControl>
      {/* </div> */}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="MobileNo"
            id="MobileNo"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleChange}
            required
          />
          <label
            htmlFor="MobileNo"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mobile Number
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="Password"
            id="Password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleChange}
            required
          />
          <label
            htmlFor="Password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="Employee_Active_Status">Employee Active Status</label>
          <Checkbox
            name="Employee_Active_Status"
            checked={data.Employee_Active_Status}
            onChange={handleSelect}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="Employee_Active_Status" className="">
            Admin
          </label>
          <Checkbox
            name="isAdmin"
            checked={data.isAdmin}
            onChange={handleSelect}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPeople;
