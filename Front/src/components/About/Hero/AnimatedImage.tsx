import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedImage = ({ img }: { img: string }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5, // Adjust as needed to define "center"
    });

    return (
        <motion.div
            ref={ref}
            initial={{ width: '0%', x: '0%' }}
            animate={inView ? { width: '100%', x: '0%' } : {}}
            transition={{
                duration: 1.5,
                ease: 'easeInOut',
            }}
            className="overflow-hidden relative bg-[#222222] rounded-2xl"
        >
            <motion.img
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                    duration: 2,
                    ease: 'easeOut',
                    delay: 0.6,
                }}
                className="w-full absolute bottom-0"
                src={img}
                alt=""
            />
            <img
                loading="lazy"
                className="w-full  opacity-0"
                src={img}
                alt=""
            />
        </motion.div>
    );
};

export default AnimatedImage;
