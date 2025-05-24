// import React, { useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import {
//   Button,
//   DialogActions,
//   DialogContentText,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// const ProductionModal = ({ open1, setOpen1, api, selectedItem }) => {
//   const [title, setTitle] = useState("");
//   const info = JSON.parse(secureLocalStorage.getItem("info")).data;
//   const isStoreKeeper = info.Designation === "storekeeper";
//   const handleClose = () => {
//     setOpen1({ ...open1, open: false });
//   };
//   const handleSubmit = () => {
//     if (!isStoreKeeper) {
//       axios
//         .put(
//           window.MyApiRoute +
//             "record/update?category=" +
//             selectedItem,
//           {
//             remark: title,
//             ...open1.value,
//             ...info,
//           }
//         )
//         .then((res) => (console.log(res.data), api(), alert(res.data.message)))
//         .catch((err) => alert("Error", err.message));
//       setOpen1({ ...open1, open: false });
//     }
//   };
//   const handleChange = (e) => {
//     setTitle(e.target.value);
//   };
//   return (
//     <Dialog
//       open={open1.open}
//       onClose={handleClose}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description"
//     >
//       <DialogTitle
//         sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
//         id="alert-dialog-title"
//       >
//         {isStoreKeeper ? "Recieve In Store " : "Add Remark"}
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           onChange={handleChange}
//           sx={{ marginTop: 3 }}
//           fullWidth
//           multiline
//           rows={4}
//           label="Add Your Remark"
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

// export default ProductionModal;

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import  secureLocalStorage  from  "react-secure-storage";
import {
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getTotalCountAsync } from "../../redux/actions";

const ProductionModal = ({ open1, setOpen1, api, selectedItem }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const info = JSON.parse(secureLocalStorage.getItem("info")).data;
  const dispatch = useDispatch();
  const isStoreKeeper = info.Designation === "storekeeper";
  const handleClose = () => {
    if (loading) return;
    setOpen1({ ...open1, open: false });
  };
  const handleSubmit = () => {
    console.log({ open1 });
    setLoading(true);
    let from;
    if (open1.from === "defective") {
      from = "inProduction";
    } else if (open1.from === "production") {
      from = "inProduction";
    }
    axios
      .put(
        window.MyApiRoute +
          "record/update?category=" +
          selectedItem +
          "&check=" +
          from,
        {
          remark: title,
          sim: [open1.value],
          ...info,
        }
      )
      .then((res) => {
        console.log(res.data);
        api();
        alert(res.data.message);
      })
      .catch((err) => alert("Error: " + err.message))
      .finally(() => {
        setLoading(false);
        setOpen1({ ...open1, open: false });
        dispatch(getTotalCountAsync(selectedItem));
      });
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <Dialog
      open={open1.open}
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
          disabled={loading}
          onChange={handleChange}
          sx={{ marginTop: 3 }}
          fullWidth
          multiline
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductionModal;
