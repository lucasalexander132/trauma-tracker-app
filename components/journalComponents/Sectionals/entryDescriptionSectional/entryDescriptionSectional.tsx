import JournalSectionHeader from '@/components/journalSectionHeader'
import AppText from '@/components/text'
import { useJournalState } from '@/zustand/journalStore'
import React from 'react'
import { TextInput, View } from 'react-native'

const MAX_DESCRIPTION_LENGTH = 240;

const EntryDescriptionSectional = () => {
    const setEntryDescription = useJournalState((state) => state.setEntryDescription);
    const entryDescription = useJournalState((state) => state.entryDescription);
    return (
        <>
            <JournalSectionHeader
                title='Description'
                description='In a few words, you can describe what happened.'/>
            <View className='mt-8 mb-14 items-center'>
                <AppText className='text-md font-bold color-[--color-text-subtle] self-start pl-10 mb-2'>{`${entryDescription?.length ?? 0}/${MAX_DESCRIPTION_LENGTH}`}</AppText>
                <TextInput
                    editable
                    multiline
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    placeholder="Description"
                    className="bg-[--color-paper-dark] font-bold rounded-md px-3 py-2 mb-4 w-[85%] h-28"
                    onChangeText={setEntryDescription}/>
            </View>
        </>
    )
}

export default EntryDescriptionSectional