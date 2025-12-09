import CustomModal from '@/components/modal';
import { IEntry } from '@/constants/types/Entries';
import React from 'react';
import { View } from 'react-native';
import { EntryCard } from '../entries/entryCard';

type Props = {
    entry: IEntry;
    showModal: boolean;
    handleToggleModal: (value: boolean) => void;
}

const ShowEntryModal = (props: Props) => {
    const {
        entry,
        showModal,
        handleToggleModal
    } = props;

    return (
        <CustomModal showModal={showModal} onToggleShow={handleToggleModal} showCard={false}>
            <View className='mt-10'>
                <EntryCard entry={entry} asInfo />
            </View>
        </CustomModal>
    )
}

export default ShowEntryModal