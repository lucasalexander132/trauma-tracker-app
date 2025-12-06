import { themeSemanticColors } from "@/assets/styles/theme";
import Entypo from "@expo/vector-icons/Entypo";
import classNames from "classnames";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import AppText from "./text";


type CarouselType = {
    onFinish?: () => void;
}

const SLIDE_DURATION = 600;

const Carousel = ({ children, onFinish }: PropsWithChildren & CarouselType) => {
    const [childrenArray] = useState(React.Children.toArray(children));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(childrenArray[currentIndex] ?? null);

    const opacity = useSharedValue(1);
    const translateX = useSharedValue(0);
    const timingOptions = {
        duration: SLIDE_DURATION,
        easing: Easing.inOut(Easing.cubic),
        reduceMotion: ReduceMotion.System
    };
    const buttonTimingOptions = {
        duration: 300,
        easing: Easing.inOut(Easing.cubic),
        reduceMotion: ReduceMotion.System
    };

    // You're using reanimated wrong here, maybe you should translate value assigns to worklets?

    const handlePreviousSlide = () => {
        const previousIndex = currentIndex - 1;
        opacity.value = 0;
        translateX.value = -10;

        setTimeout(() => {
            setCurrentIndex(previousIndex);
            setCurrentSlide(childrenArray[previousIndex]);
            opacity.value = withTiming(1, timingOptions);
            translateX.value = withTiming(0, timingOptions);
        }, 0);
    }

    const handleNextSlide = () => {
        const nextIndex = currentIndex + 1;
        opacity.value = 0;
        translateX.value = 10;

        setTimeout(() => {
            setCurrentIndex(nextIndex);
            setCurrentSlide(childrenArray[nextIndex]);
            opacity.value = withTiming(1, timingOptions);
            translateX.value = withTiming(0, timingOptions);
        }, 0);
    }

    const showPreviousButton = currentIndex > 0;
    const hasNextSlide = currentIndex + 1 < childrenArray.length;

    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(showPreviousButton ? 1 : 0, buttonTimingOptions),
            transform: [
                { translateY: withTiming(showPreviousButton ? 0 : 10, buttonTimingOptions) }
            ]
        };
    });

    const slideAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateX: translateX.value }
            ]
        };
    });

    return (
        <View className='items-center'>
            <View className='flex-row gap-2'>
                {
                    childrenArray.map((child, index) => <Indicator
                        key={`${index}-module-indicator`}
                        isActive={index === currentIndex}
                        index={index}
                        currentIndex={currentIndex} />)
                }
            </View>
            <Animated.View style={slideAnimatedStyle} className='h-[100%] justify-center'>
                { currentSlide }
            </Animated.View>
            <View className='flex-row justify-between w-1/2'>
                <Animated.View style={buttonAnimatedStyle}>
                    <Pressable
                        onPress={handlePreviousSlide}
                        className='bg-[--color-paper-dark] rounded-full border-2 border-[--color-comp-primary-dark] w-16 h-16 justify-center items-center active:opacity-35 transition-all duration-200'>
                        <Entypo
                            className='m-2'
                            color={themeSemanticColors['--color-comp-primary']}
                            size={30}
                            name={'arrow-long-left'}/>
                    </Pressable>
                </Animated.View>
                <Pressable
                    onPress={hasNextSlide ? handleNextSlide : onFinish}
                    className='flex-row bg-[--color-paper-dark] rounded-full border-2 border-[--color-comp-primary-dark] w-16 h-16 justify-center items-center active:opacity-35 transition-all duration-200'>
                    { !hasNextSlide && <AppText className='font-bold left-3'>+</AppText> }
                    <Entypo
                        className='m-2'
                        color={themeSemanticColors['--color-comp-primary']}
                        size={30}
                        name={hasNextSlide ? 'arrow-long-right' : 'feather'}/>
                </Pressable>
            </View>
        </View>
    )
}

type IndicatorProps = {
    isActive: boolean;
    index: number;
    currentIndex: number;
}

const Indicator = ({ isActive }: IndicatorProps) => {
    const scale = useSharedValue(isActive ? 1 : 0.8);

    const indicatorTimingOptions = {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System
    };

    useEffect(() => {
        scale.value = withTiming(isActive ? 1 : 0.6, indicatorTimingOptions);
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    });

    return (
        <Animated.View
            style={animatedStyle}
            className={classNames(isActive ? 'bg-[--color-comp-primary]' : 'border-4 border-[--color-comp-primary]', 'w-4 h-6 rounded-full')} />
    );
}

export default Carousel;