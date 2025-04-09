
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
import { Search, Filter, Download, RefreshCcw, Check, X, Clock, User, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { exportToExcel } from '@/utils/excelExport';
import { useToast } from "@/hooks/use-toast";

type Student = {
  id: string;
  name: string;
  studentId: string;
  status: 'present' | 'absent' | 'late' | '';
  checkInTime: string;
  checkOutTime: string;
  notes: string;
  attendanceRate: number; // Percentage of attendance
  isDeprived: boolean; // Whether the student is deprived from the course due to absences
};

type AttendanceTableProps = {
  className?: string;
  date: Date;
  courseId: string;
  isSessionActive?: boolean;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  className,
  date,
  courseId,
  isSessionActive = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Smith",
      studentId: "ST001",
      status: "present",
      checkInTime: "09:05 AM",
      checkOutTime: "04:30 PM",
      notes: "",
      attendanceRate: 92,
      isDeprived: false
    },
    {
      id: "2",
      name: "Emma Johnson",
      studentId: "ST002",
      status: "present",
      checkInTime: "08:58 AM",
      checkOutTime: "04:30 PM",
      notes: "",
      attendanceRate: 95,
      isDeprived: false
    },
    {
      id: "3",
      name: "Michael Brown",
      studentId: "ST003",
      status: "late",
      checkInTime: "09:30 AM",
      checkOutTime: "04:30 PM",
      notes: "Bus delay",
      attendanceRate: 87,
      isDeprived: false
    },
    {
      id: "4",
      name: "Sophia Williams",
      studentId: "ST004",
      status: "absent",
      checkInTime: "",
      checkOutTime: "",
      notes: "Sick leave",
      attendanceRate: 73,
      isDeprived: true
    },
    {
      id: "5",
      name: "James Davis",
      studentId: "ST005",
      status: "present",
      checkInTime: "08:50 AM",
      checkOutTime: "04:30 PM",
      notes: "",
      attendanceRate: 88,
      isDeprived: false
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
    const columns = [
      { header: 'Student Name', key: 'name', width: 20 },
      { header: 'Student ID', key: 'studentId', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Check In', key: 'checkInTime', width: 15 },
      { header: 'Check Out', key: 'checkOutTime', width: 15 },
      { header: 'Notes', key: 'notes', width: 20 },
      { header: 'Attendance Rate', key: 'attendanceRate', width: 15 },
      { header: 'Deprived', key: 'isDeprived', width: 15 }
    ];
    
    const courseTitle = courseId ? `Course_${courseId}` : 'Attendance';
    const dateStr = date.toISOString().split('T')[0];
    const filename = `${courseTitle}_Attendance_${dateStr}`;
    
    exportToExcel(filteredStudents, columns, filename);
    
    toast({
      title: "Export successful",
      description: "Attendance data has been exported to Excel",
    });
  };

  const updateStudentStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, status } 
          : student
      )
    );
    
    toast({
      title: "Attendance updated",
      description: `Student marked as ${status}`,
    });
  };

  const submitAttendance = () => {
    toast({
      title: "Attendance submitted",
      description: "All student attendance records have been saved",
    });
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
          </div>
        </div>
        
        {isSessionActive && (
          <Button onClick={submitAttendance} className="whitespace-nowrap">
            Submit Attendance
          </Button>
        )}
      </div>

      <div className="rounded-lg overflow-hidden border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Student Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attendance Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              {isSessionActive && <TableHead>Actions</TableHead>}
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
                  <TableCell>
                    <div className={cn(
                      "font-medium",
                      student.attendanceRate >= 90 ? "text-green-500" :
                      student.attendanceRate >= 75 ? "text-amber-500" : 
                      "text-red-500"
                    )}>
                      {student.attendanceRate}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      student.isDeprived 
                        ? "bg-red-500/10 text-red-500 border-red-200" 
                        : "bg-green-500/10 text-green-500 border-green-200"
                    }`}>
                      {student.isDeprived ? "Deprived" : "Approved"}
                    </div>
                  </TableCell>
                  <TableCell>{student.notes || "-"}</TableCell>
                  {isSessionActive && (
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant={student.status === 'present' ? 'default' : 'outline'}
                          className="h-7 px-2 text-xs"
                          onClick={() => updateStudentStatus(student.id, 'present')}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant={student.status === 'absent' ? 'default' : 'outline'}
                          className="h-7 px-2 text-xs"
                          onClick={() => updateStudentStatus(student.id, 'absent')}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Absent
                        </Button>
                        <Button
                          size="sm"
                          variant={student.status === 'late' ? 'default' : 'outline'}
                          className="h-7 px-2 text-xs"
                          onClick={() => updateStudentStatus(student.id, 'late')}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Late
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isSessionActive ? 7 : 6} className="text-center py-4 text-foreground/70">
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
