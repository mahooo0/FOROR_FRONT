import { useStore } from '@/helpers/StateManegment';
import MobileCard from './mobileCard';
import MobileSceleton from './mobileSceleton';
import GETRequest from '@/helpers/Requests/Query';
import { ServiceItem } from '@/helpers/Requests/Types';

export default function MobileContect({ loading }: { loading: boolean }) {
    const language = useStore((state) => state.Lang) || 'az';

    const { data: services } = GETRequest<ServiceItem[]>(
        'services',
        'services',
        [language]
    );
    return (
        <div className="max-md:flex hidden flex-col gap-4 px-[12px]">
            {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                      <MobileSceleton i={i} />
                  ))
                : services?.map((item, i) => (
                      <MobileCard
                          key={i}
                          isBlack={i % 2 === 1}
                          index={i + 1}
                          data={item}
                      />
                  ))}
        </div>
    );
}
