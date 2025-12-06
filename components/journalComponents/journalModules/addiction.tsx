import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import { useJournalState } from '@/zustand/journalStore'
import React, { useEffect } from 'react'

const AddictionModule = () => {
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

    useEffect(() => {
        return () => clearJournalEntry();
    }, []);
    return (
        <>
            <JournalSectionHeader
                title='Addiction'
                description="Let's discover how the cycle of addiction works in your own life."/>
            <SafeFooter />
        </>
    )
}

export default AddictionModule;