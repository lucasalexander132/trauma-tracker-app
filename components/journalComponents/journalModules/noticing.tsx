import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import { useJournalState } from '@/zustand/journalStore'
import React, { useEffect } from 'react'

const NoticingModule = () => {
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

    useEffect(() => {
        return () => clearJournalEntry();
    }, []);
    return (
        <>
            <JournalSectionHeader
                title='Noticing'
                description="Let's discover when you're being triggered."/>
            <SafeFooter />
        </>
    )
}

export default NoticingModule;