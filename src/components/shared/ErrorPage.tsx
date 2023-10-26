import smiley from "../../assets/smiley.png";

export function ErrorPage(props: { message: string | null }) {
    return (
        <div>
            <section className="flex items-center h-screen p-16 bg-white">
                <div className="container flex flex-col items-center ">
                    <div className="flex flex-col gap-6 max-w-md text-center">
                        <img className="m-auto" src={smiley} alt="error-face 😔" />
                        <p className="text-2xl md:text-3xl dark:text-gray-400">Something went wrong</p>
                        <p className="text-2xl md:text-3xl dark:text-gray-400">{props.message}</p>
                    </div>
                </div>
            </section>{" "}
        </div>
    );
}
