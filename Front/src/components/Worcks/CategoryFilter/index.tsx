'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PortfolioCategory2 } from '@/helpers/Requests/Types';

interface CategoryFilterProps {
    categories?: PortfolioCategory2[];
    onCategoryChange?: (category: string) => void;
    isLoading?: boolean; // 👈 new optional prop
}

export default function CategoryFilter({
    categories = [],
    onCategoryChange,
    isLoading = false,
}: CategoryFilterProps) {
    const [activeCategory, setActiveCategory] = useState<string>('View all');

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        if (onCategoryChange) {
            onCategoryChange(category);
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 items-center">
            {isLoading ? (
                // 🦴 Skeleton Buttons
                <>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[42px] w-[110px] bg-neutral-200 rounded-lg animate-pulse"
                        />
                    ))}
                </>
            ) : (
                <>
                    <button
                        onClick={() => handleCategoryClick('')}
                        className={cn(
                            'px-6 py-3 text-base transition-colors rounded-[8px]',
                            activeCategory === ''
                                ? 'border border-black'
                                : 'bg-gray-100'
                        )}
                    >
                        View all
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category._id}
                            onClick={() => handleCategoryClick(category._id)}
                            className={cn(
                                'px-6 py-3 text-base transition-colors rounded-[8px]',
                                activeCategory === category._id
                                    ? 'border border-black'
                                    : 'bg-gray-100 '
                            )}
                        >
                            {category.title}
                        </button>
                    ))}
                </>
            )}
        </div>
    );
}
