const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: colors.sky,
            },
        },
    },
    plugins: [
        function ({ addBase, theme }) {
            addBase({
                ':root': {
                    '--color-primary-50': theme('colors.primary.50'),
                    '--color-primary-100': theme('colors.primary.100'),
                    '--color-primary-200': theme('colors.primary.200'),
                    '--color-primary-300': theme('colors.primary.300'),
                    '--color-primary-400': theme('colors.primary.400'),
                    '--color-primary-500': theme('colors.primary.500'),
                    '--color-primary-600': theme('colors.primary.600'),
                    '--color-primary-700': theme('colors.primary.700'),
                    '--color-primary-800': theme('colors.primary.800'),
                    '--color-primary-900': theme('colors.primary.900'),
                    '--color-primary-950': theme('colors.primary.950'),
                },
            });
        },
    ],
};
