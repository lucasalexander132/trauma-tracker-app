import { IRandomColors, randomColors } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import { Pressable, Text, View } from 'react-native';

export interface SymptomProps {
    symptom: ISymptom;
    symptomClasses: string;
    iconColor: IRandomColors;
}

export interface ISymptom {
    name: string;
    icon: keyof typeof Entypo.glyphMap;
}

export default function Symptom(props: SymptomProps) {
    const { symptom, symptomClasses, iconColor } = props;
    return (<View className='w-24 mr-2'>
        <Pressable
            className={classNames("h-24 w-24 mr-2 border-solid border-4 rounded-lg justify-center items-center", symptomClasses)}
            onPress={() => console.log('I got pressed!')}>
            <Entypo className='left-[2px]' name={ symptom.icon } size={40} color={randomColors[iconColor]} />
        </Pressable>
        <Text className='text-xs font-bold mt-1 text-center'>{ symptom.name }</Text>
    </View>)
}