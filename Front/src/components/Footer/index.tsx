import { scrollToId } from '@/helpers/Scroll/ScrollTo';
import { Link } from 'react-router-dom';
import GETRequest from '@/helpers/Requests/Query';
import { useStore } from '@/helpers/StateManegment';
import { ContactInfos, ServiceItem, Social } from '@/helpers/Requests/Types';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    // const [isLoading, setIsLoading] = useState(true);
    const language = useStore((state) => state.Lang) || 'az';
    const { t } = useTranslation();

    const { data: ContactInfos, isLoading: contactLoading } = GETRequest<
        ContactInfos[]
    >('contact-infos', 'contact-infos', [language]);
    const { data: sociaıMedia, isLoading: socialLoading } = GETRequest<
        Social[]
    >('social', 'social', [language]);
    const { data: services, isLoading: servicesLoading } = GETRequest<
        ServiceItem[]
    >('services', 'services', [language]);

    const isLoading = servicesLoading || contactLoading || socialLoading;
    if (isLoading) {
        // 🔁 Skeleton Loader
        return (
            <footer className="bg-[#222222] sticky top-0 font_base lg:px-[100px] md:px-[60px] px-[12px] mt-[100px] py-[60px] text-white animate-pulse">
                <div className="flex flex-row flex-wrap justify-between max-md:flex-col gap-10">
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-3 items-center">
                            <div className="h-[47px] w-[47px] bg-neutral-700 rounded" />
                            <div className="h-8 w-[120px] bg-neutral-700 rounded" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-[80px] bg-neutral-700 rounded" />
                            <div className="h-4 w-[120px] bg-neutral-700 rounded" />
                            <div className="h-4 w-[150px] bg-neutral-700 rounded" />
                        </div>
                        <div className="flex gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 w-6 bg-neutral-700 rounded"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-row gap-[60px] max-md:flex-col">
                        {[...Array(2)].map((_, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                                <div className="h-6 w-[100px] bg-neutral-700 rounded" />
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-4 w-[120px] bg-neutral-800 rounded"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-10 h-12 bg-neutral-800 w-3/4 rounded" />
                <div className="w-full border-t border-white mt-6 pt-[32px] text-[14px] flex justify-between flex-wrap gap-2">
                    <div className="h-4 w-[200px] bg-neutral-700 rounded" />
                </div>
            </footer>
        );
    }

    // ✅ Real Footer
    return (
        <footer className="bg-[#222222] sticky top-0 font_base lg:px-[100px] md:px-[60px] px-[12px] mt-[100px] py-[60px] text-white">
            <div className="flex flex-row flex-wrap justify-between max-md:flex-col gap-10">
                <div className="flex flex-col justify-between gap-5 ">
                    <div>
                        <Link
                            to={'/'}
                            className="flex flex-row gap-2 items-center fill-white "
                        >
                            <img
                                loading="lazy"
                                src="/svg/logoMain.svg"
                                alt=""
                                className="h-[47px] max-sm:h-[30px]"
                            />
                            <h2 className="font_base text-[32px] max-sm:text-[20px] block">
                                Fooror
                            </h2>
                        </Link>
                    </div>
                    <div className="text-[14px] font-normal">
                        <p className="text-[14px] font-semibold">
                            {t('Contact')}
                        </p>
                        {ContactInfos?.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-row gap-4 text-white items-center"
                            >
                                <p className="text-base">{item.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row gap-3">
                        {sociaıMedia?.map((item, i) => (
                            <Link to={item.url} key={i}>
                                <img
                                    loading="lazy"
                                    src={item.image}
                                    className="w-6 aspect-square"
                                    alt=""
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-row gap-[60px] max-md:flex-col">
                    <nav className="flex flex-col gap-2 font-semibold text-[16px]">
                        <p className="text-[24px]"> {t('Pages')}</p>
                        <Link to={'/'}> {t('Home')}</Link>
                        <Link to={'/about'}>{t('Haqqımızda')}</Link>
                        <Link to={'/about-development'}>
                            {t('Proqramlasdirma haqqinda')}
                        </Link>
                        <Link to={'/price-list'}>{t('Price List')}</Link>
                        <button
                            className="w-fit"
                            onClick={() => {
                                scrollToId('contact');
                            }}
                        >
                            {t('Contact')}
                        </button>
                        <Link to={'/blogs'}> {t('Blog')}</Link>
                        <Link to={'/worcks'}>{t('Portfolio')}</Link>
                    </nav>

                    <nav className="flex flex-col gap-2 font-semibold text-[16px]">
                        <p className="text-[24px]">{t('Services')}</p>
                        {services?.map((item) => (
                            <Link
                                to={`/service/${item.slug[language]}`}
                                onClick={() => {
                                    localStorage.setItem(
                                        'slug',
                                        JSON.stringify(item.slug)
                                    );
                                }}
                            >
                                {item.title}
                            </Link>
                        ))}
                        {/* <Link to={'/'}>Veb saytlara texniki dəstək</Link>
                        <Link to={'/'}>Korporativ mail xidməti</Link>
                        <Link to={'/'}>Online ödəmə sistemi inteqrasiyası</Link> */}
                    </nav>
                </div>
            </div>

            <div className="text-[#FFD711] font_base xl:text-[96px] lg:text-[60px] md:text-[50px] text-[40px]">
                {t('LEST MAKE A FOROR')}
            </div>

            <div className="w-full border-t border-white text-[14px] flex flex-row justify-between pt-[32px] flex-wrap gap-2">
                <p>© 2025 Fooror.{t('All rights reserved.')} </p>
            </div>
        </footer>
    );
}
