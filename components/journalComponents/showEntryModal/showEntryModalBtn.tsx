import { themeVars } from '@/assets/styles/theme';
import { IEntry } from '@/constants/types/Entries';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import ShowEntryModal from './showEntryModal';

type Props = {
    entry: IEntry;
}

const ShowEntryModalBtn = ({ entry }: Props) => {
    const [showModal, setModal] = useState(false);
    const handleToggleModal = () => {
        setModal(!showModal);
    }
    return (
        <>
            <ShowEntryModal showModal={showModal} handleToggleModal={handleToggleModal} entry={entry} />
            <Pressable
                className={classNames('h-10 w-10 rounded-full absolute right-3 top-2 justify-center items-center bg-[--color-primary-500] active:bg-[--color-primary-400]')}
                onPress={handleToggleModal}>
                <Entypo name={'open-book'} size={24} color={themeVars['--color-paper']} />
            </Pressable>
        </>
    )
}

export default ShowEntryModalBtn;