import { themeColors, themeVars } from '@/assets/styles/theme';
import { SymptomTag } from '@/zustand/store';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

export interface SymptomProps {
    symptom: SymptomTag;
}

export interface ISymptom {
    name: string;
    icon: keyof typeof Entypo.glyphMap;
}

export default function Symptom(props: SymptomProps) {
    const { symptom } = props;
    const [isActive, setIsActive] = useState(false);

    const handlePressed = () => setIsActive(!isActive);

    const style = StyleSheet.create({
        symptomButton: {
            borderColor: themeColors[`${symptom.color}-dark`],
        },
    });

    return (
        <View className='mr-2 h-34 py-4'>
            <Animated.View
                className="w-24 h-24 border-solid border-4 justify-center items-center"
                style={[style.symptomButton, {
                    backgroundColor: isActive ? themeColors[`${symptom.color}-dark`] : 'transparent',
                    borderRadius: isActive ? 100 : 6,
                    transitionProperty: ['backgroundColor', 'borderRadius'],
                    transitionTimingFunction: 'ease-in',
                    transitionDuration: 200
                }]}
            >
                <Pressable onPress={handlePressed}>
                    <Entypo
                        name={symptom.icon}
                        size={40}
                        color={isActive ? themeVars['--color-paper'] : themeColors[symptom.color]}
                    />
                </Pressable>
            </Animated.View>
            <Animated.Text className="text-xs font-bold mt-1 text-center" style={{
                color: isActive ? themeColors[`${symptom.color}-dark`] : themeVars['--color-text'],
                transitionProperty: ['color'],
                transitionTimingFunction: 'ease-in',
                transitionDuration: 200
            }}>
                {symptom.name}
            </Animated.Text>
        </View>
    );
}