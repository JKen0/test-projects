import React from 'react'
import { TopArtistsTypes } from '../Types/MusicTypes';
import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

interface TopArtistsProps {
    data: TopArtistsTypes[];
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const numRowsCol = (num: number): number => {
    return num === 0 ? 2 : 1
}

const TopArtists = ({ data }: TopArtistsProps) => {
    return (
        <>
            <Typography variant="h4" style={{ paddingTop: "60px", paddingBottom: "20px" }}>Top Artists</Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ImageList
                    variant="quilted"
                    cols={4}
                    rowHeight={275}
                    style={{ width: '900px' }}
                >
                    {data.map((item, index) => (
                        <ImageListItem key={item.name} cols={numRowsCol(index)} rows={numRowsCol(index)}>
                            <Card>
                                <a href={item.linkSpotify} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        component="img"
                                        image={item.artistPic}
                                        title={item.name}
                                        style={{ maxWidth: `${numRowsCol(index) * 225}px`, maxHeight: `${numRowsCol(index) * 225}px` }}
                                    />
                                    <CardContent style={{ padding: '8px' }}>
                                        <Typography variant="h6" component="div">
                                            {`${index + 1}. ${item.name}`}
                                        </Typography>
                                    </CardContent>
                                </a>
                            </Card>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </>
    )
}

export default TopArtists