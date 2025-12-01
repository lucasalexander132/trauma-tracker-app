import config from "@/constants/configConstants";
import { IEntry } from "@/constants/types/Entries";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export type TInfiniteEntries = {
    responseEntries: IEntry[];
    nextCursor: string;
};

export const useInfiniteEntries = () => useInfiniteQuery<any, Error, InfiniteData<TInfiniteEntries, unknown>, string[], any>({
        queryKey: ['entries', 'infinite'],
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams();
            if (pageParam) params.append('cursor', pageParam);
            params.append('limit', '10');
            const response = await fetch(`${config.api.host}/user/entries/?${params.toString()}`);
            const data = await response.json();
            return data;
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor;
        },
    });