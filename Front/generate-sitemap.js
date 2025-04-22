import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import fetch from 'node-fetch'; // If you're using an API

const hostname = 'https://foororsayt.az/';
const now = new Date().toISOString();

// Static pages
const staticPages = [
    { url: '/', lastmod: now, changefreq: 'daily', priority: 1.0 },
    { url: '/about', lastmod: now, changefreq: 'monthly', priority: 0.8 },
    {
        url: '/about-development',
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.8,
    },
    { url: '/blogs', lastmod: now, changefreq: 'monthly', priority: 0.7 },
    { url: '/worcks', lastmod: now, changefreq: 'monthly', priority: 0.7 },
];

// Mock example of dynamic blog fetch — replace this with your real fetch
async function fetchBlogSlugs() {
    const response = await fetch('https://back-foror.vercel.app/admin/blogs');
    const data = await response.json();
    return data; // assuming it returns the expected format
}
async function fetchServiceSlugs() {
    const response = await fetch(
        'https://back-foror.vercel.app/admin/services'
    );
    const data = await response.json();
    return data; // assuming it returns the expected format
}
async function fetchWorcksSlugs() {
    const response = await fetch(
        'https://back-foror.vercel.app/admin/partfolio'
    );
    const data = await response.json();
    return data; // assuming it returns the expected format
}
// Generate sitemap
const generateSitemap = async () => {
    const sitemapStream = new SitemapStream({ hostname });
    const urls = [...staticPages];

    // Get blog slugs
    const blogPosts = await fetchBlogSlugs();
    const servicesPosts = await fetchServiceSlugs();
    const portfolioPosts = await fetchWorcksSlugs();

    blogPosts.forEach((post) => {
        for (const lang of ['az', 'en', 'ru']) {
            if (post.slug[lang]) {
                urls.push({
                    url: `/blogs/${post.slug[lang]}`,
                    lastmod: now,
                    changefreq: 'weekly',
                    priority: 0.8,
                });
            }
        }
    });
    servicesPosts.forEach((post) => {
        for (const lang of ['az', 'en', 'ru']) {
            if (post.slug[lang]) {
                urls.push({
                    url: `/service/${post.slug[lang]}`,
                    lastmod: now,
                    changefreq: 'weekly',
                    priority: 0.9,
                });
            }
        }
    });
    portfolioPosts.forEach((post) => {
        if (post.isdetail) {
            for (const lang of ['az', 'en', 'ru']) {
                if (post.slug[lang]) {
                    urls.push({
                        url: `/worck/${post.slug[lang]}`,
                        lastmod: now,
                        changefreq: 'weekly',
                        priority: 0.7,
                    });
                }
            }
        }
    });
    // Add services or other dynamic pages
    // const dynamicPages = ['/service/1', '/service/2', '/service/3'];
    // dynamicPages.forEach((page) =>
    //     urls.push({
    //         url: page,
    //         lastmod: now,
    //         changefreq: 'monthly',
    //         priority: 0.7,
    //     })
    // );

    // Write to sitemap stream
    urls.forEach((url) => sitemapStream.write(url));
    sitemapStream.end();

    const sitemapXML = await streamToPromise(sitemapStream).then((data) =>
        data.toString()
    );

    const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemapXML);
    console.log('✅ Sitemap generated and saved to public/sitemap.xml');
};

generateSitemap();
