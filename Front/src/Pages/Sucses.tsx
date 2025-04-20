import { BlackBtn } from '@/components/Buttons';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Sucses() {
    // Trigger confetti when the component is mounted
    useEffect(() => {
        const duration = 6 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
        };

        function randomInRange(min: any, max: any) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: {
                    x: randomInRange(0.1, 0.3),
                    y: Math.random() - 0.2,
                },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: {
                    x: randomInRange(0.7, 0.9),
                    y: Math.random() - 0.2,
                },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures it runs only once when the component is mounted
    const { t } = useTranslation();

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-7">
            <img
                loading="lazy"
                className="w-[30%] max-sm:w-[80%] max-md:w-[40%]"
                src="/images/Sucses.png"
                alt="Success"
            />
            <h2 className="text-5xl max-sm:text-2xl text-center font-bold px-3">
                {t('Sucses_title')}
            </h2>
            <h3 className="text-[18px] max-sm:text-base font-medium opacity-60 max-w-[60%] max-sm:max-w-[100%] px-0 max-sm:px-3 text-center">
                {t('sucses_Desc')}{' '}
            </h3>
            <Link to={'/'}>
                <BlackBtn
                    text={'Back to Home'}
                    className="col-span-2 h-[48px] w-fit"
                />
            </Link>
        </div>
    );
}
