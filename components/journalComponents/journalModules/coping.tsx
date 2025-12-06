import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import { useJournalState } from '@/zustand/journalStore'
import React, { useEffect } from 'react'

const CopingModule = () => {
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

    useEffect(() => {
        return () => clearJournalEntry();
    }, []);
    return (
        <>
            <JournalSectionHeader
                title='Coping'
                description="Let's discover how you cope with your trauma."/>
            <SafeFooter />
        </>
    )
}

export default CopingModule;