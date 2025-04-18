import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import WhiteBtn from '@/components/Buttons';
import { Link } from 'react-router-dom';
import { useStore } from '@/helpers/StateManegment';
import { useTranslation } from 'react-i18next';
import GETRequest from '@/helpers/Requests/Query';
import { Bunner } from '@/helpers/Requests/Types';

export default function AboutDevelopmentSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const language = useStore((state: any) => state.Lang);
    const { t } = useTranslation();

    const { data: Data, isLoading: loading } = GETRequest<Bunner>(
        'home/about-dev',
        'home/about-dev',
        [language]
    );
    const baseDelay = 0.5;

    const imageVariants = {
        hidden: { y: 100 },
        visible: (i: number) => ({
            y: 0,
            transition: {
                delay: baseDelay + i * 0.3,
                duration: 0.8,
                ease: 'easeOut',
            },
        }),
    };

    const articleVariants = {
        hidden: { opacity: 1, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: baseDelay + 3 * 0.3 + 0.3,
                duration: 1,
            },
        },
    };

    return (
        <section
            data-scroll-section
            ref={ref}
            className="lg:pl-[80px] md:px-[60px] px-[12px] items-center xl:pr-0 lg:pr-[60px] md:pr-[60px] pr-[12px] pt-[80px] min-h-[780px] relative pb-[80px] bg-[#222222] w-full h-fit overflow-hidden text-white flex xl:flex-row flex-col gap-5"
        >
            <motion.article
                className="xl:w-[40%] w-full max-lg:w-full flex flex-col gap-5"
                variants={articleVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {loading ? (
                    <div className="flex flex-col gap-4 animate-pulse">
                        <div className="h-4 w-[100px] bg-gray-700 rounded" />
                        <div className="h-10 w-[80%] bg-gray-700 rounded" />
                        <div className="h-4 w-[90%] bg-gray-700 rounded" />
                        <div className="h-4 w-[70%] bg-gray-700 rounded" />
                        <div className="h-10 w-[120px] bg-gray-700 rounded mt-4" />
                    </div>
                ) : (
                    <>
                        <p className="text-base font-semibold 2xl:text-lg">
                            {Data?.preTitle}{' '}
                        </p>
                        <h3 className="text-4xl 2xl:text-6xl max-sm:text-[32px] font-bold">
                            {Data?.title}{' '}
                        </h3>
                        <p className="text-[18px] 2xl:text-xl max-sm:text-base font-medium opacity-60">
                            {Data?.description}
                        </p>
                        <Link to={'/about-development'}>
                            <WhiteBtn
                                text={t('Read more')}
                                className="w-fit font-sans !px-8 !py-5 shadow-2xl rounded-[8px] !text-[18px] max-sm:!px-[24px] max-sm:!py-[12px] max-sm:!text-[14px]"
                            />
                        </Link>
                    </>
                )}
            </motion.article>

            <div className="xl:w-[60%] w-[100%] max-lg:w-full h-[600px] max-sm:h-[230px] flex relative">
                {loading ? (
                    <>
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`absolute bg-gray-700 animate-pulse rounded-lg ${
                                    i === 0
                                        ? 'xl:w-[320px] w-[50%] right-0 top-0'
                                        : i === 1
                                        ? 'xl:w-[320px] w-[50%] right-[26%] top-[220px] max-sm:top-[80px]'
                                        : 'xl:w-[320px] w-[50%] right-[52%] top-[400px] max-sm:top-[160px]'
                                } h-[200px]`}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <motion.img
                            custom={0}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            variants={imageVariants}
                            src="/images/AboutDev3.webp"
                            alt=""
                            className="absolute xl:w-[320px] lg:w-[40%] md:w-[45%] w-[50%] xl:right-[80px] right-0 top-0"
                        />
                        <motion.img
                            custom={1}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            variants={imageVariants}
                            src="/images/AboutDev2.webp"
                            alt=""
                            className="absolute xl:w-[320px] lg:w-[40%] md:w-[45%] w-[50%] xl:right-[280px] right-[26%] top-[220px] max-sm:top-[80px]"
                        />
                        <motion.img
                            custom={2}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            variants={imageVariants}
                            src="/images/AboutDev1.webp"
                            alt=""
                            className="absolute xl:w-[320px] lg:w-[40%] md:w-[45%] w-[50%] xl:right-[480px] right-[52%] top-[400px] max-sm:top-[160px]"
                        />
                    </>
                )}
            </div>
        </section>
    );
}
