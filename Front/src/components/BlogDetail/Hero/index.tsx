import { useParams } from 'react-router-dom';
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
    return (
        <section className="flex flex-col gap-[40px] py-[40px] lg:px-[100px] md:px-[60px] px-[12px]">
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
