import theme from "@/assets/styles/theme";
import SettingSwitch from "@/components/settingSwitch";
import useSettingsStore, { SettingsKeys } from "@/zustand/settingsStore";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export default function Settings() {
    const { toggleColorScheme } = useColorScheme();
    const getSettingsArr = useSettingsStore((state) => state.getSettingsArr);
    const setSetting = useSettingsStore((state) => state.setSetting);
    const settings = getSettingsArr();
    return (
        <View style={theme} className="flex-1 bg-[--color-paper] dark:bg-slate-600 w-full">
            <View className="my-6 mx-8">
                <SettingSwitch onToggleSwitch={toggleColorScheme} label={"Dark Mode"} />
                {
                    settings.map(([key, value]) => <SettingSwitch
                        key={key}
                        onToggleSwitchWithSetting={setSetting}
                        settingKey={key as SettingsKeys}
                        label={value.label}
                        value={value.value} />)
                }
                
            </View>
        </View>)
}