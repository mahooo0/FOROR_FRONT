import HeaderSelect from './Select';
import { Link } from 'react-router-dom';
import PopUP from './PopUP';
import { scrollToId } from '@/helpers/Scroll/ScrollTo';
import { useTranslation } from 'react-i18next';
import { ServiceItem } from '@/helpers/Requests/Types';
import GETRequest from '@/helpers/Requests/Query';
import { useStore } from '@/helpers/StateManegment';

export default function Nawbar() {
    const { t } = useTranslation();
    const language = useStore((state) => state.Lang) || 'az';

    const { data: services } = GETRequest<ServiceItem[]>(
        'services',
        'services',
        [language]
    );
    return (
        <nav className="flex flex-row xl:gap-6 gap-4  h-full items-center">
            <div className="flex flex-row gap-2 items-center ">
                <PopUP />
                <Link to={'/'} className="flex flex-row gap-2 items-center ">
                    <img
                        loading="lazy"
                        src="/svg/logoMain.svg"
                        alt=""
                        className="h-[47px] max-sm:h-[30px]"
                    />
                    <h2 className="font_base text-[32px] max-sm:text-[20px] block max-xl:hidden max-lg:block ">
                        Fooror
                    </h2>
                </Link>
            </div>
            <ul className="lg:flex flex-row lg:gap-4 font-sans pt-[10px] hidden  xl:text-base min-lg:text-[14px]  font-[500] text-nowrap text-[#222222] items-center h-full">
                <li>
                    <Link to={'/'}>{t('Home')}</Link>
                </li>
                <li className="h-full">
                    <HeaderSelect
                        title={t('Services')}
                        options={
                            services?.map((item) => {
                                return {
                                    title: item.title,
                                    link: `/service/${item.slug[language]}`,
                                };
                            })
                            //     [
                            //     {
                            //         title: 'Veb saytların hazırlanması',
                            //         link: '/service/id',
                            //     },
                            //     {
                            //         title: 'Veb saytlara texniki dəstək',
                            //         link: '/about-development',
                            //     },
                            //     {
                            //         title: 'Korporativ mail xidməti',
                            //         link: '/about-development',
                            //     },
                            //     {
                            //         title: 'Online ödəmə sistemi inteqrasiyası',
                            //         link: '/about-development',
                            //     },
                            // ]
                        }
                    />
                </li>
                <li className="h-full">
                    <HeaderSelect
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
                    <Link to={'/blogs'}>{t('Blog')}</Link>
                </li>
                <li>
                    <Link to={'/worcks'}>{t('Portfolio')}</Link>
                </li>
                <li>
                    {' '}
                    <Link to={'/price-list'}>{t('Price List')}</Link>
                </li>{' '}
                <li>
                    <button
                        className="cursor-pointer"
                        onClick={() => {
                            scrollToId('contact');
                        }}
                    >
                        {t('Contact')}
                    </button>
                </li>
            </ul>
        </nav>
    );
}
