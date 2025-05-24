import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import axios from "axios";
import secureLocalStorage from "react-secure-storage";

import { useDispatch, useSelector } from "react-redux";
import { ProductList } from "../../constants/ProductList";

const ThirdNonPartyModal = ({ partyModal, setPartyModal, api, setOpen }) => {
  const info = JSON.parse(secureLocalStorage.getItem("info")).data;
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [loading, setLoading] = useState(false);
  const [poValues, setPoValues] = useState({});
  const [input, setInput] = useState({
    dealerId: "",
    poNumber: "",
    note: "",
    productType: "",
  });
  const [siteName, setSitename] = useState({
    isShown: false,
    data: [],
    error: "",
  });
  const [poNumbers, setPoNumbers] = useState({
    isShown: false,
    data: [],
    error: "",
  });
  const [list, setList] = useState({
    list: [],
  });

  const getSitesandDealers = async () => {
    const { data } = await axios.get(window.MyApiRoute + "dealer/get");
    console.log(data);
    setSitename((p) => ({ ...p, isShown: true, data: data.details }));
  };

  useEffect(() => {
    getSitesandDealers();
    getProducts();
  }, []);

  const getDealerAllPo = async (dealer) => {
    const { data } = await axios.post(
      window.MyApiRoute + `dealerPO/get?DealerId=${dealer.ID}`,
      { ...info }
    );
    setPoNumbers((p) => ({ ...p, isShown: true, data: data.data }));
  };

  const handleSelectSiteorDealer = (dealer) => {
    if (dealer === null) {
      setPoNumbers((p) => ({ ...p, data: [], isShown: false }));
      setInput((p) => ({ ...p, dealerId: "" }));
      return;
    } else {
      getDealerAllPo(dealer);
      setInput((p) => ({ ...p, dealerId: dealer.ID }));
    }
  };
  // const handleSelectPoNumber = async (poNumber) => {
  //     if (poNumber === null) {
  //     setInput((p) => ({ ...p, poNumber: "" }));
  //     setPoValues({});
  //     return;
  //     }
  //     const { data } = await axios.get(
  //     window.MyApiRoute +
  //         `dealerPO/getOnePO?dealerId=${
  //         input.dealerId
  //         }&poNumber=${encodeURIComponent(poNumber.poNumber)}`
  //     );

  //     let poDetails = Object.groupBy(
  //     data.data.detail,
  //     ({ ProductType }) => ProductType
  //     );
  //     if (typeof poDetails?.[selectedItem]?.[0] === "undefined") {
  //     return setPoValues({});
  //     }
  //     setPoValues(poDetails?.[selectedItem]?.[0]);
  //     setInput((p) => ({
  //     ...p,
  //     poNumber: poNumber.poNumber,
  //     note: poDetails?.[selectedItem]?.[0].note,
  //     }));
  // };

  const handleSelectPoNumber = async (poNumber) => {
    if (poNumber === null) {
      setInput((p) => ({ ...p, poNumber: "" }));
      setPoValues({});
      return;
    }
    const { data } = await axios.get(
      window.MyApiRoute +
        `dealerPO/getOnePO?dealerId=${
          input.dealerId
        }&poNumber=${encodeURIComponent(poNumber.poNumber)}`
    );

    let poDetails = Object.groupBy(
      data.data.detail,
      ({ ProductType }) => ProductType
    );
    if (typeof poDetails?.[input.productType]?.[0] === "undefined") {
      return setPoValues({});
    }
    setPoValues(poDetails?.[input.productType]?.[0]);

    setInput((p) => ({
      ...p,
      poNumber: poNumber.poNumber,
      note: poDetails?.[input.productType]?.[0].note,
    }));
  };

  const submitThirdparty = async () => {
    const confirm = window.confirm("Are you sure you want to submit !");
    if (confirm) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          window.MyApiRoute + `dealerPO/tempUpdate`,
          {
            ...input,
            ...info,
            // list: partyModal.data,
            ...list,
          }
        );
        setLoading(false);
        api();
        // setOpen(false);

        setPartyModal((p) => ({ ...p, open: false }));
        // console.log(data);
      } catch (error) {
        alert("Error" + error.message);
      }
    }
  };

  const canSend =
    (poValues?.BalanceQuantity ?? poValues?.Quantity) -
      partyModal?.data?.length <
    0;

  const showAlert = list?.list?.length > poValues?.Quantity;

  const [products, setProducts] = useState({
    uninitialized: true,
    loading: false,
    data: [],
    error: "",
  });

  const onChange = async (e, f) => {
    if (e === "Meter_Serial_No") {
      setList((p) => ({
        ...p,
        list: f.map((serialNo) => ({ Meter_Serial_No: serialNo })),
      }));
      return;
    }

    // get New Product list if the type of product changes
    if (e.target.name === "productType") {
      const selectedProductType = e.target.value;
      setInput((p) => ({
        ...p,
        [e.target.name]: selectedProductType,
      }));

      if (selectedProductType) {
        await getProducts(selectedProductType);
      }
      return;
    }

    setInput((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };
  const getProducts = async (productType) => {
    try {
      const { data } = await axios.post(
        window.MyApiRoute +
          `record/get?category=${productType}&location=inStore`,
        { ...info }
      );
      setProducts((p) => ({ ...p, data: data.Data || [] }));
    } catch (error) {
      setProducts((p) => ({
        ...p,
        error: error?.response?.data?.message || error.message,
      }));
    } finally {
      setProducts((p) => ({
        ...p,
        loading: false,
      }));
    }
  };

  return (
    <>
      <Dialog
        open={partyModal.open}
        onClose={() => setPartyModal((p) => ({ ...p, open: false }))}
      >
        <DialogTitle textAlign="center">Send To Third Party</DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          {siteName.isShown ? (
            <>
              <div className="p-2 flex flex-col w-full gap-y-3">
                <div>
                  <Autocomplete
                    disabled={!siteName?.isShown || loading}
                    onChange={(e, f) => handleSelectSiteorDealer(f)}
                    className="flex-1"
                    name="selectDealer"
                    options={siteName?.data?.map((option) => option)}
                    getOptionLabel={(option) =>
                      `${option.name.toUpperCase()}, ID: ${option?.ID} , GST-${
                        option.gstNumber
                      }`
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Select Dealer" />
                    )}
                  />

                  {poNumbers?.isShown && (
                    <div className="mt-4">
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Product Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          sx={{ width: "530px" }}
                          value={input.productType}
                          name="productType"
                          label="Product Type"
                          onChange={onChange}
                        >
                          {/* Mapping other ProductList items */}
                          {ProductList?.map((item) => (
                            <MenuItem key={item[0]} value={item[1]}>
                              {item[0]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}

                  {input?.productType && (
                    <div className="mt-4">
                      <Autocomplete
                        disabled={loading}
                        onChange={(e, f) => handleSelectPoNumber(f)}
                        className="flex-1"
                        name="IssueForEngineer"
                        options={poNumbers?.data?.map((option) => option)}
                        getOptionLabel={(option) => option.poNumber ?? "Null"}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Dealer's PO Number"
                          />
                        )}
                      />
                    </div>
                  )}

                  {input.productType && (
                    <div className="mt-4">
                      <Autocomplete
                        onChange={(e, f) => onChange("Meter_Serial_No", f)}
                        sx={{ marginTop: 3 }}
                        multiple
                        filterSelectedOptions
                        disabled={products.loading}
                        label="Select Product Sr No"
                        name="Meter_Serial_No"
                        options={products?.data.map(
                          (option) => option.Meter_Serial_No || ""
                        )}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Product Sr No."
                            label="Select Product Sr No"
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              {!!Object?.values(poValues)?.length && (
                <>
                  <div className="p-2 flex flex-col w-full gap-y-3">
                    <TextField
                      disabled={loading}
                      value={input?.note}
                      onChange={(e) =>
                        setInput((p) => ({ ...p, note: e.target.value }))
                      }
                      sx={{ width: "100%" }}
                      label="Note"
                      multiline
                      rows={5}
                    />
                  </div>
                  <div className="p-2 grid grid-cols-2">
                    <p className="col-span-2">
                      <span className="font-semibold">Product Name :</span>
                      {input?.productType}
                    </p>
                    <p>
                      <span className="font-semibold">Product Quantity :</span>
                      {poValues?.Quantity}
                    </p>
                    <p>
                      <span className="font-semibold">Product Supplied :</span>
                      {poValues?.SupplyQuantity ?? "0"}
                    </p>
                    <p>
                      <span className="font-semibold">Product Balance :</span>
                      {poValues?.BalanceQuantity ?? poValues.Quantity}
                    </p>
                    <p>
                      <span className="font-semibold">Product Sending :</span>
                      {list.list?.length}
                    </p>
                    <p className="col-span-2">
                      <span className="font-semibold">Product Sr. No:</span>
                      {list.list.map((item) => item?.Meter_Serial_No).join(", ")}
                    </p>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="h-10 my-10 mx-auto w-10 border-b-2 border-black rounded-full animate-spin"></div>
          )}
          {canSend && (
            <DialogContentText
              sx={{ textAlign: "center", color: "red", fontSize: 18 }}
            >
              Cannot Send more products than the P.O. QTY{" "}
            </DialogContentText>
          )}
          <DialogActions>
            <Button
              onClick={submitThirdparty}
              disabled={
                loading ||
                canSend ||
                showAlert ||
                !input.dealerId ||
                !input.poNumber
              }
              variant="contained"
            >
              Send To third party
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThirdNonPartyModal;
