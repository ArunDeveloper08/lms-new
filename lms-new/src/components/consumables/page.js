import { Button } from "@mui/material";
import React, { useState } from "react";
import AddModal from "./add-modal";
import Table from "./table";

const Consumables = () => {
  const [modal, setModal] = useState({
    open: false,
    data: "",
  });
  return (
    <div>
      <p>Consumables</p>
      <Button
        onClick={() => setModal((p) => ({ ...p, open: !p.open }))}
        variant="contained"
        size="small">
        Add New Product
      </Button>
      <AddModal setModal={setModal} modal={modal} />
      <Table />
    </div>
  );
};

export default Consumables;
