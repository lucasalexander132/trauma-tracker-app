import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type SafeFooterProps = {
    multiplier?: number;
}

export default function SafeFooter({ multiplier = 1 }: SafeFooterProps) {
    const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;
    return <View style={{paddingBottom: bottomHeight * multiplier}} />
}