import { Tool } from '@/helpers/Requests/Types';
import { useState } from 'react';

export default function ToolCard({ data }: { data: Tool }) {
    const [isHover, setIsHover] = useState(false);
    return (
        <article
            className={`w-full ${
                isHover ? 'h-[200px]' : 'h-[160px]'
            } flex flex-col gap-4 bg-[#1F1F1F] relative overflow-hidden rounded-[8px] duration-700`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="flex gap-[36px] flex-col text-white p-4 z-10 h-fit  duration-700 ">
                <img
                    loading="lazy"
                    className="w-12 h-12"
                    src={data.image}
                    alt=""
                />
                <div className="h-fit duration-700 text-start">
                    <h5 className="text-[24px]">{data.title}</h5>
                    <p
                        className={`text-[16px]  ${
                            isHover
                                ? 'opacity-100'
                                : 'opacity-0  -translate-y-2.5'
                        } duration-700`}
                    >
                        {data.description}{' '}
                    </p>
                </div>
            </div>
            <img
                loading="lazy"
                className={`absolute bottom-[0px] left-[0px] z-0 blur-2xl w-[140%] ${
                    isHover ? 'opacity-100' : 'opacity-0'
                } duration-700`}
                src={data.image_bg}
                alt=""
            />
        </article>
    );
}
