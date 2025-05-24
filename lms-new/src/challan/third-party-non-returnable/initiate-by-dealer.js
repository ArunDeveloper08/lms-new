import React, { useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import StoreChallanActions from "../../components/ChallanDetail/store-challan-actions";

const InitiateByDealer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [status, setStatus] = useState(queryParams.get("status") || "");
  const [data, setData] = useState([]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [dealerName, setDealerName] = useState("");
  const [dealer, setDealer] = useState([]);
  //   useEffect(() => {
  //     const newParams = new URLSearchParams();
  //     if (engineerName) newParams.set("engineer", engineerName);
  //     if (status) newParams.set("status", status);
  //     // Replace the current URL with the updated query parameters
  //     navigate(`/challanhistory?${newParams}`, { replace: true });
  //   }, [engineerName, status, location.pathname, navigate]);

  useEffect(() => {
    getDealer();
  }, []);

  const getDealer = () => {
    axios
      .get(`${window.MyApiRoute}dealer/get`)
      .then((res) => {
        setDealer(res.data?.details);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const searchChallan = async () => {
    const url = qs.stringifyUrl({
      url: `${window.MyApiRoute}record/get`,
      query: {
        createdBy: "storekeeper",
        dealerName: dealerName,
        status: status,
        category: "3-phaseMeter",
        location: "getChallanDetails",
        challanType: "external returnable challan",
      },
    });
    try {
      const { data } = await axios.post(url, userInfo);

      const statusFormatting = data.Data.filter((item) => {
        if (status === "" || status === undefined) return true;
        return item.Status === status;
      });

      setData(statusFormatting);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="flex justify-around items-center mt-2">
        <Autocomplete
          onChange={(e, f) => setDealerName(f)}
          className="w-[300px]"
          name="Dealer"
          value={dealerName}
          options={dealer?.map((option) => option?.name)}
          renderInput={(params) => (
            <TextField
              key={params}
              value={dealerName}
              {...params}
              label="Select Dealer Name"
            />
          )}
        />
        <select
          name="Status"
          debounce={300}
          onChange={(e) => setStatus(e.target.value)}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Serial Number"
          value={status}
        >
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="close">close</option>
        </select>
        <p>No of Challans :{data.length}</p>
        <Button
          onClick={searchChallan}
          variant="contained"
          sx={{ paddingX: 4 }}
        >
          Search
        </Button>
      </div>
      {data?.map((item, index) => (
        <section key={index} className="grid grid-cols-3">
          <div className="col-span-3">
            <StoreChallanActions actions={item.Status === "open"} item={item} />
          </div>
        </section>
      ))}
    </section>
  );
};

export default InitiateByDealer;
