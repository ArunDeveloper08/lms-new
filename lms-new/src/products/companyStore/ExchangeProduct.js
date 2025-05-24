import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";

const ExchangeProduct = ({
  setOpenModal,
  openModal,
  data,
  api,
  exchangeableProductListQuery,
  exchangeUpdatedQuery,
}) => {
  const { selectedItem } = useSelector((state) => state.itemReducer);
  console.log(openModal);
  const [radioValue, setRadioValue] = useState("");
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const [siteUsed, setSiteUsed] = useState([]);
  const [all, setAll] = useState({
    siteUsed: "",
    addNewProductSrNo: "", ///addNewProductSr
    wrongSrNo: "",
    productType: selectedItem,
  });
  const siteUsedProduct = () => {
    axios
      .post(
        window.MyApiRoute +
          `record/get?location=${exchangeableProductListQuery}&category=${selectedItem}`,
        {
          ...a.data,
        }
      )
      .then((res) => {
        setSiteUsed(res.data?.Data || []);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    // api();
    siteUsedProduct();
  }, [selectedItem]);

  const handleChange = (type, value) => {
    setAll((prev) => ({
      ...prev,
      [type]: value?.Meter_Serial_No || value,

      [type === "addNewProductSrNo" ? "siteUsed" : "addNewProductSrNo"]: null,
    }));
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal((p) => ({ open: false, check: "" }));
  };

  const handleSubmit = () => {
    axios
      .put(
        window.MyApiRoute +
          `record/update?category=${selectedItem}&check=${exchangeUpdatedQuery}`,
        {
          ...all,
          ...a.data,
        }
      )
      .then((res) => {
        // console.log(res.data);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleCloseModal();
        api();
      });
  };

  return (
    <Dialog open={openModal.open} onClose={handleCloseModal} maxWidth="lg">
      <DialogContent>
        <div className="flex justify-center p-1">
          <p className="text-xl text-gray-800">
            Exchange Product Serial Number
          </p>
        </div>
        <Box className="w-[300px] mx-auto mt-2">
          <Autocomplete
            onChange={(e, f) => handleChange("wrongSrNo", f)}
            className="flex-1 w-[300px]"
            name="Meter_Serial_No."
            options={data && data?.map((option) => option)}
            getOptionLabel={(option) => `${option?.Meter_Serial_No} `}
            renderInput={(params) => (
              <TextField {...params} label="Serial No." />
            )}
          />
        </Box>
        {all?.wrongSrNo && (
          <div className=" items-center mt-10">
            <div className="flex items-center">
              <input
                type="radio"
                value="addNew"
                checked={radioValue === "addNew"}
                onChange={handleRadioChange}
              />
              <label>Add New Product in Database</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="replaceProduct"
                checked={radioValue === "replaceProduct"}
                onChange={handleRadioChange}
              />
              <label>Replace the product with site-used product</label>
            </div>
          </div>
        )}
        {radioValue === "addNew" && (
          <>
            <div className="w-[300px]  mx-auto mt-10">
              <TextField
                onChange={(e) =>
                  handleChange("addNewProductSrNo", e.target.value)
                }
                fullWidth
                label="Add new Product"
                name="addNewProductSrNo"
              />
            </div>
          </>
        )}
        {radioValue === "replaceProduct" && (
          <>
            <div className="w-[300px] mx-auto mt-10">
              <Box className="w-[300px] mx-auto mt-2">
                <Autocomplete
                  onChange={(e, f) => handleChange("siteUsed", f)}
                  className="flex-1 w-[300px]"
                  name="sitUsed."
                  options={siteUsed?.map((option) => option)}
                  getOptionLabel={(option) => `${option?.Meter_Serial_No} `}
                  renderInput={(params) => (
                    <TextField {...params} label="Serial No." />
                  )}
                />
              </Box>
            </div>
          </>
        )}
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeProduct;

// const handleChange = (type, value) => {
//   setAll((prev) => ({
//     ...prev,
//     [type]: value?.Meter_Serial_No || value, // assuming value is a string
//   }));
// };
