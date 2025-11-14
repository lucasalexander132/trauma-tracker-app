import config from "@/constants/configConstants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Redirect, Stack } from "expo-router";


export default function ProtectedLayout() {
  const { data } = useSuspenseQuery({
      queryKey: ['currentUser'],
      queryFn: async () => {
        const response = await fetch(config.api.host + '/auth/me');
        const data = await response.json();
        return data;
      }
  });

  if (!!!data.username) {
    return <Redirect href={'/authentication'} />
  };
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}