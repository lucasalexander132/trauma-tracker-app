import { interpolateColor, themeColors } from "@/assets/styles/theme";
import CustomButton from "@/components/customButton";
import AppText from "@/components/text";
import { IEntry } from "@/constants/types/Entries";
import classNames from "classnames";
import moment from "moment";
import { View } from "react-native";
import SmallTag from "../smallTag";


type EntryCardProps = {
    entry: IEntry;
}

export const EntryCard = ({ entry }: EntryCardProps) => {
    const {
        eventTags,
        timestamp,
        hasFollowUp,
        // intensityMethod,
        intensityRating,
        intensityValue,
        // followUpAt,
        // followUpCompleted
    } = entry;
    return (
        <View className={classNames(!hasFollowUp && "mt-10")}>
            {
                !hasFollowUp &&
                    <CustomButton
                        iconName="edit"
                        iconSize={14}
                        buttonClassName="absolute top-[-32px] pb-10 w-full rounded-2xl border-[--color-paper-dark] border-[1px]"
                        title={"Follow Up"} />
            }
            <View className="rounded-2xl bg-[--color-paper-light] px-4 pb-6 pt-2 mb-4 shadow-sm border-[--color-paper-dark] border-[1px]">
                <AppText className="font-bold text-xl">{moment(timestamp).format('dddd, MMMM Do')}</AppText>
                <AppText className='text-lg font-bold mt-2 mr-2'>Tags</AppText>
                {
                    eventTags.length > 0 &&
                        <View className="flex-row flex-wrap mb-4">
                            {
                                eventTags?.map((tag) =>
                                    <SmallTag key={`${tag.id}-small-tag`} name={tag.name} icon={tag.icon} color={tag.color} />)
                            }
                        </View>
                }
                {/* This section definitely needs a refactor cause I'm pulling values out of places they shouldn't be pulled from */}
                <AppText className='text-lg font-bold mb-2'>Intensity</AppText>
                <View className='w-full rounded-full h-10 justify-center' style={{
                    backgroundColor: interpolateColor(themeColors['--color-Cold'], themeColors['--color-Hot'], intensityValue / 100)
                }}>
                    <AppText className='text-[--color-paper] text-lg font-bold text-center align-middle'>{ intensityRating }</AppText>
                </View>
            </View>
        </View>
    )
}