import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import  secureLocalStorage  from  "react-secure-storage";

const IssueDialog = ({ open, setOpen }) => {
    const a = JSON.parse(secureLocalStorage.getItem("info"));
    const [ site, setSite ] = useState([]);
    const [ arr, setArr ] = useState([]);
    const [ input, setInput ] = useState({
        Site_Name: "",
        Engineer_Name: "",
        Challan_No: "",
        Approved_By_Crm: ""
    })
    const handleClose = () => {
        setOpen({ ...open, open: false });
    };
    useEffect(() => {
        axios.get(window.MyApiRoute + "sites")
            .then(res => {
                return (
                    setSite(res.data.data),
                    console.log(res.data.data)
                )
            }).catch(err => alert(err.response.data.message));
        axios
            .get(`${ window.MyApiRoute }employee/names`)
            .then((res) => {
                setArr(res.data.data);
                console.log(res.data)
            })
            .catch((err) => (
                console.log({ err }),
                alert(err.response.data.message)
            ));
    }, [])
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: "200px",
            },
        },
    };
    const handleChange = (e) => {
        setInput({ ...input, [ e.target.name ]: e.target.value });
    }
    const handleSubmit = () => {
        // console.log({ open })
        // console.log({ input })
        // console.log({ a })
        axios.put(window.MyApiRoute + "sim/update", { ...open.value, ...input, ...a.data })
            .then(res => {
                console.log(res.data);
                setOpen({ ...open, open: false });
            })
            .catch(err => (
                console.log({ err }),
                alert(err.response.data.message)
            ));
    }
    console.log(open)
    return (
        <div>
            <Dialog open={ open.open } onClose={ handleClose }>
                <DialogTitle sx={ { fontSize: 20 } } textAlign="center">Issue Sim To a Field Engineer</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <Box className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormControl>
                            <InputLabel >Site Name</InputLabel>
                            <Select
                                label="Site Name"
                                name="Site_Name"
                                variant="filled"
                                MenuProps={ MenuProps }
                                onChange={ handleChange }
                                sx={ { paddingY: 0 } }
                            >
                                {
                                    site.length && site.map((a, b) => {
                                        return <MenuItem key={ b } value={ a.SiteName }>{ a.SiteName }</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl >
                            <InputLabel >Engineer Name</InputLabel>
                            <Select
                                name="Engineer_Name"
                                MenuProps={ MenuProps }
                                onChange={ handleChange }
                                variant='filled'
                            >
                                { arr.length &&
                                    arr?.map((item, index) => {
                                        return (
                                            <MenuItem key={ index } value={ item.Name }>
                                                { item.Name }
                                            </MenuItem>
                                        );
                                    }) }
                            </Select>
                        </FormControl>
                        <TextField
                            label="Approved By CRM"
                            name="Approved_By_Crm"
                            type="text"
                            fullWidth
                            onChange={ handleChange }
                            variant="filled"
                        />
                        <TextField
                            name="Challan_No"
                            label="Challan No."
                            type="text"
                            fullWidth
                            onChange={ handleChange }
                            variant="filled"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={ handleClose }>No, Cancel</Button>
                    <Button variant='contained' color='success' onClick={ handleSubmit }>Ok, Issue </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default IssueDialog