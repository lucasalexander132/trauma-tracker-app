import Entypo from '@expo/vector-icons/Entypo';
import { vars } from 'nativewind';
import { colorKit } from 'reanimated-color-picker';

export const themeColors = {
    '--color-Charcoal': '#233D4D',
    '--color-Pumpkin': '#FE7F2D',
    '--color-Sunglow': '#f1bb46',
    '--color-Olivine': '#94bd6a',
    '--color-Zomp': '#619B8A',
    '--color-Vintage-Grape': '#67506F',
    '--color-Dark-Garnet': '#a30d0a'
} as const;

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
    '--color-danger': '#df4242',
    '--color-danger-light': '#FEE2E2',
    '--color-danger-dark': '#991B1B',
    '--color-info': '#3B82F6',
    '--color-info-light': '#DBEAFE',
    '--color-info-dark': '#1E40AF',
} as const;

export const themeVars = {
    '--color-paper': '#fdfff1',
    '--color-paper-light': '#fffefa',
    '--color-dark-card': '#146140',
    '--color-contrasting-button': '#C677B3',
    '--color-text': '#112734',
    '--color-text-subtle': '#464b4e',
} as const;

export const getRandomColor = (): TThemeColors => {
    const keys = Object.keys(themeColors);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex] as TThemeColors;
}

export type TThemeColors = keyof typeof themeColors;
export type TThemeBaseColors = Exclude<
    keyof typeof themeColors,
    `${string}-light` | `${string}-dark`
>;

export const themeBackgrounds: {
    [K in Exclude<
        keyof typeof themeColors,
        `${string}-light` | `${string}-dark`
    >]?: string;
} = {
    '--color-Charcoal': 'bg-[--color-Charcoal]',
    '--color-Pumpkin': 'bg-[--color-Pumpkin]',
    '--color-Sunglow': 'bg-[--color-Sunglow]',
    '--color-Olivine': 'bg-[--color-Olivine]',
    '--color-Zomp': 'bg-[--color-Zomp]',
    '--color-Vintage-Grape': 'bg-[--color-Vintage-Grape]',
    '--color-Dark-Garnet': 'bg-[--color-Dark-Garnet]'
}

const theme = vars({
    ...themeVars,
    ...themeSemanticColors,
    ...themeColors
});

export const swatchMap = new Map();
export const customSwatches: string[] = [];
Object.entries(themeColors).forEach(([key, value]) => {
    const color = colorKit.HEX(value);
    customSwatches.push(color);
    swatchMap.set(color, key);
});

export const entypoGlyphArr = Object.keys(Entypo.getRawGlyphMap());

export default theme;