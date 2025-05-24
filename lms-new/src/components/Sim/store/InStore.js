// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TableRow from '@mui/material/TableRow';
// // import Paper from '@mui/material/Paper';
// // import { styled } from '@mui/material/styles';
// // import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react'
// // const StyledTableCell = styled(TableCell)(({ theme }) => ({
// //     [ `&.${ tableCellClasses.head }` ]: {
// //         backgroundColor: theme.palette.common.black,
// //         color: theme.palette.common.white,
// //     },
// //     [ `&.${ tableCellClasses.body }` ]: {
// //         fontSize: 14,
// //     },
// // }));

// // const StyledTableRow = styled(TableRow)(({ theme }) => ({
// //     '&:nth-of-type(odd)': {
// //         backgroundColor: "#b80f768f",
// //     },
// //     // hide last border
// //     '&:last-child td, &:last-child th': {
// //         border: 0,
// //     },
// // }));
// // const InStore = () => {
// //     const [ data, setData ] = useState([]);
// //     const a = JSON.parse(secureLocalStorage.getItem("info"));

// //     useEffect(() => {
// //         axios.post(window.MyApiRoute + "sim/get?check=production", { ...a.data, })
// //             .then(res => (
// //                 setData(res.data.data),
// //                 console.log("Haha", res.data.data)
// //             ))
// //             .catch(err => alert("Error", err.message))
// //     }, []);
// //     return (
// //         <TableContainer sx={ { width: "600px", margin: "0 auto" } } component={ Paper }>
// //             <Table aria-label="customized table">
// //                 <TableHead >
// //                     <TableRow>
// //                         <StyledTableCell align="center" sx={ { padding: 0 } }>Sim No.</StyledTableCell>
// //                         <StyledTableCell align="center" sx={ { paddingX: 0 } }>IMEI No.</StyledTableCell>
// //                         <StyledTableCell align="center" sx={ { paddingX: 0 } }>Registered By</StyledTableCell>
// //                         <StyledTableCell align="center" sx={ { paddingX: 0 } }>Registered On</StyledTableCell>
// //                     </TableRow>
// //                 </TableHead>
// //                 <TableBody>
// //                     { data?.map((item, i) => {
// //                         return <StyledTableRow key={ i }>
// //                             <StyledTableCell align="center">{ item.PhoneNumber }</StyledTableCell>
// //                             <StyledTableCell align="center">{ item.IMEI }</StyledTableCell>
// //                             <StyledTableCell align="center">{ item.Sim_CreatedBy }</StyledTableCell>
// //                             <StyledTableCell align="center">{ item.Sim_CreatedOn }</StyledTableCell>
// //                         </StyledTableRow>
// //                     }) }
// //                 </TableBody>
// //             </Table>
// //         </TableContainer>
// //     )
// // }

// // export default InStore


// import React, { useEffect, useState } from 'react'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// // import Checkbox from '@mui/material/Checkbox';
// import { Box, Button, InputLabel, MenuItem, Select } from '@mui/material';
// // import IssueDialog from './InStoreDialog';
// import axios from 'axios';
// import ProductionModal from './ProductionModal';
// import { FormControl } from '@mui/material';
// import { debounce } from 'lodash';
// import { CheckBox } from '@mui/icons-material';
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [ `&.${ tableCellClasses.head }` ]: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     [ `&.${ tableCellClasses.body }` ]: {
//         fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: "#b80f768f",
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));

// const Production = () => {
//     const [ open, setOpen ] = useState({
//         value: false,
//         data: {}
//     });
//     const [ filter, setFilter ] = useState({});
//     const [ site, setSite ] = useState([]);
//     const [ data2, setData2 ] = useState([]);
//     const [ val, setVal ] = useState([]);
//     const a = JSON.parse(secureLocalStorage.getItem("info"));
//     useEffect(() => {
//         axios.post(window.MyApiRoute + "sim/get?check=production", { ...a.data, })
//             .then(res => (
//                 setVal(res.data.data),
//                 setData2(res.data.data)
//             ))
//             .catch(err => alert("Error", err.message))
//     }, [ open ]);
//     useEffect(() => {
//         axios.get(window.MyApiRoute + "sites")
//             .then(res => {
//                 return (
//                     setSite(res.data.data),
//                     console.log(res.data.data)
//                 )
//             })
//             .catch(err => console.log(err));
//     }, [])
//     useEffect(() => {
//         const debouncedFilter = debounce(() => {
//             if (filter?.Sim_Number?.trim() === "") {
//                 setData2(val);
//             } else if (filter?.Sim_Number) {
//                 const newData = val.filter(item => String(item.PhoneNumber).toUpperCase().includes(filter.Sim_Number.trim().toUpperCase()));
//                 setData2(newData);
//             } else if (filter?.IMEI_Number === "") {
//                 setData2(val);
//             } else if (filter?.IMEI_Number) {
//                 const newData = val.filter(item => String(item.IMEI).includes(filter.IMEI_Number));
//                 setData2(newData);
//             }
//         }, 400);

