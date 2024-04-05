import { useState } from 'react';
import spotifydata from '../testData/spotifydata.json';
import Container from '@mui/material/Container';

import RecentTracks from '../components/RecentTracks';
import TopArtists from '../components/TopArtists';
import TopSongs from '../components/TopSongs';
import { SpotifyDataInterface } from '../Types/MusicTypes';



const MusicPage = () => {
    const [jsonData, setJsonData] = useState<SpotifyDataInterface>(spotifydata);


    return (
        <Container maxWidth="lg" sx={{ paddingTop: 3 }}>
            <RecentTracks data={jsonData.previousSongs} />
            <TopArtists data={jsonData.topArtists} />
            <TopSongs data={jsonData.topSongs} />
            <div style={{ height: '150px' }}></div>
        </Container>
    )
}

export default MusicPage