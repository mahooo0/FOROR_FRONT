import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useStore } from '@/helpers/StateManegment';

export default function MobileSelect({
    title = 'title',
    options = [],
}: {
    title?: string;
    options?: { title: string; link: string }[];
}) {
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
    const setIsOpen = useStore((state: any) => state.setIsMobilePOPupOpen);

    return (
        <div className="flex flex-col  items-start w-full h-full justify-center">
            {/* Hover trigger */}
            <p
                className="h-full flex justify-center items-center cursor-pointer gap-1"
                onClick={() => setIsPopUpOpen(!isPopUpOpen)}
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
                className={` left-0 bg-white w-full text-nowrap  flex flex-col gap-2  
                transition-opacity duration-300 ${
                    isPopUpOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none h-0 !p-0'
                }`}
            >
                {options.map((item, i) => (
                    <Link
                        to={item.link}
                        key={i}
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex flex-row gap-3 hover:bg-black/10 flex-nowrap w-full px-3 overflow-hidden">
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
