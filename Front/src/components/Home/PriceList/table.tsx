'use client'; // if using Next.js App Router

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { BlackBtn } from '@/components/Buttons';
import { StoreState, useStore } from '@/helpers/StateManegment';
import { scrollToId } from '@/helpers/Scroll/ScrollTo';
import GETRequest from '@/helpers/Requests/Query';
import { Price_item } from '@/helpers/Requests/Types';
import { useTranslation } from 'react-i18next';

export default function PricingTable() {
    const language = useStore((state: any) => state.Lang);

    const { data: Price_list, isLoading } = GETRequest<Price_item[]>(
        'priceList',
        'priceList',
        [language]
    );

    useEffect(() => {
        console.log(Price_list);
    }, [Price_list]);
    if (isLoading) {
        return;
    }
    return (
        <div className="container py-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Price_list &&
                    Price_list.map((plan, index) => (
                        <AnimatedCard key={index} index={index} plan={plan} />
                    ))}
            </div>
        </div>
    );
}

// 👇 Animate each card with fade-up effect
const AnimatedCard = ({ plan, index }: { plan: Price_item; index: number }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const { t } = useTranslation();
    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const setSelectedPriceVariant = useStore(
        (state: StoreState) => state.setSelectedPriceVariant
    );

    const isGradient = index === 1; // Only first 3 cards get gradient border

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            <div
                className={
                    isGradient
                        ? 'bg-gradient-to-br from-[#E6D535] to-[#E53535] p-[2px] rounded-2xl h-full'
                        : ' h-full'
                }
            >
                <Card className="border border-gray-200 justify-between h-full flex flex-col shadow-xl rounded-2xl">
                    <CardHeader className="pb-0">
                        <h3 className="text-center text-sm font-medium">
                            {plan.title}
                        </h3>
                        <div className="mt-2 text-center w-full">
                            {plan.price === plan.discontedPrice ? (
                                <span className="text-4xl font-bold">
                                    {plan.discontedPrice === '0'
                                        ? t('Custom price')
                                        : plan.discontedPrice + ' ₼'}
                                </span>
                            ) : (
                                <span className="text-4xl font-bold flex flex-row">
                                    <p className=" line-through w-1/2 text-end text-2xl flex items-end justify-end">
                                        {plan.price}
                                    </p>
                                    /
                                    <p className="  w-1/2 text-start">
                                        {plan.discontedPrice}
                                    </p>
                                </span>
                            )}

                            {/* <span className="text-sm text-gray-500">/mo</span> */}
                        </div>
                        <p className="mt-1  text-sm text-gray-500">
                            {plan.description}{' '}
                        </p>
                    </CardHeader>
                    <CardContent className="pt-6 flex-1">
                        <ul className="space-y-3 flex flex-col items-start justify-start">
                            {plan.featrues?.map((feature, featureIndex) => (
                                <li
                                    key={featureIndex}
                                    className="flex items-start"
                                >
                                    <Check className="mr-2 h-5 w-5 shrink-0 text-black" />
                                    <span className="text-sm">
                                        {feature.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <BlackBtn
                            action={() => {
                                setSelectedPriceVariant(plan.title);
                                scrollToId('contact');
                            }}
                            text=" Get started"
                            className="w-full"
                        />
                    </CardFooter>
                </Card>
            </div>
        </motion.div>
    );
};
