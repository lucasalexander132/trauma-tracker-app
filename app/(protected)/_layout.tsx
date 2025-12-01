import { themeVars } from "@/assets/styles/theme";
import CustomDrawerContent from "@/components/navigation/customDrawerContent";
import AppText from "@/components/text";
import { AuthContext } from "@/constants/authContext/authContext";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Redirect, Stack } from "expo-router";
import Drawer from "expo-router/drawer";
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
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Stack.Screen
                name="(tabs)"
                options={{
                    title: 'Home',
                    headerShown: false,
                    headerLeft: () => <DrawerToggleButton />,
                    headerTintColor: themeVars['--color-paper']
                }}
            />
            <Stack.Screen
                name="about"
                options={{
                    title: 'About',
                    headerLeft: () => <DrawerToggleButton />
                }}
            />
        </Drawer>
    );
}