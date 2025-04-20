import Nawbar from './nawbar';
import WhiteBtn, { BlackBtn } from '../Buttons';
import { LanguageSelect } from './language';
import { scrollToId } from '@/helpers/Scroll/ScrollTo';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t } = useTranslation();

    return (
        <header className=" sticky top-0 bg-white z-50">
            <div className="h-[72px] w-full relative  shadow flex justify-between items-center xl:px-[30px] px-[20px] max-sm:px-3">
                <Nawbar />
                <div className="flex flex-row gap-4 ">
                    <Link to={'https://wa.me/966554414924'}>
                        <WhiteBtn
                            text="+994 055 441 49 24"
                            className="flex max-md:hidden"
                        />
                    </Link>
                    <BlackBtn
                        text={t('teklif_al')}
                        action={() => scrollToId('contact')}
                    />
                    <div className="w-fit block max-md:hidden">
                        <LanguageSelect />
                    </div>
                </div>
            </div>
        </header>
    );
}
