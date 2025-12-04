import { customSwatches, entypoGlyphArr, IconNameType, swatchMap, themeColors, themeSemanticColors, themeVars } from '@/assets/styles/theme';
import CustomModal from '@/components/modal';
import AppText from '@/components/text';
import config from '@/constants/configConstants';
import { SymptomSection, SymptomTag } from '@/zustand/journalStore';
import Entypo from '@expo/vector-icons/Entypo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View, VirtualizedList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import ColorPicker, { ColorFormatsObject, Swatches } from 'reanimated-color-picker';
import Symptom from '../Sectionals/symptomSectional/symptom';

type Props = {
    showAddTagModal: boolean;
    handleToggleModal: (value: boolean) => void;
    section: SymptomSection;
}

type TagDto = Omit<SymptomTag, 'isSystem' | 'id'> & { sectionId: string; };


const AddTagModal = (props: Props) => {
    const {
        section,
        showAddTagModal,
        handleToggleModal
    } = props;

    const handleAddTag = () => {
        handleToggleModal(showAddTagModal);
    }
    
    return (
        <CustomModal
            showConfirmationModal={showAddTagModal}
            onToggleShow={handleToggleModal}>
            <AppText className='text-xl font-semibold text-center mb-4'>Add Tag to { section.title }</AppText>
            <TagCreator onAddTag={handleAddTag} section={section} />
        </CustomModal>
    )
}

interface TagCreatorProps {
    onAddTag: () => void;
    section: SymptomSection;
}

const TagCreator = ({ onAddTag, section }: TagCreatorProps) => {
    const baseTag: Omit<SymptomTag, 'isSystem' | 'id'> & { sectionId: string; } = {
        sectionId: section.id,
        name: '',
        icon: 'map',
        color: '--color-Charcoal',
        category: 'response'
    };

    const queryClient = useQueryClient();
    const [resultColor, setResultColor] = useState(customSwatches[0]);
    const [newTag, setNewTag] = useState<TagDto>(baseTag);
    const iconMapSize = () => {
        return entypoGlyphArr.length;
    };
    const getIconItem = (_data: string, index: number) => ({
        id: index,
        item: entypoGlyphArr[index]
    });

    const currentColor = useSharedValue(customSwatches[0]);

    // Runs on the ui thread on color change
    const onColorChange = (color: ColorFormatsObject) => {
        'worklet';
        currentColor.value = color.hex;
    };

    // Runs on the js thread on color pick
    const onColorPick = (color: ColorFormatsObject) => {
        setResultColor(color.hex);
        setNewTag({
            ...newTag,
            color: swatchMap.get(color.hex)
        });
    };

    const { mutate: addTagMutate, isPending: submissionPending, isSuccess: submissionSuccessful } = useMutation({
        mutationFn: async () => {
            const response = await fetch(config.api.host + '/user/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTag)
            });
            const data = await response.json();
            console.log(data);
            return data;
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
            onAddTag();
        },
        onError: (error) => {
            console.log(JSON.stringify(error), 'Error: Journal not sent');
        }
    });

    const addTag = () => {
        addTagMutate();
    }
    return (
        <>
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
                                    icon: item.item as IconNameType
                                });
                            }}>
                            <Entypo
                                className='mr-2'
                                key={item.item}
                                name={item.item as IconNameType}
                                color={themeColors[newTag.color]}
                                size={28}/>
                        </Pressable>}
                        keyExtractor={({item, id}) => item + id}
                        getItemCount={iconMapSize}
                        getItem={getIconItem}/>
                </View>
                <View className='w-3/12 items-center justify-center'>
                    <Symptom symptom={{
                        id: '',
                        name: newTag.name,
                        icon: newTag.icon,
                        color: newTag.color,
                        isSystem: false,
                        category: newTag.category
                    }} />
                </View>
            </View>
            <View className='w-full items-center my-2'>
                <Pressable
                    className={classNames('px-4 py-2 rounded-full w-32', newTag.name !== '' ? 'bg-[--color-primary-500]' : 'bg-[--color-text-subtle]')}
                    style={{
                        backgroundColor: newTag.name === '' ? themeSemanticColors['--color-primary-200'] : themeColors[newTag.color]
                    }}
                    onPress={addTag}>
                    <AppText className='text-[--color-paper] font-bold text-center'>+ Add Tag</AppText>
                </Pressable>
            </View>
        </>
    )
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

export default AddTagModal;