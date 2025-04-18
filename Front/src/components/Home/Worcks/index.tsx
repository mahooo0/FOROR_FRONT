import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard';
import WhiteBtn from '@/components/Buttons';
import { useStore } from '@/helpers/StateManegment';
import { PortfolioResponse } from '@/helpers/Requests/Types';
import GETRequest from '@/helpers/Requests/Query';
import { useTranslation } from 'react-i18next';

export default function WorcksSection() {
    // const loading = false;
    const { t } = useTranslation();

    const language = useStore((state: any) => state.Lang);
    // const { data: Translation, isLoading: Translationloading } =
    //     GETRequest<Translates>('translations', 'translations', [language]);
    const { data: partfolio, isLoading: partfolioloading } =
        GETRequest<PortfolioResponse>('partfolio', 'partfolio', [language]);
    let loading = partfolioloading;
    return (
        <section className="flex flex-col items-center transition-all duration-700 ease-in-out">
            <header className="flex flex-col items-center gap-4 text-[#222222] mb-10 lg:px-[100px] md:px-[60px] px-[12px]">
                {loading ? (
                    <div className="w-full flex flex-col items-center gap-3 animate-pulse">
                        <div className="h-10 w-[400px] bg-gray-300 rounded" />
                        <div className="h-4 w-[60%] bg-gray-300 rounded" />
                    </div>
                ) : (
                    <>
                        <h2 className="text-5xl font-bold">{t('Portfolio')}</h2>
                        <h3 className="text-[18px] max-sm:text-base font-medium opacity-60 xl:max-w-[90%] text-center">
                            {t('Portfolio_desc')}
                        </h3>
                    </>
                )}
            </header>

            <div className="grid grid-cols-1 w-full gap-x-8 gap-y-5 md:grid-cols-1 md:gap-y-8 lg:grid-cols-3 lg:px-[100px] md:px-[60px] px-[12px]">
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <div
                              key={i}
                              className="h-[600px] w-[100%] bg-gray-200 animate-pulse rounded-xl"
                          />
                      ))
                    : partfolio && (
                          <>
                              <ProjectCard data={partfolio?.data[0]} />
                              <ProjectCard data={partfolio?.data[1]} />
                              <ProjectCard data={partfolio?.data[2]} />
                          </>
                      )}
            </div>

            {!loading && (
                <Link to={'/worcks'}>
                    <WhiteBtn text={t('Show more')} className="mt-5" />
                </Link>
            )}
        </section>
    );
}
