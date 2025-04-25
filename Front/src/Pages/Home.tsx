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
                        : 'Sayt Hazırlanması, Sayt Sifarişi və Saytların İnkişafı | Müasir Veb Həllər'}
                </title>
                <meta
                    name="description"
                    content={
                        homePageSeo
                            ? homePageSeo.metaDescription
                            : 'Saytların hazırlanmasında peşəkar xidmətlər təklif edirik. Mobil uyğun, müasir dizayna sahib və SEO dostu saytlar yaradaraq işinizin onlayn uğurunu təmin edirik. Bizim sayt sifarişi xidmətlərimizlə tanış olun!'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        homePageSeo
                            ? homePageSeo.metaKeywords
                            : 'sayt hazırlama, sayt sifarişi, mobil uyğun sayt, SEO dostu saytlar, veb dizayn, veb inkişaf, biznes üçün sayt, saytlarda optimizasiya'
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
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={
                        homePageSeo
                            ? homePageSeo.metaTitle
                            : 'Web Development Company | Professional Web Development Services'
                    }
                />
                <meta
                    name="twitter:description"
                    content={
                        homePageSeo
                            ? homePageSeo.metaDescription
                            : 'We provide professional web development services including custom websites, e-commerce solutions, and SEO optimization for businesses of all sizes.'
                    }
                />
                <meta
                    name="twitter:image"
                    content="https://example.com/your-image.jpg"
                />

                <meta property="og:url" content="https://foororsayt.az/" />
                <meta property="og:type" content="website" />
                {/* Favicon link */}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="FoororSayt" />

                <link rel="icon" href="/svg/logoMain.svg" type="image/x-icon" />
                <link rel="canonical" href="https://foororsayt.az/" />

                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                    {`
                    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://foororsayt.az/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Web Development",
            "item": "https://foororsayt.az/services/pesekar-saytlarin-hazirlanmasi"
        }
    ]
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
