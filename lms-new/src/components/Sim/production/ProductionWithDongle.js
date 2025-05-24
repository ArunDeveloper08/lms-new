import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import IssueDialog from '../store/InStoreDialog';
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [ `&.${ tableCellClasses.head }` ]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [ `&.${ tableCellClasses.body }` ]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#b80f768f",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ProductionWithDongle = () => {
    const [ data, setData ] = useState({})
    const a = JSON.parse(secureLocalStorage.getItem("info"));
    const api = () => axios.post(window.MyApiRoute + "sim/get?check=withDongle", { ...a.data })
        .then(res => setData(res.data))
        .catch(err => console.log("err", err))

    // const handleSubmit = (data) => {
    //     console.log({ data })
    //     axios.put(window.MyApiRoute + "sim/update?check=toStore", { ...a.data, Dongle_Serial_Number: data })
    //         .then(res => {
    //             alert(res.data.message);
    //             api();
    //         })
    //         .catch(err => (
    //             console.log("err", err),
    //             alert("Something Error Occured")
    //         ))
    // }
    useEffect(() => {
        api();
    }, [])
    console.log({ data })
    return (
        <TableContainer component={ Paper }>
            <Table sx={ { minWidth: 700 } } aria-label="customized table">
                <TableHead >
                    <TableRow>
                        <StyledTableCell align='center' sx={ { padding: 0 } }>Mobile No.</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">IMEI No.</StyledTableCell>
                        {/* <StyledTableCell sx={ { paddingX: 0 } } align="center">Issued By Store Person</StyledTableCell> */ }
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Dongle Serial No.</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">SSID</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Remark</StyledTableCell>
                        {/* <StyledTableCell sx={ { paddingX: 0, width: "200px" } } align="center">Send To Store</StyledTableCell> */ }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data?.data && data.data.map((item, i) => {
                        const act = JSON.parse(item.ActivityLog);
                        console.log(JSON.parse(item.ActivityLog))
                        return <StyledTableRow key={ i }>
                            <StyledTableCell sx={ { paddingY: 1 } } align="center">{ item.PhoneNumber }</StyledTableCell>
                            <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.IMEI }</StyledTableCell>
                            {/* <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.Sim_CreatedBy }</StyledTableCell> */ }
                            <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.Dongle_Serial_Number }</StyledTableCell>
                            <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.SSID }</StyledTableCell>
                            <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{
                                act.map(sin => {
                                    return <p><span>Date:{ sin.date }</span> <span>Remark:{ sin.remark }</span></p>
                                })
                            }</StyledTableCell>
                            {/* <StyledTableCell sx={ { paddingY: 0.5 } } align="center"><Button sx={ { margin: 0.5 } } variant="contained" onClick={ () => handleSubmit(item.Dongle_Serial_Number) }>Send</Button>
                            </StyledTableCell> */}
                        </StyledTableRow>
                    }) }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductionWithDongle