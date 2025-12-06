import Carousel from '@/components/carousel'
import CustomButton from '@/components/customButton'
import Divider from '@/components/divider'
import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import AppText from '@/components/text'
import { IEntry } from '@/constants/types/Entries'
import { useJournalState } from '@/zustand/journalStore'
import classNames from 'classnames'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Animated, FlatList, Image, TextInput, View } from 'react-native'
import SmallTag from '../smallTag'

const NoticingModule = ({ entry }: { entry: string}) => {
    const [parsedEntry, setParsedEntry] = useState<IEntry>();
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
                            <Carousel onFinish={() => console.log('Finished')}>
                                <View className='mt-4'>
                                    <ModuleCard>
                                        <View className='bg-[--color-Sunglow] rounded-tr-xl py-2 h-[150px]'>
                                            <Image
                                                source={require('@/assets/images/safety-brain.png')}
                                                style={{
                                                    width: '100%',
                                                    height: 200,
                                                    resizeMode: 'contain',
                                                    top: -70
                                                }} />
                                        </View>
                                        <View className='h-[2px] bg-[--color-text] w-full' />
                                        <AppText className='font-bold color-[--color-text] p-2'>Our brains are magnificent structures. They are composed of many different parts, but we tend to perceive them as one.</AppText>
                                    </ModuleCard>
                                </View>
                                <ModuleCard className='mt-6'>
                                    <View className='bg-[--color-Olivine] rounded-tr-xl py-2 h-[150px]'>
                                        <Image
                                            source={require('@/assets/images/iguana.png')}
                                            style={{
                                                width: '100%',
                                                height: 200,
                                                resizeMode: 'contain',
                                                top: -70
                                            }} />
                                    </View>
                                    <View className='h-[2px] bg-[--color-text] w-full' />
                                    <AppText className='font-bold color-[--color-text] p-2'>We have the reptilian brain.</AppText>
                                    <View className='h-[2px] bg-[--color-text] w-full' />
                                    <AppText className='font-bold color-[--color-text] px-2 pt-2'>This is our instinctual brain. It controls our autonomous systems, like breathing and our beating hearts.</AppText>
                                    <AppText className='font-bold color-[--color-text] p-2'>I call my reptilian brain lizzo because I feel it's most fitting and he doesn't care.</AppText>
                                </ModuleCard>
                                <ModuleCard className='mt-10'>
                                    <View className='bg-[--color-Pumpkin] rounded-tr-xl py-2 h-[150px]'>
                                        <Image
                                            source={require('@/assets/images/mammal.png')}
                                            style={{
                                                width: '100%',
                                                height: 200,
                                                resizeMode: 'contain',
                                                top: -70
                                            }} />
                                    </View>
                                    <View className='h-[2px] bg-[--color-text] w-full' />
                                    <AppText className='font-bold color-[--color-text] p-2'>We have the mammalian brain. The limbic system.</AppText>
                                    <View className='h-[2px] bg-[--color-text] w-full' />
                                    <AppText className='font-bold color-[--color-text] p-2'>This is our emotional brain. It lacks words but allows us to feel strongly and deeply, and stores those feelings as emotional memories.</AppText>
                                    <AppText className='font-bold color-[--color-text] p-2'>It's why you can see a picture of a sad cat and go "Yo, that's me" even though you can use your sad cat words to describe your sad cat self.</AppText>
                                </ModuleCard>
                                <ModuleCard>
                                    <View className='bg-[--color-Vintage-Grape] rounded-tr-xl py-2 h-[150px]'>
                                        <Image
                                            source={require('@/assets/images/frontal-lobe.png')}
                                            style={{
                                                width: '100%',
                                                height: 200,
                                                resizeMode: 'contain',
                                                top: -50
                                            }} />
                                    </View>
                                    <View className='h-[2px] bg-[--color-text] w-full' />
                                    <AppText className='font-bold color-[--color-text] p-2'>And we have the thinking brain. The prefrontal cortex.</AppText>
                                    <View className='h-[2px] bg-[--color-text] w-full' />
                                    <AppText className='font-bold color-[--color-text] p-2'>This is our rational brain. It can use language and logic and interprets the lizard and mammalian brain.</AppText>
                                    <AppText className='font-bold color-[--color-text] p-2'>You can't think your heart into stopping, and some emotions you can't put into words.</AppText>
                                </ModuleCard>
                                <ModuleCard>
                                    <AppText className='font-bold color-[--color-text] p-2'>When we:</AppText>
                                    <AppText className='font-bold color-[--color-text] px-2'>- Act first without thinking</AppText>
                                    <AppText className='font-bold color-[--color-text] px-2'>- Feel strongly without words</AppText>
                                    <AppText className='font-bold color-[--color-text] px-2'>- Become so numb we can only detach</AppText>
                                    <AppText className='font-bold color-[--color-text] p-2'>We are experiencing a disharmony between these three brains.</AppText>
                                    <View className='h-[2px] bg-[--color-text] w-full' />
                                    <AppText className='font-bold color-[--color-text] p-2'>The follow-up questions in this module will help you understand how your three brains contributed in the attached journal entry.</AppText>
                                </ModuleCard>
                                <View>
                                    <AppText
                                        style={{
                                            fontFamily: 'TypoGraphica'
                                        }}
                                        className='font-bold text-4xl color-[--color-text] p-2'>Question 1</AppText>
                                    <ModuleCard>
                                        <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>What does your prefrontal cortex (thinking) brain remember from the event?</AppText>
                                        <AppText className='font-bold color-[--color-text-subtle] px-2 pb-2'>Do you remember everything in detail, or only small pieces?</AppText>
                                        <View className='h-[2px] bg-[--color-text] w-full' />
                                        <TextInput
                                            editable
                                            multiline
                                            maxLength={2000}
                                            placeholder="My thinking brain remembers..."
                                            className="bg-[--color-paper-dark] font-bold rounded-md p-2 mb-4 w-full h-28"/>
                                    </ModuleCard>
                                </View>
                                <View>
                                    <AppText
                                        style={{
                                            fontFamily: 'TypoGraphica'
                                        }}
                                        className='font-bold text-4xl color-[--color-text] p-2'>Question 2</AppText>
                                    <ModuleCard>
                                        <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>What does your mammalian (emotional) brain remember from the event?</AppText>
                                        <AppText className='font-bold color-[--color-text-subtle] px-2 pb-2'>Do you remember feeling nauseous, or angry? How did your body feel?</AppText>
                                        <View className='h-[2px] bg-[--color-text] w-full' />
                                        <TextInput
                                            editable
                                            multiline
                                            maxLength={2000}
                                            placeholder="My mammalian brain remembers..."
                                            className="bg-[--color-paper-dark] font-bold rounded-md p-2 mb-4 w-full h-28"/>
                                    </ModuleCard>
                                </View>
                                <View>
                                    <AppText
                                        style={{
                                            fontFamily: 'TypoGraphica'
                                        }}
                                        className='font-bold text-4xl color-[--color-text] p-2'>Question 3</AppText>
                                    <ModuleCard>
                                        <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>What does your reptilian (instinctual) brain remember from the event?</AppText>
                                        <AppText className='font-bold color-[--color-text-subtle] px-2 pb-2'>Was your heart racing? Did you feel flushed? Hot, cold?</AppText>
                                        <View className='h-[2px] bg-[--color-text] w-full' />
                                        <TextInput
                                            editable
                                            multiline
                                            maxLength={2000}
                                            placeholder="My reptilian brain remembers..."
                                            className="bg-[--color-paper-dark] font-bold rounded-md p-2 mb-4 w-full h-28"/>
                                    </ModuleCard>
                                </View>
                                <View>
                                    <AppText
                                        style={{
                                            fontFamily: 'TypoGraphica'
                                        }}
                                        className='font-bold text-4xl color-[--color-text] p-2'>Noticing Exercise</AppText>
                                    <ModuleCard>
                                        <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>Tap the symptoms important to that part of your brain</AppText>
                                        <View className='h-[2px] bg-[--color-text] w-full' />
                                        <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>Prefrontal Cortex</AppText>
                                        <View className='h-[60px]'>
                                            <FlatList
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerClassName='items-center'
                                                className="px-4"
                                                renderItem={({ item: tag }) => 
                                                        (<View key={`${tag.id}-prefrontal`} className="mr-2">
                                                            <SmallTag
                                                                asButton
                                                                key={`${tag.id}-small-tag`}
                                                                name={tag.name}
                                                                icon={tag.icon}
                                                                color={tag.color}/>
                                                        </View>)}
                                                data={parsedEntry?.eventTags} />
                                        </View>
                                        <View className='h-[2px] bg-[--color-text] w-full' />
                                        <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>Mammalian Brain</AppText>
                                        <View className='h-[60px]'>
                                            <FlatList
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerClassName='items-center'
                                                className="px-4 mb-2"
                                                renderItem={({ item: tag }) => 
                                                        (<View key={`${tag.id}-prefrontal`} className="mr-2">
                                                            <SmallTag
                                                                asButton
                                                                key={`${tag.id}-small-tag`}
                                                                name={tag.name}
                                                                icon={tag.icon}
                                                                color={tag.color}/>
                                                        </View>)}
                                                data={parsedEntry?.eventTags} />
                                        </View>
                                        <View className='h-[2px] bg-[--color-text] w-full' />
                                        <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>Lizard Brain</AppText>
                                        <View className='h-[60px]'>
                                            <FlatList
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerClassName='items-center'
                                                className="px-4 mb-2"
                                                renderItem={({ item: tag }) => 
                                                        (<View key={`${tag.id}-prefrontal`} className="mr-2">
                                                            <SmallTag
                                                                asButton
                                                                key={`${tag.id}-small-tag`}
                                                                name={tag.name}
                                                                icon={tag.icon}
                                                                color={tag.color}/>
                                                        </View>)}
                                                data={parsedEntry?.eventTags} />
                                        </View>
                                    </ModuleCard>
                                </View>
                            </Carousel>
                        </Animated.View>
                }
                
            <SafeFooter multiplier={2} />
            </View>
        </View>
    )
}

// You have a few different types of module components you can make here
// Explainer with image
// Explainer without image
// Question
// Exercise
// Each one of those has components
// This is probably where you can use composition

type ModuleCardType = {
    className?: string;
}

const ModuleCard = ({ children, className }: PropsWithChildren & ModuleCardType) => {
    return(
        <View className={classNames(className, 'bg-[--color-paper-dark] border-[--color-text] border-2 rounded-bl-2xl rounded-tr-2xl mb-4 shadow-[3px_3px_0px_rgba(0,0,0,1)]')}>
            { children }
        </View>
    )
}

export default NoticingModule;