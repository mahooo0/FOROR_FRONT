import { getScrollInstance } from './locomotiveScrollInstance';

export const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    const scroll = getScrollInstance();

    if (el && scroll) {
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const targetY = rect.top + scrollY - 100; // scroll 100px above element

        scroll.scrollTo(targetY, {
            duration: 1000,
            easing: (t: number) =>
                t < 0.5
                    ? 4 * t * t * t
                    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        });
    } else {
        // fallback
        const rect = el?.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const targetY = (rect?.top || 0) + scrollY - 100;

        window.scrollTo({
            top: targetY,
            behavior: 'smooth',
        });
    }
};
