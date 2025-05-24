import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import AddDongle from './AddDongle';

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

function createData (name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ViewSim () {
  return (
    <>
      <TableContainer component={ Paper }>
        <Table sx={ { width: "2000px" } } aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell sx={ { padding: 0 } }>Sim No.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">IMEI No.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Issued By Store </StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Dongle Serial No.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Dongle Engg. Name</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Received By Store</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Issued To Site</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Installed By Engg.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Challan No.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Approved By Crm</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Engineer Remark</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">First Meter Id.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Last Meter Id.</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Sim Status</StyledTableCell>
              <StyledTableCell sx={ { paddingX: 0 } } align="center">Status Remark</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow sx={ { cursor: "pointer" } }>
              <StyledTableCell component="th" scope="row">
              </StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}