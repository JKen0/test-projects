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
import { CheckCircle } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';


interface Props {
    gridData: GridDataInterface[];
    setModalOpen: () => void;
}

interface GroupingGridDataInterface {
    termName: string;
    items: GridDataInterface[];
}

const groupDataByTerm = (data: GridDataInterface[]): GroupingGridDataInterface[] => {
    const groupedData: GroupingGridDataInterface[] = [];

    // Group data by term
    const groupedByTerm = data.reduce((acc: { [term: string]: GridDataInterface[] }, curr: GridDataInterface) => {
        if (acc[curr.Term]) {
            acc[curr.Term].push(curr);
        } else {
            acc[curr.Term] = [curr];
        }
        return acc;
    }, {});

    // Convert grouped data into GroupingGridDataInterface
    for (const term in groupedByTerm) {
        if (Object.prototype.hasOwnProperty.call(groupedByTerm, term)) {
            groupedData.push({ termName: term, items: groupedByTerm[term] });
        }
    }

    return groupedData;
}

interface MasterTableHeadInterface {
    setModalOpen: () => void
}

// THIS DEAL WITH TABLE HEAD AND SORTING
const MasterTableHead = ({ setModalOpen }: MasterTableHeadInterface) => {

    return (
        <TableHead>
            <TableRow>
                <TableCell style={{ fontSize: "large" }} padding={"normal"} ></TableCell>
                <TableCell style={{ fontSize: "large" }} padding={"normal"} >Course Code</TableCell>
                <TableCell style={{ fontSize: "large" }} padding={"normal"} >Course Name</TableCell>
                <TableCell style={{ fontSize: "large" }} padding={"normal"} >Grade  <IconButton onClick={setModalOpen}><InfoIcon fontSize="small" style={{ marginTop: '-3px' }} /></IconButton></TableCell>
                <TableCell style={{ fontSize: "large" }} padding={"normal"} >Units</TableCell>
                <TableCell style={{ fontSize: "large" }} padding={"normal"} >Status</TableCell>
            </TableRow>
        </TableHead>
    );
}


interface MasterRowProps {
    row: GridDataInterface;
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

interface MasterTableeRowsProps {
    gridRows: GroupingGridDataInterface[]
}

const MasterTableRows = ({ gridRows }: MasterTableeRowsProps) => {

    return (
        <Fragment>
            {gridRows.map((row: GroupingGridDataInterface) => (
                <Fragment key={`term-${row.termName}`}>
                    {/* Row for termName */}
                    <TableRow>
                        <TableCell
                            colSpan={6}
                            style={{
                                backgroundColor: '#333',
                                textAlign: 'center', // Center-align the text
                                fontSize: 'large' // Set the font size to large

                            }}
                            size={"small"}
                        >
                            {row.termName}
                        </TableCell>
                    </TableRow>
                    {/* Rows for items */}
                    {row.items.map((rowItem: GridDataInterface, index) => (
                        <MasterRow key={`${rowItem.CourseCode}${rowItem.Term}`} row={rowItem} />
                    ))}
                </Fragment>
            ))}
        </Fragment>
    );
};


const GradesGridGrouping = ({ gridData, setModalOpen }: Props) => {
    const [gridRows, setGridRows] = useState<GroupingGridDataInterface[]>([]);

    useEffect(() => {
        const unsortedData = groupDataByTerm(gridData);

        const sortedData = [...unsortedData].sort((a, b) => {
            // Define the order of seasons
            const seasonsOrder = ['Winter', 'Spring/Summer', 'Fall'];

            // Split terms into year and season
            const [yearA, seasonA] = a.termName.split(' ');
            const [yearB, seasonB] = b.termName.split(' ');

            // Get the index of the season in the seasonsOrder array
            const indexA = seasonsOrder.indexOf(seasonA);
            const indexB = seasonsOrder.indexOf(seasonB);

            // convert back to string
            const newA = `${yearA}-${indexA}`
            const newB = `${yearB}-${indexB}`

            if (newA < newB) {
                return 1;
            }
            if (newA > newB) {
                return -1;
            }
            return 0;
        });

        setGridRows(sortedData);

    }, [gridData])

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table" stickyHeader size={"small"}>
                    <MasterTableHead setModalOpen={setModalOpen} />
                    <TableBody>
                        <MasterTableRows gridRows={gridRows} />
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default GradesGridGrouping;