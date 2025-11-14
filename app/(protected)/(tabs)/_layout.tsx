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
        paddingBottom: 0
      }
    }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarLabel: "Home",
          tabBarActiveTintColor: "#386641",
          tabBarIcon: ({color}) => <Entypo name="book" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarLabel: "Calendar",
          tabBarActiveTintColor: "#6A994E",
          tabBarIcon: ({color}) => <Entypo name="calendar" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarActiveTintColor: "#A7C957",
          tabBarIcon: ({color}) => <Entypo name="leaf" size={24} color={color} />
        }}
      />
    </Tabs>)
}