import { vars } from 'nativewind';

export const themeColors = {
    '--color-Charcoal': '#233D4D',
    '--color-Charcoal-light': '#adcde0',
    '--color-Charcoal-dark': '#112734',
    '--color-Pumpkin': '#FE7F2D',
    '--color-Pumpkin-light': '#fff4ed',
    '--color-Pumpkin-dark': '#e1732a',
    '--color-Sunglow': '#FCCA46',
    '--color-Sunglow-light': '#fff6de',
    '--color-Sunglow-dark': '#e9b830',
    '--color-Olivine': '#A1C181',
    '--color-Olivine-light': '#eeffdf',
    '--color-Olivine-dark': '#789a55',
    '--color-Zomp': '#619B8A',
    '--color-Zomp-light': '#d1faee',
    '--color-Zomp-dark': '#3b7c69'
};

export const themeVars = {
    '--color-paper': '#F4F7F3',
    '--color-dark-card': '#104B31',
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
    ...themeColors
});

export default theme;