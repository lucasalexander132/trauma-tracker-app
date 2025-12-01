import config from "@/constants/configConstants";
import { queryOptions, useQuery } from "@tanstack/react-query";

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

export const getMeQueryOptions = queryOptions({
        queryKey: ['currentUser'],
        queryFn: () => auth.getMe()
    });

export default auth;