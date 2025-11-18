import { vars } from 'nativewind';

export const themeColors = {
    '--color-Charcoal': '#233D4D',
    '--color-Charcoal-light': '#adcde0',
    '--color-Charcoal-dark': '#112734',
    '--color-Pumpkin': '#FE7F2D',
    '--color-Pumpkin-light': '#fff4ed',
    '--color-Pumpkin-dark': '#e1732a',
    '--color-Sunglow': '#f6be45',
    '--color-Sunglow-light': '#fff6de',
    '--color-Sunglow-dark': '#e9b830',
    '--color-Olivine': '#A1C181',
    '--color-Olivine-light': '#eeffdf',
    '--color-Olivine-dark': '#789a55',
    '--color-Zomp': '#619B8A',
    '--color-Zomp-light': '#d1faee',
    '--color-Zomp-dark': '#3b7c69'
};

export const themeSemanticColors = {
    '--color-primary-50': '#fdece7',
    '--color-primary-100': '#fad8cf',
    '--color-primary-200': '#f8c5b7',
    '--color-primary-300': '#f6b29f',
    '--color-primary-400': '#f39f87',
    '--color-primary-500': '#f18a6e', // Main
    '--color-primary-600': '#eb603a',
    '--color-primary-700': '#d53f15',
    '--color-primary-800': '#a02f10',
    '--color-primary-900': '#6b1f0b',
    '--color-success': '#10B981',
    '--color-success-light': '#D1FAE5',
    '--color-success-dark': '#065F46',
    '--color-warning': '#F59E0B',
    '--color-warning-light': '#FEF3C7',
    '--color-warning-dark': '#92400E',
    '--color-danger': '#EF4444',
    '--color-danger-light': '#FEE2E2',
    '--color-danger-dark': '#991B1B',
    '--color-info': '#3B82F6',
    '--color-info-light': '#DBEAFE',
    '--color-info-dark': '#1E40AF',
}

export const themeVars = {
    '--color-paper': '#fdfff1',
    '--color-dark-card': '#146140',
    '--color-contrasting-button': '#C677B3',
    '--color-text': '#112734',
}

export const getRandomColor = (): IThemeColors => {
    const keys = Object.keys(themeColors);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex] as IThemeColors;
}

export type IThemeColors = keyof typeof themeColors;
export type IThemeBaseColors = Exclude<
    keyof typeof themeColors,
    `${string}-light` | `${string}-dark`
>;

const theme = vars({
    ...themeVars,
    ...themeSemanticColors,
    ...themeColors
});

export default theme;