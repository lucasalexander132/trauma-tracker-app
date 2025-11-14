import { vars } from 'nativewind';

export const randomColors = {
    '--color-Charcoal': '#233D4D',
    '--color-Charcoal-light': '#233D4D',
    '--color-Charcoal-dark': '#233D4D',
    '--color-Pumpkin': '#FE7F2D',
    '--color-Pumpkin-light': '#ffdec9',
    '--color-Pumpkin-dark': '#e1732a',
    '--color-Sunglow': '#FCCA46',
    '--color-Sunglow-light': '#FCCA46',
    '--color-Sunglow-dark': '#FCCA46',
    '--color-Olivine': '#A1C181',
    '--color-Olivine-light': '#d0eeb5',
    '--color-Olivine-dark': '#789a55',
    '--color-Zomp': '#619B8A',
    '--color-Zomp-light': '#90cab9',
    '--color-Zomp-dark': '#3b7c69'
};

export const getRandomColor = (): IRandomColors => {
    const keys = Object.keys(randomColors);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex] as IRandomColors;
}

export type IRandomColors = keyof typeof randomColors;

const theme = vars({
    '--color-paper': '#F4F7F3',
    '--color-dark-card': '#104B31',
    '--color-contrasting-button': '#C677B3',
    ...randomColors
});

export default theme;