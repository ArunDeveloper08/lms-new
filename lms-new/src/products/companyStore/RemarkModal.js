// import React, { useEffect, useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import  secureLocalStorage  from  "react-secure-storage";

// import {
//   Autocomplete,
//   Button,
//   DialogActions,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { getTotalCountAsync } from "../../redux/actions";
// const RemarkModal = ({ modal, setModal, checked, api, setChecked }) => {
//   const [loading, setLoading] = useState();
//   const [moreDetails, setMoreDetails] = useState({
//     IssueForSite: "",
//     IssueForEngineer: "",
//     remark: "",
//   });
//   const [site, setSite] = useState([]);
//   const [engineer, setEngineer] = useState([]);
//   const dispatch = useDispatch();
//   const siteList = () =>
//     axios
//       .get(window.MyApiRoute + "sites")
//       .then((res) => {
//         return setSite(res.data.data);
//         // , console.log(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   const engineerList = () =>
//     axios
//       .get(`${window.MyApiRoute}employee/names`)
//       .then((res) => {
//         setEngineer(res.data.data);
//         console.log("Engineer", res.data.data);
//       })
//       .catch((err) => console.log({ err }));
//   console.log({ type: modal.type });
//   const [challanType, setChallanType] = useState("");
//   const { selectedItem } = useSelector((state) => state.itemReducer);
//   const handleClose = () => {
//     if (loading) return;
//     setModal({
//       open: false,
//       type: "",
//     });
//   };

//   const handleSubmit = () => {
//     setLoading(true);
//     const info = JSON.parse(secureLocalStorage.getItem("info")).data;

//     let route;
//     if (modal.type === "production") {
//       route = "toProduction";
//     } else if (modal.type === "siteStore") {
//       route = "toSite";
//     } else if (modal.type === "reject") {
//       route = "rejected";
//     } else if (modal.type === "defect") {
//       route = "defective";
//     } else if (modal.type === "dealer") {
//       route = "dealer";
//     }
//     axios
//       .put(
//         window.MyApiRoute +
//           "record/update?category=" +
//           selectedItem +
//           "&check=" +
//           route,
//         {
//           sim: checked,
//           challanType,
//           ...moreDetails,
//           ...info,
//         }
//       )
//       .then(
//         (res) => (
//           console.log(res.data), api(), setChecked([]), alert(res.data.message)
//         )
//       )
//       .catch((err) => {
//         console.log(err.response.data.message);
//         alert("Error - " + err.response.data.message);
//       })
//       .finally(() => {
//         setLoading(false);
//         dispatch(getTotalCountAsync(selectedItem));
//         setModal({
//           open: false,
//           type: "",
//         });
//       });
//   };
//   const handleChange = (e) => {
//     setMoreDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };
//   useEffect(() => {
//     siteList();
//     engineerList();
//   }, []);
//   const handleSelect = (a, b) => {
//     setMoreDetails((p) => ({ ...p, [a]: b }));
//   };
//   return (
//     <Dialog
//       open={modal.open}
//       onClose={handleClose}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description"
//     >
//       <DialogTitle
//         sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
//         id="alert-dialog-title"
//       >
//         {`Send To
//         ${modal.type === "production" ? "Production" : ""}
//         ${modal.type === "toRecieve" ? "Store" : ""}
//         ${modal.type === "defect" ? "Defected" : ""}
//         ${modal.type === "siteStore" ? "Site Store" : ""}
//         ${modal.type === "reject" ? "Rejected" : ""}
//         ${modal.type === "dealer" ? "Dealer" : ""}`}
//       </DialogTitle>
//       <DialogContent>
//         {modal.type === "production" && (
//           <select
//             disabled={loading}
//             onChange={(a) => setChallanType(a.target.value)}
//             className="border-[1px] border-black p-2 text-center mx-auto rounded-md w-full"
//           >
//             <option value="">Select Challan type</option>
//             <option value="internalreturnanleOutwardChallan">
//               Internal returnanle Outward Challan
//             </option>
//             <option value="nonReturnableMaterialOutGatepass">
//               Non Returnable Material Out Gatepass
//             </option>
//             <option value="thirdPartyreturnableoutwardChallan">
//               Third Party returnable outward Challan
//             </option>
//             <option value="thirdPartyreturnableInwardChallan">
//               Third Party returnable Inward Challan
//             </option>
//           </select>
//         )}
//         {modal.type === "siteStore" && site.length !== 0 && (
//           <div className="flex justify-between gap-x-5 pt-2">
//             <Autocomplete
//               disabled={loading}
//               onChange={(e, f) => handleSelect("IssueForEngineer", f)}
//               className="flex-1"
//               name="IssueForEngineer"
//               options={engineer?.map((option) => option?.Name)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Select Engineer Name" />
//               )}
//             />
//             <Autocomplete
//               disabled={loading}
//               onChange={(e, f) => handleSelect("IssueForSite", f)}
//               className="flex-1"
//               name="IssueForSite"
//               options={site?.map((option) => option?.SiteName)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Select SiteName" />
//               )}
//             />
//           </div>
//         )}
//         <TextField
//           onChange={handleChange}
//           sx={{ marginTop: 3 }}
//           fullWidth
//           multiline
//           disabled={loading}
//           name="remark"
//           rows={4}
//           label="Add Your Remark"
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button
//           disabled={loading}
//           variant="contained"
//           color="success"
//           onClick={handleSubmit}
//         >
//           {loading ? "Submitting" : "Submit"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default RemarkModal;

