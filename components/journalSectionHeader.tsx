import { themeBackgrounds, themeVars, TThemeBackgrounds } from '@/assets/styles/theme';
import isUndefined from '@/utils/types/isUndefined';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import AddTagModal from './journalComponents/addTagModal/addTagModal';
import AppText from './text';

type Props = {
    description?: string;
    title: string;
    color?: TThemeBackgrounds;
    showRightButton?: boolean;
}

const JournalSectionHeader = (props: Props) => {
    const {
        description,
        title,
        color,
        showRightButton
    } = props;
    const [showAddTagModal, setShowAddTagModal] = useState(false);
    const handleToggleModal = () => {
        setShowAddTagModal(!showAddTagModal);
    };
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
                showRightButton &&
                    <>
                        <AddTagModal showAddTagModal={showAddTagModal} handleToggleModal={handleToggleModal} chosenSection={title} />
                        <Pressable
                            className={classNames('h-10 w-10 rounded-full absolute right-3 top-2 justify-center items-center', color ? themeBackgrounds[color] : 'bg-[--color-primary-500] active:bg-[--color-primary-400]')}
                            onPress={handleToggleModal}>
                            <Entypo name={'plus'} size={24} color={themeVars['--color-paper']} />
                        </Pressable>
                    </>
            }
        </View>
    )
}

export default JournalSectionHeader