import { interpolateColor, themeColors } from '@/assets/styles/theme';
import CustomButton from '@/components/customButton';
import IntensitySlider from '@/components/journalComponents/fidgetWidgets/intensitySlider';
import Symptom from '@/components/journalComponents/symptomSectional/symptom';
import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import JournalSectionHeader from '@/components/journalSectionHeader';
import CustomModal from '@/components/modal';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import AppText from '@/components/text';
import config from '@/constants/configConstants';
import { SymptomSection, useJournalState } from '@/zustand/journalStore';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JournalEntry() {
    const setIntensity = useJournalState((state) => state.setIntensity);

    const { data: sections } = useSuspenseQuery({
        queryKey: ['sections'],
        queryFn: async () => {
            const response = await fetch(config.api.host + '/user/sections');
            const sections: SymptomSection[] = await response.json();
            return sections;
        }
    });

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

type SubmissionModalProps = {
    showConfirmationModal: boolean;
    handleToggleModal: (value: boolean) => void;
}

const SubmissionModal = (props: SubmissionModalProps) => {
    const {
        showConfirmationModal,
        handleToggleModal
    } = props;
    const router = useRouter();

    const getJournalEntry = useJournalState((state) => state.getJournalEntry);
    const {
        eventTags,
        intensity
    } = getJournalEntry();

    const { mutate: submitJournalEntry, isPending: submissionPending, isSuccess: submissionSuccessful } = useMutation({
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
            // This might be an error but the response came back
            setTimeout(router.dismiss, 1000);
        },
        onError: (error) => {
            console.log(JSON.stringify(error), 'Error: Journal not sent');
        }
    });

    const handleSubmit = () => {
        submitJournalEntry();
    };

    return (<CustomModal
            showConfirmationModal={showConfirmationModal}
            onToggleShow={handleToggleModal}>
            <AppText className='text-2xl font-bold'>Journal Entry</AppText>
            <ScrollView>
                <AppText className='text-lg font-bold mt-3 mb-2'>Tags {
                    eventTags.map((tag) =>
                        <View key={`${tag.id}-indicator`} className='rounded-full' style={{
                            height: 10,
                            width: 10,
                            backgroundColor: themeColors[tag.color]
                        }} />)}
                </AppText>
                <View className='mb-6 flex-row bg-[#ffeeee] rounded-lg'>
                    { eventTags.length > 0 && <FlatList
                        ListHeaderComponent={<View className='w-4' />}
                        data={ eventTags }
                        renderItem={({item}) => <View key={`${item.id}-submit`} className='mr-4'><Symptom symptom={item} symptomView={'ON'} /></View>}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={<View className='w-4' />}/> }
                    {
                        eventTags.length === 0 &&
                            <AppText className='text-center font-bold p-2 w-full'>Totally Untraumatized!</AppText>
                    }
                </View>
                {/* This section definitely needs a refactor cause I'm pulling values out of places they shouldn't be pulled from */}
                <AppText className='text-lg font-bold mb-2'>Intensity</AppText>
                <View className='w-full rounded-full h-10 justify-center' style={{
                    backgroundColor: interpolateColor(themeColors['--color-Cold'], themeColors['--color-Hot'], intensity.intensityValue / 100)
                }}>
                    <AppText className='text-[--color-paper] text-lg font-bold text-center align-middle'>{ intensity.intensityRating }</AppText>
                </View>
                <CustomButton
                    buttonClassName={classNames('rounded-full mt-6', submissionPending && 'opacity-80')}
                    disabled={submissionPending}
                    title={submissionSuccessful ? 'Sent' : 'Submit Entry'}
                    onPress={handleSubmit} />
            </ScrollView>
        </CustomModal>
    )
}