import { themeColors, themeVars } from '@/assets/styles/theme';
import useSettingsStore from '@/zustand/settingsStore';
import { SymptomTag, useJournalState } from '@/zustand/store';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
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
    const addEventTag = useJournalState((state) => state.addEventTag);
    const deleteEventTag = useJournalState((state) => state.deleteEventTag);
    const settings = useSettingsStore((state) => state.settings);

    const [isActive, setIsActive] = useState(false);

    const handlePressed = () => {
        setIsActive(!isActive);
        if (!isActive) {
            addEventTag(symptom);
        } else {
            deleteEventTag(symptom);
        }
    };

    const style = StyleSheet.create({
        symptomButton: {
            borderColor: themeColors[symptom.color],
        },
        paperButton: {
            backgroundColor: themeVars['--color-paper-dark'],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 1.5,
            elevation: 5
        }
    });

    return (
        <View className='h-34 py-4 items-center'>
            <Animated.View
                className={
                    classNames('rounded-full items-center p-[2px]')}
                style={[style.symptomButton, {
                    borderRadius: isActive ? 100 : 16,
                    transitionProperty: ['borderRadius'],
                    transitionTimingFunction: 'ease-in-out',
                    transitionDuration: 200
                },
                settings['stickerMode'].value && style.paperButton]}>
                <Animated.View
                    className="w-[65px] items-center p-[2px]"
                    style={[style.symptomButton, {
                        borderRadius: isActive ? 100 : 20,
                        transitionProperty: ['borderRadius'],
                        transitionTimingFunction: 'ease-in-out',
                        transitionDuration: 200
                    }]}>
                    <Pressable className='w-full' onPress={handlePressed}>
                        <Animated.View
                            className="h-24 border-solid border-4 items-center"
                            style={[style.symptomButton, {
                                backgroundColor: isActive ? themeColors[symptom.color] : 'transparent',
                                borderRadius: isActive ? 100 : 16,
                                transitionProperty: ['backgroundColor', 'borderRadius'],
                                transitionTimingFunction: 'ease-in-out',
                                transitionDuration: 200
                            }]}
                        >
                            <Animated.View
                                className={'py-2'}
                                style={{
                                    position: 'absolute',
                                    borderColor: themeVars['--color-paper'],
                                    borderRadius: isActive ? 100 : 16,
                                    bottom: isActive ? 24 : 0,
                                    transitionProperty: ['bottom', 'borderRadius'],
                                    transitionTimingFunction: 'ease-in-out',
                                    transitionDuration: 200
                                }}>
                                <Entypo
                                    name={symptom.icon}
                                    size={36}
                                    color={isActive ? settings['stickerMode'].value ? themeVars['--color-paper-dark'] : themeVars['--color-paper'] : themeColors[symptom.color]}
                                />
                            </Animated.View>
                        </Animated.View>
                    </Pressable>
                </Animated.View>
            </Animated.View>
            <Animated.Text className="text-xs font-bold mt-1 text-center w-20" style={{
                color: isActive ? themeColors[symptom.color] : themeVars['--color-text'],
                transitionProperty: ['color'],
                transitionTimingFunction: 'ease-in',
                transitionDuration: 200
            }}>
                {symptom.name}
            </Animated.Text>
        </View>
    );
}