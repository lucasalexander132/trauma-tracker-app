import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import { useTagState } from '@/zustand/store';
import { ScrollView, Text, View } from 'react-native';

export default function JournalEntry() {
    const symptoms = useTagState((state) => state.symptoms);
    return (
        <SafeView className='pt-4'>
            <ScrollView className="w-full">
                {
                    symptoms.map((symptomSection, id) => <SymptomSectional
                        key={`${symptomSection.title}${id}`}
                        title={symptomSection.title}
                        symptoms={symptomSection.tags} />)
                }
                <View className='px-8'>
                    <Text className="text-2xl font-bold">1. User is given entry to fill out</Text>
                    <Text className="text-md font-bold">- Define each section</Text>
                    <Text className="text-md font-bold">- Have an infinite intensity slider?</Text>
                    <Text className="text-md font-bold">- Have a component that takes a subheader and list of symptoms underneath</Text>
                    <Text className="text-md font-bold">- Have a section where you can add and reuse tags (create a new symptom?)</Text>
                    <Text className="text-md font-bold">- Submit at any time?</Text>
                    <Text className="text-2xl font-bold">1. User is given entry to fill out</Text>
                    <Text className="text-md font-bold">- Define each section</Text>
                    <Text className="text-md font-bold">- Have an infinite intensity slider?</Text>
                    <Text className="text-md font-bold">- Have a component that takes a subheader and list of symptoms underneath</Text>
                    <Text className="text-md font-bold">- Have a section where you can add and reuse tags (create a new symptom?)</Text>
                    <Text className="text-md font-bold">- Submit at any time?</Text>
                    <Text className="text-2xl font-bold">1. User is given entry to fill out</Text>
                    <Text className="text-md font-bold">- Define each section</Text>
                    <Text className="text-md font-bold">- Have an infinite intensity slider?</Text>
                    <Text className="text-md font-bold">- Have a component that takes a subheader and list of symptoms underneath</Text>
                    <Text className="text-md font-bold">- Have a section where you can add and reuse tags (create a new symptom?)</Text>
                    <Text className="text-md font-bold">- Submit at any time?</Text>
                    <Text className="text-2xl font-bold">1. User is given entry to fill out</Text>
                    <Text className="text-md font-bold">- Define each section</Text>
                    <Text className="text-md font-bold">- Have an infinite intensity slider?</Text>
                    <Text className="text-md font-bold">- Have a component that takes a subheader and list of symptoms underneath</Text>
                    <Text className="text-md font-bold">- Have a section where you can add and reuse tags (create a new symptom?)</Text>
                    <Text className="text-md font-bold">- Submit at any time?</Text>
                    <Text className="text-2xl font-bold">1. User is given entry to fill out</Text>
                    <Text className="text-md font-bold">- Define each section</Text>
                    <Text className="text-md font-bold">- Have an infinite intensity slider?</Text>
                    <Text className="text-md font-bold">- Have a component that takes a subheader and list of symptoms underneath</Text>
                    <Text className="text-md font-bold">- Have a section where you can add and reuse tags (create a new symptom?)</Text>
                    <Text className="text-md font-bold">- Submit at any time?</Text>
                </View>
                <SafeFooter />
            </ScrollView>
        </SafeView>)
}