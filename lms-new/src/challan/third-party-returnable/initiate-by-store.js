import React, { useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

import ThirdPartyActions from "./thirdparty-action";

const InitiateByStore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // const [status, setStatus] = useState(queryParams.get("status") || "");
  const [data, setData] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  // const [dealerName, setDealerName] = useState("");
  const [dealer, setDealer] = useState([]);
  const [queryState, setQueryState] = useState({
    dealerId: queryParams.get("dealerId") || "",
    status: queryParams.get("status") || "",
    serialNumber: queryParams.get("serialNumber") || "",
    challanNumber: queryParams.get("challanNumber") || "",
  });
  // useEffect(() => {
  // const newParams = new URLSearchParams();
  // if (engineerName) newParams.set("engineer", engineerName);
  // if (status) newParams.set("status", status);
  // Replace the current URL with the updated query parameters
  // navigate(`/challanhistory?${newParams}`, { replace: true });
  // }, [ ]);

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
        dealerId: queryState.dealerId,
        status: queryState.status,
        serialNumber: queryState.serialNumber,
        challanNumber: queryState.challanNumber,
        createdBy: "storekeeper",
        category: "3-phaseMeter",
        location: "getChallanDetails",
        challanType: "thirdParty returnable challan",
      },
    });
    try {
      setData((p) => ({ ...p, loading: true, data: [], error: "" }));
      const { data } = await axios.post(url, userInfo);
      // const statusFormatting = data.Data.filter((item) => {
      //   if (queryState.status === "" || queryState.status === undefined)
      //     return true;
      //   return item.Status === queryState.status;
      // });
      // console.log(data);
      setData((p) => ({ ...p, data: data.Data }));
      // setData(statusFormatting);
    } catch (error) {
      console.log(error);
      setData((p) => ({
        ...p,
        error:
          JSON.stringify(error?.response?.data?.messsage) ??
          JSON.stringify(error?.message),
      }));
    } finally {
      setData((p) => ({ ...p, loading: false }));
    }
  };
  const onChange = (key, value) => {
    setQueryState((p) => ({ ...p, [key]: value }));
  };
  // console.log(data);
  return (
    <section>
      <div className="flex justify-around items-center mt-2">
        {/* <Autocomplete
          onChange={(e, f) => onChange("dealerId", f)}
          className="w-[300px]"
          name="Dealer"
          // value={dealerName}
          options={dealer?.map((option) => option?.name)}
          renderInput={(params) => (
            <TextField
              key={params}
              // value={dealerName}
              {...params}
              label="Select Dealer Name"
            />
          )}
        /> */}
        <Autocomplete
          onChange={(e, f) => onChange("dealerId", f?.ID ?? "")}
          className="w-[400px]"
          name="selectDealer"
          options={dealer.map((option) => option)}
          getOptionLabel={(option) =>
            `${option.name.toUpperCase()} , ID: ${option.ID} , GST-${
              option.gstNumber
            }`
          }
          renderInput={(params) => (
            <TextField {...params} label="All Dealer" />
          )}
        />
        <TextField
          placeholder="Product Serial No."
          onChange={(e) => onChange("serialNumber", e.target.value)}
          label="Product Serial No."
        />
        <TextField
          placeholder="Challan No."
          onChange={(e) => onChange("challanNumber", e.target.value)}
          label="Challan No."
        />
        <select
          name="Status"
          debounce={300}
          onChange={(e) => onChange("status", e.target.value)}
          className="border-[1px] py-3 px-5 w-[150px] border-gray-400 rounded hover:border-gray-800"
          placeholder="Serial Number"
          // value={status}
        >
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="close">close</option>
        </select>
        <p> No. of Challans :{data?.data?.length}</p>
        <Button
          onClick={searchChallan}
          variant="contained"
          sx={{ paddingX: 4 }}>
          Search
        </Button>
      </div>
      {data.loading ? (
        <div className="w-full p-10 flex justify-center">
          <div className="h-20 w-20 border-y-2 rounded-full border-black animate-spin" />
        </div>
      ) : data.error ? (
        <div className="w-full p-10 flex justify-center">
          Some Error Occured ! {data.error}
        </div>
      ) : (
        data.data?.map((item, index) => (
          <section
            key={index}
            className="grid grid-cols-3 bg-black/40 my-10 p-5 mx-2 rounded-md overflow-y-scroll">
            <div className="col-span-3">
              <ThirdPartyActions
                searchChallan={searchChallan}
                showOtherProducts="onSiteAndinstalled"
                actions={item.Status === "open"}
                item={item}
                queryCheck="thirdPartyReturnByStore"
              />
            </div>
          </section>
        ))
      )}
    </section>
  );
};

export default InitiateByStore;
