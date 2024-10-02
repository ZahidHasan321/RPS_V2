import { Text } from "@react-pdf/renderer";
import { tw } from "../../styles";
import { Cell, Row, Table } from "../tableComponents";

const tableData = [
  { MO: "80% to 100%", LG: "A+", GP: 4.0 },
  { MO: "75% to <80%", LG: "A", GP: 3.75 },
  { MO: "70% to <75%", LG: "A-", GP: 3.5 },
  { MO: "65% to <70%", LG: "B+", GP: 3.25 },
  { MO: "60% to <65%", LG: "B", GP: 3.0 },
  { MO: "55% to <60%", LG: "B-", GP: 2.75 },
  { MO: "50% to 55%", LG: "C+", GP: 2.5 },
  { MO: "45% to <50%", LG: "C", GP: 2.25 },
  { MO: "40% to <45%", LG: "D", GP: 2.0 },
  { MO: "0% to 40%", LG: "F", GP: 0.0 },
];
export default function GradingSystems() {
  return (
    <Table className="w-[15%]">
      <Row>
        <Cell className="w-full">
          <Text style={tw("font-bold")}>GRADING SYSTEM</Text>
        </Cell>
      </Row>
      <Row className="w-full">
        <Cell className="w-3/5">
          <Text style={tw("font-bold")}>MO</Text>
        </Cell>
        <Cell className="w-1/5">
          <Text style={tw("font-bold")}>LG</Text>
        </Cell>
        <Cell className="w-1/5">
          <Text style={tw("font-bold")}>GP</Text>
        </Cell>
      </Row>
      {tableData.map(({ MO, LG, GP }, idx) => (
        <Row className="w-full" key={idx}>
          <Cell className="w-3/5">
            <Text>{MO}</Text>
          </Cell>
          <Cell className="w-1/5">
            <Text>{LG}</Text>
          </Cell>
          <Cell className="w-1/5">
            <Text>{GP.toFixed(2)}</Text>
          </Cell>
        </Row>
      ))}
    </Table>
  );
}
