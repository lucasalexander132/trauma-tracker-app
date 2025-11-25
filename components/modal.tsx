import { themeVars } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import React, { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

type Props = {
    showConfirmationModal: boolean;
    onToggleShow: (value: boolean) => void;
}

const CustomModal = ({children, showConfirmationModal, onToggleShow}: PropsWithChildren & Props) => {

    const handleToggleModal = () => {
        onToggleShow(!showConfirmationModal);
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={showConfirmationModal}
            onRequestClose={handleToggleModal}>
            {/* Tappable Background */}
            <Pressable
                onPress={handleToggleModal}
                className='flex justify-center absolute w-full bg-[--color-text] h-full opacity-15' />
            {/* Content */}
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
                    { children }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
});

export default CustomModal