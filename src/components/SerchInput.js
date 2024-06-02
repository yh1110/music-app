import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const SearchInput = ({ isLoading, onInputChange, onSubmit }) => {
    console.log("serch");

    // if (isLoading)
    //     return (
    //         <div className="inset-0 flex justify-center items-center">
    //             <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    //         </div>
    //     );

    return (
        <section className="mb-10">
            <input
                onChange={onInputChange}
                className="bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none"
                placeholder="探したい曲を入力してください"
            />
            <button
                onClick={onSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </section>
    );
};
