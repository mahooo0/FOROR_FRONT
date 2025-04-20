import { ButtonLink } from '@/components/Buttons';
import { ServiceItem } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HoverCard = ({
    index,
    hoveredIndex,
    setHoveredIndex,
    data,
}: {
    index: number;
    hoveredIndex: number;
    setHoveredIndex: (par: number) => void;
    data: ServiceItem;
}) => {
    const { t } = useTranslation();
    const language = useStore((state) => state.Lang) || 'az';

    // Determine positioning based on `index`
    switch (index) {
        case 0:
            return (
                <Link
                    to={`/service/${data?.slug[language]}`}
                    onClick={() => {
                        localStorage.setItem('slug', JSON.stringify(data.slug));
                    }}
                >
                    <div
                        className={`absolute  top-3 left-[60px] transition-all duration-300 cursor-pointer ${
                            hoveredIndex != 0 &&
                            hoveredIndex != 1 &&
                            'blur-[1px] opacity-40'
                        }`}
                        onMouseEnter={() => setHoveredIndex(1)}
                        onMouseLeave={() => setHoveredIndex(0)}
                    >
                        <div className="flex justify-center items-center border xl:w-[60px] lg:w-[50px] md:w-[40px]  aspect-square border-black">
                            <div
                                className={`aspect-square bg-black transition-all duration-300 ${
                                    hoveredIndex === 1
                                        ? ' xl:w-[20px] lg:w-[20px] md:w-[18px] '
                                        : ' xl:w-[40px] lg:w-[30px] md:w-[26px] '
                                }`}
                            ></div>
                        </div>
                        <h4 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl ml-[60px] text-[32px] transition-all duration-300">
                            {/* Veb saytların hazırlanması */}
                            {data.title}
                        </h4>

                        {/* Smooth fade-in for paragraph */}
                        <div className="h-auto overflow-hidden 2xl:max-w-[600px] xl:max-w-[500px] lg:max-w-[400px] md:max-w-[260px]">
                            <p
                                className={`ml-[60px] 2xl:text-xl xl:text-lg: lg:text-md md:text-sm   transition-all duration-300 transform ${
                                    hoveredIndex === 1
                                        ? 'opacity-60 translate-y-0'
                                        : 'opacity-0 -translate-y-1'
                                }`}
                            >
                                {data.short_description}
                            </p>
                        </div>

                        {/* Smooth fade-in for button */}
                        <div className="h-auto overflow-hidden">
                            <ButtonLink
                                text={t('Read more')}
                                className={`ml-[60px] !px-0 transition-all duration-300 transform text-base ${
                                    hoveredIndex === 1
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 -translate-y-1'
                                }`}
                            />
                        </div>
                    </div>
                </Link>
            );
            break;
        case 1:
            return (
                <Link
                    to={`/service/${data?.slug[language]}`}
                    onClick={() => {
                        localStorage.setItem('slug', JSON.stringify(data.slug));
                    }}
                >
                    <div
                        className={`absolute top-3 right-[60px] flex flex-col justify-end items-end transition-all duration-300 cursor-pointer ${
                            hoveredIndex != 0 &&
                            hoveredIndex != 2 &&
                            'blur-[1px] opacity-40'
                        }`}
                        onMouseEnter={() => setHoveredIndex(2)}
                        onMouseLeave={() => setHoveredIndex(0)}
                    >
                        <div className="flex justify-center items-center border xl:w-[60px] lg:w-[50px] md:w-[40px]  aspect-square border-black">
                            <div
                                className={`aspect-square bg-black transition-all duration-300 ${
                                    hoveredIndex === 2
                                        ? ' xl:w-[20px] lg:w-[20px] md:w-[18px] '
                                        : ' xl:w-[40px] lg:w-[30px] md:w-[26px] '
                                }`}
                            ></div>
                        </div>
                        <h4 className=" 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl mr-[60px] text-end text-[32px] transition-all duration-300">
                            {data.title}
                        </h4>

                        {/* Smooth fade-in for paragraph */}
                        <div className="h-auto overflow-hidden 2xl:max-w-[600px] xl:max-w-[500px] lg:max-w-[400px] md:max-w-[260px]">
                            <p
                                className={`mr-[60px] text-end 2xl:text-xl xl:text-lg: lg:text-md md:text-sm  transition-all duration-300 transform ${
                                    hoveredIndex === 2
                                        ? 'opacity-60 translate-y-0'
                                        : 'opacity-0 -translate-y-1'
                                }`}
                            >
                                {data.short_description}
                            </p>
                        </div>

                        {/* Smooth fade-in for button */}
                        <div className="h-auto overflow-hidden">
                            <ButtonLink
                                text={t('Read more')}
                                className={`mr-[60px] text-end !px-0 transition-all duration-300 transform  text-base ${
                                    hoveredIndex === 2
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 -translate-y-1'
                                }`}
                            />
                        </div>
                    </div>
                </Link>
            );
            break;
        case 2:
            return (
                <Link
                    to={`/service/${data?.slug[language]}`}
                    onClick={() => {
                        localStorage.setItem('slug', JSON.stringify(data.slug));
                    }}
                >
                    <div
                        className={`absolute bottom-3 left-[60px] flex flex-col-reverse justify-start items-start transition-all duration-300 cursor-pointer ${
                            hoveredIndex != 0 &&
                            hoveredIndex != 3 &&
                            'blur-[1px] opacity-40'
                        }`}
                        onMouseEnter={() => setHoveredIndex(3)}
                        onMouseLeave={() => setHoveredIndex(0)}
                    >
                        <div className="flex justify-center items-center border xl:w-[60px] lg:w-[50px] md:w-[40px]  aspect-square border-black">
                            <div
                                className={`aspect-square bg-black transition-all duration-300 ${
                                    hoveredIndex === 3
                                        ? ' xl:w-[20px] lg:w-[20px] md:w-[18px] '
                                        : ' xl:w-[40px] lg:w-[30px] md:w-[26px] '
                                }`}
                            ></div>
                        </div>

                        {/* Button with proper transition */}
                        <div
                            className={`ml-[60px] overflow-hidden transition-all duration-300 transform ${
                                hoveredIndex === 3
                                    ? 'max-h-[50px] opacity-100 translate-y-0'
                                    : 'max-h-0 opacity-0 translate-y-4'
                            }`}
                        >
                            <ButtonLink
                                text={t('Read more')}
                                className="text-start !px-0 transition-all duration-300  text-base"
                            />
                        </div>

                        {/* Paragraph with proper transition */}
                        <div
                            className={`ml-[60px] overflow-hidden transition-all duration-300 2xl:max-w-[600px] xl:max-w-[500px] lg:max-w-[400px] md:max-w-[260px] transform ${
                                hoveredIndex === 3
                                    ? 'max-h-[100px] opacity-100 translate-y-0'
                                    : 'max-h-0 opacity-0 translate-y-4'
                            }`}
                        >
                            <p className="text-start 2xl:text-xl xl:text-lg: opacity-60 lg:text-md md:text-sm ">
                                {data.short_description}
                            </p>
                        </div>

                        {/* Heading that moves up smoothly */}
                        <h4
                            className={`ml-[60px] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-start text-[32px] transition-all duration-300 transform ${
                                hoveredIndex === 3
                                    ? 'translate-y-0'
                                    : 'translate-y-2'
                            }`}
                        >
                            {data.title}
                        </h4>
                    </div>
                </Link>
            );
            break;
        case 3:
            return (
                <Link
                    to={`/service/${data?.slug[language]}`}
                    onClick={() => {
                        localStorage.setItem('slug', JSON.stringify(data.slug));
                    }}
                >
                    <div
                        className={`absolute bottom-3   z-10 right-[60px] flex flex-col-reverse justify-end items-end transition-all duration-300 cursor-pointer ${
                            hoveredIndex != 0 &&
                            hoveredIndex != 4 &&
                            'blur-[1px] opacity-40'
                        }`}
                        onMouseEnter={() => setHoveredIndex(4)}
                        onMouseLeave={() => setHoveredIndex(0)}
                    >
                        <div className="flex justify-center items-center border xl:w-[60px] lg:w-[50px] md:w-[40px]  aspect-square border-black">
                            <div
                                className={`aspect-square bg-black transition-all duration-300 ${
                                    hoveredIndex === 4
                                        ? ' xl:w-[20px] lg:w-[20px] md:w-[18px] '
                                        : ' xl:w-[40px] lg:w-[30px] md:w-[26px] '
                                }`}
                            ></div>
                        </div>

                        {/* Button with proper transition */}
                        <div
                            className={`mr-[60px] overflow-hidden transition-all duration-300 transform ${
                                hoveredIndex === 4
                                    ? 'max-h-[50px] opacity-100 translate-y-0'
                                    : 'max-h-0 opacity-0 translate-y-4'
                            }`}
                        >
                            <ButtonLink
                                text={t('Read more')}
                                className="text-start !px-0 transition-all duration-300  text-base"
                            />
                        </div>

                        {/* Paragraph with proper transition */}
                        <div
                            className={`mr-[60px] overflow-hidden transition-all 2xl:max-w-[600px] xl:max-w-[500px] lg:max-w-[400px] md:max-w-[260px] duration-300 transform ${
                                hoveredIndex === 4
                                    ? 'max-h-[100px] opacity-100 translate-y-0'
                                    : 'max-h-0 opacity-0 translate-y-4'
                            }`}
                        >
                            <p className="text-end 2xl:text-xl xl:text-lg: lg:text-md md:text-sm  opacity-60 ">
                                {data.short_description}
                            </p>
                        </div>

                        {/* Heading that moves up smoothly */}
                        <h4
                            className={`mr-[60px] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-end text-[32px] transition-all duration-300 transform ${
                                hoveredIndex === 4
                                    ? 'translate-y-0'
                                    : 'translate-y-2'
                            }`}
                        >
                            {data.title}
                        </h4>
                    </div>
                </Link>
            );
    }
};

export default HoverCard;
