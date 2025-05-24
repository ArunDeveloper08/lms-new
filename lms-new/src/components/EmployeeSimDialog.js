// // import React, { useState } from "react";
// // import Button from "@mui/material/Button";
// // import Dialog from "@mui/material/Dialog";
// // import DialogActions from "@mui/material/DialogActions";
// // import DialogContent from "@mui/material/DialogContent";
// // import DialogContentText from "@mui/material/DialogContentText";
// // import DialogTitle from "@mui/material/DialogTitle";
// // import Slide from "@mui/material/Slide";
// // import { useNavigate } from "react-router-dom";
// // import ReturnSimDialog from "./ReturnSimDialog";
// // import ReturnOtherProduct from "./ReturnOtherProduct";

// // const Transition = React.forwardRef(function Transition(props, ref) {
// //   return <Slide direction="up" ref={ref} {...props} />;
// // });

// // const EmployeeSimDialog = ({ setOpenSimDialog, openSimDialog }) => {
// //   const [returnSim, setReturnSim] = useState(false);
// //   const [otherProduct, setOtherProduct] = useState(false);
// //   const navigate = useNavigate();
// //   // const handleClickOpen = () => {
// //   //     setOpenSimDialog(true);
// //   // };
// //   const handleClose = () => {
// //     setOpenSimDialog(false);
// //   };
// //   return (
// //     <div>
// //       <Dialog
// //         open={openSimDialog}
// //         TransitionComponent={Transition}
// //         keepMounted
// //         onClose={handleClose}
// //         aria-describedby="alert-dialog-slide-description"
// //       >
// //         <DialogContent className="flex flex-col space-y-10">
// //           <Button onClick={() => navigate("/installsim")} variant="contained">
// //             New Sim Install
// //           </Button>
// //           <Button
// //             onClick={() => navigate("/installOtherProduct")}
// //             variant="contained"
// //           >
// //             Install Other Product
// //           </Button>
// //           <Button onClick={() => setReturnSim(true)} variant="contained">
// //             Return Sim
// //           </Button>
// //           <Button onClick={() => setOtherProduct(true)} variant="contained">
// //             Return Other Product
// //           </Button>
// //         </DialogContent>
// //       </Dialog>
// //       <ReturnSimDialog returnSim={returnSim} setReturnSim={setReturnSim} />
// //       <ReturnOtherProduct
// //         otherProduct={otherProduct}
// //         setOtherProduct={setOtherProduct}
// //       />
// //     </div>
// //   );
// // };

// // export default EmployeeSimDialog;

// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Slide from "@mui/material/Slide";
// import { useNavigate } from "react-router-dom";
// import ReturnSimDialog from "./ReturnSimDialog";
// import ReturnOtherProduct from "./ReturnOtherProduct";
// import secureLocalStorage from "react-secure-storage";
// import { mainRoute } from "../App";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const EmployeeSimDialog = ({ setOpenSimDialog, openSimDialog }) => {
//   const [returnSim, setReturnSim] = useState(false);
//   const [otherProduct, setOtherProduct] = useState(false);
//   const navigate = useNavigate();

//   const handleClose = () => {
//     setOpenSimDialog(false);
//   };
//   const handleNavigate = () => {
//     navigate(`${mainRoute}/engineerreturnproduct`);
//   };
//   return (
//     <div>
   
//       <Dialog
//         open={openSimDialog}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogContent className="flex flex-col space-y-10">
//           <Button onClick={() => navigate(`${mainRoute}/installsim`)} variant="contained">
//             New Sim Install
//           </Button>
//           <Button onClick={() => setReturnSim(true)} variant="contained">
//             Return Sim
//           </Button>
//           <Button
//             onClick={() => navigate(`${mainRoute}/installOtherProduct`)}
//             variant="contained"
//           >
//             Install Other Product
//           </Button>
         
//           <Button onClick={handleNavigate} variant="contained">
//            Store Challan Returnable
//           </Button>
//           <Button onClick={() => setOtherProduct(true)} variant="contained">
//           Engineer Challan Returnable
//           </Button>
//         </DialogContent>
//       </Dialog>
//       <ReturnSimDialog returnSim={returnSim} setReturnSim={setReturnSim} />
//       <ReturnOtherProduct
//         otherProduct={otherProduct}
//         setOtherProduct={setOtherProduct}
//       />
//     </div>
//   );
// };

// export default EmployeeSimDialog;
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import ReturnSimDialog from "./ReturnSimDialog";
import ReturnOtherProduct from "./ReturnOtherProduct";
import secureLocalStorage from "react-secure-storage";
import { mainRoute } from "../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeSimDialog = ({ setOpenSimDialog, openSimDialog }) => {
  const [returnSim, setReturnSim] = useState(false);
  const [otherProduct, setOtherProduct] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenSimDialog(false);
  };

  const handleNavigate = () => {
    navigate(`${mainRoute}/engineerreturnproduct`);
  };

  return (
    <div>
      <Dialog
        open={openSimDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <IconButton
         
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 6,
              top: 0,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="flex flex-col space-y-10">
          <Button
            onClick={() => navigate(`${mainRoute}/installsim`)}
            variant="contained"
          >
            New Sim Install
          </Button>
          <Button onClick={() => setReturnSim(true)} variant="contained">
            Return Sim
          </Button>
          <Button
            onClick={() => navigate(`${mainRoute}/installOtherProduct`)}
            variant="contained"
          >
            Install Other Product
          </Button>
          <Button onClick={handleNavigate} variant="contained">
            Store Challan Returnable
          </Button>
          <Button onClick={() => setOtherProduct(true)} variant="contained">
            Engineer Challan Returnable
          </Button>
        </DialogContent>
      </Dialog>
      <ReturnSimDialog returnSim={returnSim} setReturnSim={setReturnSim} />
      <ReturnOtherProduct
        otherProduct={otherProduct}
        setOtherProduct={setOtherProduct}
      />
    </div>
  );
};

export default EmployeeSimDialog;