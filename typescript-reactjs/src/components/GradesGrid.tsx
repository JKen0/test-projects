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
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { visuallyHidden } from '@mui/utils';
import { CheckCircle } from '@mui/icons-material';
import { Order, headCells } from '../Types/GridDataTypes';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import GradesHelpModal from './GradesHelpModal';

interface Props {
  gridData: GridDataInterface[];
  setModalOpen: () => void;
}

interface MasterRowProps {
  row: GridDataInterface;
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof GridDataInterface) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  setModalOpen: () => void;
}


// THIS DEAL WITH TABLE HEAD AND SORTING
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, rowCount, onRequestSort, setModalOpen } = props;
  const createSortHandler =
    (property: keyof GridDataInterface) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontSize: "large" }}
          >
            {(() => {
              if (headCell.sortable) {
                return (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id && (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    )}
                  </TableSortLabel>
                );
              } else if (headCell.id === 'Grade') {
                return (
                  <div>{headCell.label}<IconButton onClick={setModalOpen}><InfoIcon fontSize="small" style={{ marginTop: '-3px' }} /></IconButton></div>
                );
              } else {
                return <div>{headCell.label}</div>;
              }
            })()}

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// THIS DEALS WITH GRID ROWS AND ABILIT TO EXPAND EACH ROW
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
        <TableCell>{`${row.Units}.00`}</TableCell>
        <TableCell>
          <Tooltip title="Completed" placement="top-start">
            <CheckCircle fontSize="small" />
          </Tooltip>
        </TableCell>
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



// THIS IS THE OUTER MAIN GRID
const GradesGrid = ({ gridData, setModalOpen }: Props) => {
  const [gridRows, setGridRows] = useState<GridDataInterface[]>(gridData);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof GridDataInterface>('CourseCode');

  useEffect(() => {
    setGridRows(gridData)
  }, [gridData]);


  // SORTING LOGIC
  useEffect(() => {
    const sortedData = [...gridRows].sort((a, b) => {
      const isAsc = order === 'asc';

      if (orderBy === 'Term') {
        // Define the order of seasons
        const seasonsOrder = ['Winter', 'Spring/Summer', 'Fall'];

        // Split terms into year and season
        const [yearA, seasonA] = a.Term.split(' ');
        const [yearB, seasonB] = b.Term.split(' ');

        // Get the index of the season in the seasonsOrder array
        const indexA = seasonsOrder.indexOf(seasonA);
        const indexB = seasonsOrder.indexOf(seasonB);

        // convert back to string
        const newA = `${yearA}-${indexA}`
        const newB = `${yearB}-${indexB}`

        if (newA < newB) {
          return isAsc ? -1 : 1;
        }
        if (newA > newB) {
          return isAsc ? 1 : -1;
        }
        return 0;

      } else {
        if (a[orderBy] < b[orderBy]) {
          return isAsc ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
          return isAsc ? 1 : -1;
        }
        return 0;
      }
    });

    // Update the gridData state variable with the sorted data
    setGridRows(sortedData);
  }, [order, orderBy]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof GridDataInterface,) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" stickyHeader size={"small"}>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={gridData.length}
            setModalOpen={setModalOpen}
          />
          <TableBody>
            {gridRows.map((row) =>
              <MasterRow key={`${row.CourseCode}${row.Term}`} row={row} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}



export default GradesGrid