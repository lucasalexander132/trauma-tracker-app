import classNames from 'classnames';
import React from 'react';
import { View } from 'react-native';

type Props = {
    className?: string;
}

const Divider = ({className}: Props) => {
    return (
        <View className={classNames("h-[1px] bg-[--color-text-subtle] opacity-30 my-4", className)} />
    )
}

export default Divider;