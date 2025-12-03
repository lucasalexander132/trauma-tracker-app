import { AuthState } from "@/constants/authContext/authContext";
import config from "@/constants/configConstants";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface UserResponse {
    user: {
        username: string;
    }
}

const auth = {
    async signIn(loginCredentials: LoginCredentials) {
        const response = await fetch(config.api.host + '/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        });
        const data = await response.json();
        return data;
    },
    async signOut() {
        const response = await fetch(
            config.api.host + '/auth/signout',
            { method: 'POST' }
        );
        const data = await response.json();
        return data;
    },
    async getMe() {
        const response = await fetch(config.api.host + '/auth/me');
        const data = await response.json();
        return data;
    }
}

export const useGetMe = () =>
    useQuery({
        queryKey: ['currentUser'],
        queryFn: () => auth.getMe()
    });

export const useSignIn = (queryClient: QueryClient, authContext: AuthState, loginCredentials: LoginCredentials) => useMutation({
    mutationFn: () => auth.signIn(loginCredentials),
    onSuccess: (data: UserResponse, variables, onMutateResult, context) => {
        if (!isUndefined(data.user.username)) {
            queryClient.invalidateQueries({
                queryKey: ['currentUser']
            });
            authContext.logIn();
        }
    },
    onError: (error) => {
        console.log(JSON.stringify(error), 'You got an error');
    }
});

export const useSignOut = (queryClient: QueryClient, authContext: AuthState) => useMutation({
    mutationFn: async () => auth.signOut(),
    onSuccess: async (data) => {
        queryClient.invalidateQueries({
            queryKey: ['currentUser']
        });
        authContext.logOut();
    }
});

export default auth;