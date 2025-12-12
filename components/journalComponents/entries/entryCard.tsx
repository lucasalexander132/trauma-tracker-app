import { useEntryModuleData } from "@/api/user";
import { ModuleTypes } from "@/app/(protected)/(tabs)/(home)/journalEntry";
import { IconNameType, interpolateColor, onTextThemeColors, themeColors, themeVars, TThemeBackgrounds } from "@/assets/styles/theme";
import Carousel from "@/components/carousel";
import CustomButton from "@/components/customButton";
import Divider from "@/components/divider";
import CustomModal from "@/components/modal";
import AppText from "@/components/text";
import { IEntry } from "@/constants/types/Entries";
import { BaseModule, QuestionAnswer } from "@/zustand/moduleStore";
import Entypo from "@expo/vector-icons/Entypo";
import classNames from "classnames";
import { useRouter } from "expo-router";
import moment from "moment";
import { useState, useTransition } from "react";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SmallTag from "../smallTag";


type EntryCardProps = {
    entry: IEntry;
    asInfo?: true;
}

export const EntryCard = ({ entry, asInfo }: EntryCardProps) => {
    const {
        eventName,
        eventTags,
        entryDescription,
        timestamp,
        hasFollowUp,
        // intensityMethod,
        intensityRating,
        intensityValue,
        // followUpAt,
        // followUpCompleted
    } = entry;
    const [minify, setMinify] = useState(true);
    const { data: moduleData, isLoading: moduleLoading, error: moduleError } = useEntryModuleData(entry.id, !minify);
    return (
        <>
            
            <View className={classNames("shadow-sm",!hasFollowUp && "mb-10")}>
                {
                    !hasFollowUp && !asInfo &&
                        // Hooray for prop drilling :/
                        <FollowUpModal journalEntry={entry} />
                        
                }
                <View className={classNames("rounded-2xl bg-[--color-paper] pb-6 mb-4", !hasFollowUp ? 'border-[--color-primary-500] border-4' : 'border-[--color-text-subtle] border-[1px]')}>
                    <View className="flex-row px-4 w-full">
                        {/* This icon is going to be tied to the entry type */}
                        <View className="flex-row w-3/4">
                            <Entypo
                                className="pt-3"
                                color={themeVars['--color-text-subtle']}
                                size={28}
                                name={'open-book'}/>
                            <View className="px-4 pt-2">
                                <AppText className="font-bold text-2xl text-[--color-text] pr-6 leading-tight">{ eventName ?? 'Journal Entry'}</AppText>
                                <AppText className="font-bold text-md text-[--color-text-subtle]">{moment(timestamp).format('dddd, MMMM Do')}</AppText>
                            </View>
                        </View>
                        <View className={classNames("w-1/4 flex-row pt-3", asInfo ? 'justify-end' : 'justify-between')}>
                            { !asInfo && <Pressable className="rounded-xl bg-[--color-primary-500] h-10 w-10 items-center pt-1 active:bg-[--color-primary-300]">
                                <Entypo
                                    className="self-center"
                                    color={themeVars['--color-paper-light']}
                                    size={28}
                                    name={'dots-two-vertical'}
                                    />
                            </Pressable>}
                            <Pressable
                                onPress={() => setMinify(!minify)}
                                className="rounded-xl bg-[--color-primary-500] h-10 w-10 items-center pt-1 active:bg-[--color-primary-300]">
                                <Entypo
                                    className="self-center"
                                    color={themeVars['--color-paper-light']}
                                    size={28}
                                    name={minify ? 'chevron-down' : 'chevron-up'}
                                    />
                            </Pressable>
                        </View>
                    </View>
                    <Divider />
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} className={classNames("px-4", !minify && "flex-wrap")}>
                        {
                            eventTags?.map((tag) =>
                                <View key={`${tag.id}-small-tag`} className="mr-2">
                                    <SmallTag
                                        id={tag.id}
                                        name={tag.name}
                                        icon={tag.icon}
                                        color={tag.color}
                                        invert={!minify}/>
                                </View>)
                        }
                    </ScrollView>
                    {
                        entryDescription && <>
                            <Divider />
                            <AppText numberOfLines={minify ? 2 : undefined} className="font-bold text-md text-[--color-text] px-4">{entryDescription}</AppText>
                        </>
                    }
                    {
                        !minify && <>
                            <View className="bg-[--color-Pumpkin] my-4 mx-4 py-4 rounded-xl">
                                {
                                    moduleData && <Carousel
                                        buttonSize={20}
                                        fullHeight={false}>
                                            {
                                                moduleData.map((module: BaseModule) => module.questionAnswers?.map((qna: QuestionAnswer) => <View key={qna.id} className="my-4 mx-4">
                                                    <AppText className='font-bold'>{qna.question}</AppText>
                                                    <AppText className="font-bold bg-[--color-paper-dark] rounded-md px-3 py-3 my-4 w-full">{qna.answer.toString()}</AppText>
                                                </View>))
                                            }
                                    </Carousel>
                                }
                            </View>
                        </>
                    }
                    {
                        !minify &&
                            <>
                                <Divider />
                                <View className="px-4">
                                    <View className='w-full rounded-lg h-10 justify-center' style={{
                                        backgroundColor: interpolateColor(themeColors['--color-Cold'], themeColors['--color-Hot'], intensityValue / 100)
                                    }}>
                                        <AppText className='text-[--color-paper] text-lg font-bold text-center align-middle'>{ intensityRating }</AppText>
                                    </View>
                                </View>
                            </>
                    }
                </View>
            </View>
        </>
    )
}

