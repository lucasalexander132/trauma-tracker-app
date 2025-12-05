import { interpolateColor, themeColors, themeVars } from "@/assets/styles/theme";
import CustomButton from "@/components/customButton";
import Divider from "@/components/divider";
import AppText from "@/components/text";
import { IEntry } from "@/constants/types/Entries";
import Entypo from "@expo/vector-icons/Entypo";
import classNames from "classnames";
import moment from "moment";
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
        <View className={classNames("shadow-md",!hasFollowUp && "mb-10")}>
            {
                !hasFollowUp &&
                    <CustomButton
                        iconName="edit"
                        iconSize={14}
                        buttonClassName="absolute bottom-[-16px] pt-8 w-full rounded-2xl"
                        textClassName="text-center"
                        title={"Follow Up"} />
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
                        <Pressable className="rounded-lg bg-[--color-primary-500] h-10 w-10 items-center self-end pt-1">
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
    )
}