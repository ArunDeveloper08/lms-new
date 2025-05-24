import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReturnSimDialog = ({ returnSim, setReturnSim }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [IMEI, setIMEI] = useState([]);
  const [remark, setRemark] = useState("");
  const [site, setSite] = useState([]);
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;

  const handleClose = () => {
    setReturnSim(false);
  };
  const handleSelectSite = (e, f) => {
    // if (f === null) return;
    setLoading(true);
    imeiList(f);
  };
  const handleSubmit = () => {
    axios
      .put(window.MyApiRoute + "sim/update?check=return", {
        ...a,
        IMEI: title,
        remark: remark,
      })
      .then((res) => {
        return alert("SuccessFully Done !!");
        // console.log(res.data)
      })
      .catch((err) => console.log(err));
  };
  const imeiList = (f) =>
    axios
      .post(window.MyApiRoute + "sim/get?check=usedOnSite", {
        ...a,
        Site_Name: f,
      })
      .then((res) => {
        console.log(res.data.ImeiNumber);
        setLoading(false);
        setIMEI(res.data.ImeiNumber);
      })
      .catch((err) => setLoading(false));
  useEffect(() => {
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        return setSite(res.data.data), console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Dialog
      open={returnSim}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle fontWeight={600} align="center">
        Return Sim To Store
      </DialogTitle>
      <DialogContent sx={{ paddingTop: 5, width: 500 }}>
        <div className="w-fit mb-5 mx-auto">
          {site && (
            <Autocomplete
              onChange={(e, f) => handleSelectSite(e, f)}
              // onChange={(e, f) => setTitle(f)}
              sx={{ width: 300, paddingTop: 2 }}
              options={site?.map((option) => option?.SiteName)}
              renderInput={(params) => (
                <TextField {...params} label="Site Name" />
              )}
            />
          )}
          {loading && <p>Loading...</p>}
          {IMEI?.length > 0 && (
            <>
              <Autocomplete
                onChange={(e, f) => setTitle(f)}
                sx={{ width: 300, paddingY: 2 }}
                options={IMEI?.map((option) => option?.IMEI)}
                renderInput={(params) => <TextField {...params} label="IMEI" />}
              />
              <textarea
                onChange={(e) => setRemark(e.target.value)}
                rows={4}
                className="focus:outline-[1px] border-[1px] border-black w-full p-3"
                placeholder="Remark"
              />
            </>
          )}
        </div>
        <DialogActions>
          <Button
            disabled={title === "" && remark === "" && true}
            onClick={handleSubmit}
            variant="contained"
          >
            Send
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnSimDialog;
