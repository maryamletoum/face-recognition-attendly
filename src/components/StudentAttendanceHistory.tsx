import React, { useState } from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import GlassCard from './ui/GlassCard';
import { Calendar, Clock, FileText, Book, History, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AttendanceRecord = {
  date: Date;
  status: 'present' | 'absent' | 'late';
  excused: boolean;
  excuseType?: 'medical' | 'family' | 'academic' | 'other' | '';
  notes?: string;
  courseId?: string;
  courseName?: string;
};

type CourseAttendance = {
  courseId: string;
  courseName: string;
  attendanceRate: number;
  totalSessions: number;
  attended: number;
  absences: number;
  lateArrivals: number;
  excusedAbsences: number;
};

type StudentAttendanceHistoryProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  studentId: string;
  attendanceRecords: AttendanceRecord[];
  overallAttendance: number;
  courseAttendance?: CourseAttendance[];
  selectedCourseId?: string;
};

const StudentAttendanceHistory: React.FC<StudentAttendanceHistoryProps> = ({
  isOpen,
  onOpenChange,
  studentName,
  studentId,
  attendanceRecords,
  overallAttendance,
  courseAttendance = [],
  selectedCourseId
}) => {
  const [activeTab, setActiveTab] = useState(selectedCourseId ? "course" : "all");
  const [searchQuery, setSearchQuery] = useState('');

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

  const countByStatus = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    excused: attendanceRecords.filter(r => r.excused).length,
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const courseMatch = activeTab === "course" && selectedCourseId 
      ? record.courseId === selectedCourseId
      : true;
      
    const searchMatch = searchQuery 
      ? (record.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         record.excuseType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         record.notes?.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
      
    return courseMatch && searchMatch;
  });

  const absentRecords = {
    withExcuse: filteredRecords.filter(r => r.status === 'absent' && r.excused),
    withoutExcuse: filteredRecords.filter(r => r.status === 'absent' && !r.excused)
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Attendance History</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">{studentName}</h3>
              <p className="text-foreground/70 text-sm">ID: {studentId}</p>
            </div>
            <div className="mt-2 sm:mt-0 sm:text-right">
              <div className={cn(
                "text-xl font-bold",
                overallAttendance >= 90 ? "text-green-500" :
                overallAttendance >= 75 ? "text-amber-500" : 
                "text-red-500"
              )}>
                {overallAttendance}%
              </div>
              <p className="text-foreground/70 text-sm">Overall Attendance</p>
            </div>
          </div>
          
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
            <Input
              placeholder="Search by student name, course, excuse type, or notes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                All History
              </TabsTrigger>
              <TabsTrigger value="course" className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                By Course
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <GlassCard className="py-3 text-center">
                  <div className="text-green-500 font-bold text-xl">{countByStatus.present}</div>
                  <div className="text-foreground/70 text-sm">Present</div>
                </GlassCard>
                <GlassCard className="py-3 text-center">
                  <div className="text-red-500 font-bold text-xl">{countByStatus.absent}</div>
                  <div className="text-foreground/70 text-sm">Absent</div>
                </GlassCard>
                <GlassCard className="py-3 text-center">
                  <div className="text-amber-500 font-bold text-xl">{countByStatus.late}</div>
                  <div className="text-foreground/70 text-sm">Late</div>
                </GlassCard>
                <GlassCard className="py-3 text-center">
                  <div className="text-blue-500 font-bold text-xl">{countByStatus.excused}</div>
                  <div className="text-foreground/70 text-sm">Excused</div>
                </GlassCard>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Present & Late Records</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords
                      .filter(r => r.status === 'present' || r.status === 'late')
                      .map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                {studentName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{studentName}</div>
                                <div className="text-xs text-foreground/70">{studentId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-primary" />
                              {format(record.date, "MMM d, yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Book className="w-4 h-4 mr-2 text-primary" />
                              {record.courseName || "Unknown Course"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(record.status, record.excused)}`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {record.notes || <span className="text-foreground/50">-</span>}
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Absences with Excuse</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Excuse Type</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {absentRecords.withExcuse.length > 0 ? (
                      absentRecords.withExcuse.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                {studentName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{studentName}</div>
                                <div className="text-xs text-foreground/70">{studentId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-primary" />
                              {format(record.date, "MMM d, yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Book className="w-4 h-4 mr-2 text-primary" />
                              {record.courseName || "Unknown Course"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-blue-500" />
                              <span className="capitalize">{record.excuseType}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {record.notes || <span className="text-foreground/50">-</span>}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-foreground/70">
                          No excused absences found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Absences without Excuse</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {absentRecords.withoutExcuse.length > 0 ? (
                      absentRecords.withoutExcuse.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                {studentName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{studentName}</div>
                                <div className="text-xs text-foreground/70">{studentId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-primary" />
                              {format(record.date, "MMM d, yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Book className="w-4 h-4 mr-2 text-primary" />
                              {record.courseName || "Unknown Course"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-red-500/10 text-red-500 border-red-200">
                              Absent
                            </div>
                          </TableCell>
                          <TableCell>
                            {record.notes || <span className="text-foreground/50">-</span>}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-foreground/70">
                          No unexcused absences found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="course">
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courseAttendance.map((course) => (
                    <GlassCard key={course.courseId} className="p-4">
                      <div className="mb-2 font-semibold">{course.courseName}</div>
                      <div className={cn(
                        "text-xl font-bold mb-2",
                        course.attendanceRate >= 90 ? "text-green-500" :
                        course.attendanceRate >= 75 ? "text-amber-500" : 
                        "text-red-500"
                      )}>
                        {course.attendanceRate}%
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-foreground/70">Total sessions:</div>
                        <div>{course.totalSessions}</div>
                        <div className="text-foreground/70">Attended:</div>
                        <div className="text-green-500">{course.attended}</div>
                        <div className="text-foreground/70">Absences:</div>
                        <div className="text-red-500">{course.absences}</div>
                        <div className="text-foreground/70">Late arrivals:</div>
                        <div className="text-amber-500">{course.lateArrivals}</div>
                        <div className="text-foreground/70">Excused:</div>
                        <div className="text-blue-500">{course.excusedAbsences}</div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              
              {selectedCourseId && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Course-Specific Records</h3>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Present & Late Records</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRecords
                          .filter(r => r.status === 'present' || r.status === 'late')
                          .map((record, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                    {studentName.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium">{studentName}</div>
                                    <div className="text-xs text-foreground/70">{studentId}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                                  {format(record.date, "MMM d, yyyy")}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(record.status, record.excused)}`}>
                                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                </div>
                              </TableCell>
                              <TableCell>
                                {record.notes || <span className="text-foreground/50">-</span>}
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Absences with Excuse</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Excuse Type</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {absentRecords.withExcuse.length > 0 ? (
                          absentRecords.withExcuse.map((record, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                    {studentName.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium">{studentName}</div>
                                    <div className="text-xs text-foreground/70">{studentId}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                                  {format(record.date, "MMM d, yyyy")}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <FileText className="w-4 h-4 mr-2 text-blue-500" />
                                  <span className="capitalize">{record.excuseType}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {record.notes || <span className="text-foreground/50">-</span>}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-foreground/70">
                              No excused absences found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Absences without Excuse</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {absentRecords.withoutExcuse.length > 0 ? (
                          absentRecords.withoutExcuse.map((record, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                    {studentName.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium">{studentName}</div>
                                    <div className="text-xs text-foreground/70">{studentId}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                                  {format(record.date, "MMM d, yyyy")}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-red-500/10 text-red-500 border-red-200">
                                  Absent
                                </div>
                              </TableCell>
                              <TableCell>
                                {record.notes || <span className="text-foreground/50">-</span>}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-foreground/70">
                              No unexcused absences found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentAttendanceHistory;
