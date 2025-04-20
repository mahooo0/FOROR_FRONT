import GETRequest from '@/helpers/Requests/Query';
import { Bunner } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';

export default function ReviueSection() {
    const language = useStore((state) => state.Lang) || 'az';

    const { data: Data, isLoading } = GETRequest<Bunner>('rewue', 'rewue', [
        language,
    ]);
    if (isLoading) {
        return (
            <section className="flex flex-col py-[40px] justify-center items-center gap-10 lg:px-[100px] md:px-[60px] px-[12px] animate-pulse">
                <div className="mb-5 h-12 w-3/4 md:w-1/2 bg-gray-300 rounded-md"></div>
                <div className="flex xl:flex-row flex-col gap-10 w-full">
                    <div className="flex flex-col gap-4 xl:w-1/2 w-full">
                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                        <div className="h-10 w-3/4 bg-gray-300 rounded-md"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-11/12"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                        </div>
                    </div>
                    <div className="flex xl:w-1/2 w-full justify-center">
                        <div className="h-64 w-full bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="flex flex-col py-[40px] justify-center items-center gap-10 lg:px-[100px] md:px-[60px] px-[12px]">
            <div className="flex xl:flex-row flex-col gap-10">
                <div className="flex flex-col gap-4 xl:w-1/2 w-full  justify-center">
                    <h1 className="text-4xl">{Data?.title}</h1>
                    <p className="text-base opacity-70 col-span-1 max-sm:text-justify">
                        {Data?.description}
                    </p>
                </div>
                <div className="flex xl:w-1/2 w-full justify-center">
                    <img
                        loading="lazy"
                        src={Data?.image}
                        alt=""
                        className="w-full  aspect-square rounded-2xl  object-cover"
                    />{' '}
                </div>
            </div>
        </section>
    );
}
