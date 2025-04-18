import { ButtonLink } from '@/components/Buttons';
import { ServiceItem } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function MobileCard({
    isBlack,
    data,
    index,
}: {
    isBlack: boolean;
    data: ServiceItem;
    index: number;
}) {
    const language = useStore((state) => state.Lang) || 'az';
    const { t } = useTranslation();

    if (isBlack) {
        return (
            <Link
                to={`/service/${data?.slug[language]}`}
                onClick={() => {
                    localStorage.setItem('slug', JSON.stringify(data.slug));
                }}
            >
                <div className=" rounded-2xl bg-[#222222] w-full h-fit text-white p-3 flex flex-col gap-[30px]">
                    <p className="text-base">0.00{index}</p>
                    <article className="flex flex-col gap-2 justify-start">
                        <h4 className="text-2xl">{data.title}</h4>
                        <p className="text-base opacity-60">
                            {data.short_description}
                        </p>
                        <ButtonLink
                            text={t('Read more')}
                            className={`!px-0 transition-all duration-300 transform text-base w-fit  text-white`}
                        />{' '}
                    </article>
                </div>
            </Link>
        );
    }
    return (
        <Link
            to={`/service/${data?.slug[language]}`}
            onClick={() => {
                localStorage.setItem('slug', JSON.stringify(data.slug));
            }}
        >
            <div className=" rounded-2xl bg-[#fffffff] w-full h-fit text-[#222222] border-[#222222] border p-3 flex flex-col gap-[30px]">
                <p className="text-base">0.00{index}</p>
                <article className="flex flex-col gap-2 justify-start">
                    <h4 className="text-2xl">{data.title}</h4>
                    <p className="text-base opacity-60">
                        {data.short_description}
                    </p>
                    <ButtonLink
                        text={t('Read more')}
                        className={`!px-0 transition-all duration-300 transform text-base w-fit  text-[#222222]`}
                    />{' '}
                </article>
            </div>
        </Link>
    );
}
