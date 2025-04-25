import { create } from 'zustand';

export interface StoreState {
    setcategory: any;
    isMobilePOPupOpen: boolean;
    category: string;
    setIsMobilePOPupOpen: (isOpen: boolean) => void;
    SelectedPriceVariant: string;
    setSelectedPriceVariant: (variant: string) => void;
    Lang: 'az' | 'en' | 'ru';
    setLang: (variant: 'az' | 'en' | 'ru') => void;
}

export const useStore = create<StoreState>((set) => ({
    isMobilePOPupOpen: false,
    category: '',
    setcategory: (category: string) => set({ category }),
    setIsMobilePOPupOpen: (isOpen: boolean) =>
        set({ isMobilePOPupOpen: isOpen }),
    SelectedPriceVariant: '0',
    setSelectedPriceVariant: (variant: string) =>
        set({ SelectedPriceVariant: variant }),
    Lang: 'az',
    setLang: (variant: 'az' | 'en' | 'ru') => set({ Lang: variant }),
}));
