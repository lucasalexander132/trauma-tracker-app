import { themeSemanticColors, themeVars } from '@/assets/styles/theme'
import Entypo from '@expo/vector-icons/Entypo'
import { usePathname, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import AppText from '../text'

const whiteListRoutes = new Set(['/', '/settings']);

const CustomJournalEntryButton = () => {
    const pathname = usePathname();
    const router = useRouter();
    const handlePress = () => {
        if (whiteListRoutes.has(pathname)) {
            router.navigate('/(home)/journalEntry');
        }
    }
    return (
        <Pressable
            onPress={handlePress}
            style={{
                backgroundColor: themeSemanticColors['--color-primary-500'],
                borderColor: '#211818',
                borderWidth: 6
            }}
            className={"p-4 w-20 h-20 -top-[9px] self-center justify-center items-center rounded-full border-[--color-primary-200] border-hairline shadow-sm active:bg-[--color-comp-primary-dark] transition-all duration-200"}>
            <View className='flex-row'>
                <AppText className="font-bold text-2xl" style={{
                    color: themeVars['--color-paper-dark']
                }}>+</AppText>
                <Entypo name="feather" size={28} color={themeVars['--color-paper-dark']} />
            </View>
        </Pressable>
    )
}

export default CustomJournalEntryButton