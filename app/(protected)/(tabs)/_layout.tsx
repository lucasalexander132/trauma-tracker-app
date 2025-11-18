import { themeSemanticColors } from '@/assets/styles/theme';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (<Tabs screenOptions={{
            tabBarStyle: {
                borderRadius: 20,
                position: 'absolute',
                marginBottom: 30,
                marginHorizontal: 20,
                backgroundColor: 'white',
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
                title: "Home",
                headerShown: false,
                tabBarLabel: "Home",
                tabBarActiveTintColor: themeSemanticColors['--color-primary-500'],
                tabBarIcon: ({color}) => <Entypo name="book" size={24} color={color} />
            }}
        />
        <Tabs.Screen
            name="calendar"
            options={{
                title: "Calendar",
                headerShown: false,
                tabBarLabel: "Calendar",
                tabBarActiveTintColor: themeSemanticColors['--color-primary-500'],
                tabBarIcon: ({color}) => <Entypo name="calendar" size={24} color={color} />
            }}
        />
        <Tabs.Screen
            name="settings"
            options={{
            title: "Settings",
            headerShown: false,
            tabBarLabel: "Settings",
            tabBarActiveTintColor: themeSemanticColors['--color-primary-500'],
            tabBarIcon: ({color}) => <Entypo name="leaf" size={24} color={color} />
            }}
        />
        </Tabs>)
    }