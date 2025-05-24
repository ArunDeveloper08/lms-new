import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import RemarkModal from "./RemarkModal1";
const MainModal1 = ({ open, setOpen, api }) => {
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setOpen({
      ...open,
      open: false,
    });
  };
  const handleOpenRemark = (type) => {
    setOpen({
      ...open,
      to: type,
    });
    setModal(true);
  };
  return (
    <>
      <div>
        <Dialog
          open={open.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div className="flex flex-col space-y-10 py-5">
              {open.from !== "" && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenRemark("toRecieve")}
                  color="primary"
                >
                  Recieve in Store
                </Button>
              )}
              {open.from !== "production" && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenRemark("toProduction")}
                  color="primary"
                >
                  Send To Production Floor
                </Button>
              )}
              {!(open.from === "siteStore" || open.from === "production") && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenRemark("toSite")}
                  color="primary"
                >
                  Send To Site Store
                </Button>
              )}
              {open.from !== "rejected" && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenRemark("rejected")}
                  color="primary"
                >
                  Send To Rejected
                </Button>
              )}
              {open.from !== "defective" && (
                <Button
                  variant="contained"
                  onClick={() => handleOpenRemark("defective")}
                  color="primary"
                >
                  Send To Defected
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <RemarkModal open={open} api={api} modal={modal} setModal={setModal} />
    </>
  );
};

export default MainModal1;
