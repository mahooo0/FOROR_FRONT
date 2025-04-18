import { Tool } from '@/helpers/Requests/Types';
import ToolCard from './toolCard';

export default function ToolsSection({
    title,
    isLoading,
    data,
}: {
    title: string;
    isLoading: boolean;
    data: Tool[];
}) {
    if (isLoading) {
        // ⛔ Skeleton View
        return (
            <section
                className="px-[5%] flex flex-col gap-10 animate-pulse"
                data-scroll-section
            >
                <div className="h-[48px] bg-neutral-700 rounded w-[60%] mx-auto"></div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-full h-[160px] rounded-[8px] bg-neutral-800 animate-pulse"
                        />
                    ))}
                </div>
            </section>
        );
    }
    return (
        <section className=" lg:px-[100px] pt-[40px]   md:px-[60px] px-[12px] flex flex-col gap-10 text-center">
            <h2 className="text-3xl font-bold">{title}</h2>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                {data.map((item) => (
                    <ToolCard data={item} />
                ))}
            </div>
        </section>
    );
}
