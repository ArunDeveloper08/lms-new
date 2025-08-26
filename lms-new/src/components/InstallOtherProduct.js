// import { Autocomplete, TextField } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { ProductList } from "../constants/ProductList";
// import secureLocalStorage from "react-secure-storage";

// const InstallOtherProduct = () => {
//   const [dongleNumber, setDongleNumber] = useState([]);
//   const [site, setSite] = useState([]);

//   const [data, setData] = useState({
//     Site_Name: "",
//     Dongle_Serial_Number: "",
//     IMEI: "",
//     ModemMacNum1: "",
//     ModemMacNum2: "",
//     ModemMacNum3: "",
//     ModemMacNum4: "",
//     remark: "",
//   });
//   const userData = JSON.parse(secureLocalStorage.getItem("info"));
//   const Api = () => {
//     if (data.remark.trim() === "") {
//       return alert("Remark is Compulsary Please Enter your Remark");
//     } else if (
//       data.ModemMacNum1.trim() === "" &&
//       data.ModemMacNum2.trim() === "" &&
//       data.ModemMacNum3.trim() === "" &&
//       data.ModemMacNum4.trim() === ""
//     ) {
//       return alert("Please Enter atleast one Modem Detail");
//     } else if (data.Dongle_Serial_Number.trim() === "") {
//       return alert("Dongle Serial Number Is Mendatory");
//     } else if (data.IMEI.trim() === "") {
//       return alert("IMEI Number Is Mendatory");
//     } else if (data.Site_Name.trim() === "") {
//       return alert("Site Name Is Mendatory");
//     }
//     console.log({ data });
//     axios
//       .put(window.MyApiRoute + "sim/update?check=installNew", {
//         ...data,
//         Employee_Id: userData.data.Employee_Id,
//       })
//       .then((res) => {
//         console.log(res.data);
//         alert(res.data.message);
//       })
//       .catch((err) => {
//         alert(err.response.data.message);
//         console.log(err);
//       });
//   };

//   console.log({ data });
//   useEffect(() => {
//     // axios
//     //   .post(
//     //     window.MyApiRoute + "sim/get?check=issueWithoutDongle",
//     //     { Employee_Id: userData.data.Employee_Id }
//     //   )
//     //   .then((res) => setDongleNumber(res.data))
//     //   .catch((err) => console.log(err));
//     axios
//       .get(window.MyApiRoute + "sites")
//       .then((res) => {
//         return setSite(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   //    New Code Starts here
//   const a = JSON.parse(secureLocalStorage.getItem("info")).data;
//   const [onSiteProduct, setOnSiteProduct] = useState([]);
//   const [productName, setProductName] = useState("");

//   const initialInputs = {
//     Customer_Name: null,
//     Customer_Unique_Id: "",
//     Flat_No: null,
//     Meter_Serial_No: "",
//     Site_Name: null,
//   };
//   const [inputs, setinputs] = useState(initialInputs);
//   const handleChange = (e) => {
//     setinputs({ ...inputs, [e.target.name]: e.target.value });
//   };
//   const handleSelect = (a, b, c) => {
//     setinputs({ ...inputs, [a]: b });
//   };
//   useEffect(() => {
//     if (productName) {
//       getDetailsofProduct(productName);
//     } else {
//       setOnSiteProduct([]);
//     }
//   }, [productName]);

