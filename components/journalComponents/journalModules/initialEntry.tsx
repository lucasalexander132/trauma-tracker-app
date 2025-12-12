import { useJournalEntrySections } from '@/api/user'
import SafeFooter from '@/components/safeFooter'
import { SymptomSection, useJournalState } from '@/zustand/journalStore'
import React, { useEffect } from 'react'
import EntryDescriptionSectional from '../Sectionals/entryDescriptionSectional/entryDescriptionSectional'
import EventNameSectional from '../Sectionals/eventNameSectional/eventNameSectional'
import IntensitySectional from '../Sectionals/intensitySectional/intensitySectional'
import SymptomSectional from '../Sectionals/symptomSectional/symptomSectional'

const InitialEntry = () => {
    const { data: sections } = useJournalEntrySections();
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

    useEffect(() => {
        return () => clearJournalEntry();
    }, []);
    return (
        <>
            <EventNameSectional />
            {
                sections.map((section: SymptomSection) => <SymptomSectional
                    key={section.id}
                    section={section} />)
            }
            <IntensitySectional />
            <EntryDescriptionSectional />
            <SafeFooter />
        </>
    )
}

export default InitialEntry;