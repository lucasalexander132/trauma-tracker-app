import { IconNameType, themeColors, themeVars, TThemeColors } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import AppText from '../text';

type Props = {
    name: string;
    color?: TThemeColors;
    icon?: IconNameType;
    invert?: boolean;
    asButton?: boolean;
}

const SmallTag = (props: Props) => {
    const [buttonActive, setButtonActive] = useState(false);
    const {
        name,
        icon,
        color = '--color-Pumpkin',
        invert = false,
        asButton
    } = props;
    const activate = buttonActive && asButton;
    return (
        <Pressable onPress={() => setButtonActive(!buttonActive)} className={classNames('rounded-lg flex-row py-2 px-4 border-2')} style={{
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