const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        process.env.NODE_ENV === 'production' &&
        purgecss({
            content: [
                './src/**/*.js',
                './src/**/*.jsx',
                './public/index.html',
            ],
            // Safelist Bootstrap classes that are dynamically added
            safelist: {
                standard: [
                    'carousel',
                    'carousel-inner',
                    'carousel-item',
                    'active',
                    'show',
                    'fade',
                    'modal',
                    'modal-backdrop',
                    'collapse',
                    'collapsing',
                ],
                deep: [/^carousel-/, /^modal-/, /^dropdown-/, /^btn-/, /^col-/],
                greedy: [/^d-/, /^flex-/, /^justify-/, /^align-/, /^text-/, /^bg-/],
            },
            defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        }),
    ].filter(Boolean),
};
