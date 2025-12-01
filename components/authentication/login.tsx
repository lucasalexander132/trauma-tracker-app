import { useSignIn } from "@/api/auth";
import { AuthContext } from "@/constants/authContext/authContext";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface LoginCredentials {
    username: string;
    password: string;
}

interface UserResponse {
    user: {
        username: string;
    }
}

export default function Index() {
    const authContext = useContext(AuthContext);
    const queryClient = useQueryClient();
    
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        username: "",
        password: ""
    });

    const { mutate: signIn } = useSignIn(queryClient, authContext, loginCredentials);

    return (
        <View>
            <Text className="text-5xl font-bold text-white pb-6 pt-4">Login</Text>
            <View className="h-[1px] w-full bg-[--color-paper]" />
            <View className="my-4">
            <TextInput
                placeholder="username"
                className="bg-slate-200 rounded-md px-3 py-2 mb-4"
                onChangeText={(username) => setLoginCredentials({...loginCredentials, username})}/>
            <TextInput
                placeholder="password"
                secureTextEntry
                className="bg-slate-200 rounded-md px-3 py-2"
                onChangeText={(password) => setLoginCredentials({...loginCredentials, password})}/>
            </View>
            <Pressable className="rounded-xl bg-[--color-contrasting-button]" onPress={() => signIn()}>
            <Text className="text-center font-bold my-1 text-white">Login</Text>
            </Pressable>
        </View>
    );
}