// {
//   /* <Autocomplete
// onChange={(e, f) => handleSelect("SiteName", f)}
// fullWidth
// // freesolo
// className="pt-3"
// name="SiteName"
// // value={ data.Site_Name }
// options={site?.map((option) => option?.SiteName)}
// renderInput={(params) => <TextField {...params} label="Site" />}
// /> */
// }
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import secureLocalStorage from "react-secure-storage";

import {
  Autocomplete,
  Button,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCountAsync } from "../../redux/actions";
const RemarkModal = ({
  modal,
  setModal,
  checked,
  api,
  setChecked,
  setOpen,
  setBadgeCount,
}) => {
  const [loading, setLoading] = useState();
  const [moreDetails, setMoreDetails] = useState({
    IssueForSite: "",
    IssueForEngineer: "",
    remark: "",
  });
  const [engineerData, setEngineerData] = useState({});
  const [site, setSite] = useState([]);
  const [engineer, setEngineer] = useState([]);
  const dispatch = useDispatch();
  const siteList = async () => {
    try {
      const [sitesResponse, dealersResponse] = await Promise.all([
        axios.get(window.MyApiRoute + "sites"),
        axios.get(window.MyApiRoute + "dealer/get"),
      ]);

      const sitesData = sitesResponse.data.data;
      const dealersData = dealersResponse.data.details;
      const siteNames = dealersData.map((dealer) => {
        return { SiteName: dealer.name };
      });
      console.log([...sitesData, ...siteNames]);
      // Merge data and set in setSite
      setSite({
        isShown: true,
        sites: [...sitesData, ...siteNames],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const engineerList = () =>
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => {
        setEngineer(res.data.data);
        console.log("Engineer", res.data.data);
      })
      .catch((err) => console.log({ err }));
  const [challanType, setChallanType] = useState("");
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const handleClose = () => {
    if (loading) return;
    setModal({
      open: false,
      type: "",
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    const info = JSON.parse(secureLocalStorage.getItem("info")).data;
    let route;
    if (modal.type === "production") {
      route = "toProduction";
    } else if (modal.type === "siteStore") {
      route = "toSite";
    } else if (modal.type === "reject") {
      route = "storeToRejected";
    } else if (modal.type === "defect") {
      route = "defective";
    } else if (modal.type === "dealer") {
      route = "dealer";
    } else if (modal.type === "thirdParty") {
      route = "thirdPartyQue";
    }

    
    axios
      .put(
        window.MyApiRoute +
          "record/update?category=" +
          selectedItem +
          "&check=" +
          route,
        {
          sim: checked,
          challanType,
          ...moreDetails,
          ...info,
          engineerData: engineerData,
        }
      )
      .then((res) => {
        // console.log(res.data);
    
        setChecked([]);
        alert(res.data.message);
        api();
        setModal({
          open: false,
          type: "",
        });
        setOpen(false);
        setBadgeCount(0);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert("Error - " + err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        dispatch(getTotalCountAsync(selectedItem));
        setModal({
          open: false,
          type: "",
        });
      });
  };
  const handleChange = (e) => {
    setMoreDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    engineerList();
    // if (modal.type === "thirdParty") {
    //   getSitesandDealers();
    // } else {
    siteList();
    // }
  }, [modal.type]);
  const handleSelect = (a, b) => {
    console.log("b", b);
    console.log("a", a);
    setMoreDetails((p) => ({ ...p, [a]: b }));
  };

  
  const getSitesandDealers = async () => {
    setSite((p) => ({ ...p, loading: true }));
    const responses = await axios.all([
      axios.get(window.MyApiRoute + "sites"),
      axios.get(window.MyApiRoute + "dealer/get"),
    ]);
    let siteNames = responses[0].data.data.map((single) => ({
      siteName: single.SiteName,
    }));
    let dealerNames = responses[1].data.details.map((single) => ({
      siteName: `ID ${single.ID} , Name: ${single.name}`,
    }));
    setSite((p) => ({
      ...p,
      loading: false,
      data: [...siteNames, ...dealerNames],
    }));
    console.log(siteNames, dealerNames);
  };
  // console.log(site);
  const handleSelects = (fieldName, selectedOption) => {
    setEngineerData(selectedOption);
  };
  return (
    <Dialog
      open={modal.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ width: 500, textAlign: "center", fontWeight: 500 , display:"flex", justifyContent:"space-around"}}
        id="alert-dialog-title"
      >
      <p className="font-semibold">  {`Send To
        ${modal.type === "production" ? "Production" : ""}
        ${modal.type === "toRecieve" ? "Store" : ""}
        ${modal.type === "defect" ? "Defected" : ""}
        ${modal.type === "siteStore" ? "Site Store" : ""}
        ${modal.type === "reject" ? "Rejected" : ""}
        ${modal.type === "dealer" ? "Dealer" : ""}
        ${modal.type === "thirdParty" ? "Third Party" : ""}`} </p>
       <p className="font-semibold">{selectedItem}</p> 
      </DialogTitle>
   

      <DialogContent>
        <div >
        Product Sr. No. {checked?.map((item) => item.Meter_Serial_No).join(', ')}
        </div>
    
        {modal.type === "production" && (
          <select
            disabled={loading}
            onChange={(a) => setChallanType(a.target.value)}
            className="border-[1px] border-black p-2 text-center mx-auto rounded-md w-full"
          >
            <option value="">Select Challan type</option>
            <option value="internalreturnanleOutwardChallan">
              Internal returnanle Outward Challan
            </option>
            <option value="nonReturnableMaterialOutGatepass">
              Non Returnable Material Out Gatepass
            </option>
            <option value="thirdPartyreturnableoutwardChallan">
              Third Party returnable outward Challan
            </option>
            <option value="thirdPartyreturnableInwardChallan">
              Third Party returnable Inward Challan
            </option>
          </select>
        )}
        {modal.type === "siteStore" && site.length !== 0 && (
          <div className="flex justify-between gap-x-5 pt-2">
            <Autocomplete
              disabled={loading}
              onChange={(e, selectedOption) =>
                handleSelects("IssueForEngineer", selectedOption)
              }
              className="flex-1"
              name="IssueForEngineer"
              options={engineer || []}
              getOptionLabel={(option) => option.Name}
              renderInput={(params) => (
                <TextField {...params} label="Select Engineer Name" />
              )}
            />

            <Autocomplete
              disabled={loading}
              onChange={(e, f) => handleSelect("IssueForSite", f)}
              className="flex-1"
              name="IssueForSite"
              options={site?.sites?.map((option) => option?.SiteName)}
              renderInput={(params) => (
                <TextField {...params} label="Select SiteName" />
              )}
            />
          </div>
        )}
        {modal.type === "thirdParty" && site.length !== 0 && (
          // <Autocomplete
          //   onChange={(e, f) => handleSelect("SiteName", f)}
          //   fullWidth
          //   // freesolo
          //   className="pt-3"
          //   name="SiteName"
          //   // value={ data.Site_Name }
          //   options={site?.data?.map((option) => option?.SiteName)}
          //   renderInput={(params) => <TextField {...params} label="Site" />}
          // />
          <Autocomplete
            disabled={loading}
            onChange={(e, f) => handleSelect("IssueForSite", f)}
            className="flex-1"
            name="IssueForSite"
            options={site.sites?.map((option) => option?.SiteName)}
            renderInput={(params) => (
              <TextField {...params} label="Select SiteName" />
            )}
          />
        )}
        <TextField
          onChange={handleChange}
          sx={{ marginTop: 3 }}
          fullWidth
          multiline
          disabled={loading}
          name="remark"
          rows={4}
          label="Add Your Remark"
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          {loading ? "Submitting" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemarkModal;

{
  /* <Autocomplete
onChange={(e, f) => handleSelect("SiteName", f)}
fullWidth
// freesolo
className="pt-3"
name="SiteName"
// value={ data.Site_Name }
options={site?.map((option) => option?.SiteName)}
renderInput={(params) => <TextField {...params} label="Site" />}
/> */
}

// It will be used for the third party -- Returnable because returnable can be given to the sitename and to the dealer

// const getSitesandDealers = async () => {
//   setSitename(p => ({ ...p, loading: true }));
//   const responses = await axios.all([
//     axios.get(window.MyApiRoute + "sites"),
//     axios.get(window.MyApiRoute + 'dealer/get')
//   ]);
//   let siteNames = responses[0].data.data.map(single => ({
//     siteName: single.SiteName
//   }));
//   let dealerNames = responses[1].data.details.map(single => ({
//     siteName: `ID ${single.ID} , Name: ${single.name}`
//   }));
//   setSitename(p => ({ ...p, loading: false, data: [...siteNames, ...dealerNames] }));
//   console.log(siteNames, dealerNames);
// };
