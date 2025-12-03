import { themeColors } from '@/assets/styles/theme'
import AppText from '@/components/text'
import { IIntensity } from '@/zustand/journalStore'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import CustomSlider from './slider'

type Props = {
    onValueChange: (intensity: IIntensity) => void;
}

const valueToText = {
    0: 'Frigid',
    10: 'Freezing',
    20: 'Biting',
    30: 'Chilly',
    40: 'Cool',
    50: 'Mild',
    60: 'Warm',
    70: 'Hot',
    80: 'Sweltering',
    90: 'Scorching',
    100: 'Blistering'
}
const COLOR_START = themeColors['--color-Cold'];
const COLOR_END = themeColors['--color-Hot'];

const IntensitySlider = ({onValueChange}: Props) => {
    const [value, setValue] = useState(50);
    const [color, setColor] = useState<string>(COLOR_START);
    const handleChangeValue = (value: number) => {
        setValue(value);
        onValueChange({
            intensityMethod: 'color_slider',
            intensityValue: value,
            intensityRating: getIntensityRating(value)
        });
    }

    const getIntensityRating = (value: number) => {
        return valueToText[Math.round(value / 10) * 10 as keyof typeof valueToText];
    }

    // Set initial intensity when loaded
    // Keep an eye on this when you add more intensities
    // It's okay for now though
    useEffect(() => handleChangeValue(value), []);

    return (
        <View>
            <AppText className='font-bold text-lg text-center mb-5' style={{
                color
            }}>{getIntensityRating(value)}</AppText>
            <CustomSlider
                onValueChange={handleChangeValue}
                onColorChange={setColor}
                initialValue={50}
                startColor={COLOR_START}
                endColor={COLOR_END} />
        </View>
    )
}

export default IntensitySlider