import JournalSectionHeader from '@/components/journalSectionHeader';
import { SymptomSection, SymptomTag } from '@/zustand/journalStore';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import AddTagModal from '../addTagModal/addTagModal';
import Symptom from './symptom';

export interface SymptomSectionalProps {
    section: SymptomSection;
}

const baseTag: SymptomTag = {
    id: 0,
    name: '',
    icon: 'map',
    color: '--color-Charcoal',
    category: 'response',
    isSystem: false
};

export default function SymptomSectional({ section }: SymptomSectionalProps) {
    const [showAddTagModal, setShowAddTagModal] = useState(false);
    const handleAddTag = () => {
        setShowAddTagModal(true);
    }
    const handleToggleModal = () => {
        setShowAddTagModal(!showAddTagModal);
    };
    return(<View className='w-full'>
        <AddTagModal showAddTagModal={showAddTagModal} handleToggleModal={handleToggleModal} chosenSection={section.title} />
        <JournalSectionHeader
            title={section.title}
            description={section.description}
            removeRightButton={section.cantAddTag}
            handleRightButton={handleAddTag}
            color={section.color}/>
        <View className='mt-2 mb-6 flex-row'>
            <FlatList
                ListHeaderComponent={<View className='w-8' />}
                data={ section.tags }
                renderItem={({item}) => <View className='mr-4'><Symptom symptom={item} /></View>}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View className='w-8' />}/>
        </View>
    </View>)
}