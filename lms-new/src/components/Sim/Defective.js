import axios from 'axios'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
const Defective = () => {
    const info = JSON.parse(secureLocalStorage.getItem("info"));
    console.log(info);
    const api = () => axios.post(window.MyApiRoute + "sim/get?check=rejected", { ...info.data })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    useEffect(() => {
        api();
    }, [])
    return (
        <TableContainer sx={ { maxHeight: "67vh", paddingY: 0 } } component={ Paper }>
            <Table aria-label="customized table">
                <TableHead >
                    <TableRow>
                        <StyledTableCell sx={ { padding: 0 } } align="center">Options</StyledTableCell>
                        <StyledTableCell sx={ { padding: 0 } } align="center">Sim No.</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">IMEI No.</StyledTableCell>
                        {/* <StyledTableCell sx={ { paddingX: 0 } } align="center">Issued By Store </StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Sim Created On</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Dongle Serial No.</StyledTableCell> */}
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">SSID</StyledTableCell>
                        {/* <StyledTableCell sx={ { paddingX: 0 } } align="center">Dongle Engg. Name</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Dongle Date</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Received in Store</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Issued To Site</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Issued On</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Installed By Engg.</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Challan No.</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Approved By Crm</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Engineer Remark</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Verified By Crm</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">First Meter Id.</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Last Meter Id.</StyledTableCell>
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Sim Status</StyledTableCell> */}
                        <StyledTableCell sx={ { paddingX: 0 } } align="center">Activity Log</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* <StyledTableRow>
                        <StyledTableCell align="center">{ a.PhoneNumber ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.IMEI ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Sim_CreatedBy ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Sim_CreatedOn ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Dongle_Serial_Number ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.SSID ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Dongle_CreatedBy ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Dongle_CreatedOn ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Recieved_In_Store ? "Recieved" : "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Site_Name ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Issued_Date }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Engineer_Name ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Challan_No ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Approved_By_Crm ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Engineer_Remarks ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">{ a.First_Meter_Id ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">{ a.Last_Meter_Id ?? "-" }</StyledTableCell>
                        <StyledTableCell align="center">Hello</StyledTableCell>
                        <StyledTableCell align="center">{ a.Sim_Remarks ?? "-" }</StyledTableCell>
                    </StyledTableRow> */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Defective