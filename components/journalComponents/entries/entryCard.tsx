import { interpolateColor, themeColors } from "@/assets/styles/theme";
import CustomButton from "@/components/customButton";
import Divider from "@/components/divider";
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
        eventName,
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
        <View className={classNames("shadow-md",!hasFollowUp && "mt-10")}>
            {
                !hasFollowUp &&
                    <CustomButton
                        iconName="edit"
                        iconSize={14}
                        buttonClassName="absolute top-[-32px] pb-10 w-full rounded-2xl border-[--color-paper-dark] border-[1px]"
                        title={"Follow Up"} />
            }
            <View className="rounded-2xl bg-[--color-paper] pb-6 mb-4 border-[--color-paper-dark] border-[1px]">
                <View className="px-4 pt-2">
                    <AppText className="font-bold text-2xl text-[--color-text]">{ eventName ?? 'Journal Entry'}</AppText>
                    <AppText className="font-bold text-md text-[--color-text-subtle]">{moment(timestamp).format('dddd, MMMM Do')}</AppText>
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