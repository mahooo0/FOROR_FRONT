import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/swiper-bundle.css';
import { BlogCard } from '@/components/Blogs/Card';
import { useStore } from '@/helpers/StateManegment';
import GETRequest from '@/helpers/Requests/Query';
import { BlogResponse } from '@/helpers/Requests/Types';

const BlogsSwipper = () => {
    const swiperRef = useRef<SwiperCore | null>(null);
    const language = useStore((state) => state.Lang) || 'az';
    // const navigate = useNavigate();
    const { data: Blogs, isLoading } = GETRequest<BlogResponse>(
        `blogs?page=${1}`,
        'blogs',
        [language]
    );

    const skeletonSlides = Array(3).fill(null);

    return (
        <div className="w-full lg:px-[100px] md:px-[60px] relative px-[12px] mx-auto p-6">
            <Swiper
                spaceBetween={20}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                    1280: { slidesPerView: 2 },
                }}
            >
                {isLoading
                    ? skeletonSlides.map((_, index) => (
                          <SwiperSlide key={`skeleton-${index}`}>
                              <div className="flex size-full flex-col items-center justify-start animate-pulse p-4">
                                  <div className="mb-6 w-full">
                                      <div className="aspect-video w-full bg-neutral-800 rounded" />
                                  </div>
                                  <div className="flex w-full flex-col items-start justify-start gap-2">
                                      <div className="h-6 w-3/4 bg-neutral-700 rounded" />
                                      <div className="h-4 w-full bg-neutral-800 rounded" />
                                      <div className="h-4 w-5/6 bg-neutral-800 rounded" />
                                  </div>
                              </div>
                          </SwiperSlide>
                      ))
                    : Blogs?.data.map((item, index) => (
                          <SwiperSlide key={index}>
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
                                      onClick: () =>
                                          console.log('Clicked Read More'),
                                  }}
                              />
                          </SwiperSlide>
                      ))}
            </Swiper>

            {/* Prev Button */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 lg:left-[50px] md:left-[30px] max-sm:hidden left-[20px] z-30 border rounded-xl overflow-hidden cursor-pointer"
            >
                <svg
                    width="41"
                    height="42"
                    viewBox="0 0 41 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-black/12"
                >
                    <path
                        d="M22.0249 16.9961L18.031 21.0022L22.0371 24.9961"
                        stroke="#09090B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Next Button */}
            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 rotate-180 lg:right-[50px]  max-sm:hidden md:right-[30px] right-[20px] z-30 border rounded-xl overflow-hidden cursor-pointer"
            >
                <svg
                    width="41"
                    height="42"
                    viewBox="0 0 41 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-black/12"
                >
                    <path
                        d="M22.0249 16.9961L18.031 21.0022L22.0371 24.9961"
                        stroke="#09090B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default BlogsSwipper;
