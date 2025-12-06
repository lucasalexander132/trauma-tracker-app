import JournalSectionHeader from '@/components/journalSectionHeader'
import SafeFooter from '@/components/safeFooter'
import { useJournalState } from '@/zustand/journalStore'
import React, { useEffect } from 'react'

const SafetModule = () => {
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

    useEffect(() => {
        return () => clearJournalEntry();
    }, []);
    return (
        <>
            <JournalSectionHeader
                title='Safety'
                description="Discover how your brain keeps you safe"/>
            <SafeFooter />
        </>
    )
}

export default SafetModule;