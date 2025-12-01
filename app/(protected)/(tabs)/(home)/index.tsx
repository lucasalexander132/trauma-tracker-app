import { themeVars } from "@/assets/styles/theme";
import { InfiniteEntries } from "@/components/journalComponents/entries/entries";
import SafeView from "@/components/safeView";
import AppText from "@/components/text";
import Entypo from '@expo/vector-icons/Entypo';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    return (
		<SafeView>

            <View className="mt-4 px-4 h-full">
                <AppText className="text-3xl font-bold mb-4">Entries</AppText>
                <InfiniteEntries />
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