import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="calendar" options={{ title: "Calendar" }} />
        </Stack>
    );
}