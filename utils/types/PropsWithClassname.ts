import { PropsWithChildren } from "react";
import { TextStyle, ViewStyle } from "react-native";

type PropsWithClassname = PropsWithChildren & { className?: string } & ViewStyle & TextStyle;
export default PropsWithClassname;