import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import axios from "axios";
import secureLocalStorage from "react-secure-storage";

import { useDispatch, useSelector } from "react-redux";


const ThirdPartyReturnModal = ({
  partyReturnModal,
  setPartyReturnModal,
  api,
  setOpen,
  setBadgeCount,
  setChecked
}) => {
  const info = JSON.parse(secureLocalStorage.getItem("info")).data;
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    dealerId: "",
    remark: "",
    productType: selectedItem,
  });
  const [siteName, setSitename] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const getSitesandDealers = async () => {
    const { data } = await axios.get(window.MyApiRoute + "dealer/get");
    // console.log(data);
    setSitename((p) => ({ ...p, loading: true, data: data.details }));
  };
  useEffect(() => {
    getSitesandDealers();
  }, []);
  const onChange = (a, b) => {
    if (a === "dealerId") {
      setInput((p) => ({ ...p, dealerId: b?.ID, dealerName: b?.name }));
      return;
    }
    setInput((p) => ({ ...p, [a]: b }));
  };
  // const onSubmit = () => {
  //   console.log(input);
  // };
  const onSubmit = async () => {

    const confirm = window.confirm("Are you sure you want to submit !");
    if (confirm) {
      try {
        setLoading(true);
        const { data } = await axios.put(
          window.MyApiRoute +
          `record/update?category=${selectedItem}&check=thirdPartyQue`,
          {
            ...input,
            ...info,
            list: partyReturnModal.data,
          }
        );

        setLoading(false);
        setOpen(false);
        setBadgeCount(0);
        setChecked([]);
        api();
        setPartyReturnModal((p) => ({ ...p, open: false }));

        // console.log(data);
      } catch (error) {
        alert("Error" + error.message);
      }
      // setTimeout(() => setLoading(false), 2000);
    }
  };
  return (
    <>
      <Dialog
        open={partyReturnModal.open}
        onClose={() => setPartyReturnModal((p) => ({ ...p, open: false }))}>
        <DialogTitle textAlign="center">Send To Third Party</DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          {/* {!siteName.loading && ( */}
          <Autocomplete
            onChange={(e, f) => onChange("dealerId", f)}
            // onClick={(e, f) => console.log(e, f)}
            className="flex-1"
            disabled={loading || !siteName.loading}
            name="selectDealer"
            options={siteName.data.map((option) => option)}
            getOptionLabel={(option) =>
              `${option?.name.toUpperCase()}, ID: ${option?.ID} , GST-${option?.gstNumber
              }`
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Dealer" />
            )}
          />
          <TextField
            onChange={(e) => onChange("remark", e.target.value)}
            sx={{ marginTop: 3 }}
            fullWidth
            multiline
            disabled={loading}
            name="remark"
            rows={4}
            label="Add Your Remark"
          />
          <DialogActions>
            <Button onClick={onSubmit} disabled={loading} variant="contained">
              Send To third party
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThirdPartyReturnModal;
