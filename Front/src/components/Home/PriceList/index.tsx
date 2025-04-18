import { useTranslation } from 'react-i18next';
import PricingTable from './table';

export default function PriceList() {
    const loading = false;
    const { t } = useTranslation();
    return (
        <section
            data-scroll-section
            className="flex !flex-col items-center gap-4 lg:px-[100px] md:px-[60px] px-[12px]"
        >
            {/* Header */}
            <header className="flex flex-col items-center gap-4 text-[#222222] mb-10 lg:px-[100px] md:px-[60px] px-[12px]">
                {loading ? (
                    <div className="flex flex-col items-center gap-3 w-full animate-pulse">
                        <div className="h-4 w-[80px] bg-gray-300 rounded" />
                        <div className="h-10 w-[200px] bg-gray-300 rounded" />
                        <div className="h-4 w-[60%] bg-gray-300 rounded" />
                    </div>
                ) : (
                    <>
                        <p className="text-base font-semibold">
                            {t('Price_pre_title')}
                        </p>
                        <h2 className="text-5xl font-bold">
                            {' '}
                            {t('Price_title')}
                        </h2>
                        <h3 className="text-[18px] text-center max-sm:text-base font-medium opacity-60">
                            {t('Price_desc')}
                        </h3>
                    </>
                )}
            </header>

            {/* Table or skeleton */}
            {loading ? (
                <div className="container py-10">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_) => (
                            <div className="border border-gray-200 rounded-lg p-6 h-full flex flex-col justify-between animate-pulse">
                                <div className="space-y-2">
                                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                                    <div className="h-8 w-1/3 bg-gray-300 rounded mt-2" />
                                    <div className="h-3 w-1/2 bg-gray-200 rounded" />
                                </div>

                                <ul className="mt-6 space-y-3">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-4 w-[90%] bg-gray-200 rounded mx-auto"
                                        />
                                    ))}
                                </ul>

                                <div className="h-10 w-full bg-gray-300 rounded mt-6" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <PricingTable />
            )}
        </section>
    );
}
