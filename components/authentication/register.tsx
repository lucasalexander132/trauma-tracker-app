import { AuthContext } from "@/constants/authContext/authContext";
import config from "@/constants/configConstants";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";


interface RegisterCredentials {
  username: string;
  password: string;
}

interface UserResponse {
  user: {
    username: string;
  }
}

export default function Register() {
    const authContext = useContext(AuthContext);
    const [registerCredentials, setRegisterCredentials] = useState<RegisterCredentials>({
        username: "",
        password: ""
    });
    const { mutate: register } = useMutation({
        mutationFn: async () => {
        const response = await fetch(config.api.host + '/auth/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerCredentials)
        });
        const data = await response.json();
        return data;
        },
        onSuccess: (data: UserResponse, variables, onMutateResult, context) => {
            console.log(JSON.stringify({
                data,
                variables,
                onMutateResult,
                context
            }));
            authContext.logIn();
        },
        onError: (error) => {
        console.log(JSON.stringify(error), 'You got an error');
        }
    });
    return (
        <View>
            <Text className="text-5xl font-bold text-white pb-6 pt-4">Register</Text>
            <View className="h-[1px] w-full bg-[--color-paper]" />
            <View className="my-4">
            <TextInput
                placeholder="username"
                className="bg-slate-200 rounded-md px-3 py-2 mb-4"
                onChangeText={(username) => setRegisterCredentials({...registerCredentials, username})}/>
            <TextInput
                placeholder="password"
                secureTextEntry
                className="bg-slate-200 rounded-md px-3 py-2"
                onChangeText={(password) => setRegisterCredentials({...registerCredentials, password})}/>
            </View>
            <Pressable className="rounded-xl bg-[--color-contrasting-button]" onPress={() => register()}>
            <Text className="text-center font-bold my-1 text-white">Register</Text>
            </Pressable>
        </View>)
}