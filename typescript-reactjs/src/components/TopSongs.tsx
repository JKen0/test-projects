import React from 'react'

import { TopSongsTypes } from '../Types/MusicTypes';

interface TopSongsProps {
    data: TopSongsTypes[];
}

const TopSongs = ({ data }: TopSongsProps) => {
    return (
        <div>TopSongs</div>
    )
}

export default TopSongs