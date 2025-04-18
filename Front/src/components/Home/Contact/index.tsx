import GETRequest from '@/helpers/Requests/Query';
import { ContactInfos, Social, Translates } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { Link } from 'react-router-dom';
import ContactForum from './Forum';

export default function ContactUsSection() {
    const language = useStore((state: any) => state.Lang);

    const { data: ContactInfos } = GETRequest<ContactInfos[]>(
        'contact-infos',
        'contact-infos',
        [language]
    );
    const { data: Translation } = GETRequest<Translates>(
        'translations',
        'translations',
        [language]
    );
    const { data: Social } = GETRequest<Social[]>('social', 'social', [
        language,
    ]);
    // const [isLoading, setIsLoading] = useState(false);
    const isLoading = !Translation || !ContactInfos || !Social;
    if (isLoading) {
        // 🔁 Skeleton version
        return (
            <section
                data-scroll-section
                id="contact"
                className="lg:px-[100px] md:px-[60px] px-[12px] relative"
            >
                <div className="w-full border border-[#222222] gap-8 rounded-[12px] px-[30px] py-[40px] flex lg:flex-row flex-col justify-between animate-pulse">
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                        <div className="h-4 w-1/3 bg-neutral-700 rounded" />
                        <div className="h-10 w-2/3 bg-neutral-700 rounded" />
                        <div className="h-4 w-5/6 bg-neutral-800 rounded" />

                        <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 items-center"
                                >
                                    <div className="w-6 h-6 rounded-full bg-neutral-700" />
                                    <div className="h-4 w-2/3 bg-neutral-800 rounded" />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="h-4 w-1/3 bg-neutral-700 rounded" />
                            <div className="flex gap-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 rounded-full bg-neutral-700"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-[46%] w-full grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="col-span-2 flex flex-col gap-2"
                            >
                                <div className="h-4 w-1/4 bg-neutral-700 rounded" />
                                <div className="h-[48px] w-full bg-neutral-800 rounded" />
                            </div>
                        ))}
                        <div className="col-span-2 flex flex-col gap-2">
                            <div className="h-4 w-1/4 bg-neutral-700 rounded" />
                            <div className="h-[180px] w-full bg-neutral-800 rounded" />
                        </div>
                        <div className="col-span-2 h-[48px] bg-neutral-700 rounded" />
                    </div>
                </div>
            </section>
        );
    }

    // ✅ Real Content
    return (
        <section
            data-scroll-section
            id="contact"
            className="lg:px-[100px] md:px-[60px] px-[12px] relative"
        >
            <div className="w-full border border-[#222222] gap-8 rounded-[12px] px-[30px] py-[40px] flex lg:flex-row flex-col justify-between">
                <div className="flex flex-col w-full lg:w-1/2 justify-between gap-4">
                    {/* <p className="text-base font-semibold">Tagline</p> */}
                    <div className="flex flex-col gap-5  ">
                        {' '}
                        <h2 className="text-5xl font-bold">
                            {Translation.Contact_title}
                        </h2>
                        <p className="text-base">
                            {Translation.Contact_Description}
                        </p>
                        <div className="flex flex-col gap-4">
                            {ContactInfos?.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-row gap-4 items-center"
                                >
                                    <img
                                        loading="lazy"
                                        src={item.image}
                                        alt=""
                                        className="w-[24px] aspect-square"
                                    />
                                    <p className="text-base">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-base font-semibold">
                            {Translation.Easy_Contact}:
                        </p>
                        <div className="flex flex-row gap-4">
                            {Social.map((item, i) => (
                                <Link to={item.url} key={i}>
                                    <button
                                        key={i}
                                        className="w-[36px] aspect-square rounded-full flex justify-center items-center bg-[#222222] text-white"
                                    >
                                        <img
                                            loading="lazy"
                                            src={item.image}
                                            alt=""
                                        />
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <ContactForum />
            </div>
        </section>
    );
}
