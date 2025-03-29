
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Student = {
  id: string;
  name: string;
  studentId: string;
  status: 'present' | 'absent' | 'late' | '';
  checkInTime: string;
  checkOutTime: string;
  notes: string;
};

type AttendanceTableProps = {
  className?: string;
  date: Date;
  courseId: string;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  className,
  date,
  courseId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  // Mock data - in a real application, this would be fetched based on courseId and date
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Smith",
      studentId: "ST001",
      status: "present",
      checkInTime: "09:05 AM",
      checkOutTime: "04:30 PM",
      notes: "",
    },
    {
      id: "2",
      name: "Emma Johnson",
      studentId: "ST002",
      status: "present",
      checkInTime: "08:58 AM",
      checkOutTime: "04:30 PM",
      notes: "",
    },
    {
      id: "3",
      name: "Michael Brown",
      studentId: "ST003",
      status: "late",
      checkInTime: "09:30 AM",
      checkOutTime: "04:30 PM",
      notes: "Bus delay",
    },
    {
      id: "4",
      name: "Sophia Williams",
      studentId: "ST004",
      status: "absent",
      checkInTime: "",
      checkOutTime: "",
      notes: "Sick leave",
    },
    {
      id: "5",
      name: "James Davis",
      studentId: "ST005",
      status: "present",
      checkInTime: "08:50 AM",
      checkOutTime: "04:30 PM",
      notes: "",
    },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-500/10 text-green-500 border-green-200';
      case 'absent':
        return 'bg-red-500/10 text-red-500 border-red-200';
      case 'late':
        return 'bg-amber-500/10 text-amber-500 border-amber-200';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-200';
    }
  };

  const handleExport = () => {
    alert("Exporting attendance data...");
  };

  const handleRefresh = () => {
    alert("Refreshing attendance data from face recognition system...");
  };

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-end">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative w-full md:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <Input
              placeholder="Search students..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" title="Filter">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Export" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Refresh" onClick={handleRefresh}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Student Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <span>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(student.status)}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1) || "Unmarked"}
                    </div>
                  </TableCell>
                  <TableCell>{student.checkInTime || "-"}</TableCell>
                  <TableCell>{student.checkOutTime || "-"}</TableCell>
                  <TableCell>{student.notes || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-foreground/70">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-foreground/60">
        Showing {filteredStudents.length} of {students.length} students
      </div>
    </div>
  );
};

export default AttendanceTable;
