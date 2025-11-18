import { themeSemanticColors, themeVars } from "@/assets/styles/theme";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Home",
                    headerStyle: {
                        backgroundColor: themeSemanticColors['--color-primary-500']
                    },
                    headerTintColor: themeVars['--color-paper']
                }} />
            <Stack.Screen
                name="journalEntry"
                options={{
                    title: "Journal",
                    headerStyle: {
                        backgroundColor: themeSemanticColors['--color-primary-500']
                    },
                    headerBackButtonDisplayMode: 'minimal',
                    headerTintColor: themeVars['--color-paper']
                }} />
        </Stack>
    );
}