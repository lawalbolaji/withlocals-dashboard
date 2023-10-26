import smiley from "../../assets/smiley.png";

export function EmptyResultSet() {
    return (
        <div className="w-full h-full">
            <div className="h-full bg-white text-center py-10 px-4 sm:px-6 lg:px-8 mx-auto mt-4">
                <img className="m-auto" src={smiley} alt="error-face" />
                <h1 className="mt-8 block text-2xl font-bold text-white">
                    <p className="mt-3 text-gray-600 dark:text-gray-400">No local guide matches your filter</p>
                </h1>
            </div>
        </div>
    );
}
