import AppText from '@/components/text';
import { SymptomTag } from '@/zustand/store';
import { FlatList, View } from 'react-native';
import Symptom from './symptom';

export interface SymptomSectionalProps {
    title: string;
    symptoms: SymptomTag[];
}

export default function SymptomSectional(props: SymptomSectionalProps) {
    return(<View className='w-full'>
        <AppText className='text-2xl font-bold pl-8'>{ props.title }</AppText>
        <View className='mt-2 flex-row'>
            <FlatList
                ListHeaderComponent={<View className='w-8' />}
                data={ props.symptoms }
                renderItem={({item}) => <Symptom symptom={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View className='w-8' />}/>
        </View>
    </View>)
}