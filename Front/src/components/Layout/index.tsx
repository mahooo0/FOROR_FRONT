import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ContactUsSection from '../Home/Contact';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import '../../helpers/i18n'; // 👈 Make sure this is imported before anything else

const Layout = () => {
    const location = useLocation();
    const controls = useAnimation();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const runAnimation = async () => {
            setShowContent(false); // Hide content (simulate route start)
            await controls.start({ opacity: 0, transition: { duration: 0.3 } });

            // Scroll to top
            window.scrollTo(0, 0);

            setShowContent(true); // Show new route content
            await controls.start({ opacity: 1, transition: { duration: 0.4 } });
        };

        runAnimation();
    }, [location.pathname]);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    // useEffect(() => {
    //     if (scrollRef.current) {
    //         scrollInstance.current = new LocomotiveScroll({
    //             el: scrollRef.current,
    //             smooth: true,
    //         } as any);
    //     }

    //     return () => {
    //         if (scrollInstance.current) scrollInstance.current.destroy();
    //     };
    // }, []);
    return (
        <motion.div
            animate={controls}
            initial={{ opacity: 1 }}
            className="flex flex-col min-h-screen"
        >
            <Header />
            <main className="flex-grow" data-scroll-container ref={scrollRef}>
                {showContent && (
                    <>
                        <Outlet />
                        <ContactUsSection />
                        <Footer />
                    </>
                )}{' '}
                {/* Only show after fade-out */}
            </main>
            <Toaster />
        </motion.div>
    );
};

export default Layout;
