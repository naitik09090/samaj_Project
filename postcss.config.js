module.exports = {
    plugins: [
        require('@fullhuman/postcss-purgecss')({
            content: [
                './src/**/*.js',
                './src/**/*.jsx',
                './public/index.html',
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
                standard: [
                    'active',
                    'show',
                    'fade',
                    'collapse',
                    'collapsing',
                    'carousel-item-next',
                    'carousel-item-prev',
                    'carousel-item-start',
                    'carousel-item-end',
                ],
                deep: [/^carousel/, /^modal/, /^dropdown/, /^nav/, /^navbar/],
                greedy: [/^btn/, /^col/, /^row/, /^container/]
            }
        })
    ]
};
