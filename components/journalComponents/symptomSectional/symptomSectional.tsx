import JournalSectionHeader from '@/components/journalSectionHeader';
import { SymptomSection, SymptomTag } from '@/zustand/journalStore';
import React from 'react';
import { FlatList, View } from 'react-native';
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
    return(<View className='w-full'>
        <JournalSectionHeader
            title={section.title}
            description={section.description}
            removeRightButton={!section.cantAddTag}
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