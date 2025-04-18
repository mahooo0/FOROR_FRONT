import { DesStep } from '@/helpers/Requests/Types';

export default function CardDevMap({
    data,
    iswhite,
}: {
    data: DesStep;
    iswhite: boolean;
}) {
    return (
        <article
            className={`flex flex-col  h-fit gap-4 xl:bg-transparent bg-[#222222] ${
                iswhite &&
                'max-sm:bg-white max-sm:border max-sm:border-black max-sm:text-black'
            }   xl:text-[#222222] text-white xl:p-0 p-4 rounded-2xl min-2xl:w-[600px]  xl:max-w-[500px] max-w-[460px] lg:max-w-[420px] max-sm:w-full max-sm:max-w-full`}
        >
            <img
                loading="lazy"
                src={data.image}
                className=" max-xl:w-[60px]  max-lg:w-[40px] w-[80px] max-xl:bg-white max-xl:rounded-[8px]  aspect-square"
                alt=""
            />
            <h5 className="xl:text-[32px] lg:text-2xl text-2xl font-bold opacity-100">
                {data.title}{' '}
            </h5>
            <p className="lg:text-[18px] text-[12px]  xl:opacity-60 opacity-95">
                {data.description}{' '}
            </p>
            {/* <ol className="lg:text-[18px] text-[12px] font-semibold ">
                <li className="before:content-['•'] before:mr-2">
                    The plan for the subsequent phases of our work.
                </li>
                <li className="before:content-['•'] before:mr-2">
                    The plan for the subsequent phases of our work.
                </li>
                <li className="before:content-['•'] before:mr-2">
                    The plan for the subsequent phases of our work.
                </li>
                <li className="before:content-['•'] before:mr-2">
                    The plan for the subsequent phases of our work.
                </li>
            </ol> */}
        </article>
    );
}
