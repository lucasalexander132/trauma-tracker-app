import { interpolateColor, themeColors } from "@/assets/styles/theme";
import AppText from "@/components/text";
import { IEntry } from "@/constants/types/Entries";
import moment from "moment";
import { FlatList, View } from "react-native";
import Symptom from "../symptomSectional/symptom";


type EntryCardProps = {
    entry: IEntry;
}

export const EntryCard = ({ entry }: EntryCardProps) => {
    const {
        eventTags,
        // timestamp,
        // hasFollowUp,
        // intensityMethod,
        intensityRating,
        intensityValue,
        // followUpAt,
        // followUpCompleted
    } = entry;
    return (
        <View className="rounded-lg bg-[--color-paper-light] px-4 pb-6 pt-2 mb-4 shadow-sm mx-2">
            <AppText className="font-bold text-xl">{moment(entry.timestamp).format('dddd, MMMM Do')}</AppText>
            <AppText className='text-lg font-bold mt-3 mb-2'>Tags {
                entry.eventTags?.map((tag) =>
                    <View key={`${tag.id}-indicator`} className='rounded-full' style={{
                        height: 10,
                        width: 10,
                        backgroundColor: themeColors[tag.color]
                    }} />)}
            </AppText>
            <View className='mb-6 flex-row bg-[#ffeeee] rounded-lg'>
                { eventTags?.length > 0 && <FlatList
                    ListHeaderComponent={<View className='w-4' />}
                    data={ eventTags }
                    renderItem={({item}) => <View key={`${item.id}-submit`} className='mr-4'>
                        <Symptom symptom={item} symptomView={'ON'} />
                    </View>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={<View className='w-4' />}/> }
                {
                    eventTags?.length === 0 &&
                        <AppText className='text-center font-bold p-2 w-full'>Totally Untraumatized!</AppText>
                }
            </View>
            {/* This section definitely needs a refactor cause I'm pulling values out of places they shouldn't be pulled from */}
            <AppText className='text-lg font-bold mb-2'>Intensity</AppText>
            <View className='w-full rounded-full h-10 justify-center' style={{
                backgroundColor: interpolateColor(themeColors['--color-Cold'], themeColors['--color-Hot'], intensityValue / 100)
            }}>
                <AppText className='text-[--color-paper] text-lg font-bold text-center align-middle'>{ intensityRating }</AppText>
            </View>
        </View>
    )
}