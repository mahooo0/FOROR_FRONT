import GETRequest from '@/helpers/Requests/Query';
import { WebsiteService } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function Service() {
    const { slug } = useParams();
    const language = useStore((state: any) => state.Lang);

    // Fetching service detail data
    const { data: Data, isLoading } = GETRequest<WebsiteService>(
        `services-detail/${slug}`,
        'services-detail',
        [language, slug]
    );

    const canonicalUrl = `https://www.example.com/services/${slug}`;

    // Structured data (JSON-LD) for SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: Data?.title || 'Service',
        description:
            Data?.metaDescription || 'A detailed description of the service.',
        url: canonicalUrl,
        image: Data?.image || 'default-image-url',
        provider: {
            '@type': 'Organization',
            name: 'Your Company Name',
            url: 'https://www.example.com',
        },
        keywords: Data?.metaKeywords || 'default, keywords, here',
    };

    return (
        <div className="flex flex-col gap-[40px] py-[40px] lg:px-[100px] md:px-[60px] px-[12px]">
            {/* SEO Meta Tags using react-helmet */}
            <Helmet>
                <title>
                    {Data?.metaTitle || 'Default Title | Service Details'}
                </title>
                <meta
                    name="description"
                    content={
                        Data?.metaDescription ||
                        'Default meta description for the service page.'
                    }
                />
                <meta
                    name="keywords"
                    content={Data?.metaKeywords || 'service, web development'}
                />

                {/* Open Graph for social media */}
                <meta
                    property="og:title"
                    content={
                        Data?.metaTitle || 'Default Title | Service Details'
                    }
                />
                <meta
                    property="og:description"
                    content={
                        Data?.metaDescription ||
                        'Default meta description for the service page.'
                    }
                />
                <meta
                    property="og:image"
                    content={Data?.image || 'default-image-url'}
                />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />

                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={
                        Data?.metaTitle || 'Default Title | Service Details'
                    }
                />
                <meta
                    name="twitter:description"
                    content={
                        Data?.metaDescription ||
                        'Default meta description for the service page.'
                    }
                />
                <meta
                    name="twitter:image"
                    content={Data?.image || 'default-image-url'}
                />

                {/* Canonical URL */}
                <link rel="canonical" href={canonicalUrl} />
                <link rel="icon" href="/svg/logoMain.svg" type="image/x-icon" />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            {isLoading ? (
                <div className="h-[48px] bg-neutral-700 rounded w-[60%] mx-auto animate-pulse"></div>
            ) : (
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rb-5 mb-5 text-4xl text-center font-bold md:mb-6 md:text-5xl lg:text-6xl"
                >
                    {Data?.title}
                </motion.h2>
            )}

            {isLoading ? (
                <div className="p-[36px] rounded-3xl shadow-2xl animate-pulse space-y-4">
                    <div className="h-4 w-[90%] bg-neutral-700 rounded"></div>
                    <div className="h-4 w-[95%] bg-neutral-700 rounded"></div>
                    <div className="h-4 w-[85%] bg-neutral-700 rounded"></div>
                    <div className="h-4 w-[80%] bg-neutral-700 rounded"></div>
                    <div className="h-4 w-[92%] bg-neutral-700 rounded"></div>
                    <div className="h-4 w-[70%] bg-neutral-700 rounded"></div>
                    <div className="h-4 w-[60%] bg-neutral-700 rounded"></div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="p-[36px] text-[18px] rounded-3xl shadow-2xl"
                    dangerouslySetInnerHTML={
                        Data && { __html: Data.description }
                    }
                />
            )}
        </div>
    );
}
