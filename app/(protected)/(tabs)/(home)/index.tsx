import { useGetMe, useSignOut } from "@/api/auth";
import { themeVars } from "@/assets/styles/theme";
import CustomButton from "@/components/customButton";
import { InfiniteEntries } from "@/components/journalComponents/entries/entries";
import SafeView from "@/components/safeView";
import AppText from "@/components/text";
import { AuthContext } from "@/constants/authContext/authContext";
import Entypo from '@expo/vector-icons/Entypo';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {

    const queryClient = useQueryClient();
    const authContext = useContext(AuthContext);

    const { data: user, isFetched } = useGetMe();

    const { mutate: signOut, data: signOutData } = useSignOut(queryClient, authContext);

    const handleSignOut = () => {
        signOut();
    }

    return (
		<SafeView>

            <View className="mx-4 py-6">
                <Text className="text-3xl font-bold" style={{fontFamily: 'Inter'}}>Hello {user?.username}</Text>
                <CustomButton buttonClassName="rounded-full mt-6" title={"Logout"} onPress={handleSignOut} />
            </View>

            <View className="px-4 h-full">
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