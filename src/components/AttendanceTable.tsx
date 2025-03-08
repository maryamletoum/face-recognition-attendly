
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

  const handleStatusChange = (studentId: string, newStatus: 'present' | 'absent' | 'late') => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            status: newStatus,
            checkInTime: newStatus === 'absent' ? "" : student.checkInTime || "09:00 AM"
          } 
        : student
    ));
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
        <div className="w-full md:w-auto flex-1 space-y-1">
          <h2 className="text-xl font-semibold">Attendance Record</h2>
          <p className="text-sm text-foreground/70">
            {date.toLocaleDateString("en-US", { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
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
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(student.status)}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1) || "Unmarked"}
                    </div>
                  </TableCell>
                  <TableCell>{student.checkInTime || "-"}</TableCell>
                  <TableCell>{student.checkOutTime || "-"}</TableCell>
                  <TableCell>{student.notes || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant={student.status === "present" ? "default" : "outline"}
                        className="h-7 px-2 text-xs"
                        onClick={() => handleStatusChange(student.id, "present")}
                      >
                        Present
                      </Button>
                      <Button 
                        size="sm" 
                        variant={student.status === "late" ? "default" : "outline"}
                        className="h-7 px-2 text-xs"
                        onClick={() => handleStatusChange(student.id, "late")}
                      >
                        Late
                      </Button>
                      <Button 
                        size="sm" 
                        variant={student.status === "absent" ? "default" : "outline"}
                        className="h-7 px-2 text-xs"
                        onClick={() => handleStatusChange(student.id, "absent")}
                      >
                        Absent
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-foreground/70">
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
