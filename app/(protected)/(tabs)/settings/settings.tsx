import theme from "@/assets/styles/theme";
import AppText from "@/components/text";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Switch, Text, View } from "react-native";

export default function Settings() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        toggleColorScheme();
        setIsEnabled(previousState => !previousState);
    };
    return (
        <View style={theme} className="flex-1 bg-[--color-paper] dark:bg-slate-600 w-full">
            <View className="my-6 mx-8">
                <Text className="text-3xl font-bold dark:text-white">1. Add a dark theme setting</Text>
                <View className="mt-2 flex-row items-center w-full justify-between">
                    <AppText className="text-lg font-bold">Dark mode</AppText>
                    <Switch
                        trackColor={{ false: '#233D4D', true: '#FE7F2D'}}
                        thumbColor={colorScheme === 'dark' ? 'white' : 'gray'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled} />
                </View>
            </View>
        </View>)
}