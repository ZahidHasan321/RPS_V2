import { View, Text } from '@react-pdf/renderer'
import { tw } from '../styles'
export default function GradesheetFooter() {

  return (
    <View style={tw("flex flex-row text-sm gap-10")}>

      <View style={tw("flex flex-col w-1/3 gap-4")}>
        <View style={tw("flex flex-row")}>
          <Text>Publication Date</Text>
          <View style={tw("border-b grow border-dashed")} />
        </View>
        <View style={tw("flex flex-row")}>
          <Text>Issue Date</Text>
          <View style={tw("border-b grow border-dashed")} />
        </View>
      </View>

      <View style={tw("flex flex-col w-1/3 gap-4")}>
        <View style={tw("flex flex-row")}>
          <Text>Prepared By</Text>
          <View style={tw("border-b grow border-dashed")} />
        </View>
        <View style={tw("flex flex-row")}>
          <Text>Compared By</Text>
          <View style={tw("border-b grow border-dashed")} />
        </View>
      </View>

      <View style={tw("flex flex-col w-1/3 text-center")}>
        <View style={tw("border-b grow border-dashed mb-2")}><Text>{" "}</Text></View>
        <Text>Controller of Examination</Text>
        <Text>University of Chittagong</Text>
      </View>

    </View>
  )
}
