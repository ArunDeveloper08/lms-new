import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import  secureLocalStorage  from  "react-secure-storage";
import {
  Autocomplete,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const InstallSim = () => {
  const [dongleNumber, setDongleNumber] = useState([]);
  const [site, setSite] = useState([]);

  const [data, setData] = useState({
    Site_Name: "",
    Dongle_Serial_Number: "",
    IMEI: "",
    ModemMacNum1: "",
    ModemMacNum2: "",
    ModemMacNum3: "",
    ModemMacNum4: "",
    remark: "",
  });
  const userData = JSON.parse(secureLocalStorage.getItem("info"));
  const Api = () => {
    if (data.remark.trim() === "") {
      return alert("Remark is Compulsary Please Enter your Remark");
    } else if (
      data.ModemMacNum1.trim() === "" &&
      data.ModemMacNum2.trim() === "" &&
      data.ModemMacNum3.trim() === "" &&
      data.ModemMacNum4.trim() === ""
    ) {
      return alert("Please Enter atleast one Modem Detail");
    } else if (data.Dongle_Serial_Number.trim() === "") {
      return alert("Dongle Serial Number Is Mendatory");
    } else if (data.IMEI.trim() === "") {
      return alert("IMEI Number Is Mendatory");
    } else if (data.Site_Name.trim() === "") {
      return alert("Site Name Is Mendatory");
    }
    console.log({ data });
    axios
      .put(window.MyApiRoute + "sim/update?check=installNew", {
        ...data,
        Employee_Id: userData.data.Employee_Id,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        setData({
          Site_Name: "",
          Dongle_Serial_Number: "",
          IMEI: "",
          ModemMacNum1: "",
          ModemMacNum2: "",
          ModemMacNum3: "",
          ModemMacNum4: "",
          remark: "",
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    Api();
  };
  // console.log({ data });
  useEffect(() => {
    axios
      .post(
        window.MyApiRoute + "sim/get?check=issueWithoutDongle",
        { Employee_Id: userData.data.Employee_Id }
      )
      .then((res) => setDongleNumber(res.data))
      .catch((err) => console.log(err));
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        return setSite(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSelect = (a, b) => {
    setData({ ...data, [a]: b });
  };
  return (
    <>
      <p className="text-4xl text-center mb-10 font-semibold">
        Sim Installation
      </p>
      <div className="px-10 md:w-1/2 gap-5 flex flex-col space-y-2 md:space-y-0 mx-auto md:grid grid-cols-1 md:grid-cols-2">
        <Autocomplete
          onChange={(e, f) => handleSelect("Site_Name", f)}
          fullWidth
          // freesolo
          value={data.Site_Name}
          options={site?.map((option) => option?.SiteName)}
          renderInput={(params) => <TextField {...params} label="Site" />}
        />
        {/* { dongleNumber?.ImeiNumber && <Autocomplete
                    onChange={ (e, f) => handleSelect("Dongle_Serial_Number", f) }
                    fullWidth
                    freeSolo
                    options={ dongleNumber.ImeiNumber.map((option) => option?.Dongle_Serial_Number) }
                    renderInput={ (params) => <TextField onChange={ (e) => handleSelect("Dongle_Serial_Number", e.target.value) } { ...params } label="Dongle Serial Number" /> }
                /> } */}
        <TextField
          onChange={handleChange}
          value={data.Dongle_Serial_Number}
          name="Dongle_Serial_Number"
          placeholder="Dongle Serial Number"
          label="Dongle Serial Number"
        />
        {dongleNumber?.ImeiNumber && (
          <Autocomplete
            fullWidth
            value={data.IMEI}
            onChange={(e, f) => handleSelect("IMEI", f)}
            options={dongleNumber.ImeiNumber.map((option) => option?.IMEI)}
            renderInput={(params) => <TextField {...params} label="IMEI" />}
          />
        )}
        <p className="hidden md:block"></p>
        <TextField
          onChange={handleChange}
          value={data.ModemMacNum1}
          name="ModemMacNum1"
          placeholder="ModemMacNum1"
          label="Mac1"
        />
        <TextField
          onChange={handleChange}
          value={data.ModemMacNum2}
          name="ModemMacNum2"
          placeholder="ModemMacNum2"
          label="Mac2"
        />
        <TextField
          value={data.ModemMacNum3}
          name="ModemMacNum3"
          onChange={handleChange}
          placeholder="ModemMacNum3"
          label="Mac3"
        />
        <TextField
          name="ModemMacNum4"
          value={data.ModemMacNum4}
          onChange={handleChange}
          placeholder="ModemMacNum4"
          label="Mac4"
        />
        <textarea
          value={data.remark}
          onChange={handleChange}
          name="remark"
          className="col-span-2 border-[1px] border-black p-4"
          rows={3}
          placeholder="Remark Will Goes here"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mx-auto w-fit block py-2 mt-10 px-10 bg-blue-500 text-white rounded"
      >
        Install sim
      </button>
    </>
  );
};

export default InstallSim;
