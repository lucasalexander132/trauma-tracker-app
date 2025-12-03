import JournalSectionHeader from '@/components/journalSectionHeader'
import { useJournalState } from '@/zustand/journalStore'
import React from 'react'
import { View } from 'react-native'
import IntensitySlider from '../fidgetWidgets/intensitySlider'

type Props = {}

const IntensitySectional = (props: Props) => {
    const setIntensity = useJournalState((state) => state.setIntensity);
    return (
        <>
            <JournalSectionHeader />
            <View className='mt-8 mb-32 h-20'>
                <IntensitySlider onValueChange={setIntensity} />
            </View>
        </>
    )
}

export default IntensitySectional;