//   const getDetailsofProduct = (p_name) => {
//     setinputs(initialInputs);
//     setOnSiteProduct("");
//     axios
//       .post(
//         window.MyApiRoute + `record/get?category=${p_name}`,
//         a
//       )
//       .then((response) => setOnSiteProduct(response.data))
//       .catch((err) => console.log(err));
//   };
//   const handleSubmit = () => {
//     if (inputs.Site_Name === null || inputs.Site_Name === "") {
//       return alert(
//         "Please select Site Name, Meter Serial No, Customer Name,Meter_Id"
//       );
//     }
//     if (inputs.Meter_Serial_No === null || inputs.Meter_Serial_No === "") {
//       return alert(
//         "Please select Site Name, Meter Serial No, Customer Name,Meter_Id"
//       );
//     }
//     if (inputs.Customer_Name === null || inputs.Customer_Name.trim() === "") {
//       return alert(
//         "Please select Site Name, Meter Serial No, Customer Name,Meter_Id"
//       );
//     }
//     if (inputs.Meter_Id === null || inputs.Meter_Id.trim() === "") {
//       return alert(
//         "Please select Site Name, Meter Serial No, Customer Name,Meter_Id"
//       );
//     }
//     const isPresent = onSiteProduct.Data.some(
//       (item) => item.Meter_Serial_No === inputs.Meter_Serial_No
//     );
//     if (isPresent) {
//       console.log("Update old");
//       axios
//         .put(
//           window.MyApiRoute +
//             `record/update?category=${productName}`,
//           { ...inputs, ...a }
//         )
//         .then((response) => alert(response.data.message))
//         .catch((err) => alert(err.data.message));
//     } else {
//       console.log("Add New");
//       axios
//         .post(
//           window.MyApiRoute +
//             `record/add?category=${productName}`,
//           { ...inputs, ...a }
//         )
//         .then((response) => alert(response.data.message))
//         .catch((err) => alert(err.data.message));
//     }
//   };
//   console.log("onSiteProduct", onSiteProduct);
//   return (
//     <>
//       <p className="text-4xl text-center mb-10 font-semibold">
//         Install Product
//       </p>
//       <div className="w-4/5 mx-auto">
//         <div className="md:w-1/3 mb-3 md:mb-0 mx-auto">
//           {/* <Autocomplete
//             onChange={(e, f) => setProductName(f)}
//             fullWidth
//             // freesolo
//             //   value={data.Site_Name}
//             options={productsArray?.map((option) => option)}
//             renderInput={(params) => (
//               <TextField {...params} label="Select Product" />
//             )}
//           /> */}
//           <Autocomplete
//             onChange={(e, f) => {
//               if (f) {
//                 setProductName(f.value);
//               }
//             }}
//             fullWidth
//             options={ProductList?.slice(1)?.map((option) => ({
//               label: option[0],
//               value: option[1],
//             }))}
//             renderInput={(params) => (
//               <TextField {...params} label="Select Product" />
//             )}
//           />
//         </div>

//         <div className="md:grid grid-cols-1 flex flex-col md:grid-cols-2 md:w-3/4 mx-auto gap-y-5 gap-x-10 md:p-5">
//           <Autocomplete
//             onChange={(e, f) => handleSelect("Site_Name", f)}
//             fullWidth
//             // freesolo
//             // value={data.Site_Name}
//             options={site?.map((option) => option?.SiteName)}
//             renderInput={(params) => (
//               <TextField {...params} label="Site Name" />
//             )}
//           />
//           <Autocomplete
//             fullWidth
//             // value={data.IMEI}
//             freeSolo
//             onChange={(e, f) => handleSelect("Meter_Serial_No", f, e)}
//             options={onSiteProduct?.Data?.map(
//               (option) => option?.Meter_Serial_No
//             )}
//             renderInput={(params) => (
//               <TextField
//                 onChange={(e, f) =>
//                   handleSelect("Meter_Serial_No", e.target.value)
//                 }
//                 {...params}
//                 label="Product Serial No"
//               />
//             )}
//           />
//           <TextField
//             onChange={(e) => handleChange(e)}
//             fullWidth
//             label="Customer Unique Id"
//             name="Customer_Unique_Id"
//           />
//           <TextField
//             fullWidth
//             onChange={(e) => handleChange(e)}
//             label="Customer Name"
//             name="Customer_Name"
//           />
//           <TextField
//             onChange={(e) => handleChange(e)}
//             fullWidth
//             label="Flat"
//             name="Flat_No"
//           />
//           <TextField
//             onChange={(e) => handleChange(e)}
//             fullWidth
//             label="Product Id"
//             name="Meter_Id"
//           />
//           <div className="col-span-2 ">
//             <label className="pr-2">Remark</label>
//             <textarea
//               rows={4}
//               className="w-full border-2 border-gray-400 p-3 rounded-md"
//               name="remark"
//               placeholder="Enter Your Remark Here"
//               onChange={(e) => handleChange(e)}
//             />
//           </div>
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="mx-auto w-fit hover:bg-red-500 hover:scale-110 duration-500 block py-2 mt-10 px-10 bg-blue-500 text-white rounded"
//         >
//           Submit
//         </button>
//       </div>
//     </>
//   );
// };

