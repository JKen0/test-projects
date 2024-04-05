import { Fragment, useState } from 'react'
import { Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

const RecentTracks = () => {

    const TableWithPagination = ({ rows }) => {
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        return (
            <div>
                <Typography variant="h3">Recent Tracks</Typography>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableBody>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        )
    }

    export default RecentTracks