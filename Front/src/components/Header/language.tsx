'use client'; // for Next.js App Router

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import i18n from '@/helpers/i18n';
import { useEffect } from 'react';
import { useStore } from '@/helpers/StateManegment';

export function LanguageSelect() {
    // const [language, setLanguage] = useState<string>('az'); // lowercase ISO code
    const language = useStore((state: any) => state.Lang);
    const setLanguage = useStore((state: any) => state.setLang);
    // Load saved language from localStorage on first render
    useEffect(() => {
        const storedLang = localStorage.getItem('lang');
        if (storedLang) {
            setLanguage(storedLang.toLowerCase());
            document.documentElement.lang = storedLang.toLowerCase(); // update <html lang="">
        } else {
            document.documentElement.lang = 'az'; // default
        }
    }, []);

    // Update language on change
    const handleChange = (value: string) => {
        const langCode = value.toLowerCase(); // standard format
        setLanguage(langCode);
        localStorage.setItem('lang', langCode);
        i18n.changeLanguage(value);

        document.documentElement.lang = langCode; // update <html lang="">
    };

    return (
        <Select value={language} onValueChange={handleChange}>
            <SelectTrigger className="w-full border border-black">
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="border border-black">
                <SelectGroup>
                    <SelectItem value="az" key={'az'}>
                        Az
                    </SelectItem>
                    <SelectItem value="en" key={'en'}>
                        En
                    </SelectItem>
                    <SelectItem value="ru" key={'ru'}>
                        Ru
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
