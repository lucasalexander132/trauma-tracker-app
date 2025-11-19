import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import isUndefined from '@/utils/types/isUndefined';
import { SymptomSection, useTagState } from '@/zustand/store';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

export default function JournalEntry() {
    const symptoms = useTagState((state) => state.symptoms);
    const [symptomEntries, setSymptomEntries] = useState<[string, SymptomSection][]>([]);

    useEffect(() => {
        if (!isUndefined(symptoms)) {
            setSymptomEntries(Array.from(symptoms.entries()));
        }
    }, [symptoms]);

    return (
        <SafeView>
            <ScrollView className="w-full pt-6">
                {
                    symptomEntries.map(([title, symptomSection], id) => <SymptomSectional
                        key={`${title}${id}`}
                        section={symptomSection} />)
                }
                <SafeFooter />
            </ScrollView>
        </SafeView>)
}