import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { ProductList } from "../constants/ProductList";
import {
  Autocomplete,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";

import axios from "axios";
import { mainRoute } from "../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ReturnOtherProduct = ({ otherProduct, setOtherProduct }) => {
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [siteName, setSiteName] = useState([]);
  const [productsOnSite, setProductsOnSite] = useState(undefined);
  const navigate = useNavigate();

  const [productsOnSiteRepair, setProductsOnSiteRepair] = useState([]);
  const [productsOnSiteInstalled, setProductsOnSiteInstalled] = useState([]);
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;

  const [product, setProduct] = useState({
    productName: "",
    SiteName: "",
    Meter_Serial_No: "",
    remark: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOtherProduct(false);
  };

  useEffect(() => {
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        setSiteName(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (product.SiteName && product.productName) {
      axios
        .post(
          window.MyApiRoute +
            `record/get?category=${product.productName}&check=repair`,
          { Site: product.SiteName, ...a }
        )
        .then((res) => {
          setProductsOnSiteRepair(res.data.Data);
        })
        .catch((err) => console.log(err));
    }
  }, [product.SiteName, product.productName]);

  useEffect(() => {
    if (product.SiteName && product.productName) {
      axios
        .post(
          window.MyApiRoute +
            `record/get?category=${product.productName}&location=installed`,
          { Site: product.SiteName, ...a }
        )
        .then((res) => {
          setProductsOnSiteInstalled(res.data.Data);
        })
        .catch((err) => console.log(err));
    }
  }, [product.SiteName, product.productName]);

  const handleSubmit = () => {
    setLoading(true);
    axios
      .put(
        window.MyApiRoute +
          `record/update?category=${product.productName}&check=repair`,
        {
          ...userInfo,
          remark: product.remark,
          product: product.productName,
          site: product.SiteName,
          Meter_Serial_No: product.Meter_Serial_No,
        }
      )
      .then((res) => {
        alert(`Challan Number is : ${res.data.challaNumber}`);
        setLoading(false);
        setOtherProduct(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      <Dialog
        open={otherProduct}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent sx={{ paddingTop: 5 }}>
          <div className="">
            <Autocomplete
              onChange={(e, f) => handleChange("productName", f)}
              fullWidth
              style={{ width: 300, margin: "0 auto" }}
              options={ProductList.map((option) => option[1])}
              renderInput={(params) => (
                <TextField {...params} label="Select Product" />
              )}
            />
          </div>

          {product.productName && siteName.length && (
            <Autocomplete
              onChange={(e, f) => handleChange("SiteName", f)}
              sx={{ width: 300, paddingTop: 4, margin: "0 auto" }}
              options={siteName?.map((option) => option?.SiteName)}
              renderInput={(params) => (
                <TextField {...params} label="Site Name" />
              )}
            />
          )}

          {product.productName && siteName.length && (
            <Autocomplete
              onChange={(e, f) => handleChange("Meter_Serial_No", f)}
              sx={{ width: 300, paddingTop: 4, margin: "0 auto" }}
              options={[
                ...(productsOnSiteRepair ?? []).map(
                  (option) => option?.Meter_Serial_No
                ),
                ...(productsOnSiteInstalled ?? []).map(
                  (option) => option?.Meter_Serial_No
                ),
              ]}
              renderInput={(params) => (
                <TextField {...params} label="Serial No." />
              )}
              isOptionEqualToValue={(option, value) => option === value}
              multiple // Enable multiple selection
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <span key={index} {...getTagProps({ index })}>
                    {option}
                  </span>
                ))
              }
            />
          )}

          {product.productName &&
            product.SiteName &&
            product.Meter_Serial_No && (
              <textarea
                onChange={(e) => handleChange("remark", e.target.value)}
                rows={4}
                className="focus:outline-[1px] border-[1px] border-black w-full p-3 mt-10"
                placeholder="Remark"
              />
            )}
          <DialogActions>
            <Button
              disabled={
                !product.productName ||
                !product.SiteName ||
                !product.Meter_Serial_No ||
                !product.remark ||
                loading
              }
              onClick={handleSubmit}
              sx={{ margin: "10px auto" }}
              variant="contained"
              style={{ margin: "auto" }}
            >
              Send
            </Button>
          </DialogActions>
          <DialogActions>
            <p className="text-zinc-500 text-sm pt-2 text-center">
              If not found in the list, Please add it.
            </p>
            <div className="text-right">
              <Button
                onClick={() => navigate(`${mainRoute}/installOtherProduct`)}
                variant="outlined"
              >
                Add New
              </Button>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReturnOtherProduct;
