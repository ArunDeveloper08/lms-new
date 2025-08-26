import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { mainRoute } from "../App";


const Text = styled(Typography)`
  font-size: 19px;
  color: #042637;
  font-weight: 500;
  margin-top: 4px;
`;
const Texts = styled(Typography)`
  font-size: 19px;
`;

const DealerProductDetailModal = ({ open, setOpen, all }) => {
  const navigate = useNavigate();
//  console.log({ all, open });
  const handleClose = () => {
    setOpen(false);
  };
 

  const handlePDF = (item) => {
  //  console.log(item);
    navigate(
      `${mainRoute}/downloadDealerchallanpdf/${item.challanNumber}?type=externalNonReturnableChallan`
    );
  };
  return (
    <div>
      {all && (
        <>
        <Modal open={open} onClose={handleClose}>
        <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              border: "1px solid #042637",
              boxShadow: 24,
              p: 4,
              width: 550,
              height: 450,
              overflow: "scroll",
              overflowY: "auto",
            }}
          >
            <div>
              <Box className=" ">
                <Texts className="flex justify-center">
                  Name : {all[0]?.dealerDetails.name}
                </Texts>

                {all.map((item) => (
                  <Box>
                    <Box key={item.challanNumber} className="mt-4 ">
                      <Text>Challan No.: {item.challanNumber}</Text>
                      <p>Challan Date:{item.challanDate.slice(0, 10)}</p>

                      {item.products.map((product, productIndex) => (
                        <div key={productIndex}>
                          <p>Category: {product.category}</p>
                          <p>
                            Meter Serial No.:{" "}
                            {product?.product?.Meter_Serial_No}
                          </p>
                        </div>
                      ))}
                    </Box>
                    <Box>
                      <Button
                        onClick={() => handlePDF(item)}
                        sx={{ textTransform: "none" }}
                      >
                        Download
                      </Button>
                    </Box>
                    <hr />
                  </Box>
                ))}
              </Box>
            </div>
          </Box> 
        </Modal>
 
      </>
      )}
    </div>

  );
};

export default DealerProductDetailModal;


