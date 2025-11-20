import CustomButton from '@/components/customButton';
import IntensitySlider from '@/components/journalComponents/fidgetWidgets/intensitySlider';
import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import JournalSectionHeader from '@/components/journalSectionHeader';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import isUndefined from '@/utils/types/isUndefined';
import { SymptomSection, useJournalState, useTagState } from '@/zustand/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JournalEntry() {
    const symptoms = useTagState((state) => state.symptoms);
    const setIntensity = useJournalState((state) => state.setIntensity);
    const [symptomEntries, setSymptomEntries] = useState<[string, SymptomSection][]>([]);
    const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;
    const eventTags = useJournalState((state) => state.eventTags);
    const printEventTags = () => {
        for (let [key, value] of eventTags.entries()) {
            console.log(value.name);
        }
    }

    useEffect(() => {
        if (!isUndefined(symptoms)) {
            setSymptomEntries(Array.from(symptoms.entries()));
        }
    }, [symptoms]);

    return (
        <SafeView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="bg-[--color-paper] pt-6">
                {
                    symptomEntries.map(([title, symptomSection], id) => <SymptomSectional
                        key={`${title}${id}`}
                        section={symptomSection} />)
                }
                <JournalSectionHeader
                    title={'Intensity'}
                    description={'How intense is this moment?'}
                    />
                <View className='mt-8 mb-20 h-20'>
                    <IntensitySlider onValueChange={setIntensity} />
                </View>
                <SafeFooter />
            </ScrollView>
            <View className='mx-[16px]'>
                <CustomButton
                    variant='primary'
                    iconName='pencil'
                    buttonClassName='absolute rounded-[22px] pb-20 w-full shadow-lg'
                    style={{ bottom: bottomHeight - 69 }}
                    title={'Add Entry'}
                    onPress={printEventTags}/>
            </View>
        </SafeView>)
}