type FollowUpModalProps = {
    journalEntry: IEntry;
}

export const FollowUpModal = ({ journalEntry }: FollowUpModalProps) => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const handlePress = (module: string) => {
        router.navigate({
            pathname: '/journalEntry',
            params: {
                module,
                entry: JSON.stringify(journalEntry)
            }
        });
        startTransition(() => {
            setShowModal(false);
        });
    }
    return (
        <>
            <CustomModal
                showModal={showModal}
                onToggleShow={() => setShowModal(false)}
                type="sheet">
                <AppText
                    className="text-2xl font-bold text-[--color-text]">Follow up</AppText>
                <Divider />
                <AppText className="text-md font-bold text-[--color-text-subtle]">Follow ups are designed for you to explore your traumatic moments in a safe and curious way.</AppText>
                <View className="flex-row flex-wrap mt-4">
                    <FollowUpButton
                        title={"SAFETY"}
                        description={"The good of bad symptoms"}
                        color={"--color-Zomp"}
                        icon={"eye"}
                        module={'safety'}
                        onPress={handlePress} />
                    <FollowUpButton
                        title={"NOTICING"}
                        description={"Know when you're triggered"}
                        color={"--color-Pumpkin"}
                        icon={"bell"}
                        module={'noticing'}
                        onPress={handlePress} />
                    <FollowUpButton
                        title={"COPING"}
                        description={"How do you cope?"}
                        color={"--color-Vintage-Grape"}
                        icon={"chat"}
                        module={'coping'}
                        onPress={handlePress} />
                    <FollowUpButton
                        title={"ADDICTION"}
                        description={"Breaking the cycle"}
                        color={"--color-Dark-Garnet"}
                        icon={"drink"}
                        module={'addiction'}
                        onPress={handlePress} />
                </View>
            </CustomModal>
            <CustomButton
                iconName="edit"
                iconSize={14}
                buttonClassName="absolute bottom-[-16px] pt-8 w-full rounded-2xl"
                textClassName="text-center"
                onPress={() => setShowModal(true)}
                title={"Follow Up"} />
        </>
    )
};

type FollowUpButtonProps = {
    title: string;
    description: string;
    color?: TThemeBackgrounds;
    icon?: IconNameType;
    module?: ModuleTypes;
    onPress?: (module: string) => void;
}

const FollowUpButton = (props: FollowUpButtonProps) => {
    const {
        title = 'No Title',
        description = 'No Description',
        color = '--color-Dark-Garnet',
        icon = 'address',
        module = 'initialEntry',
        onPress
    } = props;
    return (
        <View className="w-1/2 p-1">
            <Pressable
                onPress={() => onPress?.(module)}
                className="rounded-2xl h-32 active:opacity-70 pt-2 pl-4"
                style={{
                    backgroundColor: themeColors[color],
                    overflow: 'hidden'
                }}>
                <AppText className="font-bold text-3xl z-10"
                    style={{
                        color: onTextThemeColors[color],
                        fontFamily: 'TypoGraphica'
                    }}>
                    { title }
                </AppText>
                <AppText className="font-bold text-md z-10 w-1/2"
                    style={{
                        color: onTextThemeColors[color]
                    }}>
                    { description }
                </AppText>
                <Entypo
                    className="absolute -right-2 -bottom-2"
                    size={80}
                    color={onTextThemeColors[color]}
                    name={icon}/>
            </Pressable>
        </View>
    )
}