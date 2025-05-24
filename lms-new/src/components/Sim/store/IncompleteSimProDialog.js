import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, DialogActions, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";
const IncompleteSimProDialog = ({ proDialog, setProDialog, checked, setRefresh, setChecked }) => {
    const [ title, setTitle ] = useState("")

    const handleClose = () => {
        setProDialog(false);
    };
    const handleSubmit = () => {
        const info = JSON.parse(secureLocalStorage.getItem("info")).data;
        axios.put(window.MyApiRoute + "sim/update?check=toProduction", { sim: checked, remark: title, ...info }).then(res => (
           
            setRefresh(prev => prev + 1),
            setChecked([]),
            alert(res.data.message)
        )).catch(err => alert("Error", err.message))
        setProDialog(false);
    }
    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    return (
        <Dialog
            open={ proDialog }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={ { width: 500, textAlign: "center", fontWeight: 500 } } id="alert-dialog-title">
                { "Send To Production " }
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

export default IncompleteSimProDialog