//         debouncedFilter(); // Invoke the debounced function immediately after defining it

//         return () => {
//             debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
//         };
//     }, [ filter ])
//     const handleClickOpen = (item) => {
//         if (a.data.Designation === "production") {
//             setOpen({
//                 value: true,
//                 data: item
//             });
//         }
//     };
//     const handleFilterChange = (e) => {
//         setFilter({ [ e.target.name ]: e.target.value })
//     };
//     const MenuProps = {
//         PaperProps: {
//             style: {
//                 maxHeight: "200px",
//             },
//         },
//     };
//     return (
//         <>
//             <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around pb-3'>
//                 <input
//                     name="Sim_Number"
//                     debounce={ 300 }
//                     onChange={ (e) => handleFilterChange(e) }
//                     value={ filter.Sim_Number ?? "" }
//                     className='border-2 py-2 px-5 w-[300px] border-gray-500 rounded'
//                     placeholder='Sim No.'
//                 />
//                 <input
//                     name="IMEI_Number"
//                     value={ filter.IMEI_Number ?? "" }
//                     onChange={ (e) => handleFilterChange(e) }
//                     className='border-2 py-2 px-5 w-[300px] border-gray-500 rounded'
//                     placeholder='IMEI No.'
//                 />
//             </div>
//             <TableContainer sx={ { width: "600px", margin: "0 auto" } } component={ Paper }>
//                 <Table aria-label="customized table">
//                     <TableHead >
//                         <TableRow>
//                             <StyledTableCell align="center" sx={ { padding: 0 } }>Sim No.</StyledTableCell>
//                             <StyledTableCell align="center" sx={ { paddingX: 0 } }>IMEI No.</StyledTableCell>
//                             <StyledTableCell align="center" sx={ { paddingX: 0 } }>Registered By</StyledTableCell>
//                             <StyledTableCell align="center" sx={ { paddingX: 0 } }>Registered On</StyledTableCell>
//                             <StyledTableCell align="center" sx={ { paddingX: 2 } }>Options</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         { data2?.map((item, i) => {
//                             return <StyledTableRow onClick={ () => handleClickOpen(item) } sx={ { cursor: "pointer" } } key={ i }>
//                                 <StyledTableCell align="center">{ item.PhoneNumber }</StyledTableCell>
//                                 <StyledTableCell align="center">{ item.IMEI }</StyledTableCell>
//                                 <StyledTableCell align="center">{ item.Sim_CreatedBy }</StyledTableCell>
//                                 <StyledTableCell align="center">{ item.Sim_CreatedOn }</StyledTableCell>
//                                 <StyledTableCell align="center"><input type="checkbox" /></StyledTableCell>
//                             </StyledTableRow>
//                         }) }
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <ProductionModal setOpen={ setOpen } open={ open } />
//         </>
//     )
// }

// export default Production
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddSim from './NewSim';
import IncompleteSim from './IncompleteSim';
import IssueSim from './RecievedInStore';
import RecievedWithDongle from './RecievedWithDongle';
import AllStoreList from './AllStoreList';
import  secureLocalStorage  from  "react-secure-storage";

const Store = () => {
    const [ value, setValue ] = useState('2');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const a = JSON.parse(secureLocalStorage.getItem("info")).data;

    //  /sim/getcount
    // POST -- "sim/addnew" -- To create a new Sim 
    // Put -- "sim/update'  --  To update the -- query= check = toRequire
    // get -- sim/get 
    return (
        // <Box sx={ { width: '100%', typography: 'body1' } }>
        //     <TabContext value={ value } >
        //         <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
        //             <TabList sx={ { width: "60%", margin: "0 auto" } } extColor="primary" variant="fullWidth"
        //                 indicatorColor="secondary" onChange={ handleChange } aria-label="lab API tabs example">
        //                 { a.Designation === 'storekeeper' && <Tab label={ `Add New Sim` } value="1" /> }
        //                 <Tab label={ `UnUsed Sim` } value="2" />
        //                 {/* <Tab label={ `Sim in Dongle` } value="3" /> */ }
        //                 <Tab label={ `Received With Dongle` } value="5" />
        //                 <Tab label={ `All Store List` } value="4" />
        //             </TabList>
        //         </Box>
        //         <TabPanel sx={ { paddingX: 0 } } value="1"><AddSim /></TabPanel>
        //         <TabPanel sx={ { paddingX: 0 } } value="2"><IncompleteSim /></TabPanel>
        //         <TabPanel sx={ { paddingX: 0 } } value="3"><IssueSim /></TabPanel>
        //         <TabPanel sx={ { paddingX: 0 } } value="4"><AllStoreList /></TabPanel>
        //         <TabPanel sx={ { paddingX: 0 } } value="5"><RecievedWithDongle /></TabPanel>
        //     </TabContext>
        // </Box>
        <IncompleteSim />
    )
}

export default Store