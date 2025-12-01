import { IconNameType, themeColors, themeVars, TThemeColors } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { View } from 'react-native';
import AppText from '../text';

type Props = {
    name: string;
    color?: TThemeColors;
    icon?: IconNameType;
}

const SmallTag = (props: Props) => {
    const {
        name,
        icon,
        color = '--color-Pumpkin'
    } = props;
    return (
        <View className='rounded-full flex-row py-2 px-4 h-[30px] mx-1 mt-2' style={{
                backgroundColor: themeColors[color]
            }}>
            <Entypo
                style={{
                    top:1
                }}
                name={icon}
                size={14}
                color={themeVars['--color-paper']}
            />
            <AppText className="text-[--color-paper] font-bold px-2">{name}</AppText>
        </View>
    )
}

export default SmallTag