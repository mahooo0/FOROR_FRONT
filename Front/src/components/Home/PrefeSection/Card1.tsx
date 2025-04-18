import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Card1() {
    const [isHover, setIsHover] = React.useState(false);
    const { t } = useTranslation();

    return (
        <div
            className={`h-[360px]  xl:col-span-3 lg:col-span-4 col-span-12 ${
                isHover ? 'rounded-[9px]' : ' rounded-[24px]'
            }   border border-black/20 duration-300  relative overflow-hidden flex flex-col justify-between px-[14px] py-[18px]`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className=" w-full h-full  absolute lg:top-0 md:top-[60%] max-sm:top-0 left-0 z-0 blur-xl flex justify-end items-end overflow-hidden">
                <img
                    loading="lazy"
                    src="/images/Card1.png"
                    alt=""
                    className={`w-full object-cover ${
                        isHover ? 'opacity-100' : ' opacity-0'
                    }  duration-700`}
                />
            </div>
            <p className="text-[32px] font-semibold z-10">{t('Big Idea')}</p>
            <p className="z-10 text-[20px]">{t('card1_desc')}</p>
        </div>
    );
}
