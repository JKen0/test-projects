import React from 'react'
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { TableHead, TableCell, Box, TableRow, TableFooter } from '@mui/material';
import Paper from '@mui/material/Paper';

import { TopSongsTypes } from '../Types/MusicTypes';

interface TopSongsProps {
    data: TopSongsTypes[];
}

const TopSongs = ({ data }: TopSongsProps) => {
    return (
        <>
            <Typography variant="h4" style={{ paddingTop: "40px", paddingBottom: "20px" }}>Top Tracks</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '0.5%' }}>#</TableCell>
                            <TableCell style={{ width: '1%' }}></TableCell>
                            <TableCell style={{ width: '10%' }}>Name</TableCell>
                            <TableCell style={{ width: '10%' }}>Artists</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => {
                            return (
                                <TableRow
                                    key={`${index}-${row.name}`}
                                    style={{
                                        height: index < 3 ? '60px' : '25px',
                                        backgroundColor: index === 0 ? '#B59410' : index === 1 ? '#71706e' : index === 2 ? '#905923' : 'inherit', // Set different background color for first 3 rows
                                    }}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                    <TableCell>
                                        <Box sx={{ width: 32, height: 32 }}>
                                            <a href={row.linkSpotify} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <img src={row.artistPic} alt="Image" style={{ width: `${index < 3 ? 38 : 32}px`, height: `${index < 3 ? 38 : 32}px` }} />
                                            </a>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <a href={row.linkSpotify} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {row.name}
                                        </a>
                                    </TableCell>
                                    <TableCell>{row.artists}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TopSongs