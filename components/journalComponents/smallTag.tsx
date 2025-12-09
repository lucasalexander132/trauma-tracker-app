import { IconNameType, themeColors, themeVars, TThemeColors } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import AppText from '../text';

type Props = {
    id: string;
    name: string;
    color?: TThemeColors;
    icon?: IconNameType;
    invert?: boolean;
    asButton?: boolean;
    onPress?: (id: string, active?: boolean) => void;
    active?: boolean;
}

const SmallTag = (props: Props) => {
    const {
        id,
        name,
        icon,
        color = '--color-Pumpkin',
        invert = false,
        asButton,
        onPress,
        active
    } = props;
    const [buttonActive, setButtonActive] = useState(active ?? false);
    const activate = buttonActive && asButton && active;
    const handlePress = () => {
        setButtonActive(!buttonActive);
        onPress?.(id, !buttonActive);
    }
    return (
        <Pressable onPress={handlePress} className={classNames('rounded-lg flex-row py-2 px-4 border-2')} style={{
                borderColor: asButton ? themeColors[color] : 'transparent',
                backgroundColor: invert || !activate ? themeVars['--color-paper-dark'] : themeColors[color]
            }}>
            <Entypo
                style={{
                    top:1
                }}
                name={icon}
                size={14}
                color={invert || !activate ? themeColors[color] : themeVars['--color-paper-dark']}
            />
            <AppText className={"text-[--color-paper] font-bold px-2"}
            style={{
                color: invert || !activate ? themeColors[color] : themeVars['--color-paper-dark']
            }}>{name}</AppText>
        </Pressable>
    )
}

export default SmallTag