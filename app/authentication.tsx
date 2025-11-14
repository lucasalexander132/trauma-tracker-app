import theme from "@/assets/styles/theme";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Login from "../components/authentication/login";
import Register from "../components/authentication/register";

enum ViewState {
  LOGIN,
  REGISTER
}

export default function Authentication() {
  const [view, setView] = useState<ViewState>(ViewState.LOGIN);

  return (
    <View style={theme} className="flex-1 bg-[--color-paper] w-full justify-center">
      <View className="mx-16">
        <View className="rounded-3xl bg-[--color-dark-card] pt-4 pb-6 px-6">
          {
            view === ViewState.LOGIN && <Login />
          }
          {
            view === ViewState.REGISTER && <Register />
          }
        </View>
        {
          view === ViewState.LOGIN && <Pressable onPress={() => setView(ViewState.REGISTER)}>
            <Text className="text-center font-bold text-md text-[--color-contrasting-button] mt-10">Register</Text>
          </Pressable>
        }
        {
          view === ViewState.REGISTER && <Pressable onPress={() => setView(ViewState.LOGIN)}>
            <Text className="text-center font-bold text-md text-[--color-contrasting-button] mt-10">Login</Text>
          </Pressable>
        }
      </View>
    </View>
  );
}