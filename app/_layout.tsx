import QCProvider from '@/constants/queryClientProvider';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../constants/i18n';
import "../global.css";

export default function RootLayout() {
  return <QCProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="authentication" options={{ headerShown: false }} />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </QCProvider>;
}
