import { useEffect, useRef } from 'react';
import MobileSelect from './SelectMobile';
import WhiteBtn, { BlackBtn } from '../Buttons';
import { LanguageSelect } from './language';
import { Link } from 'react-router-dom';
import { useStore } from '@/helpers/StateManegment';
import { scrollToId } from '@/helpers/Scroll/ScrollTo';
import { useTranslation } from 'react-i18next';
import GETRequest from '@/helpers/Requests/Query';
import { ServiceItem } from '@/helpers/Requests/Types';

export default function PopUP() {
    const isOpen = useStore((state: any) => state.isMobilePOPupOpen);
    const setIsOpen = useStore((state: any) => state.setIsMobilePOPupOpen);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { t } = useTranslation();
    const language = useStore((state) => state.Lang) || 'az';

    const { data: services } = GETRequest<ServiceItem[]>(
        'services',
        'services',
        [language]
    );
    // 👇 Detect clicks outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                popupRef.current &&
                !popupRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Clean up on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, setIsOpen]);
    return (
        <div className="hidden max-lg:block font_base">
            <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
                <img loading="lazy" src="/svg/headerPOP.svg" alt="" />
            </button>
            <div
                ref={popupRef}
                className={`w-full h-fit bg-white absolute top-[100%] left-0 px-3 py-[21px] border border-black
                        transition-all duration-300 ease-in-out transform z-50
                        ${
                            isOpen
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 -translate-y-4 pointer-events-none'
                        }
                        `}
            >
                <nav className="text-xl ">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link onClick={() => setIsOpen(false)} to={'/'}>
                                {t('Home')}
                            </Link>
                        </li>
                        <li>
                            <MobileSelect
                                title={t('Services')}
                                options={services?.map((item) => {
                                    return {
                                        title: item.title,
                                        link: `/service/${item.slug[language]}`,
                                    };
                                })}
                            />
                        </li>
                        <li>
                            <MobileSelect
                                title={t('Haqqımızda')}
                                options={[
                                    {
                                        title: t('Haqqımızda'),
                                        link: '/about',
                                    },
                                    {
                                        title: t('Proqramlasdirma haqqinda'),
                                        link: '/about-development',
                                    },
                                ]}
                            />
                        </li>
                        <li>
                            <Link
                                onClick={() => setIsOpen(false)}
                                to={'/blogs'}
                            >
                                {t('Blog')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setIsOpen(false)}
                                to={'/worcks'}
                            >
                                {t('Portfolio')}
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setIsOpen(false), scrollToId('contact');
                                }}
                            >
                                {t('Contact')}
                            </button>
                        </li>
                        <li>
                            {' '}
                            <Link
                                onClick={() => setIsOpen(false)}
                                to={'/price-list'}
                            >
                                {t('Price List')}
                            </Link>
                        </li>
                        <BlackBtn
                            action={() => {
                                setIsOpen(false), scrollToId('contact');
                            }}
                            text={t('teklif_al')}
                            className="hidden max-md:block"
                        />
                        <Link
                            to={'https://wa.me/966552660728'}
                            className="w-full"
                        >
                            <WhiteBtn
                                text="+994 055 266 07 28"
                                className="hidden max-md:block w-full"
                            />
                        </Link>

                        <div className="h-fit hidden max-md:block">
                            <LanguageSelect />
                        </div>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
