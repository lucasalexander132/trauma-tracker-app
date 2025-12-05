import { IconNameType, themeColors, themeVars, TThemeColors } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { View } from 'react-native';
import AppText from '../text';

type Props = {
    name: string;
    color?: TThemeColors;
    icon?: IconNameType;
    invert?: boolean;
}

const SmallTag = (props: Props) => {
    const {
        name,
        icon,
        color = '--color-Pumpkin',
        invert = false
    } = props;
    return (
        <View className='rounded-lg flex-row py-2 px-4 h-[30px]' style={{
                backgroundColor: invert ? themeVars['--color-paper-dark'] : themeColors[color]
            }}>
            <Entypo
                style={{
                    top:1
                }}
                name={icon}
                size={14}
                color={invert ? themeColors[color] : themeVars['--color-paper-dark']}
            />
            <AppText className={"text-[--color-paper] font-bold px-2"}
            style={{
                color: invert ? themeColors[color] : themeVars['--color-paper-dark']
            }}>{name}</AppText>
        </View>
    )
}

export default SmallTag