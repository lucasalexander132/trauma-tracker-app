import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "./customButton";
import SubmissionModal from "./journalComponents/submissionModal/submissionModal";


const AddEntryButton = () => {
    const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleToggleModal = () => {
        setShowConfirmationModal(!showConfirmationModal);
    }
    return (
        <>
            <SubmissionModal showConfirmationModal={showConfirmationModal} handleToggleModal={handleToggleModal} />
            <View className='mx-[16px]'>
                <CustomButton
                    variant='primary'
                    iconName='pencil'
                    buttonClassName='absolute rounded-[22px] pb-20 w-full shadow-lg'
                    style={{ bottom: bottomHeight - 69 }}
                    title={'Add Entry'}
                    onPress={handleToggleModal}/>
            </View>
        </>
    )
}

export default AddEntryButton;