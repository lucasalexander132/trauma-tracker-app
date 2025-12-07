import Carousel from '@/components/carousel'
import CustomButton from '@/components/customButton'
import Divider from '@/components/divider'
import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import AppText from '@/components/text'
import { IEntry } from '@/constants/types/Entries'
import { useJournalState } from '@/zustand/journalStore'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, FlatList, TextInput, View } from 'react-native'
import SmallTag from '../smallTag'
import ModuleCard from './moduleCard'

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
                                        <ModuleCard.Img
                                            src={require('@/assets/images/safety-brain.png')}
                                            color={'--color-Sunglow'}/>
                                        <ModuleCard.Content>
                                            <ModuleCard.Txt>Our brains are magnificent structures. They are composed of many different parts, but we tend to perceive them as one.</ModuleCard.Txt>
                                        </ModuleCard.Content>
                                    </ModuleCard>
                                </View>
                                <ModuleCard className='mt-6'>
                                    <ModuleCard.Img
                                        src={require('@/assets/images/iguana.png')}
                                        color={'--color-Olivine'}/>
                                    <ModuleCard.Content>
                                        <ModuleCard.Txt>We have the reptilian brain.</ModuleCard.Txt>
                                        <ModuleCard.Dvdr />
                                        <ModuleCard.Txt>This is our instinctual brain. It controls our autonomous systems, like breathing and our beating hearts.</ModuleCard.Txt>
                                        <ModuleCard.Txt>I call my reptilian brain lizzo because I feel it's most fitting and he doesn't care.</ModuleCard.Txt>
                                    </ModuleCard.Content>
                                </ModuleCard>
                                <ModuleCard className='mt-10'>
                                    <ModuleCard.Img
                                        src={require('@/assets/images/mammal.png')}
                                        color={'--color-Pumpkin'}/>
                                    <ModuleCard.Content>
                                        <ModuleCard.Txt>We have the mammalian brain. The limbic system.</ModuleCard.Txt>
                                        <ModuleCard.Dvdr />
                                        <ModuleCard.Txt>This is our emotional brain. It lacks words but allows us to feel strongly and deeply, and stores those feelings as emotional memories.</ModuleCard.Txt>
                                        <ModuleCard.Txt>It's why you can see a picture of a sad cat and go "Yo, that's me" even though you can use your sad cat words to describe your sad cat self.</ModuleCard.Txt>
                                    </ModuleCard.Content>
                                </ModuleCard>
                                <ModuleCard>
                                    <ModuleCard.Img
                                        src={require('@/assets/images/frontal-lobe.png')}
                                        color={'--color-Vintage-Grape'}/>
                                    <ModuleCard.Content>
                                        <ModuleCard.Txt>And we have the thinking brain. The prefrontal cortex.</ModuleCard.Txt>
                                        <ModuleCard.Dvdr />
                                        <ModuleCard.Txt>This is our rational brain. It can use language and logic and interprets the lizard and mammalian brain.</ModuleCard.Txt>
                                        <ModuleCard.Txt>You can't think your heart into stopping, and some emotions you can't put into words.</ModuleCard.Txt>
                                    </ModuleCard.Content>
                                </ModuleCard>
                                <ModuleCard>
                                    <ModuleCard.Content>
                                        <ModuleCard.Txt>When we:</ModuleCard.Txt>
                                        <ModuleCard.Txt>- Act first without thinking</ModuleCard.Txt>
                                        <ModuleCard.Txt>- Feel strongly without words</ModuleCard.Txt>
                                        <ModuleCard.Txt>- Become so numb we can only detach</ModuleCard.Txt>
                                        <ModuleCard.Txt>We are experiencing a disharmony between these three brains.</ModuleCard.Txt>
                                        <ModuleCard.Dvdr />
                                        <ModuleCard.Txt>The follow-up questions in this module will help you understand how your three brains contributed in the attached journal entry.</ModuleCard.Txt>
                                    </ModuleCard.Content>
                                </ModuleCard>
                                <View>
                                    <AppText
                                        style={{
                                            fontFamily: 'TypoGraphica'
                                        }}
                                        className='font-bold text-4xl color-[--color-text] p-2'>Question 1</AppText>
                                    <ModuleCard>
                                        <ModuleCard.Content>
                                            <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>What does your prefrontal cortex (thinking) brain remember from the event?</AppText>
                                            <AppText className='font-bold color-[--color-text-subtle] px-2 pb-2'>Do you remember everything in detail, or only small pieces?</AppText>
                                            <ModuleCard.Dvdr />
                                            <TextInput
                                                editable
                                                multiline
                                                maxLength={2000}
                                                placeholder="My thinking brain remembers..."
                                                className="bg-[--color-paper-dark] font-bold rounded-md p-2 mb-4 w-full h-28"/>
                                        </ModuleCard.Content>
                                    </ModuleCard>
                                </View>
                                <View>
                                    <AppText
                                        style={{
                                            fontFamily: 'TypoGraphica'
                                        }}
                                        className='font-bold text-4xl color-[--color-text] p-2'>Question 2</AppText>
                                    <ModuleCard>
                                        <ModuleCard.Content>
                                            <AppText className='font-bold color-[--color-text] px-2 pt-2 pb-1'>What does your mammalian (emotional) brain remember from the event?</AppText>
                                            <AppText className='font-bold color-[--color-text-subtle] px-2 pb-2'>Do you remember feeling nauseous, or angry? How did your body feel?</AppText>
                                            <ModuleCard.Dvdr />
                                            <TextInput
                                                editable
                                                multiline
                                                maxLength={2000}
                                                placeholder="My mammalian brain remembers..."
                                                className="bg-[--color-paper-dark] font-bold rounded-md p-2 mb-4 w-full h-28"/>
                                        </ModuleCard.Content>
                                    </ModuleCard>
                                </View>
                                <View>
                                    <AppText
                                        style={{
                                            fontFamily: 'TypoGraphica'
                                        }}
                                        className='font-bold text-4xl color-[--color-text] p-2'>Question 3</AppText>
                                    <ModuleCard>
                                        <ModuleCard.Content>
                                            <ModuleCard.Txt>What does your reptilian (instinctual) brain remember from the event?</ModuleCard.Txt>
                                            <ModuleCard.Txt>Was your heart racing? Did you feel flushed? Hot, cold?</ModuleCard.Txt>
                                            <ModuleCard.Dvdr />
                                            <TextInput
                                                editable
                                                multiline
                                                maxLength={2000}
                                                placeholder="My reptilian brain remembers..."
                                                className="bg-[--color-paper-dark] font-bold rounded-md mb-4 w-full h-28"/>
                                        </ModuleCard.Content>
                                    </ModuleCard>
                                </View>
                                <View>
                                    <AppText
                                        style={{
                                            fontFamily: 'TypoGraphica'
                                        }}
                                        className='font-bold text-4xl color-[--color-text] p-2'>Noticing Exercise</AppText>
                                    <ModuleCard>
                                        <ModuleCard.Content>
                                            <ModuleCard.Txt>Tap the symptoms important to that part of your brain</ModuleCard.Txt>
                                            <ModuleCard.Dvdr />
                                            <ModuleCard.Txt>Prefrontal Cortex</ModuleCard.Txt>
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
                                            <ModuleCard.Dvdr />
                                            <ModuleCard.Txt>Mammalian Brain</ModuleCard.Txt>
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
                                            <ModuleCard.Dvdr />
                                            <ModuleCard.Txt>Lizard Brain</ModuleCard.Txt>
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
                                        </ModuleCard.Content>
                                        
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

export default NoticingModule;