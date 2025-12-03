import { themeVars } from "@/assets/styles/theme";
import { InfiniteEntries } from "@/components/journalComponents/entries/infiniteEntries";
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
            <InfiniteEntries />
            <JournalEntryLink />
		</SafeView>)
}

const JournalEntryLink = () => {
    const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;
    return (
        <View
            style={{
                bottom: bottomHeight
            }}
            className={"h-16 justify-center rounded-tr-full rounded-br-full bg-[--color-paper-light] border-[--color-primary-200] border-hairline p-1 absolute left-0 w-[80px] shadow-lg"}>
            <Link
                href={'/journalEntry'}
                >
                <Pressable
                    className={"flex-row h-16 justify-center items-center rounded-full bg-[--color-comp-primary] border-[--color-primary-200] border-hairline p-1 w-[80px] shadow-sm active:bg-[--color-comp-primary-dark] transition-all duration-200"}>
                    <AppText className="font-bold color-[--color-paper] text-2xl">+</AppText>
                    <Entypo name="feather" size={28} color={themeVars['--color-paper']} />
                </Pressable>
            </Link>
        </View>
    )
}