import { Fragment, useState } from 'react'
import { Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { TableHead, TableCell, Box, TableRow, TableFooter } from '@mui/material';
import Paper from '@mui/material/Paper';
import { PreviousSongsTypes } from '../Types/MusicTypes';

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';

{ }
interface RecentTracksProps {
    data: PreviousSongsTypes[]
}

const getTimeDifference = (currentTime: Date, playedTime: string): string => {
    const datePlayedTime = new Date(playedTime);
    const difference = currentTime.getTime() - datePlayedTime.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}

const RecentTracks = ({ data }: RecentTracksProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const currentTime = new Date();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Typography variant="h4" style={{ paddingBottom: "20px" }}>Recent Tracks</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '1%' }}></TableCell>
                            <TableCell style={{ width: '1%' }}></TableCell>
                            <TableCell style={{ width: '10%' }}>Name</TableCell>
                            <TableCell style={{ width: '10%' }}>Artists</TableCell>
                            <TableCell style={{ width: '10%' }}>Time Played</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow
                                    key={`${index}-${row.name}`}
                                >
                                    <TableCell component="th" scope="row">
                                        <PlayCircleFilledWhiteOutlinedIcon />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ width: 32, height: 32 }}>
                                            <img src={row.albumPic} alt="Image" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
                                        </Box>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.artists}</TableCell>
                                    <TableCell>{getTimeDifference(currentTime, row.timePlayed)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10]}
                                colSpan={5}
                                component="td"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default RecentTracks