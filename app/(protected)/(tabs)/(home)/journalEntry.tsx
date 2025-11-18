import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import { useTagState } from '@/zustand/store';
import { ScrollView } from 'react-native';

export default function JournalEntry() {
    const symptoms = useTagState((state) => state.symptoms);
    return (
        <SafeView>
            <ScrollView className="w-full pt-6">
                {
                    Array.from(symptoms.entries()).map(([title, symptomSection], id) => <SymptomSectional
                        key={`${title}${id}`}
                        section={symptomSection} />)
                }
                <SafeFooter />
            </ScrollView>
        </SafeView>)
}