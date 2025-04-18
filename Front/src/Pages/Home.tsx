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

    return (
        <HelmetProvider>
            {/* Dynamic SEO content */}
            <Helmet>
                <title>
                    {homePageSeo
                        ? homePageSeo.metaTitle
                        : 'Web Development Company | Professional Web Development Services'}
                </title>
                <meta
                    name="description"
                    content={
                        homePageSeo
                            ? homePageSeo.metaDescription
                            : 'We provide professional web development services including custom websites, e-commerce solutions, and SEO optimization for businesses of all sizes.'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        homePageSeo
                            ? homePageSeo.metaKeywords
                            : 'web development, custom websites, e-commerce solutions, SEO optimization, professional web design'
                    }
                />
                {/* Open Graph for social media */}
                <meta
                    property="og:title"
                    content={
                        homePageSeo
                            ? homePageSeo.metaTitle
                            : 'Web Development Company | Professional Web Development Services'
                    }
                />
                <meta
                    property="og:description"
                    content={
                        homePageSeo
                            ? homePageSeo.metaDescription
                            : 'We provide professional web development services including custom websites, e-commerce solutions, and SEO optimization for businesses of all sizes.'
                    }
                />
                <meta
                    property="og:image"
                    content="https://example.com/your-image.jpg"
                />
                {/* Favicon link */}
                <meta name="robots" content="index, follow" />

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
            <div className="flex flex-col xl:gap-[80px] gap-10">
                <Hero />
                <AboutSection />
                <ServicesSection />
                <WorcksSection />
                <CompaniesSection />
                <AboutDevelopmentSection />
                <PrefeSection />
                <PriceList />
            </div>
        </HelmetProvider>
    );
}
