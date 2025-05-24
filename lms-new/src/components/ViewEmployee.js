import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditPeopleDialog from "./EditPeopleDialog";
import axios from "axios";
import {useEffect} from "react";
import  secureLocalStorage  from  "react-secure-storage";
const StyledTableCell=styled(TableCell)(({theme}) => ({
    [ `&.${tableCellClasses.head}` ]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [ `&.${tableCellClasses.body}` ]: {
        fontSize: 14,
    },
}));

const StyledTableRow=styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#b80f768f",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const ViewEmployee=() => {
    const [ open, setOpen ]=useState({
        value: false,
        data: null,
    });
    const [ users, setUsers ]=useState(false);
    const handleClickOpen=(event, item) => {
        console.log("item", item);
        setOpen({
            value: true,
            data: item
        });
    };

    const api=() => {
        axios.get(window.MyApiRoute+"employee/all")
            .then(res => {
                setUsers(res.data.data);
                console.log(res.data.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        api();
    }, [])
    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    stickyHeader
                    // sx={{width: "1500px"}}
                    aria-label="customized table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{paddingY: 1}} align="center">
                                Options
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 150, padding: "3px"}}
                                align="center"
                            >
                                Employee Name
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 100, padding: "3px"}}
                                align="center"
                            >
                                Employee ID
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 100, padding: "3px"}}
                                align="center"
                            >
                                Password
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 100, padding: "3px"}}
                                align="center"
                            >
                                Designation
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 50, padding: "3px"}}
                                align="center"
                            >
                                Mobile Number
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 100, padding: "3px"}}
                                align="center"
                            >
                                Employee Active Status
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 100, padding: "3px"}}
                                align="center"
                            >
                                Admin
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 100, padding: "3px"}}
                                align="center"
                            >
                                Created At
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{minWidth: 100, padding: "3px"}}
                                align="center"
                            >
                                Updated At
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users&&users.map((item, index) => {
                                const date=new Date(item.createdAt);
                                const date2=new Date(item.updatedAt);
                                const formattedDate=date.toLocaleString("en-GB"); // '08/04/2023'
                                const formattedDate2=date2.toLocaleString("en-GB"); // '08/04/2023'
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell onClick={(event) => handleClickOpen(event, item)} sx={{paddingY: 1, cursor: "pointer", color: "#9100ff"}} align="center">
                                            Edit
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {item.Name}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {item.Employee_Id}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {item.Password}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {item.Designation}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {item.MobileNo}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {item.Employee_Active_Status? "True":"False"}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {item.isAdmin? "True":"False"}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {formattedDate}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{padding: 0, }} align="center">
                                            {formattedDate2}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                open.data&&
                <EditPeopleDialog open={open} setOpen={setOpen} api1={api} />
            }
        </>
    )
}

export default ViewEmployee;