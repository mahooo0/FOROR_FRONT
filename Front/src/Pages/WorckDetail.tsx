import { useParams } from 'react-router-dom';
import GETRequest from '@/helpers/Requests/Query';
import { PortfolioItem } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { Helmet } from 'react-helmet';

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
            {/* SEO with Helmet */}
            <Helmet>
                <title>
                    {loading ? 'Loading...' : `${Data?.title} - Portfolio`}
                </title>
                <meta
                    name="description"
                    content={
                        loading
                            ? 'Loading portfolio details...'
                            : Data?.description || 'Portfolio item description'
                    }
                />
                <link rel="icon" href="/svg/logoMain.svg" type="image/x-icon" />

                {/* You can add more meta tags for better SEO */}
                <meta
                    property="og:title"
                    content={loading ? 'Loading...' : Data?.title}
                />
                <meta
                    property="og:description"
                    content={
                        loading
                            ? 'Loading portfolio details...'
                            : Data?.description || 'Portfolio item description'
                    }
                />
                <meta
                    property="og:image"
                    content={Data?.image || 'default-image-url.jpg'}
                />
                <meta
                    name="twitter:title"
                    content={loading ? 'Loading...' : Data?.title}
                />
                <meta
                    name="twitter:description"
                    content={
                        loading
                            ? 'Loading portfolio details...'
                            : Data?.description || 'Portfolio item description'
                    }
                />
                <meta
                    name="twitter:image"
                    content={Data?.image || 'default-image-url.jpg'}
                />
            </Helmet>

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
                        <img
                            loading="lazy"
                            className="w-full"
                            src={Data?.image}
                        />
                    </>
                )}
            </header>
        </div>
    );
}
