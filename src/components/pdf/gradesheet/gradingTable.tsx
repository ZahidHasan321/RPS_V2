import { Text } from "@react-pdf/renderer";
import { Cell, Row, Table } from "../tableComponents";
import { tw } from "../styles";
import { cn } from "@/lib/utils";

const tableData = [
  { MO: "80% to less than 100%", LG: "A+", GP: 4.0 },
  { MO: "75% to less than <80%", LG: "A", GP: 3.75 },
  { MO: "70% to less than <75%", LG: "A-", GP: 3.5 },
  { MO: "65% to less than <70%", LG: "B+", GP: 3.25 },
  { MO: "60% to less than <65%", LG: "B", GP: 3.0 },
  { MO: "55% to less than <60%", LG: "B-", GP: 2.75 },
  { MO: "50% to less than 55%", LG: "C+", GP: 2.5 },
  { MO: "45% to less than <50%", LG: "C", GP: 2.25 },
  { MO: "40% to less than <45%", LG: "D", GP: 2.0 },
  { MO: "Less than 40%", LG: "F", GP: 0.0 },
  { MO: "Incomplete/Absent", LG: "X", GP: "X" },
];
export default function GradingTable({ classname }: { classname?: string }) {
  return (
    <Table className={cn(classname)}>
      <Row className="w-full">
        <Cell className="w-3/6">
          <Text style={tw("font-bold")}>Numerical Range</Text>
        </Cell>
        <Cell className="w-2/6">
          <Text style={tw("font-bold")}>Letter Grade</Text>
        </Cell>
        <Cell className="w-1/6">
          <Text style={tw("font-bold text-xs")}>Grade Point</Text>
        </Cell>
      </Row>
      {tableData.map(({ MO, LG, GP }, idx) => (
        <Row className="w-full" key={idx}>
          <Cell className="w-3/6">
            <Text>{MO}</Text>
          </Cell>
          <Cell className="w-2/6">
            <Text>{LG}</Text>
          </Cell>
          <Cell className="w-1/6">
            <Text>{typeof GP === "number" ? GP.toFixed(2) : GP}</Text>
          </Cell>
        </Row>
      ))}
    </Table>
  );
}
