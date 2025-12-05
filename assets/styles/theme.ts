import Entypo from '@expo/vector-icons/Entypo';
import { vars } from 'nativewind';
import { colorKit } from 'reanimated-color-picker';

export const themeColors = {
    '--color-Charcoal': '#233D4D',
    '--color-Pumpkin': '#FE7F2D',
    '--color-Sunglow': '#e1a014',
    '--color-Olivine': '#78a948',
    '--color-Zomp': '#619B8A',
    '--color-Vintage-Grape': '#67506F',
    '--color-Dark-Garnet': '#a30d0a',
    '--color-Cold': '#5f8aa5',
    '--color-Hot': '#971e1e'
} as const;

export const onTextThemeColors = {
    '--color-Charcoal': '#3d5f74',
    '--color-Pumpkin': '#4a2812',
    '--color-Sunglow': '#1f1b14',
    '--color-Olivine': '#2e520a',
    '--color-Zomp': '#043224',
    '--color-Vintage-Grape': '#d8aee7',
    '--color-Dark-Garnet': '#efa7a6',
    '--color-Cold': '#121d24',
    '--color-Hot': '#b76060'
} as const;

export const themeSemanticColors = {
    '--color-primary-50': '#fdece7',
    '--color-primary-100': '#fad8cf',
    '--color-primary-200': '#f6b9a8',
    '--color-primary-300': '#f3957b',
    '--color-primary-400': '#ed7453',
    '--color-primary-500': '#dd4f27', // Main
    '--color-primary-600': '#c9421d',
    '--color-primary-700': '#b13816',
    '--color-primary-800': '#88280d',
    '--color-primary-900': '#77220b',
    '--color-success': '#10B981',
    '--color-success-light': '#5ac68e',
    '--color-success-dark': '#065F46',
    '--color-warning': '#F59E0B',
    '--color-warning-light': '#feba46',
    '--color-warning-dark': '#92400E',
    '--color-danger': '#e13f3f',
    '--color-danger-light': '#e65757',
    '--color-danger-dark': '#991B1B',
    '--color-info': '#427ad4',
    '--color-info-light': '#679de2',
    '--color-info-dark': '#3752ac',
    '--color-comp-primary': '#4aa45e',
    '--color-comp-primary-dark': '#327841'
} as const;

export const themeVars = {
    '--color-paper': '#fffaeb',
    '--color-paper-light': '#fffefa',
    '--color-paper-dark': '#ffe7b0',
    '--color-dark-card': '#146140',
    '--color-contrasting-button': '#C677B3',
    '--color-text': '#522828',
    '--color-text-subtle': '#9f7373',
} as const;

export type TThemeColors = keyof typeof themeColors;

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

export type TThemeBackgrounds = keyof typeof themeBackgrounds;

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

export function interpolateColor(color1: string, color2: string, factor: number): string {
    const hexToRgb = (hex: string) => {
        const parsed = hex.replace('#', '');
        return [
            parseInt(parsed.substring(0, 2), 16),
            parseInt(parsed.substring(2, 4), 16),
            parseInt(parsed.substring(4, 6), 16),
        ];
    };

    const rgbToHex = (r: number, g: number, b: number) =>
        '#' +
        [r, g, b]
            .map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('');

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const result = rgb1.map((c1, i) => Math.round(c1 + (rgb2[i] - c1) * factor));
    return rgbToHex(result[0], result[1], result[2]);
}

export const entypoGlyphArr = Object.keys(Entypo.getRawGlyphMap());
export type IconNameType = keyof typeof Entypo.glyphMap;

export default theme;