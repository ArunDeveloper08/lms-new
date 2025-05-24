import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import axios from "axios";
import AddWorkDialog from "./AddWorkDialog";
import  secureLocalStorage  from  "react-secure-storage";
const AddWork = () => {
  const [arr, setArr] = useState([]);
  const [site, setSite] = useState([]);
  const [res, setRes] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    Engineer_Name: "",
    Site_Name: "",
    TimeLine: "",
    WorkAlloted: "",
    WorkOrderStatus: "open",
  });
  useEffect(() => {
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        return setSite(res.data.data);
        // console.log(res.data.data)
      })
      .catch((err) => console.log(err));
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => setArr(res.data.data))
      .catch((err) => console.log({ err }));
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log("data", data);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "200px",
      },
    },
  };
  const handleSubmit = () => {
    // console.log("Data", data);
    if (
      data.Engineer_Name === "" ||
      data.Site_Name === "" ||
      data.TimeLine === "" ||
      data.WorkAlloted === ""
    ) {
      return alert("Please Fill All the details");
    }
    axios
      .post(`${window.MyApiRoute}employee/jobcard`, data)
      .then((res) => {
        setOpen(true);
        setRes(res.data);
        setData({
          Engineer_Name: "",
          Site_Name: "",
          TimeLine: "",
          WorkAlloted: "",
          WorkOrderStatus: "open",
        });
      })
      .catch((err) => {
        alert("Error", err.message);
        console.log("Error", err);
      });
  };
  return (
    <div className="md:w-1/3 mx-auto mt-20">
      <p className="text-center text-3xl mb-10">Give Work To the Worker</p>
      <div className="w-3/4 mx-auto space-y-10 md:space-y-5">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={data.age}
              label="Employee Name"
              name="Engineer_Name"
              value={data.Engineer_Name}
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {arr.length &&
                arr?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.Name}>
                      {item.Name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Site Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.Site_Name}
              label="Site Name"
              name="Site_Name"
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              <MenuItem defaultValue>Site Name</MenuItem>
              {site.length &&
                site.map((a, b) => {
                  return (
                    <MenuItem key={b} value={a.SiteName}>
                      {a.SiteName}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        <TextField
          id="WorkAlloted"
          fullWidth
          multiline
          rows={4}
          label="Work Alotted"
          name="WorkAlloted"
          value={data.WorkAlloted}
          onChange={handleChange}
          variant="outlined"
        />
        <div>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              sx={{ textAlign: "center" }}
              name="TimeLine"
              id="TimeLine"
              value={data.TimeLine}
              type="number"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">Days</InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "days",
              }}
            />
          </FormControl>
        </div>
      </div>
      <p
        onClick={handleSubmit}
        className="bg-blue-500 text-white mt-5 rounded-xl px-7 py-3 w-fit cursor-pointer mx-auto"
      >
        Submit
      </p>
      {res && (
        <AddWorkDialog
          open={open}
          setOpen={setOpen}
          res={res}
          handleClickOpen={handleClickOpen}
        />
      )}
    </div>
  );
};

export default AddWork;
