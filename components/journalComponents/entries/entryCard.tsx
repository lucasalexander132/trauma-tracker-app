import { IconNameType, interpolateColor, onTextThemeColors, themeColors, themeVars, TThemeBackgrounds } from "@/assets/styles/theme";
import CustomButton from "@/components/customButton";
import Divider from "@/components/divider";
import CustomModal from "@/components/modal";
import AppText from "@/components/text";
import { IEntry } from "@/constants/types/Entries";
import Entypo from "@expo/vector-icons/Entypo";
import classNames from "classnames";
import moment from "moment";
import { useState } from "react";
import { Pressable, View } from "react-native";
import SmallTag from "../smallTag";


type EntryCardProps = {
    entry: IEntry;
}

export const EntryCard = ({ entry }: EntryCardProps) => {
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
    return (
        <>
            
            <View className={classNames("shadow-md",!hasFollowUp && "mb-10")}>
                {
                    !hasFollowUp &&
                        <FollowUpModal />
                        
                }
                <View className={classNames("rounded-2xl bg-[--color-paper] pb-6 mb-4", !hasFollowUp ? 'border-[--color-primary-500] border-4' : 'border-[--color-paper-dark] border-[1px]')}>
                    <View className="flex-row items-center px-4 w-full">
                        {/* This icon is going to be tied to the entry type */}
                        <View className="flex-row w-3/4">
                            <Entypo
                                className="pt-2 self-center"
                                color={themeVars['--color-text-subtle']}
                                size={28}
                                name={'open-book'}/>
                            <View className="px-4 pt-2">
                                <AppText className="font-bold text-2xl text-[--color-text]">{ eventName ?? 'Journal Entry'}</AppText>
                                <AppText className="font-bold text-md text-[--color-text-subtle]">{moment(timestamp).format('dddd, MMMM Do')}</AppText>
                            </View>
                        </View>
                        <View className="w-1/4 pt-2">
                            <Pressable className="rounded-xl bg-[--color-primary-500] h-10 w-10 items-center self-end pt-1 active:bg-[--color-primary-300]">
                                <Entypo
                                    className="self-center"
                                    color={themeVars['--color-paper-light']}
                                    size={28}
                                    name={'dots-two-vertical'}
                                    />
                            </Pressable>
                        </View>
                    </View>
                    <Divider />
                    {
                        eventTags.length > 0 &&
                            <View className="flex-row flex-wrap p-2 gap-2 px-4">
                                {
                                    eventTags?.map((tag) =>
                                        <SmallTag key={`${tag.id}-small-tag`} name={tag.name} icon={tag.icon} color={tag.color} invert={true} />)
                                }
                            </View>
                    }
                    <Divider />
                    {
                        entryDescription && <>
                            <AppText className="font-bold text-md text-[--color-text] px-4">{entryDescription}</AppText>
                            <Divider />
                        </>
                    }
                    <View className="px-4">
                        <View className='w-full rounded-lg h-10 justify-center' style={{
                            backgroundColor: interpolateColor(themeColors['--color-Cold'], themeColors['--color-Hot'], intensityValue / 100)
                        }}>
                            <AppText className='text-[--color-paper] text-lg font-bold text-center align-middle'>{ intensityRating }</AppText>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export const FollowUpModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <CustomModal
                showModal={showModal}
                onToggleShow={() => setShowModal(false)}
                type="sheet">
                <AppText className="text-2xl font-bold text-[--color-text]">Follow up</AppText>
                <Divider />
                <AppText className="text-md font-bold text-[--color-text-subtle]">Follow ups are designed to allow you to explore your traumatic moments in a safe and curious way.</AppText>
                <View className="flex-row flex-wrap mt-4">
                    <FollowUpButton
                        title={"Safety"}
                        description={"The good of bad symptoms"}
                        color={"--color-Zomp"}
                        icon={"eye"} />
                    <FollowUpButton
                        title={"Noticing"}
                        description={"Know when you're triggered"}
                        color={"--color-Pumpkin"}
                        icon={"bell"} />
                    <FollowUpButton
                        title={"Coping"}
                        description={"How do you cope?"}
                        color={"--color-Vintage-Grape"}
                        icon={"chat"} />
                    <FollowUpButton
                        title={"Addiction"}
                        description={"Breaking the cycle"}
                        color={"--color-Dark-Garnet"}
                        icon={"drink"} />
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
}

const FollowUpButton = (props: FollowUpButtonProps) => {
    const {
        title = 'No Title',
        description = 'No Description',
        color = '--color-Dark-Garnet',
        icon = 'address'
    } = props;
    return (
        <View className="w-1/2 p-1">
            <Pressable
                className="rounded-lg h-32 active:opacity-70 pt-2 pl-4"
                style={{
                    backgroundColor: themeColors[color],
                    overflow: 'hidden'
                }}>
                <AppText className="font-bold text-3xl z-10"
                    style={{
                        color: onTextThemeColors[color]
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