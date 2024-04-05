import React from 'react';
import spotifydata from '../testData/spotifydata.json';
import Container from '@mui/material/Container';

import RecentTracks from '../components/RecentTracks';
import TopArtists from '../components/TopArtists';
import TopSongs from '../components/TopSongs';

const MusicPage = () => {


    return (
        <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
            <RecentTracks />
            <TopArtists />
            <TopSongs />
        </Container>
    )
}

export default MusicPage