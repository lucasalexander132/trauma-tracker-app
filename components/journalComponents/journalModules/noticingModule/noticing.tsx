import Carousel from '@/components/carousel'
import CustomButton from '@/components/customButton'
import Divider from '@/components/divider'
import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import AppText from '@/components/text'
import { IEntry } from '@/constants/types/Entries'
import { useJournalState } from '@/zustand/journalStore'
import useModuleState from '@/zustand/moduleStore'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import ModuleCard from '../moduleCard'
import { SlideRenderer } from '../moduleSlideRenderer'
import { noticingModuleData } from './noticingModuleData'

const NoticingModule = ({ entry }: { entry: string}) => {
    const [parsedEntry, setParsedEntry] = useState<IEntry>();
    const [startModule, setStartModule] = useState(false);
    const [showCarousel, setShowCarousel] = useState(false);
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);
    const exerciseData = useModuleState((state) => state.exerciseData);

    const buttonOpacity = useRef(new Animated.Value(1)).current;
    const buttonTranslateY = useRef(new Animated.Value(0)).current;
    const cardOpacity = useRef(new Animated.Value(1)).current;
    const cardTranslateY = useRef(new Animated.Value(0)).current;
    const carouselOpacity = useRef(new Animated.Value(0)).current;
    const carouselTranslateY = useRef(new Animated.Value(-30)).current;

    useEffect(() => {
        return () => clearJournalEntry();
    }, []);

    useEffect(() => {
        if (!parsedEntry) {
            setParsedEntry(JSON.parse(entry) as IEntry);
        }
    }, [entry]);

    useEffect(() => {
        if (startModule) {
            // First: Fade out and down the button
            Animated.parallel([
                Animated.timing(buttonOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonTranslateY, {
                    toValue: 20,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Second: Fade out and down the card
                Animated.parallel([
                    Animated.timing(cardOpacity, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(cardTranslateY, {
                        toValue: 20,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    // Third: Show carousel and fade it in from above
                    setShowCarousel(true);
                    Animated.parallel([
                        Animated.timing(carouselOpacity, {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(carouselTranslateY, {
                            toValue: 0,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                    ]).start();
                });
            });
        }
    }, [startModule]);

    const finishPressed = () => {
        console.log(exerciseData);
    }

    return (
        <View className='mt-4'>
            <JournalSectionHeader
                title='Noticing'
                description="Discover how the triggered brain works"/>
            <Divider />
            <View className='px-6 h-[80%] pt-8'>
                {
                    !showCarousel && <View className='h-full justify-center'>
                        <Animated.View style={{ opacity: cardOpacity, transform: [{ translateY: cardTranslateY }] }}>
                            <ModuleCard>
                                <AppText className='font-bold color-[--color-text] px-2 pt-2'>
                                    When our brains respond to trauma, they don't actually know when and where they are. Instead, they respond to the environment in ways adapted to keep us safe.
                                </AppText>
                                <AppText className='font-bold mt-4 color-[--color-text] pb-2 px-2'>
                                    This module will help us explore how your responses keep you safe in context.
                                </AppText>
                            </ModuleCard>
                        </Animated.View>
                        <Animated.View style={{ opacity: buttonOpacity, transform: [{ translateY: buttonTranslateY }] }}>
                            <CustomButton
                                onPress={() => setStartModule(true)}
                                buttonClassName='rounded-full border-1'
                                iconName={'direction'}
                                iconSize={14}
                                title={'Begin Module'} />
                        </Animated.View>
                    </View>
                }
                {
                    showCarousel &&
                        <Animated.View style={{ opacity: carouselOpacity, transform: [{ translateY: carouselTranslateY }], flex: 1 }}>
                            <Carousel onFinish={() => finishPressed()}>
                                {noticingModuleData.slides.map((slide) => (
                                    <SlideRenderer
                                        key={slide.id}
                                        slide={slide}
                                        entry={parsedEntry}
                                    />
                                ))}
                            </Carousel>
                        </Animated.View>
                }
                
            <SafeFooter multiplier={2} />
            </View>
        </View>
    )
}

export default NoticingModule;