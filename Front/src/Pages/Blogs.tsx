import { BlogCard } from '@/components/Blogs/Card';
import { PaginationDemo } from '@/components/Pagination';
import GETRequest from '@/helpers/Requests/Query';
import { BlogResponse } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Blogs() {
    const language = useStore((state) => state.Lang) || 'az';
    const { t } = useTranslation();
    const { page = 1 } = useParams();

    // Fetching blogs data
    const { data: Blogs, isLoading } = GETRequest<BlogResponse>(
        `blogs?page=${page}`,
        'blogs',
        [language, page]
    );

    // Fetching SEO data for Blogs page
    const { data: seoData, isLoading: seoLoading } = GETRequest<any>(
        'seo/blogs',
        'seo/blogs',
        [language]
    );

    // SEO setup
    const canonicalUrl = `https://www.example.com/blogs/${page}`;
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seoData?.metaTitle || 'Blogs | Latest News and Articles',
        description:
            seoData?.metaDescription ||
            'Explore the latest articles and blog posts on web development, design, and more.',
        url: canonicalUrl,
        image: seoData?.image || 'default-image-url',
        publisher: {
            '@type': 'Organization',
            name: 'Your Company Name',
            url: 'https://www.example.com',
        },
        keywords:
            seoData?.metaKeywords || 'blogs, articles, web development, design',
    };

    let isLoadingState = isLoading || seoLoading;

    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    {seoData?.metaTitle || 'Blogs | Latest News and Articles'}
                </title>
                <meta
                    name="description"
                    content={
                        seoData?.metaDescription ||
                        'Explore the latest articles and blog posts on web development, design, and more.'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        seoData?.metaKeywords ||
                        'blogs, articles, web development, design'
                    }
                />
                {/* Open Graph for social media */}
                <meta
                    property="og:title"
                    content={
                        seoData?.metaTitle || 'Blogs | Latest News and Articles'
                    }
                />
                <meta
                    property="og:description"
                    content={
                        seoData?.metaDescription ||
                        'Explore the latest articles and blog posts on web development, design, and more.'
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
                    content={
                        seoData?.metaTitle || 'Blogs | Latest News and Articles'
                    }
                />
                <meta
                    name="twitter:description"
                    content={
                        seoData?.metaDescription ||
                        'Explore the latest articles and blog posts on web development, design, and more.'
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
                {isLoadingState ? (
                    <div className="h-[48px] bg-neutral-700 rounded w-[60%] mx-auto"></div>
                ) : (
                    <h2 className="rb-5 mb-5 text-4xl text-center font-bold md:mb-6 md:text-5xl lg:text-6xl">
                        {t('Blog')}
                    </h2>
                )}

                {/* Category Filter Skeleton */}
                <div className="flex justify-center">
                    {/* CategoryFilter component if needed */}
                </div>

                {/* Grid of Cards or Skeletons */}
                <div className="grid grid-cols-1 gap-[26px] md:grid-cols-2 lg:grid-cols-2 lg:px-[100px] md:px-[60px] px-[12px]">
                    {Array.from({ length: 8 }).map(() => (
                        <div key={Math.random()}>
                            {isLoadingState && (
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
                    {Blogs?.data?.map((item) => (
                        <BlogCard
                            image={{
                                src: item.image,
                                alt: 'Cover',
                            }}
                            url={`/blog/${item.slug[language]}`}
                            category="Design"
                            readTime="5 min read"
                            title={item.title}
                            description={item.description}
                            button={{
                                title: 'Read More',
                                onClick: () => console.log('Clicked Read More'),
                            }}
                        />
                    ))}
                </div>

                {/* Pagination (Optional Skeleton) */}
                <div>
                    {isLoadingState ? (
                        <div className="h-[48px] w-[200px] mx-auto bg-neutral-800 rounded animate-pulse" />
                    ) : (
                        <PaginationDemo
                            totalPages={Blogs?.totalPages || 10}
                            currentPage={+page}
                            pageName="blogs"
                        />
                    )}
                </div>
            </div>
        </HelmetProvider>
    );
}
