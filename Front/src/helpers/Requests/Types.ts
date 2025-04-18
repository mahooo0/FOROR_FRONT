export type Social = {
    _id: string;
    url: string;
    image: string;
    __v: number;
};

export type ContactInfos = {
    _id: string;
    title: string;
    image: string;
    __v: number;
};
export type Translates = Record<string, string>;
export type Feature = {
    title: string;
    _id: string;
    __v: number;
};

export type Price_item = {
    title: string;
    description: string;
    _id: string;
    price: string; // Assuming price is a string, if it's a number, change to `number`
    discontedPrice: string; // Same for discountedPrice
    featrues: Feature[];
    __v: number;
};
export type Bunner = {
    preTitle: string;
    title: string;
    description: string;
    _id: string;
    image: string;
    __v: number;
};

type Slug = {
    az?: string;
    en?: string;
    ru?: string;
};

export type ServiceItem = {
    title: string;
    description: string;
    short_description: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    _id: string;
    image: string;
    __v: number;
    slug: Slug;
};
export type Prefe = {
    title: string;
    _id: string;
    __v: number;
};
export interface PortfolioCategoryTitle {
    az: string;
    en: string;
    ru: string;
}

export interface PortfolioCategory {
    title: PortfolioCategoryTitle;
    _id: string;
    __v: number;
}
export interface PortfolioCategory2 {
    title: string;
    _id: string;
    __v: number;
}
export interface PortfolioSlug {
    az: string;
    en: string;
    ru: string;
}

export interface PortfolioItem {
    title: string;
    description: string;
    _id: string;
    image: string;
    isdetail: boolean;
    url: string;
    slug: PortfolioSlug; // Optional, only present in some entries
    categories: PortfolioCategory[];
    __v: number;
}

export interface PortfolioResponse {
    data: PortfolioItem[];
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
}
export interface Colabaration {
    _id: string;
    image: string;

    __v: number;
}
export interface WebsiteService {
    title: string;
    slug: Slug;
    description: string; // HTML content, so it's a string
    short_description: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    _id: string;
    image: string;
    __v: number;
}
export interface Statistics {
    desctiption: string;
    _id: string;
    value: string;
    __v: number;
}
export interface AbutDev {
    preTitle: string;
    title: string;
    description: string;
    _id: string;
    spline_url_Lg: string;
    spline_url__Md: string;
    image: string;
    __v: number;
}
export interface Tool {
    title: string;
    description: string;
    _id: string;
    image: string;
    image_bg: string;
    __v: number;
}
export interface DesStep {
    title: string;
    description: string;
    _id: string;
    image: string;
    __v: number;
}

export interface Blog {
    title: string;
    slug: Slug;
    description: string; // assuming it's an HTML string
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    _id: string;
    image: string;
    __v: number;
}

export interface BlogResponse {
    data: Blog[];
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
}
export interface MetaData {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    _id: string;
    type: string;
    __v: number;
}
