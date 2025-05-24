import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";
const ProductionModal = ({ setOpen, open, api }) => {
    const [ data, setData ] = useState({
        Dongle_Serial_Number: Number,
        SSID: Number,
    })
    const handleClose = () => {
        setOpen({ ...open, value: false });
    };
    const handleChange = (e) => {
        setData({ ...data, [ e.target.name ]: e.target.value })
    }
    const a = JSON.parse(secureLocalStorage.getItem("info")).data;
    const handleSubmit = () => {
        axios.put(window.MyApiRoute + "sim/update?check=addDongle", { ...a, ...open.data, ...data })
            .then(res => (
                setOpen({ ...open, value: false }),
                alert(res.data.message),
                api()
            ))
            .catch(err => {
                setOpen({ ...open, value: false });
                // console.log(err.response.data.message);
                alert(err.response.data.message);
            })
    }
    return (
        <Dialog open={ open.value } onClose={ handleClose }>
            <DialogTitle textAlign="center">Add Dongle Number </DialogTitle>
            <DialogContent>
                <DialogContentText sx={ { width: "450px", marginBottom: 3, display: "flex", justifyContent: "space-around" } }>
                    <span>Sim No.: { open.data.PhoneNumber }</span>
                    <span> CIMIE No.:{ open.data.IMEI }</span>
                </DialogContentText>
                <Box className="space-y-5">
                    <TextField
                        fullWidth
                        name="Dongle_Serial_Number"
                        onChange={ handleChange }
                        margin="none"
                        label="Unique Dongle Number"
                        type="text"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        name="SSID"
                        onChange={ handleChange }
                        margin="none"
                        label="SSID"
                        type="text"
                        variant="outlined"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='error' onClick={ handleClose }>No, Cancel</Button>
                <Button variant='contained' onClick={ handleSubmit } color='success' >Ok, Submit </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProductionModal;