import React from 'react';
import Spline from '@splinetool/react-spline';
import { useStore } from '@/helpers/StateManegment';
import GETRequest from '@/helpers/Requests/Query';
import { AbutDev } from '@/helpers/Requests/Types';
import { useTranslation } from 'react-i18next';

type ImageProps = {
    src: string;
    alt?: string;
};

type Props = {
    heading: string;
    description: string;
    image: ImageProps;
};

export type Layout3Props = React.ComponentPropsWithoutRef<'section'> &
    Partial<Props>;

export const AboutDevHero = () => {
    const language = useStore((state) => state.Lang) || 'az';

    const { data: Data, isLoading } = GETRequest<AbutDev>('rewue', 'rewue', [
        language,
    ]);
    const { t } = useTranslation();
    if (isLoading) {
        // ⛔ Skeleton View
        return (
            <section
                className="px-[5%] flex flex-col gap-10 animate-pulse"
                data-scroll-section
            >
                <div className="h-[48px] bg-neutral-700 rounded w-[60%] mx-auto"></div>
                <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                    <div className="flex flex-col gap-4">
                        <div className="h-10 w-2/3 bg-neutral-700 rounded"></div>
                        <div className="h-4 w-full bg-neutral-800 rounded"></div>
                        <div className="h-4 w-5/6 bg-neutral-800 rounded"></div>
                        <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
                    </div>
                    <div className="aspect-square bg-neutral-800 rounded-xl"></div>
                </div>
            </section>
        );
    }

    // ✅ Real Content
    return (
        <section
            data-scroll-section
            id="relume"
            className="px-[5%] flex flex-col gap-10"
        >
            <h2 className="rb-5 mb-5 text-4xl text-center font-bold md:mb-6 md:text-5xl lg:text-6xl">
                {t('Proqramlasdirma haqqinda')}
            </h2>
            <div className="">
                <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                    <div className="order-2 md:order-1">
                        <h2 className="rb-5 mb-5 text-xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                            {Data?.title}
                        </h2>
                        <p className="md:text-md"> {Data?.description}</p>
                    </div>
                    <div className="order-1 md:order-2 bg-[#222222]">
                        <img
                            loading="lazy"
                            src={Data?.image}
                            alt={Data?.image}
                            className="w-full object-cover max-lg:block hidden aspect-square"
                        />
                        <div className="relative w-full aspect-square max-lg:hidden block">
                            <Spline
                                scene="https://prod.spline.design/dyCB-x3D4JdINOjF/scene.splinecode"
                                className="w-full object-cover aspect-square max-xl:hidden block"
                            />
                            <Spline
                                scene="https://prod.spline.design/puqnzC8eTKRvKPQn/scene.splinecode"
                                className="w-full object-cover aspect-square xl:hidden block"
                            />
                            <div className="absolute bottom-[20px] right-0 xl:h-[50px] border border-black h-[40px] bg-black flex justify-center items-center xl:text-xl text-lg rounded-xl xl:w-[30%] w-[38%] text-white">
                                {t('type something')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Layout3Defaults: Props = {
    heading: 'Long heading is what you see here in this feature section',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique...',
    image: {
        src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
        alt: 'Relume placeholder image',
    },
};
