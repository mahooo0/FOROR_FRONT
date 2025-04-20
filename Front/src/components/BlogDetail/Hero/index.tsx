import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import Helmet
import SocialShare from '../Socials';
import GETRequest from '@/helpers/Requests/Query';
import { useStore } from '@/helpers/StateManegment';
import { Blog } from '@/helpers/Requests/Types';

export default function BlogDetailHero() {
    const language = useStore((state) => state.Lang) || 'az';
    const { slug } = useParams();
    const { data: Blog, isLoading } = GETRequest<Blog>(
        `blog-detail/${slug}`,
        'blog-detail',
        [language, slug]
    );

    const blogUrl = Blog ? `${window.location.origin}/blog/${Blog.slug}` : ''; // Assuming the full URL for the blog post

    return (
        <section className="flex flex-col gap-[40px] py-[40px] lg:px-[100px] md:px-[60px] px-[12px]">
            {/* Add SEO using Helmet */}
            <Helmet>
                <title>{isLoading ? 'Loading...' : Blog?.metaTitle}</title>
                <meta
                    name="description"
                    content={isLoading ? 'Loading...' : Blog?.metaDescription}
                />
                <meta name="keywords" content={Blog?.metaKeywords || ''} />

                {/* Canonical URL */}
                <link rel="canonical" href={blogUrl} />

                {/* Open Graph Tags */}
                <meta
                    property="og:title"
                    content={isLoading ? 'Loading...' : Blog?.metaTitle}
                />
                <meta
                    property="og:description"
                    content={isLoading ? 'Loading...' : Blog?.metaDescription}
                />
                <meta property="og:image" content={Blog?.image || ''} />
                <meta property="og:url" content={blogUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Your Blog Site Name" />

                {/* Twitter Card Tags */}
                <meta
                    name="twitter:title"
                    content={isLoading ? 'Loading...' : Blog?.metaTitle}
                />
                <meta
                    name="twitter:description"
                    content={isLoading ? 'Loading...' : Blog?.metaDescription}
                />
                <meta name="twitter:image" content={Blog?.image || ''} />
                <meta name="twitter:card" content="summary_large_image" />

                {/* Robots meta tag to control indexing */}
                <meta name="robots" content="index, follow" />

                {/* Structured data (Schema.org) for articles */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: Blog?.title,
                        image: Blog?.image,
                        author: {
                            '@type': 'Person',
                            name: 'Author Name', // Replace with the actual author's name
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'Your Blog Site Name',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'Your logo URL', // Replace with your site logo URL
                            },
                        },
                        description: Blog?.metaDescription,
                    })}
                </script>
            </Helmet>

            {isLoading ? (
                <div className="h-[48px] bg-neutral-700 rounded w-[60%] mx-auto animate-pulse" />
            ) : (
                <h2 className="rb-5 text-4xl text-center font-bold md:text-5xl lg:text-6xl">
                    {Blog?.title}
                </h2>
            )}

            {isLoading ? (
                <div className="w-full aspect-video bg-neutral-800 rounded-2xl animate-pulse" />
            ) : (
                <img
                    loading="lazy"
                    src={Blog?.image}
                    className="w-full rounded-2xl max-h-[600px] object-cover"
                    alt="Blog hero"
                />
            )}

            {isLoading ? (
                <div className="flex flex-col gap-3 animate-pulse">
                    <div className="h-4 w-full bg-neutral-800 rounded" />
                    <div className="h-4 w-5/6 bg-neutral-800 rounded" />
                    <div className="h-4 w-4/6 bg-neutral-800 rounded" />
                    <div className="h-4 w-3/4 bg-neutral-800 rounded" />
                    <div className="h-4 w-2/4 bg-neutral-800 rounded" />
                </div>
            ) : (
                <div
                    className="lg:text-xl text-base"
                    dangerouslySetInnerHTML={{
                        __html: Blog?.description || '',
                    }}
                ></div>
            )}

            {!isLoading && <SocialShare />}
        </section>
    );
}
