import CustomButton from '@/components/customButton';
import Slider from '@/components/journalComponents/fidgetWidgets/slider';
import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import JournalSectionHeader from '@/components/journalSectionHeader';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import isUndefined from '@/utils/types/isUndefined';
import { SymptomSection, useTagState } from '@/zustand/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JournalEntry() {
    const symptoms = useTagState((state) => state.symptoms);
    const [symptomEntries, setSymptomEntries] = useState<[string, SymptomSection][]>([]);
    const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;

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
                    description={'How intense is this moment?'}
                    />
                <View className='mt-8 mb-20'>
                    <Slider />
                </View>
                <SafeFooter />
            </ScrollView>
            <CustomButton
                variant='primary'
                iconName='pencil'
                buttonClassName='absolute'
                style={{ bottom: bottomHeight }}
                title={'Add Entry'} />
        </SafeView>)
}