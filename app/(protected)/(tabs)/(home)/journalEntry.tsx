import CustomButton from '@/components/customButton';
import IntensitySlider from '@/components/journalComponents/fidgetWidgets/intensitySlider';
import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import JournalSectionHeader from '@/components/journalSectionHeader';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import config from '@/constants/configConstants';
import isUndefined from '@/utils/types/isUndefined';
import { SymptomSection, useJournalState, useTagState } from '@/zustand/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JournalEntry() {
    const { data: sections } = useSuspenseQuery({
        queryKey: ['sections'],
        queryFn: async () => {
            const response = await fetch(config.api.host + '/user/sections');
            const sections = await response.json();
            return sections as SymptomSection[];
        }
    });
    const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;

    const getSymptomsAsArr = useTagState((state) => state.getSymptomsAsArr);
    const setIntensity = useJournalState((state) => state.setIntensity);
    const getJournalEntry = useJournalState((state) => state.getJournalEntry);

    const { mutate: submitJournalEntry } = useMutation({
        mutationFn: async () => {
            const response = await fetch(config.api.host + '/user/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getJournalEntry())
            });
            const data = await response.json();
            return data;
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            console.log(JSON.stringify({
                data,
                variables,
                onMutateResult,
                context
            }));
        },
        onError: (error) => {
            console.log(JSON.stringify(error), 'Error: Journal not sent');
        }
    });

    const handleSubmit = () => {
        submitJournalEntry();
    }

    const [symptomEntries, setSymptomEntries] = useState<[string, SymptomSection][]>([]);

    useEffect(() => {
        if (!isUndefined(getSymptomsAsArr)) {
            setSymptomEntries(getSymptomsAsArr());
        }
    }, [getSymptomsAsArr]);

    return (
        <SafeView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="bg-[--color-paper] pt-6">
                {
                    sections.map((section: SymptomSection) => <SymptomSectional
                        key={section.id}
                        section={section} />)
                }
                <JournalSectionHeader
                    title={'Intensity'}
                    description={'How intense is this moment?'}
                    />
                <View className='mt-8 mb-32 h-20'>
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
                    onPress={handleSubmit}/>
            </View>
        </SafeView>)
}