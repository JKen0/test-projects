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

interface Props {
  gridData: GridDataInterface[];
}

interface MasterRowProps {
  row: GridDataInterface;
}

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof GridDataInterface) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof GridDataInterface;
  label: string;
  sortable: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'CourseCode',
    disablePadding: true,
    label: 'Course Code',
    sortable: true
  },
  {
    id: 'CourseName',
    disablePadding: false,
    label: 'Course Name',
    sortable: true
  },
  {
    id: 'Term',
    disablePadding: false,
    label: 'Term',
    sortable: true
  },
  {
    id: 'Grade',
    disablePadding: false,
    label: 'Grade',
    sortable: false
  },
  {
    id: 'Units',
    disablePadding: false,
    label: 'Units',
    sortable: false
  },
  {
    id: "Status",
    disablePadding: false,
    label: 'Status',
    sortable: false
  }
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props;
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
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <div>{headCell.label}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
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
        <TableCell>{`${row.Units}.00`}</TableCell>
        <TableCell>
          <CheckCircle fontSize="medium" />
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




const GradesGrid = ({ gridData }: Props) => {
  const [gridRows, setGridRows] = useState<GridDataInterface[]>(gridData);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof GridDataInterface>('CourseCode');

  // SORTING LOGIC
  useEffect(() => {
    const sortedData = [...gridData].sort((a, b) => {
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

    console.log('hello');
    // Update the gridData state variable with the sorted data
    setGridRows(sortedData);
  }, [order, orderBy]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof GridDataInterface,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" stickyHeader>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={gridData.length}
        />
        <TableBody>
          {gridRows.map((row) =>
            <MasterRow key={`${row.CourseCode}${row.Term}`} row={row} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



export default GradesGrid