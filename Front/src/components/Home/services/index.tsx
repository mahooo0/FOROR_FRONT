import { useStore } from '@/helpers/StateManegment';
// import DesctopContent from './DexctopContent';
import GETRequest from '@/helpers/Requests/Query';
import { Bunner } from '@/helpers/Requests/Types';
import { lazy, Suspense } from 'react';

// Lazy load components
const MobileContect = lazy(() => import('./MobileContect'));
const DesctopContent = lazy(() => import('./DexctopContent'));

export default function ServicesSection() {
    const language = useStore((state) => state.Lang) || 'az';
    const { data: Data, isLoading: loading } = GETRequest<Bunner>(
        'home/services',
        'home/services',
        [language]
    );

    return (
        <section data-scroll-section>
            <header className="flex flex-col items-center gap-4 text-[#222222] mb-10 lg:px-[100px] md:px-[60px] px-[12px]">
                {loading ? (
                    <div className="w-full flex flex-col items-center gap-3 animate-pulse">
                        <div className="h-4 w-[80px] bg-gray-300 rounded" />
                        <div className="h-10 w-[200px] bg-gray-300 rounded" />
                        <div className="h-4 w-[60%] bg-gray-300 rounded" />
                    </div>
                ) : (
                    <>
                        <h2 className="text-5xl font-bold">{Data?.title}</h2>
                        <h3 className="text-[18px] max-sm:text-base font-medium opacity-60 xl:max-w-[90%] text-center">
                            {Data?.description}
                        </h3>
                    </>
                )}
            </header>

            {/* Wrap lazy-loaded components with Suspense */}
            <Suspense fallback={<div>Loading content...</div>}>
                <DesctopContent loading={loading} />
            </Suspense>
            <Suspense fallback={<div>Loading mobile content...</div>}>
                <MobileContect loading={loading} />
            </Suspense>
        </section>
    );
}
