import { IconNameType, themeColors, themeVars } from '@/assets/styles/theme';
import { SymptomTag, useJournalState } from '@/zustand/journalStore';
import useSettingsStore from '@/zustand/settingsStore';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const SYMPTOM_VIEW = {
    OFF: 'OFF',
    ON: 'ON'
} as const;

type ObjectValues<T> = T[keyof T];
type SymptomView = ObjectValues<typeof SYMPTOM_VIEW>;

export interface SymptomProps {
    symptom: SymptomTag;
    symptomView?: SymptomView;
}

export interface ISymptom {
    name: string;
    icon: IconNameType;
}

export default function Symptom(props: SymptomProps) {
    const { symptom, symptomView } = props;
    const addEventTag = useJournalState((state) => state.addEventTag);
    const deleteEventTag = useJournalState((state) => state.deleteEventTag);
    const settings = useSettingsStore((state) => state.settings);

    const [isActive, setIsActive] = useState(false);

    const handlePressed = () => {
        if (isUndefined(symptomView)) {
            setIsActive(!isActive);
            if (!isActive) {
                addEventTag(symptom);
            } else {
                deleteEventTag(symptom);
            }
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

    let buttonRadius = 16;
    let buttonBackgroundColor = 'transparent';
    if (isActive || symptomView === 'ON') {
        buttonRadius = 100;
        buttonBackgroundColor = themeColors[symptom.color];
    };

    return (
        <View className='h-34 py-4 items-center'>
            <Animated.View
                className={
                    classNames('rounded-full items-center p-[2px]')}
                style={[style.symptomButton, {
                    borderRadius: buttonRadius,
                    transitionProperty: ['borderRadius'],
                    transitionTimingFunction: 'ease-in-out',
                    transitionDuration: 200
                },
                settings['stickerMode'].value && style.paperButton]}>
                <Animated.View
                    className="w-[65px] items-center p-[2px]"
                    style={[style.symptomButton, {
                        borderRadius: buttonRadius,
                        transitionProperty: ['borderRadius'],
                        transitionTimingFunction: 'ease-in-out',
                        transitionDuration: 200
                    }]}>
                    <Pressable className='w-full' onPress={handlePressed}>
                        <Animated.View
                            className="h-24 border-solid border-4 items-center"
                            style={[style.symptomButton, {
                                backgroundColor: buttonBackgroundColor,
                                borderRadius: buttonRadius,
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
                                    borderRadius: buttonRadius,
                                    bottom: isActive || symptomView === 'ON' ? 24 : 0,
                                    transitionProperty: ['bottom', 'borderRadius'],
                                    transitionTimingFunction: 'ease-in-out',
                                    transitionDuration: 200
                                }}>
                                <Entypo
                                    name={symptom.icon}
                                    size={36}
                                    color={isActive || symptomView === 'ON' ? settings['stickerMode'].value ? themeVars['--color-paper-dark'] : themeVars['--color-paper'] : themeColors[symptom.color]}
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