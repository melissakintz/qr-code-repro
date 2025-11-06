import { View, Text, Button } from "react-native";
import { useScanner } from "../hook/use-scanner";

export default function Home() {
  const { openScanner } = useScanner();
  return (
    <View>
      <Text>QR Code reproduction</Text>
      <Button onPress={openScanner} title={"Open scanner"} />
    </View>
  );
}
