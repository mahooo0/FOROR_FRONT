import AboutSection from '@/components/Home/About';
import AboutDevelopmentSection from '@/components/Home/AboutDEvelopment';
import CompaniesSection from '@/components/Home/Companies';
import Hero from '@/components/Home/Hero';
import PrefeSection from '@/components/Home/PrefeSection';
import PriceList from '@/components/Home/PriceList';
import ServicesSection from '@/components/Home/services';
import WorcksSection from '@/components/Home/Worcks';
import GETRequest from '@/helpers/Requests/Query';
import { MetaData } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Home() {
    const language = useStore((state: any) => state.Lang);

    // Fetch SEO data
    const { data: seo } = GETRequest<MetaData[]>('seo', 'seo', [language]);

    // Find the SEO data for the "home page"
    const homePageSeo = seo?.find(
        (item) => item.type.toLowerCase() === 'home page'
    );

    // Default values for SEO if backend data is not available
    const defaultTitle =
        'Saytların hazırlanması, saytlarin yigilmasi,sayt sifarisi | FoororSayt';
    const defaultDescription =
        'Saytlarin hazirlanmasi, saytlarin yigilmasi, sayt sifarisi, saytlarin yaradilmasi en serfeli qiymetlerle. Cari saytlarda düzəlişlərin icrası. Vebsayt yigilmasi';
    const defaultKeywords =
        'saytlarin hazirlanmasi, saytlarin yigilmasi, veb sayt, sayt hazirlamaq, veb studiyalar, sayt sifarisi, website hazirlanmasi, sayt sifarişi, sifarişlə saytların yığılması, vebsaytlarin hazirlanmasi, vebsayt yigilmasi';
    const companyName = 'FoororSayt';
    const siteUrl = 'https://foororsayt.az';
    const logoUrl = `${siteUrl}/svg/logoMain.svg`;

    // Schema.org structured data for Organization
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: companyName,
        url: siteUrl,
        logo: logoUrl,
        sameAs: [
            'https://www.facebook.com/foororsayt', // Replace with actual social links
            'https://www.instagram.com/foororsayt',
            'https://www.linkedin.com/company/foororsayt',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+994-55-441-49-24', // Replace with actual phone
            contactType: 'customer service',
        },
    };

    // Schema.org structured data for BreadcrumbList
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: companyName,
                item: siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Saytlarin hazirlanmasi',
                item: `${siteUrl}/services/pesekar-saytlarin-hazirlanmasi`,
            },
        ],
    };

    // Schema.org structured data for WebSite
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: siteUrl,
        name: homePageSeo?.metaTitle || defaultTitle,
        description: homePageSeo?.metaDescription || defaultDescription,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <HelmetProvider>
            {/* Dynamic SEO content */}
            <Helmet>
                {/* Primary Meta Tags */}
                <html lang={language || 'az'} />
                <title>{homePageSeo?.metaTitle || defaultTitle}</title>
                <meta
                    name="description"
                    content={homePageSeo?.metaDescription || defaultDescription}
                />
                <meta
                    name="keywords"
                    content={homePageSeo?.metaKeywords || defaultKeywords}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={siteUrl} />
                <meta
                    property="og:title"
                    content={homePageSeo?.metaTitle || defaultTitle}
                />
                <meta
                    property="og:description"
                    content={homePageSeo?.metaDescription || defaultDescription}
                />
                <meta property="og:image" content={logoUrl} />
                <meta property="og:site_name" content={companyName} />
                <meta
                    property="og:locale"
                    content={language === 'en' ? 'en_US' : 'az_AZ'}
                />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@foororsayt" />
                <meta
                    name="twitter:title"
                    content={homePageSeo?.metaTitle || defaultTitle}
                />
                <meta
                    name="twitter:description"
                    content={homePageSeo?.metaDescription || defaultDescription}
                />
                <meta name="twitter:image" content={logoUrl} />

                {/* Canonical URL */}
                <link rel="canonical" href={siteUrl} />

                {/* Favicon and other links */}
                <link rel="icon" href={logoUrl} type="image/svg+xml" />
                <link
                    rel="apple-touch-icon"
                    href={`${siteUrl}/images/apple-touch-icon.png`}
                />

                {/* Additional SEO meta tags */}
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
                <meta name="author" content={companyName} />
                <meta name="geo.region" content="AZ" />
                <meta name="geo.placename" content="Baku" />
                <meta name="ICBM" content="40.4093, 49.8671" />
                <meta name="geo.position" content="40.4093;49.8671" />
                {/* Schema.org JSON-LD structured data */}
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(websiteSchema)}
                </script>
            </Helmet>

            <main className="flex flex-col xl:gap-[80px] gap-10">
                <Hero />
                <AboutSection />
                <ServicesSection />
                <WorcksSection />
                <CompaniesSection />
                <AboutDevelopmentSection />
                <PrefeSection />
                <PriceList />
            </main>
        </HelmetProvider>
    );
}
