import CustomButton from '@/components/customButton';
import AddictionModule from '@/components/journalComponents/journalModules/addiction';
import CopingModule from '@/components/journalComponents/journalModules/coping';
import InitialEntry from '@/components/journalComponents/journalModules/initialEntry';
import NoticingModule from '@/components/journalComponents/journalModules/noticingModule/noticing';
import SafetyModule from '@/components/journalComponents/journalModules/safetyModule/safety';
import SubmissionModal from '@/components/journalComponents/submissionModal/submissionModal';
import SafeView from '@/components/safeView';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ModuleTypes = 'initialEntry' | 'safety' | 'noticing' | 'coping' | 'addiction';

type JournalEntryParams = {
    module: ModuleTypes;
    entry: string;
}

export default function JournalEntry() {
    const { module = 'initialEntry', entry } = useLocalSearchParams<JournalEntryParams>();
    return (
        <SafeView>
            {
                module === 'initialEntry' &&
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className="pt-6">
                        { module === 'initialEntry' && <InitialEntry /> }
                    </ScrollView>
                    <AddEntryButton />
                </>
            }
            { module === 'safety' && <SafetyModule />}
            { module === 'noticing' && <NoticingModule entry={entry} />}
            { module === 'coping' && <CopingModule />}
            { module === 'addiction' && <AddictionModule />}
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
            <View className='mx-[64px]'>
                <CustomButton
                    variant='primary'
                    iconName='pencil'
                    buttonClassName='absolute rounded-[22px] pb-[75px] w-full shadow-lg'
                    textClassName='text-xl'
                    style={{ bottom: bottomHeight - 69 }}
                    title={'Add Entry'}
                    onPress={handleToggleModal}/>
            </View>
        </>
    )
}
