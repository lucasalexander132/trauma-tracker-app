import { interpolateColor, themeColors, themeVars } from "@/assets/styles/theme";
import Symptom from "@/components/journalComponents/symptomSectional/symptom";
import SafeFooter from "@/components/safeFooter";
import SafeView from "@/components/safeView";
import AppText from "@/components/text";
import config from "@/constants/configConstants";
import { IEntry } from "@/constants/types/Entries";
import Entypo from '@expo/vector-icons/Entypo';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQueries } from "@tanstack/react-query";
import { Link } from "expo-router";
import moment from "moment";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {

    const { data: [user, entries] } = useQueries({
        queries: [
            {
                queryKey: ['currentUser'],
                queryFn: async () => {
                    const response = await fetch(config.api.host + '/auth/me');
                    const data = await response.json();
                    return data;
                }
            },
            {
                queryKey: ['entries'],
                queryFn: async () => {
                    const response = await fetch(config.api.host + '/user/entries');
                    const data = await response.json();
                    return data as IEntry[];
                }
            }
        ],
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            }
        },
    });

    return (
		<SafeView>
            <ScrollView>
                <View className="mx-8 py-6">
                    <Text className="text-3xl font-bold" style={{fontFamily: 'Inter'}}>Hello {user?.username}</Text>
                </View>
                <View className="mx-8">
                    <AppText className="text-3xl font-bold mb-4">Entries</AppText>
                    {
                        entries?.map((entry: IEntry) => <EntryCard key={`${entry.id}-entries-overview`} entry={entry}/>)
                    }
                </View>
                <SafeFooter multiplier={2} />
            </ScrollView>
            <Link
                href={'/journalEntry'}
                className={'absolute right-6'}
                style={{
                    bottom: useBottomTabBarHeight() + useSafeAreaInsets().bottom + 8
                }}
                asChild
                >
                <Pressable
                className="flex-row h-20 w-20 border-8 border-[--color-paper-dark] rounded-full bg-[--color-primary-500] justify-center items-center active:bg-[--color-primary-400] shadow-sm transition-colors duration-200">
                    <AppText className="font-bold color-[--color-paper-dark] text-2xl">+</AppText>
                    <Entypo name="feather" size={28} color={themeVars['--color-paper-dark']} />
                </Pressable>
            </Link>
		</SafeView>)
}

type EntryCardProps = {
    entry: IEntry;
}

const EntryCard = ({ entry }: EntryCardProps) => {
    const {
        eventTags,
        timestamp,
        hasFollowUp,
        intensityMethod,
        intensityRating,
        intensityValue,
        followUpAt,
        followUpCompleted
    } = entry;
    return (
        <View className="rounded-lg bg-[--color-paper-light] px-4 pb-6 pt-2 mb-4 shadow-sm">
            <AppText className="font-bold text-xl">{moment(entry.timestamp).format('dddd, MMMM Do')}</AppText>
            <AppText className='text-lg font-bold mt-3 mb-2'>Tags {
                entry.eventTags.map((tag) =>
                    <View key={`${tag.id}-indicator`} className='rounded-full' style={{
                        height: 10,
                        width: 10,
                        backgroundColor: themeColors[tag.color]
                    }} />)}
            </AppText>
            <View className='mb-6 flex-row bg-[#ffeeee] rounded-lg'>
                { eventTags.length > 0 && <FlatList
                    ListHeaderComponent={<View className='w-4' />}
                    data={ eventTags }
                    renderItem={({item}) => <View key={`${item.id}-submit`} className='mr-4'><Symptom symptom={item} symptomView={'ON'} /></View>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={<View className='w-4' />}/> }
                {
                    eventTags.length === 0 &&
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