import GETRequest from '@/helpers/Requests/Query';
import { Colabaration } from '@/helpers/Requests/Types';
import { useStore } from '@/helpers/StateManegment';
import { useTranslation } from 'react-i18next';

export default function CompaniesSection() {
    const language = useStore((state: any) => state.Lang);
    const { t } = useTranslation();

    const { data: colabarations, isLoading: loading } = GETRequest<
        Colabaration[]
    >('colabarations', 'colabarations', [language]);
    return (
        <section
            data-scroll-section
            className="lg:px-[100px] md:px-[60px] px-[12px]"
        >
            {loading ? (
                <div className="w-full flex flex-col items-center gap-3 animate-pulse">
                    <div className="h-8 w-[150px] bg-gray-300 rounded" />
                </div>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-center">
                        {t('Colabaration_title')}
                    </h2>
                </>
            )}

            <div className="flex flex-row justify-center gap-8 flex-wrap mt-8">
                {loading
                    ? Array.from({ length: 10 }).map((_, index) => (
                          <div
                              key={index}
                              className="w-[140px] h-[56px] rounded bg-gray-200 animate-pulse"
                          />
                      ))
                    : colabarations?.map((item, index) => (
                          <div
                              key={index}
                              className="w-[140px] h-[56px] flex items-center justify-center"
                          >
                              <img
                                  loading="lazy"
                                  src={item.image}
                                  alt=""
                                  className="w-[140px] h-[56px] object-fit"
                              />
                          </div>
                      ))}
            </div>
        </section>
    );
}
