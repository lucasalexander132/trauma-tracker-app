import theme from "@/assets/styles/theme";
import { Text, View } from "react-native";

export default function Calendar() {
    return (
      <View style={theme} className="flex-1 bg-[--color-paper] w-full">
        <View className="my-6 mx-8">
          <Text className="text-3xl font-bold">1. User can view all their journal entries for a day by tapping on a date.</Text>
        </View>
      </View>)
}