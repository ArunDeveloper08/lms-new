import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
 
  import axios from "axios";
  import secureLocalStorage from "react-secure-storage";
import { ProductList } from "../../../constants/ProductList";
  
  function DealerThirdPartyChallan({ addProductModal, setAddProductModal,api }) {
    const [loading ,setLoading]= useState(false);
    const a = JSON.parse(secureLocalStorage.getItem("info")).data;
    const [input, setInput] = useState({
      productType: "",
      Meter_Serial_No: "",
      dealerId: "",
      dealerName: "",
      remark: "",
    });
    const [list, setList] = useState({
        list: []
      });
      
    const [siteName, setSitename] = useState({
      loading: false,
      data: [],
      error: "",
    });
    const [products, setProducts] = useState({
      uninitialized: true,
      loading: false,
      data: [],
      error: "",
    });
    const handleClose = () => {
      setAddProductModal({ open: false, type: "" });
    };
    const getSitesandDealers = async () => {
      setSitename((p) => ({ ...p, loading: true }));
      try {
        const { data } = await axios.get(window.MyApiRoute + "dealer/get");
        // console.log(data);
        setSitename((p) => ({ ...p, data: data.details }));
      } catch (error) {
        setSitename((p) => ({
          ...p,
          error: error?.response?.data?.message || error.message,
        }));
      } finally {
        setSitename((p) => ({
          ...p,
          loading: false,
        }));
      }
    };
    const getProductsOnSite = async (productType) => {
      // Want to create new product no need to load productList
      if (addProductModal.type === "newProduct") return;
      if (!productType) return;
      setProducts((p) => ({ ...p, loading: true, uninitialized: false }));
      try {
        const { data } = await axios.post(
          window.MyApiRoute +
          `record/get?category=${productType}&location=inStore`,
          { ...a }
        );
        // console.log(data);
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
    useEffect(() => {
      getSitesandDealers();
    }, []);
    const onChange = (e, f) => {
      // if dealer is selected
      if (e === "dealerDetails") {
        setInput((p) => ({
          ...p,
          dealerId: f.ID,
          dealerName: f.name,
        }));
        return;
      }
      if (e === "Meter_Serial_No") {
        console.log(f);
        setList((p) => ({
          ...p,
          list: f.map(serialNo => ({ Meter_Serial_No: serialNo }))
        }));
        return;
      }
      
      // get New Product list if the type of product changes
      if (e.target.name === "productType") {
        getProductsOnSite(e.target.value);
        // return;
      }
      setInput((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = async () => {
      if (input.remark === "") {
        return alert("Please fill the remark");
      }
  
     
    
        try {
          setLoading(true);
          await axios.put(
            window.MyApiRoute +
            `record/update?category=${input.productType}&check=thirdPartyQue`,
            { ...a, ...input,...list }
          );
        } catch (error) {
          setLoading(true)
          alert( error.response.data.message || error.message);
        } finally {
          setLoading(false)
          api();
          handleClose();
        }
      
    };
    console.log("list",list)
    return (
      <Dialog
        open={addProductModal.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: 500 }}
          id="alert-dialog-title"
        >
          Add a{addProductModal.type === "newProduct" && " New "}
          {addProductModal.type === "oldProduct" && " Old "}
          Product
        </DialogTitle>
        <DialogContent className="space-y-2 flex flex-col w-[500px]">
          <Autocomplete
            // onChange={(e, f) => console.log(f)}
            onChange={(e, f) => onChange("dealerDetails", f)}
            // onClick={(e, f) => console.log(e, f)}
            sx={{ marginTop: 3 }}
            disabled={siteName.loading}
            name="selectDealer"
            options={siteName.data.map((option) => option)}
            getOptionLabel={(option) =>
              `${option.name.toUpperCase()}, ID: ${option?.ID} , GST-${option.gstNumber
              }`
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Dealer" />
            )}
          />
          <FormControl sx={{ mt: 1 }}>
            <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // disabled={loading}
              value={input.productType}
              name="productType"
              label="Product Type"
              onChange={onChange}
            >
              {ProductList.map((item) => (
                <MenuItem key={item[0]} value={item[1]}>
                  {item[0]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* when the product is already on dealer  */}
          {addProductModal.type === "oldProduct" &&
            !products.uninitialized &&
            (products.loading ? (
              <p className="text-center">Loading...</p>
            ) : products.error ? (
              <p className="text-center">{products.error}</p>
            ) : (
              <Autocomplete
                onChange={(e, f) => onChange("Meter_Serial_No", f)}
                // onClick={(e, f) => console.log(e, f)}
                sx={{ marginTop: 3 }}
                multiple
                filterSelectedOptions
                disabled={products.loading}
                label="Select Product Sr No"
                name="Meter_Serial_No"
                options={products?.data.map(
                  (option) => option.Meter_Serial_No || ''
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
            ))}
          {addProductModal.type === "newProduct" && (
            <TextField
              onChange={onChange}
              name="Meter_Serial_No"
              label="Product Sr No"
            />
          )}
          <TextField
            onChange={onChange}
            name="remark"
            label="Remark"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            variant="contained"
            onClick={handleSubmit}
            color="success"
          >
            {loading ? "Submitting" : "Submit"}
            {/* Submit */}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default DealerThirdPartyChallan;
  
 