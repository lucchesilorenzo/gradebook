import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

import { Assignment } from "@/types";

type AssignmentToPDF = {
  assignment: Assignment;
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    borderBottom: "1px solid black",
    padding: 5,
    textAlign: "center",
  },
  header: {
    backgroundColor: "#CCCCCC",
    fontWeight: "bold",
  },
});

export default function AssignmentToPDF({ assignment }: AssignmentToPDF) {
  return (
    <Document language="en" title={assignment.title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleSection}>
          <Text>
            Assignment: {assignment.title} -{" "}
            {format(assignment.deadline, "dd/MM/yyyy")}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.header]}>
            <Text style={styles.tableCol}>Name</Text>
            <Text style={styles.tableCol}>Grade</Text>
            <Text style={styles.tableCol}>Notes</Text>
          </View>

          {assignment.students.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>
                {row.first_name} {row.last_name}
              </Text>
              <Text style={styles.tableCol}>{row.pivot.grade}</Text>
              <Text style={styles.tableCol}>{row.pivot.notes}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
