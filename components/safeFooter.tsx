import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeFooter() {
    const bottomHeight = useSafeAreaInsets().bottom + useBottomTabBarHeight() + 5;
    return <View style={{paddingBottom: bottomHeight}} />
}