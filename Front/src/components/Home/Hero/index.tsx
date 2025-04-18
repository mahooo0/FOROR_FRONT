import { BlackBtn } from '@/components/Buttons';
import { scrollToId } from '@/helpers/Scroll/ScrollTo';
import { motion } from 'framer-motion';
import { useStore } from '@/helpers/StateManegment';
import { useTranslation } from 'react-i18next';
import GETRequest from '@/helpers/Requests/Query';
import { Bunner } from '@/helpers/Requests/Types';

export default function Hero() {
    const language = useStore((state: any) => state.Lang);
    const { t } = useTranslation();

    const { data: Hero, isLoading: loading } = GETRequest<Bunner>(
        'home/hero',
        'home/hero',
        [language]
    );
    return (
        <section
            className="relative overflow-hidden max-sm:max-h-screen h-fit border-b border-black/20"
            // style={{ willChange: 'opacity, transform' }}
        >
            <div
                style={{
                    backgroundImage: `linear-gradient(to bottom, 
                        rgba(255, 255, 255, 1) 0%, 
                        rgba(255, 255, 255, 0) 50%, 
                        rgba(255, 255, 255, 1) 100%)`,
                }}
                className="w-full z-10 flex items-center flex-col lg:px-[100px] md:px-[30px] px-[12px] gap-10 relative border-b border-black/20"
            >
                <article className="xl:w-[70%] w-fit xl:px-0 pt-[40px] text-center flex flex-col gap-3 h-fit justify-center items-center">
                    {loading ? (
                        <div className="w-full flex flex-col gap-4 items-center animate-pulse">
                            <div className="h-4 w-[60%] bg-gray-300 rounded" />
                            <div className="h-10 w-[80%] bg-gray-300 rounded" />
                            <div className="h-4 w-[70%] bg-gray-300 rounded" />
                            <div className="h-[80vh] w-[80vw] bg-gray-300 rounded mt-4" />
                        </div>
                    ) : (
                        <>
                            <p className="lg:text-base md:text-[12px] max-sm:font-medium max-sm:text-[10px] font-bold">
                                ✦  {Hero?.preTitle}
                            </p>

                            <h1 className="xl:text-[44px] lg:text-[36px] md:text-[30px] max-sm:text-[32px] max-lg:text-[36px] font-bold">
                                {Hero?.title}
                            </h1>

                            <h2 className="lg:text-[14px] md:text-[12px] max-sm:text-[11px] max-w-[680px] opacity-60">
                                {Hero?.description}
                            </h2>

                            <BlackBtn
                                action={() => scrollToId('contact')}
                                text={t('teklif_al')}
                                className="w-fit font-sans !px-8 !py-5 shadow-2xl rounded-[8px] !text-[18px] max-sm:!px-[24px] max-sm:!py-[12px] max-sm:!text-[14px]"
                            />
                        </>
                    )}
                </article>

                {!loading && (
                    <>
                        <div className="sm:flex hidden xl:w-[70%] w-full flex-row relative">
                            <motion.img
                                src={`/images/heroMobile_${language}.webp`}
                                alt="Hero small"
                                className="w-[26%] absolute left-[6%] top-[20%] z-20"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.6 }}
                            />
                            <motion.img
                                src={`/images/HeroDesctop_${language}.webp`}
                                alt="Hero large"
                                className="w-[80%] ml-[20%] z-10"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                ease: 'easeOut',
                                delay: 0.7,
                            }}
                            className="max-sm:block hidden w-[70%] "
                        >
                            <img
                                loading="lazy"
                                src={`/images/heroMobile_${language}.webp`}
                                alt="Hero small"
                                className="w-full"
                            />
                        </motion.div>
                    </>
                )}
            </div>

            <div
                className="w-full h-full absolute top-0 left-0 z-0 opacity-10"
                style={{
                    backgroundImage: "url('/images/black.png')",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '6%',
                }}
            ></div>
        </section>
    );
}
