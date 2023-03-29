/** @type {import('tailwindcss').Config} */
const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];
module.exports = {
    purge: {
        content: [
            './src/**/**/*.{html,js}',
            './components/**/*.{js}',
            './public/index.html',
        ],
        safelist: [
            ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
            ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
            ...labelsClasses.map((lbl) => `text-${lbl}-400`),
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Open Sans'],
            },
            gridTemplateColumns: {
                '1/5': '1fr 5fr',
            },
            colors: {
                'background-btn': 'rgba(60, 64, 67, 0.08)',
            },
            height: {
                6.4: '64px',
            },
            width: {
                25.6: '256px',
            },
            borderColor: {
                color: '#dadce0',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
