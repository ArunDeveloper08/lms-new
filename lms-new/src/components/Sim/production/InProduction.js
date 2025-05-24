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
import ProductionModal from './ProductionModal';
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

const Received = () => {
  const [ data, setData ] = useState({});
  const [ open, setOpen ] = useState({
    value: false,
    data: {}
  });
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const api = () => axios.post(window.MyApiRoute + "sim/get?check=production", { ...a.data })
    .then(res => setData(res.data))
    .catch(err => console.log("err", err))
  useEffect(() => {
    api();
  }, [])
  const handleSubmit = (data, b) => {
    console.log({ data })
    axios.put(window.MyApiRoute + "sim/update?check=toRecieve", { ...a.data, Dongle_Serial_Number: data.Dongle_Serial_Number })
      .then(res => {
        alert("Received SuccessFully");
        api()
      })
      .catch(err => console.log("err", err))
  }
  const handleClickOpen = (item) => {
    if (a.data.Designation === "production") {
      setOpen({
        value: true,
        data: item
      });
    }
  };
  console.log({ data })
  return (
    <>
      <TableContainer component={ Paper }>
        <Table sx={ { minWidth: 700 } } aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell align='center' sx={ { padding: 0 } }>Mobile No.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">IMEI No.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Activity Log</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { data?.data && data.data.map((item, i) => {
              const logs = JSON.parse(item.ActivityLog);
              console.log(logs)
              {/* console.log(item.ActivityLog) */ }

              return <StyledTableRow className={ `${ a.data.Designation === "production" ? "cursor-pointer" : "" }` } onClick={ () => handleClickOpen(item) } key={ i }>
                <StyledTableCell sx={ { paddingY: 1 } } align="center">{ item.PhoneNumber }</StyledTableCell>
                <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.IMEI }</StyledTableCell>
                <StyledTableCell sx={ { paddingY: 0.5 } } align="center">
                  { logs.map(log => (
                    <p className='flex space-x-5 justify-center`'><span>Date:{ log.date }</span><span>Remark:{ log.remark }</span></p>
                  )) }
                </StyledTableCell>
                {/* <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.Sim_CreatedOn
                }</StyledTableCell>
                <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.InProductionDate
                }</StyledTableCell> */}
                {/* <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.Dongle_Serial_Number }</StyledTableCell>
                <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.SSID }</StyledTableCell>
                <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ item.Dongle_CreatedBy }</StyledTableCell>
                <StyledTableCell sx={ { paddingY: 0.5 } } align="center">{ a.data.Designation === "storekeeper" && <Button sx={ { margin: 0.5 } } variant="contained" onClick={ () => handleSubmit(item
                  , i) }>Save</Button> }
                </StyledTableCell> */}
              </StyledTableRow>
            }) }
          </TableBody>
        </Table>
      </TableContainer>
      <ProductionModal api={ api } setOpen={ setOpen } open={ open } />
    </>
  )
}

export default Received