import { View, Text } from "@react-pdf/renderer";
import { tw } from "../styles";

export default function SummationFooter() {
  return (
    <View style={tw("flex flex-row w-full text-sm")}>
      <View style={tw("w-1/2 gap-4")}>
        <Text>Member Present: </Text>
        <Text>1. </Text>
        <Text>2. </Text>
        <Text>3. </Text>
      </View>

      <View style={tw("w-1/2 flex flex-col justify-end items-end")}>
        <View style={tw("flex flex-col items-center")}>
          <Text>Chairman</Text>
          <Text>Exam Committee</Text>
        </View>
      </View>
    </View>
  );
}
