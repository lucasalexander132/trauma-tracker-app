import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import AppText from './text';


const variantClassNames = {
    primary: 'bg-[--color-primary-500] active:bg-[--color-primary-400]',
    info: 'bg-[--color-info] active:bg-[--color-info-light]',
    danger: 'bg-[--color-danger] active:bg-[--color-danger-light]',
    success: 'bg-[--color-success] active:bg-[--color-success-light]',
    warning: 'bg-[--color-warning] active:bg-[--color-warning-light]',
};

type ButtonVariant = keyof typeof variantClassNames;

type CustomButtonProps = {
    title: string;
    iconName?: keyof typeof Entypo.glyphMap;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    textClassName?: string;
    buttonClassName?: string;
    iconSize?: number;
    variant?: ButtonVariant;
} & PressableProps;

const CustomButton = ({
    title,
    iconName,
    onPress,
    style,
    textClassName = 'text-xl text-[--color-paper] font-bold px-4',
    buttonClassName,
    iconSize = 18,
    variant = 'primary',
    ...rest
}: CustomButtonProps) => {
    return (
        <Pressable
            className={classNames(
                ' p-2 self-center',
                variantClassNames[variant],
                buttonClassName
            )}
            style={style}
            onPress={onPress}
            {...rest}
        >
            <AppText className={textClassName}>
                {iconName && <Entypo name={iconName} size={iconSize} />} {title}
            </AppText>
        </Pressable>
    )
}

export default CustomButton