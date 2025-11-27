import { interpolateColor, themeColors, themeVars } from "@/assets/styles/theme";
import CustomButton from "@/components/customButton";
import Symptom from "@/components/journalComponents/symptomSectional/symptom";
import SafeFooter from "@/components/safeFooter";
import SafeView from "@/components/safeView";
import AppText from "@/components/text";
import { AuthContext } from "@/constants/authContext/authContext";
import config from "@/constants/configConstants";
import { IEntry } from "@/constants/types/Entries";
import Entypo from '@expo/vector-icons/Entypo';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlashList } from '@shopify/flash-list';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {

    const queryClient = useQueryClient();
    const authContext = useContext(AuthContext);

    const { data: user } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await fetch(config.api.host + '/auth/me');
            const data = await response.json();
            return data;
        }
    });

    const { mutate: signOut, data: signOutData } = useMutation({
        mutationFn: async () => {
            const response = await fetch(
                config.api.host + '/auth/signout',
                { method: 'POST' }
            );
            const data = await response.json();
            return data;
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({
                queryKey: ['currentUser']
            });
            authContext.logOut();
        }
    });

    const handleSignOut = () => {
        signOut();
    }

    return (
		<SafeView>
            <ScrollView>
                <View className="mx-4 py-6">
                    <Text className="text-3xl font-bold" style={{fontFamily: 'Inter'}}>Hello {user?.username}</Text>
                    <CustomButton buttonClassName="rounded-full mt-6" title={"Logout"} onPress={handleSignOut} />
                </View>
                <View className="px-4">
                    <AppText className="text-3xl font-bold mb-4">Entries</AppText>
                    <Entries />
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

type TInfiniteEntries = {
    responseEntries: IEntry[];
    nextCursor: string;
};

const Entries = () => {
    const [allEntries, setAllEntries] = useState<IEntry[]>([]);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery<any, Error, InfiniteData<TInfiniteEntries, unknown>, string[], any>({
        queryKey: ['entries'],
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams();
            if (pageParam) params.append('cursor', pageParam);
            params.append('limit', '10');
            const response = await fetch(`${config.api.host}/user/entries/?${params.toString()}`);
            const data = await response.json();
            return data;
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor;
        },
    });
    useEffect(() => {
        if (data && data.pages) {
            setAllEntries(data.pages.flatMap((page) => page.responseEntries));
        }
    }, [data?.pages]);
    if (status === 'pending') return <AppText>Retrieving your entries...</AppText>;

    const handleOnEndReached = () => {
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
    }

    return <>
        <FlashList
            onEndReached={handleOnEndReached}
            renderItem={({item: entry}) => <EntryCard key={`${entry.id}-entries-overview`} entry={entry}/>}
            data={allEntries} />
    </>
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
                    renderItem={({item}) => <View key={`${item.id}-submit`} className='mr-4'><Symptom symptom={item} symptomView={'ON'} /></View>}
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