export interface PreviousSongsTypes {
    name: string;
    timePlayed: string;
    linkSpotify: string;
    linkPreview: string;
    artists: string;
    albumPic: string;
}

export interface TopSongsTypes {
    name: string;
    linkSpotify: string;
    artists: string;
    artistPic: string;
}

export interface TopArtistsTypes {
    name: string;
    linkSpotify: string;
    artistPic: string;
}

export interface SpotifyDataInterface {
    previousSongs: PreviousSongsTypes[];
    topSongs: TopSongsTypes[];
    topArtists: TopArtistsTypes[];
}