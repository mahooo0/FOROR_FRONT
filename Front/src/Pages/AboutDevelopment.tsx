import DevMap from '@/components/AboutDev/DevMap';
import { AboutDevHero } from '@/components/AboutDev/Hero';
import ToolsSection from '@/components/AboutDev/Tools';
import GETRequest from '@/helpers/Requests/Query';
import { Tool } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function AboutDevelopment() {
    const language = useStore((state) => state.Lang) || 'az';

    // Fetching design tools and dev tools data
    const { data: desingData, isLoading } = GETRequest<Tool[]>(
        'desing-tools',
        'desing-tools',
        [language]
    );
    const { data: devData, isLoading: devloading } = GETRequest<Tool[]>(
        'dev-tools',
        'dev-tools',
        [language]
    );

    // Fetch SEO data for About Development Page
    const { data: seoData } = GETRequest<any>(
        'seo/about-development',
        'seo/about-development',
        [language]
    );

    const { t } = useTranslation();

    // If SEO data is still loading, or other data is loading, show loading state
    // if (seoLoading || isLoading || devloading) {
    //     return <div>Loading...</div>;
    // }

    const canonicalUrl = `https://www.example.com/about-development`;

    // Structured data (JSON-LD) for SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: seoData?.title || 'Your Company Name',
        description:
            seoData?.metaDescription ||
            'A detailed description of the development tools we use.',
        url: canonicalUrl,
        image: seoData?.image || 'default-image-url',
        publisher: {
            '@type': 'Organization',
            name: 'Your Company Name',
            url: 'https://www.example.com',
        },
        keywords:
            seoData?.metaKeywords ||
            'web development, tools, design tools, development tools, professional web design',
    };

    return (
        <HelmetProvider>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>
                    {seoData?.metaTitle ||
                        'About Our Development Process | Web Development Tools'}
                </title>
                <meta
                    name="description"
                    content={
                        seoData?.metaDescription ||
                        'Learn about the development tools we use at our web development company to create stunning websites.'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        seoData?.metaKeywords ||
                        'web development, tools, design tools, development tools'
                    }
                />
                {/* Open Graph for social media */}
                <meta
                    property="og:title"
                    content={
                        seoData?.metaTitle ||
                        'About Our Development Process | Web Development Tools'
                    }
                />
                <meta
                    property="og:description"
                    content={
                        seoData?.metaDescription ||
                        'Learn about the development tools we use at our web development company to create stunning websites.'
                    }
                />
                <meta
                    property="og:image"
                    content={seoData?.image || 'default-image-url'}
                />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />

                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={
                        seoData?.metaTitle ||
                        'About Our Development Process | Web Development Tools'
                    }
                />
                <meta
                    name="twitter:description"
                    content={
                        seoData?.metaDescription ||
                        'Learn about the development tools we use at our web development company to create stunning websites.'
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

            <div className="flex flex-col gap-10 py-10">
                <AboutDevHero />
                <ToolsSection
                    title={t('desing_title')}
                    data={desingData || []}
                    isLoading={isLoading}
                />
                <ToolsSection
                    title={t('dev_title')}
                    data={devData || []}
                    isLoading={devloading}
                />
                <DevMap />
            </div>
        </HelmetProvider>
    );
}
