import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Card4() {
    const [isHover, setIsHover] = React.useState(false);
    const { t } = useTranslation();

    return (
        <div
            className={`h-[360px]  xl:col-span-3 lg:col-span-4 col-span-12 ${
                isHover ? 'rounded-[9px]' : ' rounded-[24px]'
            }   border !border-black/20  duration-300  relative overflow-hidden items-center flex flex-col justify-between text-center px-[14px] py-[18px]`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className=" hidden w-full h-full bg-[#222222]  absolute top-0 left-0 z-0 blur-xl lg:flex justify-end items-end overflow-hidden">
                <img
                    loading="lazy"
                    src="/images/Card1.png"
                    alt=""
                    className={`w-full object-cover ${
                        isHover ? 'opacity-100' : ' opacity-0'
                    }  duration-700`}
                />
            </div>
            <p className="text-[40px] font-semibold w-full z-10">{t('Grow')}</p>
            <img
                loading="lazy"
                src="/svg/ten.svg"
                alt=""
                className=" absolute lg:w-full md:w-1/2 w-full h-full lg:bg-transparent bg-black  top-0 lg:left-0 object-cover"
            />
            {/* <p className="z-10 text-[200px] leading-9 font-semibold">10</p> */}
            <p className="text-[30px] font-semibold w-full z-10">
                {t('Times faster')}
            </p>
        </div>
    );
}
