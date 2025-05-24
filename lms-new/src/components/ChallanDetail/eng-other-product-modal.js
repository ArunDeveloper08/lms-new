// import React, { useEffect, useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import {
//   Autocomplete,
//   Button,
//   DialogActions,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import secureLocalStorage from "react-secure-storage";
// const EngOtherProductModal = ({
//   modal,
//   setModal,
//   setChallanProducts,
//   selectedRows,
//   setSelectedRows,
// }) => {
//   const [otherSerialNumber, setOtherSerialNumber] = useState("");
//   const [serialNo, setSerialNo] = useState([]);
//   const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
//   const handleClose = () => {
//     setModal({ ...modal, open: false });
//     // navigate(0);
//   };
//   const handleSubmit = () => {
//     // console.log(modal.data);
//     // setChallanProducts(p => {
//     //     console.log(p.Products);
//     //     return p;
//     // });
//     setChallanProducts((p) => {
//       return {
//         ...p,
//         Products: p.Products.map((product) => {
//           if (product.id === modal.data.id) {
//             return {
//               ...product,
//               otherProductSrNo: otherSerialNumber,
//             };
//           }
//           return product;
//         }),
//       };
//     });
//     setSelectedRows((p) => {
//       return [
//         ...p.map((product) => {
//           if (product.id === modal.data.id) {
//             return {
//               ...product,
//               otherProductSrNo: otherSerialNumber,
//             };
//           }
//           return product;
//         }),
//       ];
//     });
//     setModal({ ...modal, open: false, data: {} });
//   };
//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.post(
//         `${window.MyApiRoute}record/get?location=onSite&category=${modal.data?.productType}`,
//         userInfo
//       );
//       const { data: data2 } = await axios.post(
//         `${window.MyApiRoute}record/get?location=installed&category=${modal.data?.productType}`,
//         userInfo
//       );
//       setSerialNo([...data.Data, ...(data2.Data ?? [])]);
//       // console.log("hehe", [...data.Data, ...(data2.Data ?? [])]);
//     })();
//     // axios
//     //     .post(
//     //         `${window.MyApiRoute}record/get?location=siteStore&category=${modal.data?.productType}`,
//     //         userInfo
//     //     )
//     //     .then((res) => {
//     //         console.log("res", res.data);
//     //         setSerialNo(res.data?.Data);
//     //     })
//     //     .catch((error) => {
//     //         console.log("err", error);
//     //     });
//   }, [modal.data.productType]);
//   const handleSelect = (key, value) => {
//     setOtherSerialNumber(value);
//   };
//   return (
//     <Dialog
//       open={modal.open}
//       onClose={handleClose}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description">
//       <DialogTitle
//         className="w-[380px] md:w-[500px]"
//         // sx={{ width: 300, textAlign: "center", fontWeight: 500 }}
//         id="alert-dialog-title">
//         Other Product Serial No.
//       </DialogTitle>
//       <DialogContent>
//         <Autocomplete
//           fullWidth
//           // freeSolo     -- removing this line (1)
//           onChange={(e, f) => handleSelect("Meter_Serial_No", f)}
//           options={serialNo?.map((option) => option?.Meter_Serial_No || "")}
//           renderInput={(params) => (
//             <TextField
//               // onChange={(e, f) =>
//               //   handleSelect("Meter_Serial_No", e.target.value) --  removing this line (1)
//               // }
//               {...params}
//               label="Product Serial No"
//             />
//           )}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button variant="contained" color="success" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EngOtherProductModal;
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {
  Autocomplete,
  Button,
  TextField,
  CircularProgress,
  Typography,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const EngOtherProductModal = ({
  modal,
  setModal,
  setChallanProducts,
  selectedRows,
  setSelectedRows,
}) => {
  // State for the selected/input serial number
  const [otherSerialNumber, setOtherSerialNumber] = useState("");
  // State for serial numbers fetched from API
  const [serialNo, setSerialNo] = useState([]);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for API error
  const [error, setError] = useState(null);
  // Cache for API results to avoid redundant calls
  const [serialNoCache, setSerialNoCache] = useState({});

  // Memoize userInfo to ensure stable reference
  const userInfo = useMemo(() => {
    try {
      return JSON.parse(secureLocalStorage.getItem("info") || "{}")?.data || {};
    } catch (err) {
      console.error("Error parsing userInfo:", err);
      return {};
    }
  }, []);

  // Handle modal close
  const handleClose = useCallback(() => {
    setModal({ ...modal, open: false, data: {} });
    setOtherSerialNumber("");
    setError(null);
  }, [setModal, modal]);

  // Handle form submission
  const handleSubmit = useCallback(() => {
    if (!otherSerialNumber) {
      alert("Please select a serial number.");
      return;
    }

    // Update challan products
    setChallanProducts((prev) => ({
      ...prev,
      Products: prev.Products.map((product) =>
        product.id === modal.data.id
          ? { ...product, otherProductSrNo: otherSerialNumber }
          : product
      ),
    }));

    // Update selected rows
    setSelectedRows((prev) =>
      prev.map((product) =>
        product.id === modal.data.id
          ? { ...product, otherProductSrNo: otherSerialNumber }
          : product
      )
    );

    handleClose();
  }, [otherSerialNumber, modal.data.id, setChallanProducts, setSelectedRows, handleClose]);

  // Fetch serial numbers when productType changes
  useEffect(() => {
    if (!modal.open || !modal.data?.productType) {
      setSerialNo([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const productType = modal.data.productType;

    const fetchSerialNumbers = async () => {
      // Check cache first
      if (serialNoCache[productType]) {
        console.log(`Using cached serial numbers for ${productType}`);
        setSerialNo(serialNoCache[productType]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      // Configure axios with timeout
      const axiosInstance = axios.create({
        timeout: 10000, // 10-second timeout
      });

      try {
        console.log("Fetching serial numbers for productType:", productType);
        console.log("UserInfo:", userInfo);

        const [onSiteResponse, installedResponse] = await Promise.all([
          axiosInstance.post(
            `${window.MyApiRoute}record/get?location=onSite&category=${productType}`,
            userInfo
          ),
          axiosInstance.post(
            `${window.MyApiRoute}record/get?location=installed&category=${productType}`,
            userInfo
          ),
        ]);

        const combinedData = [
          ...(onSiteResponse.data?.Data || []).filter(
            (item) => item?.Meter_Serial_No
          ),
          ...(installedResponse.data?.Data || []).filter(
            (item) => item?.Meter_Serial_No
          ),
        ];

        console.log("Combined serial numbers:", combinedData);
        setSerialNo(combinedData);
        // Cache the result
        setSerialNoCache((prev) => ({ ...prev, [productType]: combinedData }));
      } catch (error) {
        console.error("Error fetching serial numbers:", error);
        setError("Failed to load serial numbers. Please try again.");
        setSerialNo([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSerialNumbers();
  }, [modal.open, modal.data?.productType, userInfo]);

  return (
    <Dialog
      open={modal.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: 500, textAlign: "center" }}
      >
        Select Product Serial Number
      </DialogTitle>
      <DialogContent>
        {error ? (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                setSerialNoCache((prev) => ({
                  ...prev,
                  [modal.data.productType]: undefined,
                }));
                // Call fetchSerialNumbers to retry
                const fetchSerialNumbers = async () => {
                  setIsLoading(true);
                  setError(null);
                  const axiosInstance = axios.create({
                    timeout: 10000,
                  });
                  try {
                    const [onSiteResponse, installedResponse] = await Promise.all([
                      axiosInstance.post(
                        `${window.MyApiRoute}record/get?location=onSite&category=${modal.data.productType}`,
                        userInfo
                      ),
                      axiosInstance.post(
                        `${window.MyApiRoute}record/get?location=installed&category=${modal.data.productType}`,
                        userInfo
                      ),
                    ]);
                    const combinedData = [
                      ...(onSiteResponse.data?.Data || []).filter(
                        (item) => item?.Meter_Serial_No
                      ),
                      ...(installedResponse.data?.Data || []).filter(
                        (item) => item?.Meter_Serial_No
                      ),
                    ];
                    setSerialNo(combinedData);
                    setSerialNoCache((prev) => ({ ...prev, [modal.data.productType]: combinedData }));
                  } catch (error) {
                    console.error("Error fetching serial numbers:", error);
                    setError("Failed to load serial numbers. Please try again.");
                    setSerialNo([]);
                  } finally {
                    setIsLoading(false);
                  }
                };
                fetchSerialNumbers();
              }}
              sx={{ ml: 1 }}
            >
              Retry
            </Button>
          </Typography>
        ) : null}
        <Autocomplete
          fullWidth
          value={otherSerialNumber}
          onChange={(event, newValue) => {
            setOtherSerialNumber(newValue || "");
          }}
          inputValue={otherSerialNumber}
          onInputChange={(event, newInputValue) => {
            setOtherSerialNumber(newInputValue);
          }}
          options={serialNo.map((option) => option?.Meter_Serial_No || "")}
          getOptionLabel={(option) => option || ""}
          isOptionEqualToValue={(option, value) =>
            option.toLowerCase().trim() === value.toLowerCase().trim()
          }
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase().trim())
            )
          }
          renderOption={(props, option) => (
            <ListItem
              {...props}
              sx={{
                backgroundColor:
                  option.toLowerCase().trim() ===
                  otherSerialNumber.toLowerCase().trim()
                    ? "#e8eaf6" // Light indigo background
                    : "transparent",
                fontWeight:
                  option.toLowerCase().trim() ===
                  otherSerialNumber.toLowerCase().trim()
                    ? 700
                    : 400,
                color:
                  option.toLowerCase().trim() ===
                  otherSerialNumber.toLowerCase().trim()
                    ? "#1a237e" // Dark indigo
                    : "inherit",
                "&:hover": {
                  backgroundColor:
                    option.toLowerCase().trim() ===
                    otherSerialNumber.toLowerCase().trim()
                      ? "#d1d9ff" // Slightly darker on hover
                      : "#f5f5f5",
                },
              }}
            >
              <ListItemText primary={option} />
            </ListItem>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product Serial No"
              variant="outlined"
              placeholder={
                isLoading ? "Loading serial numbers..." : "Select or type serial number"
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={isLoading || !otherSerialNumber}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EngOtherProductModal;