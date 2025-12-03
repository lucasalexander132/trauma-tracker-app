import { themeBackgrounds, themeVars } from '@/assets/styles/theme';
import { SymptomSection } from '@/zustand/journalStore';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import AddTagModal from './addTagModal';

type Props = {
    section: SymptomSection;
}

const AddTagModalBtn = ({ section }: Props) => {
    const [showAddTagModal, setAddTagModal] = useState(false);
    const handleToggleModal = () => {
        setAddTagModal(!showAddTagModal);
    }
    return (
        <>
            <AddTagModal showAddTagModal={showAddTagModal} handleToggleModal={handleToggleModal} section={section} />
            <Pressable
                className={classNames('h-10 w-10 rounded-full absolute right-3 top-2 justify-center items-center', section.color ? themeBackgrounds[section.color] : 'bg-[--color-primary-500] active:bg-[--color-primary-400]')}
                onPress={handleToggleModal}>
                <Entypo name={'plus'} size={24} color={themeVars['--color-paper']} />
            </Pressable>
        </>
    )
}

export default AddTagModalBtn;