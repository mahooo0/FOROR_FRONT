import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Card2() {
    const [isHover, setIsHover] = React.useState(false);
    const { t } = useTranslation();

    return (
        <div
            className={`h-[360px] max-sm:h-[400px]  xl:col-span-9 lg:col-span-8 col-span-12 ${
                isHover ? 'rounded-[9px]' : ' rounded-[24px]'
            }   border border-black/20 duration-300  relative overflow-hidden flex flex-col justify-between px-[14px] py-[18px]`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className=" w-full h-full  absolute top-[-24%] max-sm:top-[-70%] right-[-5%] z-0 blur-xl flex justify-end items-end overflow-hidden">
                <img
                    loading="lazy"
                    src="/images/Card2.png"
                    alt=""
                    className={`w-[85%] object-cover ${
                        isHover ? 'opacity-100' : ' opacity-0'
                    }  duration-700`}
                />
            </div>
            <p className="text-[32px] font-semibold z-10">{t('Includes')} </p>
            <div className="w-full flex justify-between md:items-end items-start z-10 md:flex-row flex-col gap-[12px]">
                <p className="z-10 xl:text-[24px] text-[20px] w-[180px]">
                    {t('Custom_Design')}
                </p>
                <div className="flex gap-[12px] h-full">
                    <div className="p-[14px] bg-black/8 rounded-[8px] flex flex-col justify-between items-center text-center gap-[90px] max-sm:gap-10 xl:max-w-[150px] lg:max-w-[100px] md:max-w-[120px] max-w-[29%]">
                        <p className=" xl:text-[24px] text-[20px] max-sm:text-base font-semibold">
                            ADMIN PANEL
                        </p>
                        <p className="xl:text-base lg:text-[12px] text-base max-sm:text-sm">
                            {t('For Website Managment')}
                        </p>
                    </div>
                    <div className="p-[14px] bg-black/8 rounded-[8px] flex flex-col h-full justify-between items-center text-center gap-[90px] max-sm:gap-10 xl:max-w-[150px] lg:max-w-[100px] md:max-w-[120px] max-w-[29%]">
                        <img
                            loading="lazy"
                            src="/svg/language.svg"
                            alt=""
                            className="w-[50px] aspect-square"
                        />{' '}
                        <p> {t('Multi Langulart')}</p>
                    </div>
                    <div className="p-[14px] bg-black/8 rounded-[8px] h-full flex flex-col justify-between items-center text-center gap-[90px] max-sm:gap-10 xl:max-w-[150px] lg:max-w-[100px] md:max-w-[120px] max-w-[29%]">
                        <p className=" xl:text-[24px] text-[20px] max-sm:text-base font-semibold">
                            SEO
                        </p>
                        <p className="xl:text-base lg:text-[12px] text-base max-sm:text-sm">
                            {t('promotion')}
                        </p>{' '}
                    </div>
                </div>
            </div>
        </div>
    );
}
