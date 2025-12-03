import { themeVars } from '@/assets/styles/theme'
import Entypo from '@expo/vector-icons/Entypo'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerActions, ParamListBase, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable } from 'react-native'

const CustomDrawerBtn = () => {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    return (
        <Pressable
            className='ml-2 h-[28px] w-[38px] rounded-md justify-center px-2 active:bg-red-500'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Entypo
                name={'menu'}
                size={24}
                color={themeVars['--color-paper']}
            />
        </Pressable>
    )
}

export default CustomDrawerBtn