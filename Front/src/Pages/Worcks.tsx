import ProjectCard from '@/components/Home/ProjectCard';
import { PaginationDemo } from '@/components/Pagination';
import CategoryFilter from '@/components/Worcks/CategoryFilter';
import GETRequest from '@/helpers/Requests/Query';
import {
    PortfolioCategory2,
    PortfolioResponse,
} from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Worcks() {
    const language = useStore((state: any) => state.Lang);
    const [category, setcategory] = useState('');
    const { page = 1 } = useParams();

    // Fetch portfolio data
    const { data: partfolio, isLoading: partfolioloading } =
        GETRequest<PortfolioResponse>(
            `partfolio?page=${page}${category && `&category=${category}`}`,
            'partfolio',
            [language, category, page]
        );

    // Fetch category data
    const { data: Category, isLoading: Categoryloading } = GETRequest<
        PortfolioCategory2[]
    >('partfolio-category', 'partfolio-category', [language]);

    // Fetch SEO data for the "Worcks" page
    const { data: seoData, isLoading: seoLoading } = GETRequest<any>(
        'seo/worcks',
        'seo/worcks',
        [language]
    );

    let isLoading = partfolioloading || Categoryloading || seoLoading;

    // SEO and structured data setup
    const canonicalUrl = `https://www.example.com/worcks/${page}`;
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seoData?.metaTitle || 'Portfolio - Our Works',
        description:
            seoData?.metaDescription ||
            'Explore our portfolio showcasing web development projects, custom websites, e-commerce solutions, and more.',
        url: canonicalUrl,
        image: seoData?.image || 'default-image-url',
        publisher: {
            '@type': 'Organization',
            name: 'Your Company Name',
            url: 'https://www.example.com',
        },
        keywords:
            seoData?.metaKeywords ||
            'web development, portfolio, projects, custom websites',
    };

    return (
        <HelmetProvider>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{seoData?.metaTitle || 'Portfolio - Our Works'}</title>
                <meta
                    name="description"
                    content={
                        seoData?.metaDescription ||
                        'Explore our portfolio showcasing web development projects, custom websites, e-commerce solutions, and more.'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        seoData?.metaKeywords ||
                        'web development, portfolio, projects, custom websites'
                    }
                />
                {/* Open Graph for social media */}
                <meta
                    property="og:title"
                    content={seoData?.metaTitle || 'Portfolio - Our Works'}
                />
                <meta
                    property="og:description"
                    content={
                        seoData?.metaDescription ||
                        'Explore our portfolio showcasing web development projects, custom websites, e-commerce solutions, and more.'
                    }
                />
                <meta
                    property="og:image"
                    content={seoData?.image || 'default-image-url'}
                />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={seoData?.metaTitle || 'Portfolio - Our Works'}
                />
                <meta
                    name="twitter:description"
                    content={
                        seoData?.metaDescription ||
                        'Explore our portfolio showcasing web development projects, custom websites, e-commerce solutions, and more.'
                    }
                />
                <meta
                    name="twitter:image"
                    content={seoData?.image || 'default-image-url'}
                />

                {/* Canonical URL */}
                <link rel="canonical" href={canonicalUrl} />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <div className="flex flex-col gap-[40px] py-[40px]">
                {/* Heading Skeleton */}
                <h2 className="rb-5 mb-5 text-4xl text-center font-bold md:mb-6 md:text-5xl lg:text-6xl">
                    Portfolio
                </h2>

                {/* Category Filter Skeleton */}
                <div className="flex justify-center">
                    <CategoryFilter
                        isLoading={Categoryloading}
                        categories={Category}
                        onCategoryChange={(categoryitem) =>
                            setcategory(categoryitem)
                        }
                    />
                </div>

                {/* Grid of Cards or Skeletons */}
                <div className="grid grid-cols-1 gap-[26px] md:grid-cols-2 lg:grid-cols-3 lg:px-[100px] md:px-[60px] px-[12px]">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i}>
                            {isLoading && (
                                <div className="flex size-full flex-col items-center justify-start animate-pulse">
                                    <div className="mb-6 w-full">
                                        <div className="aspect-video w-full bg-neutral-800 rounded" />
                                    </div>
                                    <div className="flex w-full flex-col items-start justify-start gap-2">
                                        <div className="h-6 w-3/4 bg-neutral-700 rounded" />
                                        <div className="h-4 w-full bg-neutral-800 rounded" />
                                        <div className="h-4 w-5/6 bg-neutral-800 rounded" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {partfolio?.data?.map((item) => (
                        <ProjectCard data={item} key={item._id} />
                    ))}
                </div>

                {/* Pagination (Optional Skeleton) */}
                <div>
                    {isLoading ? (
                        <div className="h-[48px] w-[200px] mx-auto bg-neutral-800 rounded animate-pulse" />
                    ) : (
                        <PaginationDemo
                            totalPages={partfolio?.totalPages || 10}
                            currentPage={+page}
                            pageName="worcks"
                        />
                    )}
                </div>
            </div>
        </HelmetProvider>
    );
}
