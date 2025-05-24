import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Autocomplete, Button, DialogActions, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const OtherProductModal = ({ modal, setModal, setChallanProducts, selectedRows, setSelectedRows }) => {
    const [otherSerialNumber, setOtherSerialNumber] = useState("");
    const [serialNo, setSerialNo] = useState([]);
    const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
    const navigate = useNavigate();
    const handleClose = () => {
        setModal({ ...modal, open: false });
        // navigate(0);

    };
    const handleSubmit = () => {
        // console.log(modal.data);
        // setChallanProducts(p => {
        //     console.log(p.Products);
        //     return p;
        // });
        setChallanProducts(p => {
            return {
                ...p,
                Products: p.Products.map(product => {
                    if (product.id === modal.data.id) {
                        return {
                            ...product,
                            otherProductSrNo: otherSerialNumber
                        };
                    }
                    return product;
                })
            };
        });
        setSelectedRows(p => {
            return [
                ...p.map(product => {
                    if (product.id === modal.data.id) {
                        return {
                            ...product,
                            otherProductSrNo: otherSerialNumber
                        };
                    }
                    return product;
                })
            ];
        });
        setModal({ ...modal, open: false, data: {} });
    };
    useEffect(() => {
        axios
            .post(
                `${window.MyApiRoute}record/get?location=inStore&category=${modal.data?.productType}`,
                userInfo
            )
            .then((res) => {
                console.log("res", res.data);
                setSerialNo(res.data?.Data);
            })
            .catch((error) => {
                console.log("err", error);
            });
    }, [modal.data.productType]);
    const handleSelect = (key, value) => {
        setOtherSerialNumber(value);
    };
    return (
        <Dialog
            open={modal.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
                id="alert-dialog-title"
            >
                Other Product Serial No.
            </DialogTitle>
            <DialogContent>
                {/* <TextField
                    sx={{ marginTop: 3 }}
                    fullWidth
                    onChange={(e) => setOtherSerialNumber(e.target.value)}
                    multiline
                    label="Other Product Serial Number."
                /> */}
                <Autocomplete
                    fullWidth
                    freeSolo
                    onChange={(e, f) => handleSelect("Meter_Serial_No", f)}
                    options={serialNo.map((option) => option.Meter_Serial_No || "" )}
                    renderInput={(params) => (
                        <TextField
                            onChange={(e, f) =>
                                handleSelect("Meter_Serial_No", e.target.value)
                            }
                            {...params}
                            label="Product Serial No"
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OtherProductModal;