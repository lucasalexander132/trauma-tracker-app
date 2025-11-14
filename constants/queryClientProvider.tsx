
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export default function QCProvider(props: PropsWithChildren) {
    return(<QueryClientProvider client={queryClient}>
        { props.children }
    </QueryClientProvider>)
};