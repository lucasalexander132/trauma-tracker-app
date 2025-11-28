import AppText from "@/components/text";
import { AuthContext } from "@/constants/authContext/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";


export default function ProtectedLayout() {
    const authState = useContext(AuthContext);
    if (authState.isLoading) {
        return <View className="w-full h-full justify-center">
            <AppText className="text-center">Loading</AppText>
        </View>
    }
    if (!authState.isLoggedIn) {
        return <Redirect href="authentication" />
    }
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                headerShown: false,
                }}
            />
        </Stack>
    );
}