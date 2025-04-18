'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useMediaQuery } from '@/helpers/use-media-query';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface PaginationDemoProps {
    totalPages: number;
    currentPage: number;
    pageName: string; // Accepting the page name as a prop
}

export function PaginationDemo({
    totalPages,
    currentPage,
    pageName, // Receiving the page name for routing
}: PaginationDemoProps) {
    const total = totalPages || 1;
    const current = currentPage || 1;

    const isDesktop = useMediaQuery('(min-width: 640px)');

    // Generate pagination items
    const renderPaginationItems = () => {
        const items = [];

        const showEllipsisStart = total > 5 && current > 3;
        const showEllipsisEnd = total > 5 && current < total - 2;

        const simplifiedMobileView = !isDesktop && total > 5;

        if (total > 1) {
            items.push(
                <PaginationItem
                    key="page-1"
                    className={
                        simplifiedMobileView ? 'hidden sm:inline-flex' : ''
                    }
                >
                    <Link to={`/${pageName}/1`}>
                        <PaginationLink isActive={current === 1}>
                            {1}
                        </PaginationLink>
                    </Link>
                </PaginationItem>
            );
        }

        if (showEllipsisStart && !simplifiedMobileView) {
            items.push(
                <PaginationItem
                    key="ellipsis-start"
                    className="hidden sm:inline-flex"
                >
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        const range = simplifiedMobileView ? 0 : 1;

        for (
            let i = Math.max(2, current - range);
            i <= Math.min(total - 1, current + range);
            i++
        ) {
            if (showEllipsisStart && i === 2 && !simplifiedMobileView) continue;
            if (showEllipsisEnd && i === total - 1 && !simplifiedMobileView)
                continue;

            const showOnMobile = i === current || total <= 5;

            items.push(
                <PaginationItem
                    key={`page-${i}`}
                    className={showOnMobile ? '' : 'hidden sm:inline-flex'}
                >
                    <Link to={`/${pageName}/${i}`}>
                        <PaginationLink isActive={current === i}>
                            {i}
                        </PaginationLink>
                    </Link>
                </PaginationItem>
            );
        }

        if (showEllipsisEnd && !simplifiedMobileView) {
            items.push(
                <PaginationItem
                    key="ellipsis-end"
                    className="hidden sm:inline-flex"
                >
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        if (total > 1) {
            items.push(
                <PaginationItem
                    key={`page-${total}`}
                    className={
                        simplifiedMobileView ? 'hidden sm:inline-flex' : ''
                    }
                >
                    <Link to={`/${pageName}/${total}`}>
                        <PaginationLink isActive={current === total}>
                            {total}
                        </PaginationLink>
                    </Link>
                </PaginationItem>
            );
        }

        if (simplifiedMobileView) {
            items.push(
                <PaginationItem key="mobile-indicator" className="sm:hidden">
                    <span className="px-2 py-1 text-sm">
                        {current} / {total}
                    </span>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <Pagination>
            <PaginationContent className="flex-wrap gap-1 sm:gap-0">
                <PaginationItem>
                    <Link
                        to={`/${pageName}/${current - 1}`}
                        aria-disabled={current === 1}
                    >
                        <PaginationPrevious
                            className={`${
                                current === 1
                                    ? 'pointer-events-none opacity-50 hidden '
                                    : 'flex'
                            } px-2 sm:px-4 min-w-[40px] sm:min-w-[auto]  justify-center`}
                        />
                    </Link>
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                    <Link
                        to={`/${pageName}/${current + 1}`}
                        aria-disabled={current === total}
                    >
                        <PaginationNext
                            className={`${
                                current === total
                                    ? 'pointer-events-none opacity-50 hidden'
                                    : 'flex'
                            } px-2 sm:px-4 min-w-[40px] sm:min-w-[auto]  justify-center`}
                        />
                    </Link>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
