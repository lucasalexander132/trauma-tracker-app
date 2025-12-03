import { useJournalEntrySections } from '@/api/user';
import CustomButton from '@/components/customButton';
import IntensitySectional from '@/components/journalComponents/intensitySectional/intensitySectional';
import SubmissionModal from '@/components/journalComponents/submissionModal/submissionModal';
import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import { SymptomSection, useJournalState } from '@/zustand/journalStore';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JournalEntry() {
    const clearJournalEntry = useJournalState((state) => state.clearJournalEntry);

    const { data: sections } = useJournalEntrySections();

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
                <IntensitySectional />
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
