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
import { useEffect, useState } from "react";
import { ProductList } from "../../../constants/ProductList";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
const AddProductModal = ({ modal, setModal, api }) => {
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    engineerId: "",
    productType: "",
    productSrNo: "",
    SiteName: "",
    remark: "",
    engineerName: "",
  });
  const [engineer, setEngineer] = useState({
    loading: false,
    error: "",
    details: [],
  });
  const [siteNameList, setSiteNameList] = useState({
    loading: false,
    error: "",
    details: [],
  });
  const [productList, setProductList] = useState({
    uninitialized: true,
    loading: false,
    error: "",
    details: [],
  });
  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    // call api to get all the name of the engineer
    async function getEngineerList() {
      setEngineer((p) => ({ ...p, loading: true }));
      try {
        const res = await axios.get(`${window.MyApiRoute}employee/names`);
        setEngineer((p) => ({
          ...p,
          details:
            res.data.data?.filter((item) => item.Designation === "engineer") ||
            [],
          error: "",
        }));
      } catch (error) {
        setEngineer((p) => ({
          ...p,
          error: error?.response?.data?.message || error.message,
        }));
      } finally {
        setEngineer((p) => ({ ...p, loading: false }));
      }
    }
    async function getSiteNameList() {
      setSiteNameList((p) => ({ ...p, loading: true }));
      try {
        const res = await axios.get(`${window.MyApiRoute}dealer/get`);
        // const res = await axios.get(`${window.MyApiRoute}sites`);

        setSiteNameList((p) => ({
          ...p,
          details: res.data.details || [],
          //  details: res.data.data || [],
          error: "",
        }));
      } catch (error) {
        setSiteNameList((p) => ({
          ...p,
          error: error?.response?.data?.message || error.message,
        }));
      } finally {
        setSiteNameList((p) => ({ ...p, loading: false }));
      }
    }

    getEngineerList();
    getSiteNameList();
    // call api to get att the site name
  }, []);
  //console.log("siteName" , siteNameList)

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        `${window.MyApiRoute}record/update?check=createEngineerTemp`,
        {
          ...a.data,
          ...values,
        }
      );
      setLoading(false);
      await api();
      setModal(!modal);
    } catch (error) {
      alert("This is working this is vey good");
      setLoading(false);
      alert(
        error?.response?.data?.message || error?.message || "Some Error Ocuured"
      );
    }
  };

  useEffect(() => {
    if (!values.productType) return;
    async function getProductList() {
      setProductList((p) => ({ ...p, loading: true }));
      try {
        // /record/get?category=modem&location=inStore
        const res = await axios.post(
          `${window.MyApiRoute}record/get?category=${values.productType}&location=inStore`,
          {
            ...a.data,
          }
        );
        setProductList((p) => ({
          ...p,
          details: res.data.Data || [],
          error: "",
        }));
      } catch (error) {
        setProductList((p) => ({
          ...p,
          details: [],
          error: error?.response?.data?.message || error.message,
        }));
      } finally {
        setProductList((p) => ({ ...p, loading: false }));
      }
    }
    getProductList();
  }, [values.productType]);

  const onChange = (name, value) => {
    // call the api for getting the productSerial number list
    if (name === "productType") {
      setValues((p) => ({ ...p, productSrNo: "", [name]: value }));
      return;
    }
    setValues((p) => ({ ...p, [name]: value }));
  };

  const handleChange = (f) => {
    setValues((prevValues) => {
      if (f) {
        return {
          ...prevValues,
          engineerId: f.Employee_Id,
          engineerName: f.Name,
        };
      } else {
        return {
          ...prevValues,
          engineerId: "",
          engineerName: "",
        };
      }
    });
  };

  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: 500 }}
        id="alert-dialog-title"
      >
        Send To Engineer Returnable
      </DialogTitle>
      <DialogContent className="space-y-4 flex flex-col w-[500px]">
        {/* <div className="flex gap-x-4 pt-2"> */}
        {engineer.loading ? (
          <p className="text-center">Loading...</p>
        ) : engineer.error ? (
          <p className="text-center">{engineer.error}</p>
        ) : (
          <Autocomplete
            className="flex-1 mt-2"
            onChange={(e, f) => handleChange(f)}
            options={engineer.details}
            getOptionLabel={(option) =>
              `${option.Name.toUpperCase()}, ID: ${option?.Employee_Id}`
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Engineer Name" />
            )}
          />
        )}
        <FormControl className="flex-1">
          <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // disabled={loading}
            value={values.productType}
            name="productType"
            label="Product Type"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          >
            {ProductList.map((item) => (
              <MenuItem key={item[0]} value={item[1]}>
                {item[0]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* </div> */}
        {siteNameList.loading ? (
          <p className="text-center">Loading...</p>
        ) : siteNameList.error ? (
          <p className="text-center">{siteNameList.error}</p>
        ) : (
          <Autocomplete
            onChange={(e, f) => onChange("SiteName", f)}
            // onClick={(e, f) => console.log(e, f)}
            sx={{ marginTop: 3 }}
            label="Site Name"
            name="SiteName"
            options={siteNameList.details.map(
              (option) => option.name.toUpperCase() || ""
            )}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Site Name"
                label="Select Site Name"
              />
            )}
          />
        )}

        {/* when the product is already on dealer  */}
        {productList.loading ? (
          <p className="text-center">Loading...</p>
        ) : productList.error ? (
          <p className="text-center">{productList.error}</p>
        ) : (
          <Autocomplete
            onChange={(e, f) => onChange("productSrNo", f)}
            // onClick={(e, f) => console.log(e, f)}
            sx={{ marginTop: 3 }}
            multiple
            filterSelectedOptions
            label="Select Product Sr No"
            name="productSrNo"
            options={productList.details.map(
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
        )}
        <TextField
          onChange={(e) => onChange("remark", e.target.value)}
          label="Remark"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button
          // disabled={loading}
          variant="contained"
          onClick={(e) => handleSubmit()}
          color="success"
          disabled={loading}
        >
          {loading ? "Submitting" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
