import CustomButton from '@/components/customButton';
import IntensitySlider from '@/components/journalComponents/fidgetWidgets/intensitySlider';
import SubmissionModal from '@/components/journalComponents/submissionModal/submissionModal';
import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import JournalSectionHeader from '@/components/journalSectionHeader';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import config from '@/constants/configConstants';
import { SymptomSection, useJournalState } from '@/zustand/journalStore';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JournalEntry() {
    const setIntensity = useJournalState((state) => state.setIntensity);
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

    const { data: sections } = useSuspenseQuery({
        queryKey: ['sections'],
        queryFn: async () => {
            const response = await fetch(config.api.host + '/user/sections');
            const sections: SymptomSection[] = await response.json();
            return sections;
        }
    });

    useEffect(() => {
        return () => clearJournalEntry();
    }, []);

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
                <JournalSectionHeader />
                <View className='mt-8 mb-32 h-20'>
                    <IntensitySlider onValueChange={setIntensity} />
                </View>
                <SafeFooter />
            </ScrollView>
            <AddEntryButton />
        </SafeView>)
}

const AddEntryButton = () => {
    const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleToggleModal = () => {
        setShowConfirmationModal(!showConfirmationModal);
    }
    return (
        <>
            <SubmissionModal showConfirmationModal={showConfirmationModal} handleToggleModal={handleToggleModal} />
            <View className='mx-[16px]'>
                <CustomButton
                    variant='primary'
                    iconName='pencil'
                    buttonClassName='absolute rounded-[22px] pb-20 w-full shadow-lg'
                    style={{ bottom: bottomHeight - 69 }}
                    title={'Add Entry'}
                    onPress={handleToggleModal}/>
            </View>
        </>
    )
}