// export default InstallOtherProduct;

import React, { useEffect, useState } from "react";
import { ProductList } from "../constants/ProductList";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { mainRoute } from "../App";



const InstallOtherProduct = () => {
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const navigate = useNavigate();
  const [site, setSite] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const [srNoList, setSrNoList] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const [formData, setFormData] = useState({
    Site_Name: "",
    Flat_No: "",
    Meter_Id: "",
    remark: "",
    productName: "",
    Customer_Unique_Id: "",
    Customer_Name: "",
    Meter_Serial_No: "",
    mac1: "",
    mac2: "",
    mac3: "",
    mac4: "",
  });
  const [loading, setLoading] = useState(false);
  const siteApi = async () => {
    try {
      setSite((p) => ({ ...p, loading: true }));
      const { data } = await axios.get(window.MyApiRoute + "sites");
      // console.log(data.data);
      setSite((p) => ({ ...p, loading: false, data: data.data }));
    } catch (error) {
      setSite((p) => ({
        ...p,
        loading: false,
        error: error?.response?.data?.message || error?.message,
      }));
    }
  };

  const getDetailsofProduct = async () => {
    try {
      setSrNoList((p) => ({ ...p, loading: true }));
      const { data } = await axios.post(
        window.MyApiRoute + `record/get?category=${formData.productName}`,
        a
      );
      // console.log(data);
      setSrNoList((p) => ({ ...p, loading: false, data: data.Data || [] }));
    } catch (error) {
      console.log(error?.response?.data?.message);
      setSrNoList((p) => ({
        ...p,
        loading: false,
        error: error?.response?.data?.message || error?.message,
      }));
    }
  };
  useEffect(() => {
    if (!site.data.length) {
      siteApi();
    }
    if (formData.productName) {
      getDetailsofProduct();
    }
  }, [formData.productName]);
  const onAutoCompleteChange = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
  };
  const handleChange = (event) => {
    setFormData((p) => ({ ...p, [event.target.name]: event.target.value }));
  };
  const handleSubmit = () => {
    if (formData.Site_Name === null || formData.Site_Name === "") {
      return alert(
        "Please select Site Name, Meter Serial No, Customer Name,Meter_Id"
      );
    }
    if (formData.Meter_Serial_No === null || formData.Meter_Serial_No === "") {
      return alert(
        "Please select Site Name, Meter Serial No, Customer Name,Meter_Id"
      );
    }
    if (
      formData.Customer_Name === null ||
      formData.Customer_Name.trim() === ""
    ) {
      return alert(
        "Please select Site Name, Meter Serial No, Customer Name,Meter_Id"
      );
    }
    if (formData.Meter_Id === null || formData.Meter_Id.trim() === "") {
      return alert(
        "Please select Site Name, Meter Serial No, Customer Name,Meter_Id"
      );
    }
    const isPresent = srNoList.data.some(
      (item) => item.Meter_Serial_No === formData.Meter_Serial_No
    );
    if (isPresent) {
    //  console.log("Update old");
      setLoading(true);
      axios
        .put(
          window.MyApiRoute + `record/update?category=${formData.productName}`,
          {
            ...formData,
            ...a,
          }
        )
        .then((response) => {
          alert(response.data.message);
          setLoading(false);
          navigate(`${mainRoute}/home`);
        })
        .catch((err) => alert(err.response.data.message));
    } else {
    //  console.log("Add New");
      setLoading(true);
      axios
        .post(
          window.MyApiRoute + `record/add?category=${formData.productName}`,
          {
            ...formData,
            ...a,
          }
        )
        .then((response) => {
          alert(response.data.message);
          setLoading(false);
          navigate(`${mainRoute}/home`);
        })
        .catch((err) => alert(err.response.data.message));
    }
  };
 
  return (
    <>
      <p className="text-4xl text-center mb-10 font-semibold">
        Install Product
      </p>
      <div className="w-4/5 mx-auto ">
        <div className="mb-14 grid gap-y-5 md:gap-x-10 grid-cols-1 md:grid-cols-2">

          <Autocomplete
            onChange={(e, f) => {
              onAutoCompleteChange("productName", f?.[1] ?? f);
            }}
            fullWidth
            options={ProductList?.slice(1)?.map((option) => option)}
            getOptionLabel={(option) => option[1]}
            renderInput={(params) => (
              <TextField {...params} label="Select Product" />
            )}
          />
          {formData.productName && (
            <>
              {site.loading ? (
                <p>Loading...</p>
              ) : site.error ? (
                <p>Error:{JSON.stringify(site.error)}</p>
              ) : (
                <Autocomplete
                  onChange={(e, f) => {
                    console.log(f);
                    onAutoCompleteChange("Site_Name", f?.SiteName ?? f);
                  }}
                  fullWidth
                  // className="col-span-2"
                  options={site.data.map((option) => option)}
                  getOptionLabel={(option) => option.SiteName}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Site" />
                  )}
                />
              )}
              {srNoList.loading ? (
                <p className="text-center">Loading...</p>
              ) : srNoList.error ? (
                <p>Error:{JSON.stringify(srNoList.error)}</p>
              ) : (
                <Autocomplete
                  onChange={(e, f) => {
                    onAutoCompleteChange(
                      "Meter_Serial_No",
                      f?.Meter_Serial_No ?? f
                    );
                  }}
                  fullWidth
                  freeSolo
                  // className="col-span-2"
                  options={srNoList.data.map((option) => option)}
                  getOptionLabel={(option) => option.Meter_Serial_No}
                  renderInput={(params) => (
                    <TextField
                      // type="number"
                      onChange={(e) =>
                        onAutoCompleteChange("Meter_Serial_No", e.target.value)
                      }
                      {...params}
                      label="Select Serial No."
                    />
                  )}
                />
              )}
              <TextField
                onChange={(e) => handleChange(e)}
                fullWidth
                label="Customer Unique Id"
                name="Customer_Unique_Id"
              />
              <TextField
                fullWidth
                onChange={(e) => handleChange(e)}
                label="Customer Name"
                name="Customer_Name"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                fullWidth
                label="Flat"
                name="Flat_No"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                fullWidth
                label="Product Id"
                name="Meter_Id"
              />
              {formData?.productName === "m2mSim" && (
                <>
                  <TextField
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    label="Mac No.1"
                    name="mac1"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    label="Mac No.2"
                    name="mac2"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    label="Mac No.3"
                    name="mac3"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    label="Mac No.4"
                    name="mac4"
                  />
                </>
              )}
              <div className="md:col-span-2 ">
                <label className="pr-2">Remark</label>
                <textarea
                  rows={4}
                  className="w-full border-2 border-gray-400 p-3 rounded-md"
                  name="remark"
                  placeholder="Enter Your Remark Here"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <Button
                onClick={handleSubmit}
                className="  md:col-span-2 "
                disabled={srNoList.loading || site.loading}
                variant="contained"
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InstallOtherProduct;
