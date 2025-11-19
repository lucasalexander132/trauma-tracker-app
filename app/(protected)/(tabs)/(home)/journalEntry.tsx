import Slider from '@/components/journalComponents/fidgetWidgets/slider';
import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import JournalSectionHeader from '@/components/journalSectionHeader';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import isUndefined from '@/utils/types/isUndefined';
import { SymptomSection, useTagState } from '@/zustand/store';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

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
                <JournalSectionHeader
                    title={'Intensity'}
                    description={'How intense are you feeling your trigger?'}
                    />
                <View className='my-8'>
                    <Slider />
                </View>
                <SafeFooter />
            </ScrollView>
        </SafeView>)
}