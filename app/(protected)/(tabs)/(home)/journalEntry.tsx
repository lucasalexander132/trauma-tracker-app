import { ISymptom } from '@/components/journalComponents/symptomSectional/symptom';
import SymptomSectional from '@/components/journalComponents/symptomSectional/symptomSectional';
import SafeFooter from '@/components/safeFooter';
import SafeView from '@/components/safeView';
import { ScrollView, Text, View } from 'react-native';

const symptoms: ISymptom[] = [{
                    name: 'Numbing',
                    icon: 'air'
                },{
                    name: 'Depression',
                    icon: 'cloud'
                },{
                    name: 'Irritability',
                    icon: 'eye'
                },{
                    name: 'Decreased Concentration',
                    icon: 'rocket'
                },{
                    name: 'Loss of Interest',
                    icon: 'thumbs-down'
                }];

export default function JournalEntry() {
    return (
        <SafeView className='pt-4'>
            <ScrollView className="w-full">
                <SymptomSectional
                    title={'Symptoms'}
                    symptoms={symptoms}
                    symptomClasses='active:bg-[--color-Pumpkin-light] border-[--color-Pumpkin]'
                    color={'--color-Pumpkin-dark'} />
                <SymptomSectional
                    title={'Symptoms'}
                    symptoms={symptoms}
                    symptomClasses='active:bg-[--color-Olivine-light] border-[--color-Olivine]'
                    color={'--color-Olivine-dark'} />
                <SymptomSectional
                    title={'Symptoms'}
                    symptoms={symptoms}
                    symptomClasses='active:bg-[--color-Zomp-light] border-[--color-Zomp]'
                    color={'--color-Zomp-dark'} />
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