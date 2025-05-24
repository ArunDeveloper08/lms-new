

import React, { useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import ProductionChallanTable from "../production-returnable/ProductionchallanTable";




const ChallanHistory = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [engineerName, setEngineerName] = useState(
    queryParams.get("engineer") || ""
  );
  const [status, setStatus] = useState(queryParams.get("status") || "");
  const [data, setData] = useState([]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [engineer, setEngineer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [challanNumber, setChallanNumber] = useState("");
  const [productSrNo, setProductSrNo] = useState("");
 const [challanUrl,setChallanUrl]=useState('downloadproductionchallanpdf');
 const[type ,setType]=useState("internalNonReturnableChallan")
 const nop="true";
  //   useEffect(() => {
  //     const newParams = new URLSearchParams();
  //     if (engineerName) newParams.set("engineer", engineerName);
  //     if (status) newParams.set("status", status);
  //     // Replace the current URL with the updated query parameters
  //     navigate(`/challanhistory?${newParams}`, { replace: true });
  //   }, [engineerName, status, location.pathname, navigate]);


  useEffect(() => {
    if (engineerName && status) {
      searchChallan();
    }
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => {
        const engineerData = res.data.data.filter(
          (employee) => employee?.Designation === "engineer"
        );

        setEngineer(engineerData);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const searchChallan = async () => {
    setLoading(true);
    const url = qs.stringifyUrl({
      url: `${window.MyApiRoute}record/get`,
      query: {
        // createdBy: challanCreatedBy,
        // engineerName: engineerName,
        status: status,
        category: "3-phaseMeter",
        location: "getChallanDetails",
        challanType: "non-returnable challan",
        challanNumber: challanNumber,
        productSrNo: productSrNo,
      },
    });
    try {
      const { data } = await axios.post(url, userInfo);

      // const statusFormatting = data.Data.filter((item) => {
      //   if (status === "" || status === undefined) return true;
      //   return item.Status === status;
      // });

      setData(data.Data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
 console.log("data",data)
  return (
    <section>
      <div className="flex justify-around items-center mt-2 gap-x-1">
        {/* <Autocomplete
          onChange={(e, f) => setEngineerName(f)}
          className="w-[250px]"
          name="Engineer"
          value={engineerName}
          options={engineer?.map((option) => option?.Name)}
          renderInput={(params) => (
            <TextField
              key={params}
              value={engineerName}
              {...params}
              label="Select Engineer Name"
            />
          )}
        /> */}
        <input
          type="text"
          className="border-2 py-2 px-5 w-[200px] border-gray-500 rounded p-2"
          placeholder="challan no."
          onChange={(e) => setChallanNumber(e.target.value)}
        />
        <input
          type="text"
          className="border-2 py-2 px-5 w-[200px] border-gray-500 rounded p-2"
          placeholder="Product Sr. No."
          onChange={(e) => setProductSrNo(e.target.value)}
        />
        <select
          name="Status"
          debounce={300}
          onChange={(e) => setStatus(e.target.value)}
          className="border-2 py-2 px-5 w-[200px] border-gray-500 rounded"
          value={status}
        >
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="close">close</option>
        </select>

        {/* <select
          // name="Status"
          debounce={300}
          onChange={(e) => setChallanCreatedBy(e.target.value)}
          className="border-2 py-2 px-5 w-[250px] border-gray-500 rounded"
          placeholder="Serial Number"
          value={challanCreatedBy}
        >
          <option value="storekeeperandengineer">All Challan</option>
          <option value="storekeeper">Initiate Storekeeper</option>
          <option value="engineer"> Initiate Engineer</option>
        </select> */}
        <p>No of Challans :{data?.length}</p>
        <Button
          onClick={searchChallan}
          variant="contained"
          sx={{ paddingX: 4 }}
        >
          Search
        </Button>
      </div>
      {loading && (
        <p className="text-2xl font-semibold flex justify-center">Loading...</p>
      )}
      {data?.map((item, index) => (
        <section key={index} className="grid grid-cols-3">
          <div className="col-span-3">
            <ProductionChallanTable actions={item.Status === "open"} item={item} 
            challanUrl={challanUrl}
            type={type}
            nop={nop}
            />
          </div>
        </section>
      ))}
    </section>
  );
};

export default ChallanHistory;
