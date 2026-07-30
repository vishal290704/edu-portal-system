"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function ResultsTable({
  students = [],
  onView,
}) {
  if (students.length === 0) {
    return (
      <div className="rounded-lg border bg-background p-8 text-center text-muted-foreground">
        No results found for the selected filters.
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Rank</TableHead>

            <TableHead>Roll No</TableHead>

            <TableHead>Admission No</TableHead>

            <TableHead>Student</TableHead>

            <TableHead className="text-center">
              Marks
            </TableHead>

            <TableHead className="text-center">
              %
            </TableHead>

            <TableHead className="text-center">
              Grade
            </TableHead>

            <TableHead className="text-center">
              Result
            </TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="text-center">
                {student.rank}
              </TableCell>

              <TableCell>
                {student.rollNo || "-"}
              </TableCell>

              <TableCell>
                {student.admissionNo || "-"}
              </TableCell>

              <TableCell className="font-medium">
                {student.fullName}
              </TableCell>

              <TableCell className="text-center">
                {student.totalObtained} /{" "}
                {student.totalMaximum}
              </TableCell>

              <TableCell className="text-center">
                {student.percentage}%
              </TableCell>

              <TableCell className="text-center">
                {student.grade}
              </TableCell>

              <TableCell
                className={`text-center font-semibold ${
                  student.result === "PASS"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {student.result}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onView?.(student)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}