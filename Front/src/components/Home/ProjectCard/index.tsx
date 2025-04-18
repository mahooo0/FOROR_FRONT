import { PortfolioItem } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { useTranslation } from 'react-i18next';

export default function ProjectCard({ data }: { data: PortfolioItem }) {
    const language = useStore((state) => state.Lang) || 'az';
    const { t } = useTranslation();

    return (
        <a
            href={data.isdetail ? `/worck/${data.slug[language]}` : data.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
                localStorage.setItem('slug', JSON.stringify(data.slug));
            }}
            className="flex size-full flex-col items-center justify-start border border-border-primary"
        >
            <div className="relative w-full overflow-hidden pt-[66%]">
                {data.isdetail ? (
                    <img
                        loading="lazy"
                        src={data.image}
                        alt="Relume placeholder image 1"
                        className="absolute inset-0  w-full object-top  "
                    />
                ) : (
                    <img
                        loading="lazy"
                        src={data.image}
                        alt="Relume placeholder image 1"
                        className="absolute inset-0 size-full object-cover "
                    />
                )}
            </div>
            <div className="flex w-full flex-1 flex-col justify-between px-5 py-6 md:p-6">
                <div className="flex w-full flex-col items-start justify-start">
                    <h2 className="mb-2 text-xl font-bold md:text-2xl">
                        {data.title}
                    </h2>
                    <p>{data.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {data.categories.map((item) => (
                            <p className="bg-background-secondary px-2 py-1 bg-[#EEEEEE] text-sm font-semibold">
                                {item.title[language]}
                            </p>
                        ))}
                    </div>
                    <button
                        className="focus-visible:ring-border-primary whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 text-text-primary gap-2 p-0 mt-6 flex items-center justify-center gap-x-1"
                        title="Read more"
                    >
                        {data.isdetail ? t('show page') : t('Life site')}

                        <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="0"
                            viewBox="0 0 15 15"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </a>
    );
}
