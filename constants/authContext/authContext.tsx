import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { createContext, PropsWithChildren, useState } from 'react';
import config from '../configConstants';

type AuthState = {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    logIn: () => {},
    logOut: () => {},
    isLoading: true
});

const AuthProvider = ({children}: PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const logIn = () => {
        setIsLoggedIn(true);
        router.replace('/');
    }
    const logOut = () => {
        setIsLoggedIn(false);
        router.replace('authentication');
    }
    const { isLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await fetch(config.api.host + '/auth/me');
            const data = await response.json();
            if (!isLoggedIn) {
                logIn();
            }
            return data;
        }
    });
    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, isLoading }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;