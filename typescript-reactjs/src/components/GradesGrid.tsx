import { Fragment, useState, useEffect } from 'react';
import { GridDataInterface } from "../Types/GridDataTypes";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Props {
  gridData: GridDataInterface[];
}

interface MasterRowProps {
  row: GridDataInterface;
}

const MasterRow = ({ row }: MasterRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow key={`${row.CourseCode}${row.Term}`} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.CourseCode} </TableCell>
        <TableCell>{row.CourseName}</TableCell>
        <TableCell>{row.Term}</TableCell>
        <TableCell>{row.Grade}</TableCell>
        <TableCell>{row.Units}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h5" gutterBottom component="div">
                Course Description
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                {row.Description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const GradesGrid = ({ gridData }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Course Name</TableCell>
            <TableCell>Course Code</TableCell>
            <TableCell>Term</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Credits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gridData.map((row) =>
            <MasterRow key={`${row.CourseCode}${row.Term}`} row={row} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GradesGrid