import React, { useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import StoreChallanActions from "../../components/ChallanDetail/store-challan-actions";
import ThirdPartyNonActions from "./thirdparty-non-action";

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
      .get(window.MyApiRoute + "dealer/get")
      .then((res) => {
        // const getSitesandDealers = async () => {
        //     const { data } = await axios.get(window.MyApiRoute + 'dealer/get');
        //     setSitename(p => ({ ...p, isShown: true, data: data.details }));
        // };
        setEngineer(res.data.details);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const searchChallan = async () => {
    setLoading(true);
    const url = qs.stringifyUrl({
      url: `${window.MyApiRoute}record/get`,
      query: {
        category: "3-phaseMeter",
        issueToDealerId: engineerName.ID,
        location: "getChallanDetails",
        challanType: "thirdParty non-returnable challan",
      },
    });
    try {
      const { data } = await axios.post(url, userInfo);

      const statusFormatting = data.Data.filter((item) => {
        if (status === "" || status === undefined) return true;
        return item.Status === status;
      });
      setData(statusFormatting);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //   console.log(engineer)

  return (
    <section>
      <div className="flex justify-around items-center mt-2">
        <Autocomplete
          onChange={(e, f) => setEngineerName(f)}
          className="w-[300px]"
          name="Engineer"
          options={engineer?.map((option) => option)}
          getOptionLabel={(option) => option?.name}
          renderInput={(params) => (
            <TextField
              key={params}
              value={engineerName?.name}
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
          value={status}>
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="close">close</option>
        </select>
        <p>No of Challans :{data.length}</p>
        <Button
          onClick={searchChallan}
          variant="contained"
          sx={{ paddingX: 4 }}>
          Search
        </Button>
      </div>
      {loading && (
        <p className="text-2xl font-semibold flex justify-center">Loading...</p>
      )}
      {data?.map((item, index) => (
        <section key={index} className="grid grid-cols-3">
          <div className="col-span-3">
            <ThirdPartyNonActions
              actions={item.Status === "open"}
              item={item}
            />
          </div>
        </section>
      ))}
    </section>
  );
};

export default ChallanHistory;
