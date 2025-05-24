import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import RemarkModal from "./RemarkModal";
import ThirdPartyModal from "./third-party-non-ret-modal";
import ThirdPartyReturnModal from "./third-party-ret-modal";
const MainModal = ({
  open,
  setOpen,
  checked,
  api,
  setChecked,
  setBadgeCount,
}) => {
  const [modal, setModal] = useState({
    open: false,
    type: "",
  });

  const [partyModal, setPartyModal] = useState({
    open: false,
    data: checked,
  });

  const [partyReturnModal, setPartyReturnModal] = useState({
    open: false,
    data: checked,
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenRemark = (type) => {
    setModal({
      open: true,
      type,
    });
  };
  useEffect(() => {
    setPartyModal((p) => ({ ...p, data: checked }));
  }, [checked]);
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div className="flex flex-col space-y-10 py-5">
              {/* <Button
                variant="contained"
                onClick={() => handleOpenRemark("production")}
                color="primary"
              >
                Send To Production Floor
              </Button> */}
              {/* <Button
                variant="contained"
                onClick={() => handleOpenRemark("siteStore")}
                color="primary"
              >
                Engineer Returnable Challan
              </Button> */}

              {/* button for send third Party Returnable or Non-returnable  product for third party */}

              {/* <Button
                variant="contained"
                onClick={() =>
                  setPartyReturnModal((p) => ({
                    ...p,
                    open: true,
                    data: [...checked],
                  }))
                }
                color="primary"
              >
                Third Party Returnable
              </Button> */}

              {/* <Button
                variant="contained"
                onClick={() => setPartyModal((p) => ({ ...p, open: true }))}
                color="primary"
              >
                Third Party Non-Returnable (sale)
              </Button> */}

              <Button
                variant="contained"
                onClick={() => handleOpenRemark("reject")}
                color="primary"
              >
                Send To Rejected
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenRemark("defect")}
                color="primary"
              >
                Send To Production (Defected)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <RemarkModal
        setChecked={setChecked}
        checked={checked}
        api={api}
        modal={modal}
        setModal={setModal}
        setOpen={setOpen}
        setBadgeCount={setBadgeCount}
      />
      {partyModal.open && (
        <ThirdPartyModal
          api={api}
          setPartyModal={setPartyModal}
          partyModal={partyModal}
          setOpen={setOpen}
          setBadgeCount={setBadgeCount}
          setChecked={setChecked}
        />
      )}

      {partyReturnModal.open && (
        <ThirdPartyReturnModal
          api={api}
          setPartyReturnModal={setPartyReturnModal}
          partyReturnModal={partyReturnModal}
          setOpen={setOpen}
          setBadgeCount={setBadgeCount}
          setChecked={setChecked}
        />
      )}
    </>
  );
};

export default MainModal;
