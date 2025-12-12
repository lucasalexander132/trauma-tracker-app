import config from "@/constants/configConstants";
import { IEntry } from "@/constants/types/Entries";
import { SymptomSection } from "@/zustand/journalStore";
import { InfiniteData, useInfiniteQuery, useQuery, useSuspenseQuery } from "@tanstack/react-query";

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

export const useJournalEntrySections = () => useSuspenseQuery({
    queryKey: ['sections'],
    queryFn: async () => {
        const response = await fetch(config.api.host + '/user/sections');
        const sections: SymptomSection[] = await response.json();
        return sections;
    }
});

export const useEntryModuleData = (entryId: string, enabled: boolean = true) => useQuery({
    queryKey: ['entries', entryId, 'modules'],
    queryFn: async () => {
        const response = await fetch(`${config.api.host}/user/modules/${entryId}`);
        const data = await response.json();
        return data;
    },
    enabled
});