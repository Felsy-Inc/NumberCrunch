import { SitemapStream, streamToPromise } from 'sitemap';
import { defineEventHandler } from 'h3';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Set content type header
        event.node.res.setHeader('Content-Type', 'application/xml');
        // Optional: Add cache control
        event.node.res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours cache

        const sitemap = new SitemapStream({
            hostname: 'https://numbercrunch.io', // Replace with your domain
        });

        // Add static routes
        sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
        sitemap.write({ url: '/settings', changefreq: 'monthly', priority: 0.3 });

        // Add calculator routes
        const calculators = [
            { path: '/calculator/percentage', priority: 0.9 },
            { path: '/calculator/loan', priority: 0.9 },
            { path: '/calculator/mortgage', priority: 0.9 },
            { path: '/calculator/currency', priority: 0.9 },
            { path: '/calculator/bmi', priority: 0.9 },
            { path: '/calculator/calories', priority: 0.9 },
            { path: '/calculator/basic-math', priority: 0.9 },
            { path: '/calculator/area', priority: 0.9 },
            { path: '/calculator/volume', priority: 0.9 },
            { path: '/calculator/conversion', priority: 0.9 },
            { path: '/randomizer/random-number', priority: 0.9 },
            { path: '/randomizer/coin-flip', priority: 0.9 },
            { path: '/randomizer/dice-roll', priority: 0.9 },
            { path: '/randomizer/team-generator', priority: 0.9 },
        ];

        calculators.forEach((calc) => {
            sitemap.write({
                url: calc.path,
                changefreq: 'weekly',
                priority: calc.priority,
            });
        });

        sitemap.end();

        const sitemapBuffer = await streamToPromise(sitemap);
        return sitemapBuffer;
    } catch (error) {
        console.error('Error generating sitemap:', error);
        throw createError({
            statusCode: 500,
            message: 'Error generating sitemap',
        });
    }
});
