import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddRemark from "./AddRemark";
const SelectFlag = ({
  api,
  setOpen,
  openFlag,
  setOpenFlag,
  checkedItems,
  setCheckedItems,
}) => {
  const [openAddRemark, setOpenAddRemark] = useState(false);
  const [from, setFrom] = useState("");
  const handleClose = () => {
    setOpenFlag(false);
  };
  const handleOpenRemark = (type) => {
    setOpenAddRemark(true);
    setFrom(type);
    //   setOpen({
    //     ...open,
    //     to: type,
    //   });
    //   setModal(true);
  };
  return (
    <>
      <div>
        <Dialog
          open={openFlag}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 5,
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleOpenRemark("toRecieve")}
              color="primary"
            >
              Recieve in Store
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenRemark("rejected")}
              color="primary"
            >
              Send To Rejected
            </Button>
            <Button
              variant="contained"
              onClick={() => handleOpenRemark("defective")}
              color="primary"
            >
              Send To Defected
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <AddRemark
        api={api}
        setOpenFlag={setOpenFlag}
        checkedItems={checkedItems}
        from={from}
        setOpen={setOpen}
        setFrom={setFrom}
        setCheckedItems={setCheckedItems}
        setOpenAddRemark={setOpenAddRemark}
        openAddRemark={openAddRemark}
      />
      {/* <RemarkModal open={open} api={api} modal={modal} setModal={setModal} /> */}
    </>
  );
};

export default SelectFlag;
