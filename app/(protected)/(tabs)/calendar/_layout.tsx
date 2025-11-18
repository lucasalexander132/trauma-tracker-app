import { themeSemanticColors, themeVars } from "@/assets/styles/theme";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="calendar"
                options={{
                    title: "Calendar",
                    headerStyle: {
                        backgroundColor: themeSemanticColors['--color-primary-500']
                    },
                    headerBackButtonDisplayMode: 'minimal',
                    headerTintColor: themeVars['--color-paper']
                }} />
        </Stack>
    );
}