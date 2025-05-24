import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, DialogActions, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";
const IncompleteRejectDialog = ({ setRefresh, rejectDialog, setRejectDialog, checked, setChecked }) => {
    const [ title, setTitle ] = useState("")
    const handleClose = () => {
        setRejectDialog(false);
    }
    const handleSubmit = () => {
        const info = JSON.parse(secureLocalStorage.getItem("info")).data;
        // console.log({ sim: checked, remark: title, ...info })
        // axios.put(window.MyApiRoute + "sim/update?check=toSiteStore", { sim: c, remark: title, ...info }).then(res => (
        //     console.log(res.data),
        //     alert(res.data.message)
        // )).catch(err => alert("Error", err.message))
        // setIsOpen(false);
        axios.put(window.MyApiRoute + "sim/update?check=toReject", { sim: checked, remark: title, ...info }).then(res => (
            // console.log(res.data),
            alert(res.data.message),
            setRefresh(prev => prev + 1),
            setRejectDialog(false),
            setChecked([])
        )).catch(err => (
            alert("Error", err.message),
            setRejectDialog(false)
        ))

    }
    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    return (
        <Dialog
            open={ rejectDialog }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={ { width: 500, textAlign: "center", fontWeight: 500 } } id="alert-dialog-title">
                { "Send To Site Store" }
            </DialogTitle>
            <DialogContent>
                <TextField
                    onChange={ handleChange }
                    sx={ { marginTop: 3 } }
                    fullWidth
                    multiline
                    rows={ 4 }
                    label="Add Your Remark"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color='success' onClick={ handleSubmit } >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default IncompleteRejectDialog;