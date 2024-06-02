import { useEffect, useRef, useState } from "react";
import { SongList } from "./components/SongList";
import Spotify from "./lib/Spotify";
import { Player } from "./components/Player";
import { SearchInput } from "./components/SerchInput";
import { Pagination } from "./components/Pagination";

const limit = 20;

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [popularSongs, setPopularSongs] = useState([]);
    const [isPlay, setIsPlay] = useState(false);
    const [selectedSongs, setSelectedSongs] = useState();
    const [keyword, setKeyword] = useState("");
    const [serchedSongs, setSerchedSongs] = useState();
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const audioRef = useRef(null);
    const isSerchedResult = serchedSongs != null;
    // console.log(Spotify);
    // Spotify.getPopularSongs();
    // const Refkeyword = useRef();
    useEffect(() => {
        fetchPopularSongs();
    }, []);

    const fetchPopularSongs = async () => {
        setIsLoading(true);
        const result = await Spotify.getPopularSongs();
        const popularSongs = result.items.map((item) => {
            return item.track;
        });
        setPopularSongs(popularSongs);
        setIsLoading(false);
    };

    const handleSongSelected = async (song) => {
        setSelectedSongs(song);
        console.log(song);
        if (song.preview_url != null) {
            audioRef.current.src = song.preview_url;
            // console.log(audioRef);
            playSong();
        } else {
            pauseSong();
        }
    };

    const playSong = () => {
        audioRef.current.play();
        setIsPlay(true);
    };
    const pauseSong = () => {
        audioRef.current.pause();
        setIsPlay(false);
    };

    const toggleSong = () => {
        if (isPlay) {
            pauseSong();
        } else {
            playSong();
        }
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const serchSongs = async (page) => {
        setIsLoading(true);
        const offset = parseInt(page) ? (parseInt(page) - 1) * limit : 0;
        const result = await Spotify.serchSongs(keyword, limit, offset);
        setHasNext(result.next != null);
        setHasPrev(result.previous != null);
        // console.log(result);
        setSerchedSongs(result.items);
        setIsLoading(false);
    };

    const moveToNext = async () => {
        const nextPage = page + 1;
        await serchSongs(nextPage);
        setPage(nextPage);
    };
    const moveToPrev = async () => {
        const prevPage = page - 1;
        await serchSongs(prevPage);
        setPage(prevPage);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <main className="flex-1 p-8 mb-20">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">Music App</h1>
                </header>
                <SearchInput
                    isLoading={isLoading}
                    onInputChange={handleInputChange}
                    onSubmit={serchSongs}
                />
                <section>
                    <h2 className="text-2xl font-semibold mb-5">
                        {isSerchedResult ? "Serched Songs" : "Popular Songs"}
                    </h2>
                    <SongList
                        isLoading={isLoading}
                        songs={isSerchedResult ? serchedSongs : popularSongs}
                        onSongSelected={handleSongSelected}
                    />
                    {isSerchedResult && (
                        <Pagination
                            onPrev={hasPrev ? moveToPrev : null}
                            onNext={hasNext ? moveToNext : null}
                        />
                    )}
                </section>
            </main>
            {selectedSongs != null && (
                <Player
                    song={selectedSongs}
                    isPlay={isPlay}
                    onButtonClick={toggleSong}
                />
            )}
            <audio ref={audioRef}></audio>
        </div>
    );
}
