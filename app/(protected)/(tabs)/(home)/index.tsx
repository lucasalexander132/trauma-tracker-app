import { InfiniteEntries } from "@/components/journalComponents/entries/infiniteEntries";
import SafeView from "@/components/safeView";

export default function Home() {
    return (
		<SafeView>
            <InfiniteEntries />
		</SafeView>)
}

// const JournalEntryLink = () => {
//     const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;
//     return (
//         <View
//             style={{
//                 bottom: bottomHeight
//             }}
//             className={"h-18 justify-center rounded-tr-full rounded-br-full bg-[--color-paper-light] border-[--color-primary-200] border-hairline absolute left-0 w-[90px] shadow-lg"}>
//             <Link
//                 className="m-1"
//                 href={'/journalEntry'}
//                 asChild
//                 >
//                 <Pressable
//                     className={"flex-row h-16 justify-center items-center rounded-full bg-[--color-comp-primary] border-[--color-primary-200] border-hairline p-1 w-[80px] shadow-sm active:bg-[--color-comp-primary-dark] transition-all duration-200"}>
//                     <AppText className="font-bold color-[--color-paper] text-2xl">+</AppText>
//                     <Entypo name="feather" size={28} color={themeVars['--color-paper']} />
//                 </Pressable>
//             </Link>
//         </View>
//     )
// }