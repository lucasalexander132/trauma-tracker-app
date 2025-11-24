import { themeVars } from "@/assets/styles/theme";
import SafeView from "@/components/safeView";
import AppText from "@/components/text";
import config from "@/constants/configConstants";
import Entypo from '@expo/vector-icons/Entypo';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    const { data: user } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await fetch(config.api.host + '/auth/me');
            const data = await response.json();
            return data;
        }
    });
    return (
      <SafeView>
        <View className="mx-8 pt-6">
          <Text className="text-3xl font-bold" style={{fontFamily: 'Inter'}}>Hello {user?.username}</Text>
          <Text className="text-2xl font-bold" style={{ fontFamily: 'Inter' }}>Font family</Text>
        </View>
        <View className="my-6 mx-8">
          <Text className="text-2xl font-bold">1. User can add a journal entry</Text>
          <Text className="text-md font-bold">- User has a button to take them to a journal entry page</Text>
        </View>
        <View className="my-6 mx-8">
          <Text className="text-2xl font-bold">2. User can view their most recent journal entries</Text>
          <Text className="text-md font-bold">- User can see a list of their last few entries</Text>
        </View>
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