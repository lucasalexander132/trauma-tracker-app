import { themeVars } from '@/assets/styles/theme';
import useSettingsStore, { SettingsKeys } from '@/zustand/settingsStore';
import { isUndefined } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import AppText from './text';

type Props = {
    onToggleSwitch?: (value: boolean) => void;
    onToggleSwitchWithSetting?: (key: SettingsKeys, value: boolean) => void;
    label: string;
    value?: boolean;
    settingKey?: SettingsKeys;
}

const SettingSwitch = ({onToggleSwitch, onToggleSwitchWithSetting, label, settingKey, value = false}: Props) => {
    const [isEnabled, setIsEnabled] = useState(value);
    const settings = useSettingsStore((state) => state.settings);
    const toggleSwitch = () => {
        if (!isUndefined(settingKey) && !isUndefined(onToggleSwitchWithSetting)) {
            onToggleSwitchWithSetting(settingKey, !isEnabled);
        }
        if (!isUndefined(onToggleSwitch)) {
            onToggleSwitch(!isEnabled);
        }
        setIsEnabled(!isEnabled);
    };
    const style = StyleSheet.create({
        switchPadding: {
            padding: 4
        },
        paperButton: {
            backgroundColor: themeVars['--color-paper-dark'],
            borderRadius: 100,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 1.5,
            elevation: 5
        }
    });
    return (
        <View className="mt-2 flex-row items-center w-full justify-between">
            <AppText className="text-lg font-bold">{label}</AppText>
            <View style={[settings['stickerMode'].value && style.paperButton, style.switchPadding]}>
                <Switch
                    trackColor={{ false: '#233D4D', true: '#FE7F2D'}}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled} />
            </View>
        </View>
    )
}

export default SettingSwitch