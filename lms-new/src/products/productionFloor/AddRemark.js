import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCountAsync } from "../../redux/actions";
import  secureLocalStorage  from  "react-secure-storage";
const AddRemark = ({
  openRemark,
  setOpenRemark,
  api,
  checkedItems,
  setCheckedItems,
  setOpen,
}) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const info = JSON.parse(secureLocalStorage.getItem("info")).data;
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const isStoreKeeper = info.Designation === "storekeeper";
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenRemark((p) => ({ ...p, open: false }));
  };
  const handleSubmit = (e) => {
    setLoading(true);
    // console.log({
    //   remark: title,
    //   sim: checkedItems,
    //   ...info,
    // });
    axios
      .put(
        window.MyApiRoute +
          "record/update?category=" +
          selectedItem +
          "&check=productionToStore",
        {
          remark: title,
          sim: checkedItems,
          ...info,
        }
      )
      .then((res) => {
        // console.log(res.data);
        alert(res.data.message);
      })
      .catch((err) => alert("Error: " + err.message))
      .finally(() => {
        api();
        setOpenRemark((p) => ({ ...p, open: false }));
        setOpen((p) => ({ ...p, open: false }));
        setCheckedItems([]);
        setLoading(false);
        dispatch(getTotalCountAsync(selectedItem));
      });
  };

  return (
    <Dialog
      open={openRemark.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
        id="alert-dialog-title"
      >
        {isStoreKeeper ? "Recieve In Store " : "Add Remark"}
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginTop: 3 }}
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

export default AddRemark;
