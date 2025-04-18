import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useSmoothScroll } from './helpers/Scroll/useSmoothScroll';

const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const AboutDevelopment = lazy(() => import('./Pages/AboutDevelopment'));
const Service = lazy(() => import('./Pages/Service'));
const BlogDetail = lazy(() => import('./Pages/BlogDetail'));
const Blogs = lazy(() => import('./Pages/Blogs'));
const Price = lazy(() => import('./Pages/Price'));
const Worcks = lazy(() => import('./Pages/Worcks'));
const Sucses = lazy(() => import('./Pages/Sucses'));
const WorckDetail = lazy(() => import('./Pages/WorckDetail'));

function App() {
    const queryClient = new QueryClient();
    useSmoothScroll();
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />

                        <Route path="/about" element={<About />} />

                        <Route
                            path="/about-development"
                            element={<AboutDevelopment />}
                        />

                        <Route path="/service/:slug" element={<Service />} />

                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/blogs/:page" element={<Blogs />} />
                        <Route path="/worcks/:page" element={<Worcks />} />

                        <Route path="/blog/:slug" element={<BlogDetail />} />

                        <Route path="/price-list" element={<Price />} />

                        <Route path="/worcks" element={<Worcks />} />
                        <Route path="/worck/:slug" element={<WorckDetail />} />
                        <Route path="/sucses" element={<Sucses />} />
                    </Route>
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
