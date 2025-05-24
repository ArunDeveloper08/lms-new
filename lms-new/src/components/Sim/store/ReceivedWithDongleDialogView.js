import Drawer from '@mui/material/Drawer';
import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { Badge, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { debounce } from 'lodash';
import SendIcon from '@mui/icons-material/Send';
import  secureLocalStorage  from  "react-secure-storage";
// import { useState } from 'react';
import RecievedWithDongleDialog from './RecievedWithDongleDialog';


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

export default function ReceivedWithDongleDialogView ({ checked }) {
    const [ state, setState ] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [ isOpen, setIsOpen ] = useState(false)
    const a = JSON.parse(secureLocalStorage.getItem("info")).data;

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [ anchor ]: open });
    };
    const list = (anchor) => (
        <>
            <Box
                sx={ { width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 } }
                role="presentation"
                onClick={ toggleDrawer(anchor, false) }
                onKeyDown={ toggleDrawer(anchor, false) }
            >
                <TableContainer sx={ { maxHeight: "67vh", paddingY: 0 } } component={ Paper }>
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow>
                                <StyledTableCell sx={ { padding: 0 } } align="center">Sim No.</StyledTableCell>
                                <StyledTableCell sx={ { paddingX: 0 } } align="center">IMEI No.</StyledTableCell>
                                <StyledTableCell sx={ { paddingX: 0 } } align="center">Dongle Serial Number </StyledTableCell>
                                <StyledTableCell sx={ { paddingX: 0 } } align="center">SSID</StyledTableCell>
                                <StyledTableCell sx={ { paddingX: 0 } } align="center">Remark</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { checked?.map((c, b) => {
                                const logs = JSON.parse(c.ActivityLog);
                                {/* console.log(logs) */ }
                                return <StyledTableRow >
                                    <StyledTableCell align="center">{ c.PhoneNumber ?? "-" }</StyledTableCell>
                                    <StyledTableCell align="center">{ c.IMEI ?? "-" }</StyledTableCell>
                                    <StyledTableCell align="center">{ c.Dongle_Serial_Number ?? "-" }</StyledTableCell>
                                    <StyledTableCell align="center">{ c.SSID ?? "-" }</StyledTableCell>
                                    <StyledTableCell align="center">{
                                        logs.map(log => (
                                            <p className='flex space-x-5'><span>Date:{ log.date }</span><span>Remark:{ log.remark }</span></p>
                                        ))
                                    }</StyledTableCell>
                                </StyledTableRow>
                            }) }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <button onClick={ () => setIsOpen(true) } className='w-fit fixed bg-blue-500 text-md text-white px-5 py-2 rounded-md bottom-10 right-10'>Send To Site</button>
            <RecievedWithDongleDialog setIsOpen={ setIsOpen } isOpen={ isOpen } c={ checked } />
        </>
    );

    return (
        <div>
            {/* { [ 'bottom' ].map((anchor) => (
                <React.Fragment className="text" key={ anchor }> */}
            {/* <button onClick={ toggleDrawer("bottom", true) }>Bottom</button>
            <Drawer
                anchor={ "bottom" }
                open={ state[ "bottom" ] }
                onClose={ toggleDrawer("bottom", false) }
            >
                { list("bottom") }
            </Drawer> */}
            { checked.length ? <p onClick={ toggleDrawer("bottom", true) } className='fixed cursor-pointer bottom-10 right-10 '>
                <Badge color='primary'>
                    <SendIcon sx={ { color: "#1976d2", fontSize: 40 } } />
                </Badge>
            </p> : "" }
            <Drawer
                anchor={ "bottom" }
                open={ state[ "bottom" ] }
                onClose={ toggleDrawer("bottom", false) }
            >
                { list("bottom") }
            </Drawer>
            {/* </React.Fragment> */ }
            {/* )) } */ }
        </div>
    );
}