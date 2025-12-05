import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import { useJournalState } from '@/zustand/journalStore'
import React, { useEffect } from 'react'

const SafetyModule = () => {
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

    useEffect(() => {
        return () => clearJournalEntry();
    }, []);
    return (
        <>
            <JournalSectionHeader
                title='Safety'
                description="Let's discover what your symptoms do to help you feel safe."/>
            <SafeFooter />
        </>
    )
}

export default SafetyModule;