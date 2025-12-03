import { themeBackgrounds, TThemeBackgrounds } from '@/assets/styles/theme';
import isUndefined from '@/utils/types/isUndefined';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import AppText from './text';

type Props = {
    color: TThemeBackgrounds;
    title: string;
    description: string;
    taggable: boolean;
    headerRightComponent: () => ReactNode;
}

const JournalSectionHeader = (props: Partial<Props>) => {
    const {
        color,
        title = 'Default Title',
        description = 'Default Description',
        taggable = false,
        headerRightComponent
    } = props;
    return (
        <View className='flex-row w-full'>
            <View className={classNames('h-8 w-6 rounded-r-2xl top-2', color ? themeBackgrounds[color] : 'bg-[--color-primary-500] active:bg-[--color-primary-500]')} />
            <View className='flex-col'>
                <AppText className='text-2xl font-bold pl-3 color-[--color-text]'>{ title }</AppText>
                {
                    !isUndefined(description) &&
                        <AppText className='text-md font-bold pl-3 pr-20 color-[--color-text-subtle]'>
                            {description}
                        </AppText>
                }
            </View>
            {
                taggable && headerRightComponent?.()
            }
        </View>
    )
}

export default JournalSectionHeader