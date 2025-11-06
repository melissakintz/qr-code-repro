import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 30 }}>
      <Slot />
    </SafeAreaView>
  );
}
