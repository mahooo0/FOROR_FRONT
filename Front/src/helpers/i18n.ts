// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
const back = (lang: string) => {
    return fetch(`https://back-foror.vercel.app/api/translations`, {
        method: 'GET',
        headers: {
            'Accept-Language': lang, // Dynamically set the language
        },
    })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => data); // Return the translation data
};

// const enTranslations = await back('en');
// const ruTranslations = await back('ru');
// const azTranslations = await back('az');
i18n.use(LanguageDetector) // optional: detects user language
    .use(initReactI18next) // passes i18n instance to react-i18next
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already protects from XSS
        },
        resources: {
            en: {
                translation: {
                    teklif_al: 'Get a quote',
                    Home: 'Home',
                    Services: 'Services',
                    Haqqımızda: 'About us',
                    'Proqramlasdirma haqqinda': 'About programming',
                    Blog: 'Blog',
                    Portfolio: 'Portfolio',
                    'Price List': 'Price List',
                    Contact: 'Contact',
                    'Read more': 'Read more',
                    'show page': 'show page',
                    'Life site': 'Life site',
                    'Show more': 'Show more',
                    Colabaration_title: 'We are part of their story too',
                    'Big Idea': 'Big Idea',
                    card1_desc:
                        'It’s the heart of your brand — the core message that conveys your unique value.',
                    Includes: 'Includes',
                    Custom_Design: 'Custom Design and Development',
                    'For Website Managment': 'For Website Managment',
                    'Multi Langulart': 'Multi Langulart',
                    promotion: 'For website promotion',
                    'Mobile & Frendly': 'Mobile & Frendly',
                    Grow: 'Grow',
                    'Times faster': 'Times faster',
                    'Perfect for': 'Perfect for',
                    'About Us': 'About Us',
                    'type something': 'Type something',
                    'Development Proces': 'Development Proces',
                    Previous: 'Previous',
                    Pages: 'Pages',
                    Next: 'Next',
                    'All rights reserved.': 'All rights reserved.',
                    'LEST MAKE A FOROR': "LET'S MAKE A FOR",
                },
            },
            ru: {
                translation: {
                    teklif_al: 'Получить предложение',
                    Home: 'Главная',
                    Services: 'Услуги',
                    Haqqımızda: 'О нас',
                    'Proqramlasdirma haqqinda': 'О программировании',
                    Blog: 'Блог',
                    Portfolio: 'Портфолио',
                    'Price List': 'Прайс-лист',
                    Contact: 'Контакт',
                    'Read more': 'Читать далее',
                    'show page': 'Показать страницу',
                    'Life site': 'Лайфстайл ',
                    'Show more': 'Показать больше',
                    Colabaration_title: ' Мы тоже часть их истории',
                    'Big Idea': 'Великая Идея',
                    card1_desc:
                        'Это сердце вашего бренда — основное сообщение, передающее вашу уникальную ценность.',
                    Includes: 'Включает',
                    Custom_Design: 'Индивидуальный дизайн и разработка',
                    'For Website Managment': 'Для управления сайтом',
                    'Multi Langulart': 'Многоязычный',
                    promotion: 'Для продвижения сайта',
                    'Mobile & Frendly': 'Для мобильных устройств',
                    Grow: 'Расти в ',
                    'Times faster': 'раз быстрее',
                    'Perfect for': 'Идеально для',
                    'About Us': 'О нас',
                    'type something': 'напишите что-нибудь',
                    'Development Proces': 'процесс разработки',
                    Previous: 'Предыдущий',
                    Next: 'Следующий',
                    Pages: 'Страницы',
                    'LEST MAKE A FOROR': ' ПРОИЗВЕДЕМ ФОРОР',
                    'All rights reserved.': 'Все права защищены.',
                },
            },
            az: {
                translation: {
                    teklif_al: 'Qiymət təklifi al',
                    Home: 'Ana səhifə',
                    Services: 'Xidmətlər',
                    Haqqımızda: 'Haqqımızda',
                    'Proqramlasdirma haqqinda': 'Proqramlaşdırma haqqında',
                    Blog: 'Bloq',
                    Portfolio: 'Portfolio',
                    'Price List': 'Qiymət cədvəli',
                    Contact: 'Əlaqə',
                    'Read more': 'Daha ətraflı',
                    'show page': 'Səhifəni Göstər',
                    'Life site': 'Sayta bax ',
                    'Show more': 'Daha çox göstər',
                    Colabaration_title: 'Onların hekayəsində biz də varıq',
                    'Big Idea': 'Böyük Fikir',
                    card1_desc:
                        'Bu, brendinizin ürəyidir — sizin unikal dəyərinizi çatdıran əsas mesajdır.',
                    Includes: 'Daxildir',
                    Custom_Design: 'Fərdi Dizayn və Proqramlaşdırma',
                    'For Website Managment': 'Vebsayt İdarəetməsi üçün',
                    'Multi Langulart': 'Çoxdilli',
                    promotion: 'Saytın təşviqi üçün',
                    'Mobile & Frendly': 'Mobilə Uyğun',
                    Grow: 'Daha sürətli',
                    'Times faster': 'dəfə inkişaf et',
                    'Perfect for': 'Kimə uyğundur?',
                    'About Us': 'Haqqımızda',
                    'type something': 'bir şey yaz',
                    'Development Proces': 'Bizim iş Prosesimiz',
                    Previous: 'Əvvəlki',
                    Next: 'Növbəti',
                    Pages: 'Səhifələr',
                    'LEST MAKE A FOROR': 'FOROR YARADAQ',
                    'All rights reserved.': ' Bütün hüquqlar qorunur.',
                },
            },
        },
    });
Promise.all([back('en'), back('ru'), back('az')]).then(
    ([enTranslations, ruTranslations, azTranslations]) => {
        // Add the fetched translations to the existing resources
        i18n.addResourceBundle('en', 'translation', enTranslations, true, true);
        i18n.addResourceBundle('ru', 'translation', ruTranslations, true, true);
        i18n.addResourceBundle('az', 'translation', azTranslations, true, true);
    }
);
export default i18n;
