// locomotiveScrollInstance.ts
import LocomotiveScroll from 'locomotive-scroll';

let scroll: LocomotiveScroll | null = null;

export const setScrollInstance = (instance: LocomotiveScroll) => {
    scroll = instance;
};

export const getScrollInstance = () => scroll;
