import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function HeaderSelect({
    title = 'title',
    options = [],
}: {
    title?: string;
    options?: { title: string; link: string }[];
}) {
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col relative items-center w-fit h-full justify-center">
            {/* Hover trigger */}
            <p
                className="h-full flex justify-center items-center cursor-pointer gap-1"
                onMouseEnter={() => setIsPopUpOpen(true)}
                onMouseLeave={() => setIsPopUpOpen(false)}
            >
                {title}
                <ChevronRight
                    className={`${
                        isPopUpOpen ? 'rotate-90' : ' -rotate-90'
                    } w-6 h-6 mt-1`}
                />
            </p>

            {/* Dropdown Menu with Fade Animation */}
            <div
                onMouseEnter={() => setIsPopUpOpen(true)}
                onMouseLeave={() => setIsPopUpOpen(false)}
                className={`absolute top-[100%] left-0 bg-white w-fit text-nowrap p-6 border flex flex-col gap-2 border-[#222222] 
                transition-opacity duration-300 ${
                    isPopUpOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                }`}
            >
                {options.map((item, i) => (
                    <Link to={item.link} key={i} className="w-full">
                        <div className="flex flex-row gap-3 hover:bg-black/10 flex-nowrap w-full px-6 overflow-hidden">
                            <img
                                loading="lazy"
                                src="/svg/relume.svg"
                                className="w-5"
                                alt=""
                            />
                            <p>{item.title} </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
