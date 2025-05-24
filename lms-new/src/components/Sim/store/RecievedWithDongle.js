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
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { debounce } from 'lodash';
import ReceivedWithDongleDialogView from './ReceivedWithDongleDialogView';
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
const RecievedWithDongle = () => {
    const [ all, setAll ] = useState([]);
    const [ data2, setData2 ] = useState([]);
    const [ filter, setFilter ] = useState({})
    const [ site, setSite ] = useState([]);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ single, setSingle ] = useState({});
    const [ checked, setChecked ] = useState([]);

    const a = JSON.parse(secureLocalStorage.getItem("info")).data;
    const api = () => axios.post(window.MyApiRoute + "sim/get?check=withDongleInStore", { ...a })
        .then(res => {
            console.log(res.data.data);
            setAll(res.data.data);
            setData2(res.data.data);
        })
        .catch(err => alert("Error", err.message))
    useEffect(() => {
        api();
        axios.get(window.MyApiRoute + "sites")
            .then(res => {
                return (
                    setSite(res.data.data),
                    console.log(res.data.data)
                )
            })
            .catch(err => console.log(err));
    }, [])
    useEffect(() => {
        const debouncedFilter = debounce(() => {
            if (filter?.Sim_Number?.trim() === "") {
                setData2(all);
            } else if (filter?.Sim_Number) {
                const newData = all.filter(item => String(item.PhoneNumber).toUpperCase().includes(filter.Sim_Number.trim().toUpperCase()));
                setData2(newData);
            } else if (filter?.IMEI_Number === "") {
                setData2(all);
            } else if (filter?.IMEI_Number) {
                const newData = all.filter(item => String(item.IMEI).includes(filter.IMEI_Number));
                setData2(newData);
            } else if (filter?.Site_Name === "") {
                setData2(all);
            } else if (filter?.Site_Name) {
                const newData = all.filter(item => String(item.Site_Name).includes(filter.Site_Name));
                setData2(newData);
            } else {
                setData2(all);
            }
        }, 0);

        debouncedFilter(); // Invoke the debounced function immediately after defining it

        return () => {
            debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
        };
    }, [ filter, all ])
    const handleFilterChange = (e) => {
        setFilter({ [ e.target.name ]: e.target.value })
    };
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: "200px",
            },
        },
    };
    const handleCheck = (e, item) => {
        const isChecked = e.target.checked;
        const newData = all.map((valItem) =>
            valItem.Sr_NO === item.Sr_NO ? { ...valItem, checked: isChecked } : valItem
        );
        setAll(newData);

        if (isChecked) {
            setChecked((prevChecked) => [ ...prevChecked, item ]);
        } else {
            setChecked((prevChecked) =>
                prevChecked.filter((checkedItem) => checkedItem.Sr_NO !== item.Sr_NO)
            );
        }
    };
    
    return (
        <>
            <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around pb-3'>
                <input
                    name="Sim_Number"
                    debounce={ 300 }
                    value={ filter.Sim_Number ?? "" }
                    onChange={ (e) => handleFilterChange(e) }
                    className='border-2 py-2 px-5 w-[300px] border-gray-500 rounded'
                    placeholder='Sim No.'
                />
                <input
                    name="IMEI_Number"
                    value={ filter.IMEI_Number ?? "" }
                    onChange={ (e) => handleFilterChange(e) }
                    className='border-2 py-2 px-5 w-[300px] border-gray-500 rounded'
                    placeholder='IMEI No.'
                />
                <Box className="w-[300px]">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Site Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={ data.Site_Name }
                            label="Site Name"
                            name="Site_Name"
                            onChange={ (e) => handleFilterChange(e) }
                            value={ filter.Site_Name ?? "" }
                            MenuProps={ MenuProps }
                        >
                            <MenuItem value="">Site Name</MenuItem>
                            {
                                site?.map((a, b) => {
                                    return <MenuItem key={ b } value={ a.SiteName }>{ a.SiteName }</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <TableContainer sx={ { maxHeight: "67vh", paddingY: 0 } } component={ Paper }>
                <Table aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            { a.Designation === "storekeeper" && <StyledTableCell align="center" sx={ { paddingX: 2 } }>Options</StyledTableCell> }
                            <StyledTableCell sx={ { padding: 0 } } align="center">Sim No.</StyledTableCell>
                            <StyledTableCell sx={ { paddingX: 0 } } align="center">IMEI No.</StyledTableCell>
                            <StyledTableCell sx={ { paddingX: 0 } } align="center">Dongle Serial Number </StyledTableCell>
                            <StyledTableCell sx={ { paddingX: 0 } } align="center">SSID</StyledTableCell>
                            <StyledTableCell sx={ { paddingX: 0 } } align="center">Remark</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { data2?.map((c, b) => {
                            const logs = JSON.parse(c.ActivityLog);
                            {/* console.log(logs) */ }
                            return <StyledTableRow >
                                { a.Designation === "storekeeper" && <StyledTableCell align="center"><input className='cursor-pointer' checked={ c?.checked ? true : false } onChange={ (e) => handleCheck(e, c) } type="checkbox" /></StyledTableCell> }
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
                        {/* <RecievedWithDongleDialog c={ single } isOpen={ isOpen } setIsOpen={ setIsOpen } /> */ }
                    </TableBody>
                </Table>
            </TableContainer>
            <ReceivedWithDongleDialogView checked={ checked } />
        </>
    )
}

export default RecievedWithDongle;