import AboutHero from '@/components/About/Hero';
import { Statistics } from '@/components/About/Statistics';
import CompaniesSection from '@/components/Home/Companies';
import ReviueSection from '@/components/Rewiue';
import GETRequest from '@/helpers/Requests/Query';
import { MetaData } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function About() {
    const language = useStore((state: any) => state.Lang);

    // Fetch SEO data for About page
    const { data: seo, isLoading: loading } = GETRequest<MetaData[]>(
        'seo',
        'seo',
        [language]
    );

    // If SEO data is still loading, return a loading spinner or empty component
    if (loading) {
        return <div>Loading...</div>;
    }

    // Find the SEO data for the "about page"
    const aboutPageSeo = seo?.find(
        (item) => item.type.toLowerCase() === 'about page'
    );

    return (
        <HelmetProvider>
            {/* Dynamic SEO content */}
            <Helmet>
                <title>
                    {aboutPageSeo
                        ? aboutPageSeo.metaTitle
                        : 'About Us | Professional Web Development Services'}
                </title>
                <meta
                    name="description"
                    content={
                        aboutPageSeo
                            ? aboutPageSeo.metaDescription
                            : 'Learn more about our web development company and our professional web development services including custom websites, e-commerce solutions, and SEO optimization.'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        aboutPageSeo
                            ? aboutPageSeo.metaKeywords
                            : 'about us, web development, custom websites, e-commerce solutions, SEO optimization'
                    }
                />
                {/* Open Graph for social media */}
                <meta
                    property="og:title"
                    content={
                        aboutPageSeo
                            ? aboutPageSeo.metaTitle
                            : 'About Us | Professional Web Development Services'
                    }
                />
                <meta
                    property="og:description"
                    content={
                        aboutPageSeo
                            ? aboutPageSeo.metaDescription
                            : 'Learn more about our web development company and our professional web development services including custom websites, e-commerce solutions, and SEO optimization.'
                    }
                />
                <meta
                    property="og:image"
                    content="https://example.com/your-image.jpg"
                />
                {/* Favicon link */}
                <link rel="icon" href="/svg/logoMain.svg" type="image/x-icon" />

                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "http://schema.org",
                        "@type": "WebSite",
                        "url": "https://www.yoursite.com",
                        "name": "Your Company Name",
                        "description": "Professional web development services including custom websites, e-commerce solutions, and SEO optimization.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Your Company Name"
                        }
                    }
                    `}
                </script>
            </Helmet>
            <div className="pb-[40px]">
                <AboutHero />
                <Statistics />
                <CompaniesSection />
                <ReviueSection />
            </div>
        </HelmetProvider>
    );
}
