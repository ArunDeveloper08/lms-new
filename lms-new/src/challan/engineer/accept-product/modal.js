import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCountAsync } from "../../../redux/actions";

const RemarkModal = ({ modal:modalProps, setModal:setModalProps, setSelectedRows,query, getProducts: api }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const dispatch = useDispatch();
  // console.log({ open });
  const handleClose = () => {
    if (loading) return;
    setModalProps({ ...modalProps, open: false });
  };


  const handleSubmit = () => {
    setLoading(true);
    console.log({
      sim: modalProps.data,
      remark: title,
      ...modalProps.userInfo,
    });
    axios
      .put(
        window.MyApiRoute +
          "record/update?category=" +
          query +
          "&check=toRecieve" 
        ,
        { sim: modalProps.data, remark: title, ...modalProps.userInfo }
      )
      .then((res) => {
      
        alert(res.data.message);
      })
      .catch((err) => {
        alert("Error", err);
        console.log(err);
      })
      .finally(() => {
        setModalProps((p) => ({ ...p, open: false }));
        setSelectedRows([]);
        api();
        dispatch(getTotalCountAsync(selectedItem));
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const modalHeading = {
    unapproved: "Approved / Recieved",
    pending: "Pending To Recieve",
  };
  return (
    <Dialog
      open={modalProps.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
        id="alert-dialog-title"
      >
       Pending To Recieve
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleChange}
          sx={{ marginTop: 3 }}
          fullWidth
          multiline
          disabled={loading}
          rows={4}
          label="Add Your Remark"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Submitting" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemarkModal;
