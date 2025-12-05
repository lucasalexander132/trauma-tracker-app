import { themeVars } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    showConfirmationModal: boolean;
    onToggleShow: (value: boolean) => void;
    type?: 'sheet' | 'popover'
}

const CustomModal = (props: PropsWithChildren & Props) => {
    const {
        children,
        showConfirmationModal,
        onToggleShow,
        type = 'popover' } = props;

    const paddingBottom = useSafeAreaInsets().bottom;

    const handleToggleModal = () => {
        onToggleShow(!showConfirmationModal);
    };

    let justifyModal = 'justify-center';
    let modalStyle: ViewStyle = styles.popoverView;
    if (type === 'sheet') {
        justifyModal = 'justify-end';
        modalStyle = styles.sheetView
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
            <View className={classNames('flex absolute h-full w-full', justifyModal)}>
                <View style={{
                    ...modalStyle,
                    paddingBottom
                }}>
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
    popoverView: {
        width: '90%',
        maxHeight: '60%',
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
        elevation: 5
    },
    sheetView: {
        maxHeight: '80%',
        alignSelf: 'center',
        width: '100%',
        backgroundColor: themeVars['--color-paper-light'],
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

export default CustomModal