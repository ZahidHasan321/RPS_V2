import { createFileRoute } from "@tanstack/react-router";
import { PDFViewer, Document, Page, View, Text } from "@react-pdf/renderer";
import { tw } from "@/components/pdf/styles";
export const Route = createFileRoute(
  "/_protected/exam/pdf/gradesheet/$exam_id/$course_id",
)({
  component: GradesheetPDF,
});

function GradesheetPDF() {
  return (
    <PDFViewer style={tw("h-screen w-screen")}>
      <Document>
        <Page size={"A4"}>
          <View>
            <Text>Hello World</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
