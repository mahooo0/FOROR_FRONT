import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function WhiteBtn({
    text,
    className,
    action = () => {},
}: {
    text: string;
    className?: string;
    action?: () => void;
}) {
    return (
        <Button
            onClick={action}
            variant="outline"
            className={`xl:px-3.5 px-2 py-2 rounded-lg bg-white border border-[#222222] text-base text-[#222222] shadow-2xl cursor-pointer ${className}`}
        >
            {text}
        </Button>
    );
}
export function BlackBtn({
    text,
    className,
    action = () => {},
}: {
    text: string;
    className?: string;
    action?: () => void;
}) {
    return (
        <Button
            onClick={action}
            className={`xl:px-5 px-2 py-2 rounded-lg bg-gradient-to-r from-[#E6D535] to-[#E53535]  text-white font-medium border-none text-base shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${className}`}
        >
            {text}
        </Button>
    );
}
export function ButtonLink({
    text,
    className,
}: {
    text: string;
    className?: string;
}) {
    return (
        <Button variant="link" className={` cursor-pointer ${className}`}>
            {' '}
            {text}{' '}
            <ChevronRight
                className={`
           w-6 h-6 mt-1`}
            />
        </Button>
    );
}
