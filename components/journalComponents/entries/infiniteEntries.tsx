import { useInfiniteEntries } from "@/api/user";
import SafeFooter from "@/components/safeFooter";
import AppText from "@/components/text";
import { IEntry } from "@/constants/types/Entries";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { EntryCard } from "./entryCard";


export const InfiniteEntries = () => {
    const [allEntries, setAllEntries] = useState<IEntry[]>([]);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteEntries();

    useEffect(() => {
        if (data && data.pages) {
            setAllEntries(data.pages.flatMap((page) => page.responseEntries));
        }
    }, [data?.pages]);

    if (status === 'pending') return <AppText>Retrieving your entries...</AppText>;

    const handleOnEndReached = () => {
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
    }

    return (
        <FlashList
            ListHeaderComponent={() => <AppText
                style={{
                    fontFamily: 'Typographica'
                }}
                className="text-4xl mb-4 text-[--color-text]">Entries</AppText>}
            className="px-4 pt-4"
            showsVerticalScrollIndicator={false}
            onEndReached={handleOnEndReached}
            onEndReachedThreshold={0.5}
            renderItem={({item: entry}) => <EntryCard key={`${entry.id}-entries-overview`} entry={entry}/>}
            data={allEntries}
            ListFooterComponent={() => <SafeFooter />}/>
    )
}