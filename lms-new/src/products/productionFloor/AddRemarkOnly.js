import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";
import { useSelector } from "react-redux";

const AddRemarkOnly = ({
  setAddRemarkProps,
  addRemarkProps,
  api,
  // from,
  // setFrom,
  // setOpenAddRemark,
  // checkedItems,
  // openAddRemark,
  // setCheckedItems,
  // setOpenFlag,
  // setOpen,
  // singleItem,
  // setSingleItem,
}) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const info = JSON.parse(secureLocalStorage.getItem("info")).data;
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const handleSubmit = (e) => {
    // console.log({ addRemarkProps, title, info });
    setLoading(true);
    axios
      .put(
        window.MyApiRoute +
          "record/update?category=" +
          selectedItem +
          "&check=inProduction",
        {
          remark: title,
          sim: addRemarkProps.data,
          ...info,
          updateRemark: true,
        }
      )
      .then((res) => {
      
        alert(res.data.message);
      })
      .catch((err) => alert("Error: " + err.message))
      .finally(() => {
        setLoading(false);
        api();
        setAddRemarkProps((p) => ({ ...p, open: false }));
      });
  };
  const handleClose = () => {
    setAddRemarkProps((p) => ({ ...p, open: false }));
  };
  return (
    <Dialog
      open={addRemarkProps.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
        id="alert-dialog-title"
      >
        Add Remark
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginTop: 1 }}
          fullWidth
          multiline
          rows={4}
          label="Add Your Remark"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRemarkOnly;
