
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
import { Search, Filter, Download, RefreshCcw, Check, X, Clock, User, CalendarDays, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { exportToExcel } from '@/utils/excelExport';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";

type ExcuseType = 'medical' | 'family' | 'academic' | 'other' | '';

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
  excuseType?: ExcuseType;
  excuseVerified?: boolean;
  absenceHistory?: {
    date: Date;
    status: 'present' | 'absent' | 'late';
    excused: boolean;
    excuseType?: ExcuseType;
    notes?: string;
  }[];
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
  const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'absent' | 'late' | 'excused'>('all');
  const [showExcuseDialog, setShowExcuseDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [excuseType, setExcuseType] = useState<ExcuseType>('');
  const [excuseNote, setExcuseNote] = useState('');
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
      isDeprived: false,
      absenceHistory: [
        { date: new Date(2023, 8, 10), status: 'present', excused: false },
        { date: new Date(2023, 8, 15), status: 'present', excused: false },
        { date: new Date(2023, 8, 22), status: 'absent', excused: true, excuseType: 'medical', notes: 'Flu' }
      ]
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
      isDeprived: false,
      absenceHistory: [
        { date: new Date(2023, 8, 10), status: 'present', excused: false },
        { date: new Date(2023, 8, 15), status: 'present', excused: false },
        { date: new Date(2023, 8, 22), status: 'present', excused: false }
      ]
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
      isDeprived: false,
      excuseType: "other",
      excuseVerified: true,
      absenceHistory: [
        { date: new Date(2023, 8, 10), status: 'late', excused: true, excuseType: 'other', notes: 'Traffic' },
        { date: new Date(2023, 8, 15), status: 'present', excused: false },
        { date: new Date(2023, 8, 22), status: 'present', excused: false }
      ]
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
      isDeprived: true,
      excuseType: "medical",
      excuseVerified: true,
      absenceHistory: [
        { date: new Date(2023, 8, 10), status: 'absent', excused: true, excuseType: 'medical', notes: 'Doctor appointment' },
        { date: new Date(2023, 8, 15), status: 'absent', excused: false },
        { date: new Date(2023, 8, 22), status: 'absent', excused: false }
      ]
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
      isDeprived: false,
      absenceHistory: [
        { date: new Date(2023, 8, 10), status: 'present', excused: false },
        { date: new Date(2023, 8, 15), status: 'absent', excused: false },
        { date: new Date(2023, 8, 22), status: 'present', excused: false }
      ]
    },
  ]);

  const filteredStudents = students.filter(student => {
    // Text search filter
    const textMatch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    let statusMatch = true;
    if (statusFilter !== 'all') {
      if (statusFilter === 'excused') {
        statusMatch = (student.status === 'absent' || student.status === 'late') && !!student.excuseType;
      } else {
        statusMatch = student.status === statusFilter;
      }
    }
    
    return textMatch && statusMatch;
  });

  const getStatusClass = (status: string, excused?: boolean) => {
    if (excused) {
      return 'bg-blue-500/10 text-blue-500 border-blue-200';
    }
    
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
      { header: 'Excuse Type', key: 'excuseType', width: 15 },
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
    
    // If marked as absent, send notification email (simulated)
    if (status === 'absent') {
      const student = students.find(s => s.id === studentId);
      if (student) {
        toast({
          title: "Absence notification sent",
          description: `Email notification sent to ${student.name}`,
        });
      }
    }
    
    toast({
      title: "Attendance updated",
      description: `Student marked as ${status}`,
    });
  };

  const openExcuseForm = (student: Student) => {
    setCurrentStudent(student);
    setExcuseType(student.excuseType || '');
    setExcuseNote(student.notes || '');
    setShowExcuseDialog(true);
  };

  const submitExcuse = () => {
    if (!currentStudent) return;
    
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === currentStudent.id 
          ? { 
              ...student, 
              excuseType, 
              notes: excuseNote,
              excuseVerified: false 
            } 
          : student
      )
    );
    
    setShowExcuseDialog(false);
    
    toast({
      title: "Excuse submitted",
      description: "The excuse has been recorded and is pending verification",
    });
  };

  const verifyExcuse = (studentId: string, verified: boolean) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, excuseVerified: verified } 
          : student
      )
    );
    
    toast({
      title: verified ? "Excuse accepted" : "Excuse rejected",
      description: verified 
        ? "The student's absence has been excused" 
        : "The excuse was not approved",
    });
  };

  const submitAttendance = () => {
    // Check for deprivation threshold (example: 15%)
    const deprivationThreshold = 15; // This would come from admin settings
    
    // Update deprivation status based on attendance rates
    setStudents(prevStudents => 
      prevStudents.map(student => {
        const isNowDeprived = student.attendanceRate < (100 - deprivationThreshold);
        const statusChanged = student.isDeprived !== isNowDeprived;
        
        // If student is newly deprived, send notification
        if (isNowDeprived && statusChanged) {
          toast({
            title: "Deprivation Warning",
            description: `${student.name} has been marked as deprived. Teacher notification sent.`,
          });
        }
        
        return { 
          ...student, 
          isDeprived: isNowDeprived 
        };
      })
    );
    
    toast({
      title: "Attendance submitted",
      description: "All student attendance records have been saved",
    });
  };

  const viewStudentHistory = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    // In a real app this would open a modal with the student's attendance history
    toast({
      title: "Attendance History",
      description: `Viewing history for ${student.name}`,
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
            <select 
              className="px-3 py-2 rounded-md border border-border bg-background"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="excused">Excused</option>
            </select>
            
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
              <TableHead>Excuse</TableHead>
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
                    <div 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(student.status, student.excuseType && student.excuseVerified)}`}
                      onClick={() => viewStudentHistory(student.id)}
                      style={{ cursor: 'pointer' }}
                      title="Click to view attendance history"
                    >
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1) || "Unmarked"}
                      {student.excuseType && student.excuseVerified && " (Excused)"}
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
                  <TableCell>
                    {student.excuseType ? (
                      <div className="flex items-center">
                        <span className="text-sm mr-2 capitalize">{student.excuseType}</span>
                        {!student.excuseVerified ? (
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0 text-green-500" 
                              onClick={() => verifyExcuse(student.id, true)}
                              title="Approve excuse"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 w-7 p-0 text-red-500" 
                              onClick={() => verifyExcuse(student.id, false)}
                              title="Reject excuse"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-green-500">✓ Verified</span>
                        )}
                      </div>
                    ) : (
                      (student.status === 'absent' || student.status === 'late') && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 px-2 text-xs"
                          onClick={() => openExcuseForm(student)}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Add Excuse
                        </Button>
                      )
                    )}
                  </TableCell>
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
      
      <Dialog open={showExcuseDialog} onOpenChange={setShowExcuseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Absence Excuse</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Student</label>
              <Input value={currentStudent?.name || ''} disabled />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input value={format(date, "MMMM d, yyyy")} disabled />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Excuse Type</label>
              <select 
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
                value={excuseType}
                onChange={(e) => setExcuseType(e.target.value as ExcuseType)}
              >
                <option value="">Select excuse type</option>
                <option value="medical">Medical</option>
                <option value="family">Family</option>
                <option value="academic">Academic</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <textarea 
                className="w-full px-3 py-2 min-h-[100px] rounded-md border border-border bg-background"
                value={excuseNote}
                onChange={(e) => setExcuseNote(e.target.value)}
                placeholder="Enter excuse details..."
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowExcuseDialog(false)}>
                Cancel
              </Button>
              <Button onClick={submitExcuse}>
                Submit Excuse
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendanceTable;
