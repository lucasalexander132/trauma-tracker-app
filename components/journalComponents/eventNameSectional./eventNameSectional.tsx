import JournalSectionHeader from '@/components/journalSectionHeader'
import { useJournalState } from '@/zustand/journalStore'
import React from 'react'
import { TextInput, View } from 'react-native'

type Props = {}

const EventNameSectional = (props: Props) => {
    const setEventName = useJournalState((state) => state.setEventName);
    return (
        <>
            <JournalSectionHeader
                title='Entry Name'
                description='What one or two words best describe this moment?'/>
            <View className='mt-8 mb-6 items-center'>
                <TextInput
                    placeholder="Entry Name"
                    className="bg-[--color-paper-dark] rounded-md px-3 py-2 mb-4 w-[85%]"
                    onChangeText={setEventName}/>
            </View>
        </>
    )
}

export default EventNameSectional;