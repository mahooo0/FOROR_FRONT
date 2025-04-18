import GETRequest from '@/helpers/Requests/Query';
import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import { useStore } from '@/helpers/StateManegment';
import { Prefe } from '@/helpers/Requests/Types';
import { useTranslation } from 'react-i18next';

export default function PrefeSection() {
    const language = useStore((state) => state.Lang) || 'az';

    const { data: Prefe, isLoading: PrefeLoading } = GETRequest<Prefe[]>(
        'home/prefe',
        'home/prefe',
        [language]
    );
    const loading = PrefeLoading;
    const { t } = useTranslation();

    return (
        <section
            data-scroll-section
            className="lg:px-[100px] md:px-[60px] px-[12px]"
        >
            {/* Header */}
            <header className="flex flex-row justify-between items-center">
                {loading ? (
                    <div className="w-full flex justify-between items-center animate-pulse">
                        <div className="h-10 w-[180px] bg-gray-300 rounded" />
                        <div className="h-[48px] w-[180px] bg-gray-300 rounded" />
                    </div>
                ) : (
                    <>
                        <h2 className="text-5xl max-sm:text-2xl font-bold w-fit">
                            {t('Perfect for')}{' '}
                        </h2>
                    </>
                )}
            </header>

            {/* Tags */}
            <div className="flex flex-row justify-start gap-4 flex-wrap mt-8">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <div
                              key={index}
                              className="w-[100px] h-[38px] bg-gray-200 animate-pulse rounded-3xl"
                          />
                      ))
                    : Prefe?.map((item, index) => (
                          <p
                              key={index}
                              className="px-[30px] py-[9px] border border-black/20 rounded-3xl"
                          >
                              {item.title}
                          </p>
                      ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-5 mt-9">
                {loading ? (
                    <>
                        <div
                            className={`xl:col-span-3 lg:col-span-4 col-span-12
                              h-[300px] bg-gray-200 animate-pulse rounded-xl`}
                        />
                        <div
                            className={`xl:col-span-9 lg:col-span-8 col-span-12
                              h-[300px] bg-gray-200 animate-pulse rounded-xl`}
                        />
                        <div
                            className={`xl:col-span-9 lg:col-span-8 col-span-12
                              h-[300px] bg-gray-200 animate-pulse rounded-xl`}
                        />
                        <div
                            className={`xl:col-span-3 lg:col-span-4 col-span-12
                              h-[300px] bg-gray-200 animate-pulse rounded-xl`}
                        />
                    </>
                ) : (
                    <>
                        <Card1 />
                        <Card2 />
                        <Card3 />
                        <Card4 />
                    </>
                )}
            </div>
        </section>
    );
}
