import { interpolateColor, themeVars } from '@/assets/styles/theme';
import useSettingsStore from '@/zustand/settingsStore';
import Slider from '@react-native-community/slider';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { cubicBezier } from 'react-native-reanimated';
const { width } = Dimensions.get('window');

const MIN = 0;
const MAX = 100;

export interface ICustomSliderProps {
    onValueChange: (val: number) => void;
    onColorChange: (color: string) => void;
    initialValue: number;
    startColor: string;
    endColor: string;
}

function CustomSlider({onValueChange, onColorChange, initialValue, startColor, endColor}: ICustomSliderProps) {
    const [value, setValue] = useState<number>(initialValue);
    const [trackColor, setTrackColor] = useState<string>(startColor);
    const [barHeight, setBarHeight] = useState<number>(32);
    const [barTop, setBarTop] = useState<number>(3);
    const interp = (value: number) => {
        setValue(value);
        const percent = (value - MIN) / (MAX - MIN);
        const color = interpolateColor(startColor, endColor, percent);
        setTrackColor(color);
        onColorChange(color);
        onValueChange(value);
    };
    const settings = useSettingsStore((state) => state.settings);

    const sliderStyle = {
        sliderDummy: {
            top: barTop,
            backgroundColor: trackColor,
            transitionProperty: ['height', 'top'],
            height: barHeight,
            width: (width / 100) * 85,
            borderRadius: 50,
            margin: 2,
            transitionTimingFunction: cubicBezier(.4,.34,.13,.99),
            transitionDuration: 1000
        },
        paperSlider: {
            backgroundColor: themeVars['--color-paper-dark'],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 1.5,
            elevation: 5
        }
    };

    const decreaseBarHeight = () => {
        setBarHeight(6);
        setBarTop(17);
    };

    const increaseBarHeight = () => setTimeout(() =>{
        setBarHeight(32);
        setBarTop(3);
    }, 400);

    const onSlidingComplete = () => {
        increaseBarHeight();
    }

    useEffect(() => interp(value), []);

    return (
        <View style={styles.container}>
            <Animated.View
                className={classNames('h-[42px] px-1 rounded-full')}
                style={settings['stickerMode'].value && sliderStyle.paperSlider}>
                <Animated.View style={sliderStyle.sliderDummy} />
                <Slider
                    className='absolute'
                    minimumValue={MIN}
                    maximumValue={MAX}
                    value={value}
                    onValueChange={interp}
                    minimumTrackTintColor={trackColor}
                    maximumTrackTintColor={trackColor}
                    thumbTintColor={themeVars['--color-paper']}
                    step={10}
                    style={styles.slider}
                    onSlidingComplete={onSlidingComplete}
                    onSlidingStart={decreaseBarHeight}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center'
    },
    slider: {
        width: '99%',
        height: 40,
        position: 'absolute',
        alignSelf: 'center',
        top: 2
    }
});

export default CustomSlider;
