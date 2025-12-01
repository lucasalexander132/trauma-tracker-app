import { useSignOut } from "@/api/auth";
import { themeVars } from "@/assets/styles/theme";
import { AuthContext } from "@/constants/authContext/authContext";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { View } from "react-native";
import CustomButton from "../customButton";
import AppText from "../text";


export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const queryClient = useQueryClient();
    const authContext = useContext(AuthContext);
    const { mutate: signOut } = useSignOut(queryClient, authContext);
    const handleSignOut = () => {
        signOut();
    }
    return (
        <DrawerContentScrollView style={{backgroundColor: themeVars['--color-paper']}} {...props}>
            <AppText className="font-bold text-center my-10">Coming soon... Content</AppText>
            <DrawerItemList {...props} />
            <View className="h-full justify-end">
                <CustomButton title={"Logout"} onPress={handleSignOut} />
            </View>
        </DrawerContentScrollView>
    );
}