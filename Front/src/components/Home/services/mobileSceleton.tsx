export default function MobileSceleton({ i }: { i: number }) {
    return (
        <div
            key={i}
            className={`rounded-2xl ${
                i % 2 === 1
                    ? 'bg-[#222222]'
                    : 'bg-white border border-[#222222]'
            } w-full h-fit p-3 flex flex-col gap-[30px] animate-pulse`}
        >
            <div
                className={`h-4 w-16 rounded ${
                    i % 2 === 1 ? 'bg-gray-700' : 'bg-gray-300'
                }`}
            />
            <article className="flex flex-col gap-3">
                <div
                    className={`h-6 w-[60%] rounded ${
                        i % 2 === 1 ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                />
                <div
                    className={`h-4 w-[90%] rounded ${
                        i % 2 === 1 ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                />
                <div
                    className={`h-4 w-[40%] rounded ${
                        i % 2 === 1 ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                />
                <div
                    className={`h-5 w-20 rounded mt-2 ${
                        i % 2 === 1 ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                />
            </article>
        </div>
    );
}
