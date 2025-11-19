import { interpolateColor, themeColors, themeVars } from '@/assets/styles/theme';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
const { width } = Dimensions.get('window');

const MIN = 0;
const MAX = 100;
const COLOR_START = themeColors['--color-Cold'];
const COLOR_END = themeColors['--color-Hot'];

const CustomSlider: React.FC = () => {
    const [value, setValue] = useState<number>(50);

    const percent = (value - MIN) / (MAX - MIN);
    const trackColor = interpolateColor(COLOR_START, COLOR_END, percent);

    const sliderStyle = {
        sliderDummy: {
            top: 3,
            backgroundColor: trackColor,
            transitionProperty: ['backgroundColor'],
            height: 32,
            width: (width / 100) * 85,
            borderRadius: 50
        }
    };
    return (
        <View style={styles.container}>
            <View className='relative'>
                <View style={sliderStyle.sliderDummy}></View>
                <Slider
                    className='absolute'
                    minimumValue={MIN}
                    maximumValue={MAX}
                    value={value}
                    onValueChange={setValue}
                    minimumTrackTintColor={trackColor}
                    maximumTrackTintColor={trackColor}
                    thumbTintColor={themeVars['--color-paper']}
                    step={1}
                    style={styles.slider}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '85%',
        alignSelf: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
        position: 'absolute'
    }
});

export default CustomSlider;
