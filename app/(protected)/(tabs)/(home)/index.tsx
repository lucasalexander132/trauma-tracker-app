import SafeView from "@/components/safeView";
import config from "@/constants/configConstants";
import Entypo from '@expo/vector-icons/Entypo';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    const { data } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await fetch(config.api.host + '/auth/me');
            const data = await response.json();
            return data;
        }
    });
    return (
      <SafeView>
        <View className="mx-8">
          <Text className="text-3xl font-bold">Hello {data?.username}</Text>
        </View>
        <View className="my-6 mx-8">
          <Text className="text-2xl font-bold">1. User can add a journal entry</Text>
          <Text className="text-md font-bold">- User has a button to take them to a journal entry page</Text>
        </View>
        <View className="my-6 mx-8">
          <Text className="text-2xl font-bold">2. User can view their most recent journal entries</Text>
          <Text className="text-md font-bold">- User can see a list of their last few entries</Text>
        </View>
        <Link href={'/journalEntry'} className={`absolute right-3`} style={{ bottom: useBottomTabBarHeight() + useSafeAreaInsets().bottom + 4 }} asChild>
          <Pressable className="h-20 w-20 rounded-full bg-[--color-contrasting-button] justify-center items-center">
            <Entypo name="feather" size={36} color={"white"} />
          </Pressable>
        </Link>
      </SafeView>)
}