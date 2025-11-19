import { customSwatches, entypoGlyphArr, swatchMap, themeColors, themeSemanticColors, themeVars } from '@/assets/styles/theme';
import AppText from '@/components/text';
import { SymptomSection, SymptomTag, useTagState } from '@/zustand/store';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, TextInput, View, VirtualizedList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import type { ColorFormatsObject } from 'reanimated-color-picker';
import ColorPicker, { Swatches } from 'reanimated-color-picker';
import Symptom from './symptom';

export interface SymptomSectionalProps {
    section: SymptomSection;
}

const baseTag: SymptomTag = {
    name: '',
    icon: 'map',
    color: '--color-Charcoal',
    category: 'response',
    isSystem: false
};

export default function SymptomSectional(props: SymptomSectionalProps) {
    const [resultColor, setResultColor] = useState(customSwatches[0]);
    const [newTag, setNewTag] = useState<SymptomTag>(baseTag);
    const addSymptomTag = useTagState((state) => state.addSymptomTag);
    const iconMapSize = () => {
        return entypoGlyphArr.length;
    };
    const getIconItem = (_data: string, index: number) => ({
        id: index,
        item: entypoGlyphArr[index]
    });

    const currentColor = useSharedValue(customSwatches[0]);

    // runs on the ui thread on color change
    const onColorChange = (color: ColorFormatsObject) => {
        'worklet';
        currentColor.value = color.hex;
    };

    // runs on the js thread on color pick
    const onColorPick = (color: ColorFormatsObject) => {
        setResultColor(color.hex);
        setNewTag({
            ...newTag,
            color: swatchMap.get(color.hex)
        });
    };
    const [chosenSection, setChosenSection] = useState('');
    const [showAddTagModal, setShowAddTagModal] = useState(false);
    const handleAddTag = () => {
        setChosenSection(props.section.title);
        setShowAddTagModal(true);
    }
    const handleToggleModal = () => {
        setShowAddTagModal(!showAddTagModal);
        setNewTag(baseTag);
    };
    return(<View className='w-full'>
        <Modal
            animationType='fade'
            transparent={true}
            visible={showAddTagModal}
            onRequestClose={handleToggleModal}>
            <Pressable
                onPress={handleToggleModal}
                className='flex justify-center absolute w-full bg-[--color-text] h-full opacity-15' />
            <View className='flex justify-center absolute h-full w-full'>
                <View style={styles.modalView}>
                    <Pressable
                        className='rounded-full bg-[--color-danger] absolute h-8 w-8 right-2 top-2 active:bg-[--color-danger-dark] z-10'
                        hitSlop={15}
                        onPress={handleToggleModal}>
                        <Entypo
                            key={'close'}
                            name={'cross'}
                            color={themeVars['--color-paper']}
                            size={28}/>
                    </Pressable>
                    <AppText className='text-xl font-semibold text-center mb-4'>Add Tag to { chosenSection }</AppText>
                    <View className='flex-row mb-4'>
                        <View className='flex-col w-9/12 bg-[#ffeeee] rounded-lg p-4'>
                            <TextInput
                                placeholder="Tag Name"
                                className="bg-slate-200 rounded-md px-3 py-2 mb-4"
                                onChangeText={(tagName) => {
                                    setNewTag({
                                        ...newTag,
                                        name: tagName
                                    });
                                }}/>
                            <AppText className='font-semibold text-[--color-text-subtle]'>Color</AppText>
                            <ScrollView
                                horizontal
                                className='p-2'
                                showsHorizontalScrollIndicator={false}>
                                <ColorPicker
                                    value={resultColor}
                                    sliderThickness={25}
                                    thumbSize={24}
                                    thumbShape='circle'
                                    onChange={onColorChange}
                                    onCompleteJS={onColorPick}
                                    boundedThumb
                                    >
                                    <Swatches
                                        style={styles.swatchesContainer}
                                        swatchStyle={styles.swatchStyle}
                                        colors={customSwatches}
                                    />
                                </ColorPicker>
                            </ScrollView>
                            <AppText className='font-semibold text-[--color-text-subtle]'>Icon</AppText>
                            <VirtualizedList
                                horizontal
                                className='p-2'
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={8}
                                renderItem={({item}) => <Pressable
                                    onPress={() => {
                                        setNewTag({
                                            ...newTag,
                                            icon: item.item as keyof typeof Entypo.glyphMap
                                        });
                                    }}>
                                    <Entypo
                                        className='mr-2'
                                        key={item.item}
                                        name={item.item as keyof typeof Entypo.glyphMap}
                                        color={themeColors[newTag.color]}
                                        size={28}/>
                                </Pressable>}
                                keyExtractor={({item, id}) => item + id}
                                getItemCount={iconMapSize}
                                getItem={getIconItem}/>
                        </View>
                        <View className='w-3/12 items-center justify-center'>
                            <Symptom symptom={newTag} />
                        </View>
                    </View>
                    <View className='w-full items-center my-2'>
                        <Pressable
                            className={classNames('px-4 py-2 rounded-full w-32', newTag.name !== '' ? 'bg-[--color-primary-500]' : 'bg-[--color-text-subtle]')}
                            style={{
                                backgroundColor: newTag.name === '' ? themeSemanticColors['--color-primary-200'] : themeColors[newTag.color]
                            }}
                            onPress={() => {
                                handleToggleModal();
                                addSymptomTag(chosenSection, newTag);
                            }}>
                            <AppText className='text-[--color-paper] font-bold text-center'>+ Add Tag</AppText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
        <View className='flex-row w-full'>
            <View className='h-8 w-6 bg-[--color-primary-500] rounded-r-2xl top-2' />
            <View className='flex-col'>
                <AppText className='text-2xl font-bold pl-3 color-[--color-text]'>{ props.section.title }</AppText>
                {
                    typeof props.section.description !== 'undefined' ? <AppText className='text-md font-bold pl-3 color-[--color-text-subtle]'>{props.section.description}</AppText> : <></>
                }
            </View>
            {
                props.section.cantAddTag ??
                    <Pressable
                        className="h-10 w-10 rounded-full bg-[--color-primary-500] absolute right-3 top-2 justify-center items-center active:bg-[--color-primary-600]"
                        onPress={handleAddTag}>
                        <Entypo name={'plus'} size={24} color={themeVars['--color-paper']} />
                    </Pressable>
            }
        </View>
        <View className='mt-2 mb-6 flex-row'>
            <FlatList
                ListHeaderComponent={<View className='w-8' />}
                data={ props.section.tags }
                renderItem={({item}) => <View className='mr-2'><Symptom symptom={item} /></View>}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={<View className='w-8' />}/>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        marginVertical: 20,
    },
    picker: {
        gap: 10,
    },
    pickerContainer: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    panelStyle: {
        borderRadius: 16,

        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    sliderStyle: {
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    sliderVerticalStyle: {
        borderRadius: 20,
        height: 300,

        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    sliderTitle: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
        paddingHorizontal: 4,
        fontFamily: 'Quicksand',
    },
    previewStyle: {
        height: 40,
        borderRadius: 14,
    },
    previewTxt: {
        color: '#707070',
        fontFamily: 'Quicksand',
    },
    inputStyle: {
        color: '#707070',
        paddingVertical: 2,
        borderColor: '#707070',
        fontSize: 12,
        marginLeft: 5,
    },
    swatchesContainer: {
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: 8,
    },
    swatchStyle: {
        borderRadius: 20,
        height: 30,
        width: 30,
        margin: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: themeVars['--color-paper-light'],
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});