import React, { Suspense } from 'react';
import HoverCard from './HoverCard';
import { useStore } from '@/helpers/StateManegment';
import GETRequest from '@/helpers/Requests/Query';
import { ServiceItem } from '@/helpers/Requests/Types';

// Lazy load the Spline component
const LazySpline = React.lazy(() => import('@splinetool/react-spline'));

export default function DesctopContent({ loading }: { loading: boolean }) {
    const [HoveredId, setHoveredId] = React.useState<number>(0);
    const language = useStore((state) => state.Lang) || 'az';

    const { data: services } = GETRequest<ServiceItem[]>(
        'services',
        'services',
        [language]
    );

    return (
        <div className="relative max-md:hidden block overflow-hidden max-sm:max-h-[80vh] h-fit lg:px-[100px] md:px-[30px] px-[12px]">
            {loading ? (
                <div className="w-[80vw] h-[500px] bg-gray-200 animate-pulse rounded-xl" />
            ) : (
                <>
                    {/* Use Suspense for fallback while Spline is loading */}
                    <Suspense
                        fallback={
                            <div className="w-[80vw] h-[500px] bg-gray-200 animate-pulse rounded-xl" />
                        }
                    >
                        <LazySpline scene="https://prod.spline.design/m1wbrZ0-TwhTPU4F/scene.splinecode" />
                    </Suspense>
                    {services?.map((Service, i) => (
                        <HoverCard
                            key={i}
                            index={i}
                            data={Service}
                            hoveredIndex={HoveredId}
                            setHoveredIndex={setHoveredId}
                        />
                    ))}
                    <div className="bg-white w-[20%] z-0 h-[50px] absolute bottom-[10px] right-0 mr-[70px]" />
                </>
            )}
        </div>
    );
}
