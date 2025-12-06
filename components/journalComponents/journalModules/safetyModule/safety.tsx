import Carousel from '@/components/carousel'
import CustomButton from '@/components/customButton'
import Divider from '@/components/divider'
import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import AppText from '@/components/text'
import { useJournalState } from '@/zustand/journalStore'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Animated, View } from 'react-native'

const SafetyModule = () => {
    const [startModule, setStartModule] = useState(false);
    const [showCarousel, setShowCarousel] = useState(false);
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

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
    return (
        <View className='mt-4'>
            <JournalSectionHeader
                title='Safety'
                description="Discover how your symptoms keep you safe"/>
            <Divider />
            <View className='px-6 h-[80%] pt-8'>
                {
                    !showCarousel && <View className='h-full justify-center'>
                        <Animated.View style={{ opacity: cardOpacity, transform: [{ translateY: cardTranslateY }] }}>
                            <ModuleCard>
                                <AppText className='font-bold color-[--color-text]'>
                                    When our brains respond to trauma, they don't actually know when and where they are. Instead, they respond to the environment in ways adapted to keep us safe.
                                </AppText>
                                <AppText className='font-bold mt-4 color-[--color-text]'>
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
                            <Carousel onFinish={() => console.log('Finished')}>
                                <ModuleCard>
                                    <AppText className='font-bold color-[--color-text]'>Our brains are magnificent structures. They are composed of many different parts, but we tend to perceive them as one.</AppText>
                                </ModuleCard>
                                <ModuleCard>
                                    <AppText className='font-bold color-[--color-text]'>We have the lizard brain. This is our instinctual brain. It controls our autonomous systems, breathing and heart beat.</AppText>
                                </ModuleCard>
                                <ModuleCard>
                                    <AppText className='font-bold color-[--color-text]'>We have the mammalian brain. This is our emotional brain. It lacks words but allows us to feel.</AppText>
                                </ModuleCard>
                                <ModuleCard>
                                    <AppText className='font-bold color-[--color-text]'>And we have the frontal lobe. This is our rational brain. It can use language and logic, but doesn't have complete control over the other two. You can't think your heart into stopping, and some emotions you can't put into words.</AppText>
                                </ModuleCard>
                                <ModuleCard>
                                    <AppText className='font-bold color-[--color-text]'>This app was put together with this in mind. First we track traumatic events with our instinctual and emotional brains in mind, and then when we have had time away from the event, we can be curious with our rational brains using these modules.</AppText>
                                </ModuleCard>
                            </Carousel>
                        </Animated.View>
                }
                
            <SafeFooter multiplier={2} />
            </View>
        </View>
    )
}

const ModuleCard = ({ children }: PropsWithChildren) => {
    return(
        <View className='bg-[--color-paper-dark] rounded-lg py-2 px-3 mb-4'>
            { children }
        </View>
    )
}

export default SafetyModule;