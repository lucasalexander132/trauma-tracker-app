import { themeSemanticColors, themeVars } from '@/assets/styles/theme';
import CustomJournalEntryButton from '@/components/navigation/customJournalEntryButton';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";

const sharedTabStyles = {
    headerShown: false,
    tabBarActiveTintColor: themeSemanticColors['--color-primary-500'],
    tabBarInactiveTintColor: themeVars['--color-paper-dark'],
};

export default function TabsLayout() {
    return (<Tabs screenOptions={{
            tabBarStyle: {
                borderRadius: 20,
                position: 'absolute',
                marginBottom: 30,
                marginHorizontal: 70,
                backgroundColor: '#211818',
                borderTopWidth: 0,
                height: 54,
                paddingBottom: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
            }
        }}>
        <Tabs.Screen
            name="(home)"
            options={{
                ...sharedTabStyles,
                title: "Entries",
                tabBarLabel: "Home",
                tabBarIcon: ({color}) => <Entypo name="book" size={24} color={color} />
            }}
        />
        {/* <Tabs.Screen
            name="calendar"
            options={{
                ...sharedTabStyles,
                title: "Calendar",
                tabBarLabel: "Calendar",
                tabBarIcon: ({color}) => <Entypo name="calendar" size={24} color={color} />
            }}
        /> */}
        <Tabs.Screen
            name='journalEntry'
            options={
                {
                    tabBarButton: CustomJournalEntryButton
                }
            }
            listeners={{
                tabPress: (e) => e.preventDefault()
            }} />
        <Tabs.Screen
            name="settings"
            options={{
                ...sharedTabStyles,
                title: "Settings",
                tabBarLabel: "Settings",
                tabBarIcon: ({color}) => <Entypo name="leaf" size={24} color={color} />
            }}
        />
        </Tabs>)
    }