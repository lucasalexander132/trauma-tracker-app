import theme from "@/assets/styles/theme";
import PropsWithClassname from "@/utils/types/PropsWithClassname";
import classNames from "classnames";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeView(props: PropsWithClassname) {
    return <SafeAreaView
        edges={{top: 'off'}}
        style={theme}
        className={classNames(props.className, "flex-1 bg-[--color-paper] w-full")}>{
            props.children
        }</SafeAreaView>
}