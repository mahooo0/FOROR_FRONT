import GETRequest from '@/helpers/Requests/Query';
import { PortfolioItem } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { useParams } from 'react-router-dom';

export default function WorckDetail() {
    const { slug } = useParams();
    const language = useStore((state: any) => state.Lang);

    const { data: Data, isLoading: loading } = GETRequest<PortfolioItem>(
        `partfolio-detail/${slug}`,
        'partfolio-detail',
        [language, slug]
    );
    return (
        <div className="py-[40px]">
            <header className="flex flex-col items-center gap-4 text-[#222222] mb-10 lg:px-[100px] md:px-[60px] px-[12px]">
                {loading ? (
                    <div className="w-full flex flex-col items-center gap-3 animate-pulse">
                        <div className="h-4 w-[80px] bg-gray-300 rounded" />
                        <div className="h-10 w-[200px] bg-gray-300 rounded" />
                        <div className="h-4 w-[60%] bg-gray-300 rounded" />
                    </div>
                ) : (
                    <>
                        <h2 className="text-5xl font-bold">{Data?.title}</h2>
                        <h3 className="text-[18px] max-sm:text-base font-medium opacity-60 xl:max-w-[90%] text-center">
                            {Data?.description}
                        </h3>
                        <img loading="lazy" src={Data?.image} />
                    </>
                )}
            </header>
        </div>
    );
}
