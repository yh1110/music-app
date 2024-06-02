import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function SongList({ isLoading, songs, onSongSelected }) {
    if (isLoading)
        return (
            <div className="inset-0 flex justify-center items-center">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            </div>
        );

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {songs.map((song) => {
                // console.log(song);
                return (
                    <div
                        key={song.id}
                        onClick={() => onSongSelected(song)}
                        song={song.id}
                        className="flex-none cursor-pointer "
                    >
                        <img
                            alt="thumbnail"
                            src={song.album.images[0].url}
                            className="mb-2 rounded"
                        />
                        <h3 className="text-lg font-semibold">{song.name}</h3>
                        <p className="text-gray-400">{song.artists[0].name}</p>
                    </div>
                );
            })}
        </div>
    );
}
