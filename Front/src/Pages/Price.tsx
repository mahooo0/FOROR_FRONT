import PriceList from '@/components/Home/PriceList';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useStore } from '@/helpers/StateManegment';
import GETRequest from '@/helpers/Requests/Query';

export default function Price() {
    const language = useStore((state: any) => state.Lang); // Current language (az, en, ru)

    const { data: seoData } = GETRequest<any>(`seo/price`, 'seo/price', [
        language,
    ]);

    const canonicalUrl = `https://www.example.com/${language}/price`;

    // Structured data (JSON-LD) for SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name:
            seoData?.metaTitle ||
            'Price List | Affordable Web Development Services',
        description:
            seoData?.metaDescription ||
            'Explore our competitive price list for web development services, including custom websites, e-commerce solutions, and SEO optimization.',
        url: canonicalUrl,
        image: seoData?.image || 'default-image-url',
        publisher: {
            '@type': 'Organization',
            name: 'Your Company Name',
            url: 'https://www.example.com',
        },
        keywords:
            seoData?.metaKeywords ||
            'web development pricing, price list, affordable web development, custom websites, e-commerce solutions',
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    {seoData?.metaTitle ||
                        'Price List | Affordable Web Development Services'}
                </title>
                <meta
                    name="description"
                    content={
                        seoData?.metaDescription ||
                        'Explore our competitive price list for web development services, including custom websites, e-commerce solutions, and SEO optimization.'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        seoData?.metaKeywords ||
                        'web development pricing, price list, affordable web development, custom websites, e-commerce solutions'
                    }
                />
                {/* Open Graph for social media */}
                <meta
                    property="og:title"
                    content={
                        seoData?.metaTitle ||
                        'Price List | Affordable Web Development Services'
                    }
                />
                <meta
                    property="og:description"
                    content={
                        seoData?.metaDescription ||
                        'Explore our competitive price list for web development services, including custom websites, e-commerce solutions, and SEO optimization.'
                    }
                />
                <meta
                    property="og:image"
                    content={seoData?.image || 'default-image-url'}
                />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/svg/logoMain.svg" type="image/x-icon" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={
                        seoData?.metaTitle ||
                        'Price List | Affordable Web Development Services'
                    }
                />
                <meta
                    name="twitter:description"
                    content={
                        seoData?.metaDescription ||
                        'Explore our competitive price list for web development services, including custom websites, e-commerce solutions, and SEO optimization.'
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

            <div className="py-[40px]">
                <PriceList />
            </div>
        </HelmetProvider>
    );
}
