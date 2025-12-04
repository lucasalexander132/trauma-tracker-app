import { useJournalEntrySections } from '@/api/user';
import CustomButton from '@/components/customButton';
import EntryDescriptionSectional from '@/components/journalComponents/Sectionals/entryDescriptionSectional/entryDescriptionSectional';
import EventNameSectional from '@/components/journalComponents/Sectionals/eventNameSectional/eventNameSectional';
import IntensitySectional from '@/components/journalComponents/Sectionals/intensitySectional/intensitySectional';
import SymptomSectional from '@/components/journalComponents/Sectionals/symptomSectional/symptomSectional';
import SubmissionModal from '@/components/journalComponents/submissionModal/submissionModal';
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
                className="pt-6">
                <EventNameSectional />
                {
                    sections.map((section: SymptomSection) => <SymptomSectional
                        key={section.id}
                        section={section} />)
                }
                <IntensitySectional />
                <EntryDescriptionSectional />
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
