
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import GlassCard from './ui/GlassCard';
import { Calendar, Clock, FileText, Book, History } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // Filter records for the selected course if we're on the course tab
  const filteredRecords = activeTab === "course" && selectedCourseId
    ? attendanceRecords.filter(record => record.courseId === selectedCourseId)
    : attendanceRecords;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Attendance History</DialogTitle>
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
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
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
              
              <div className="rounded-lg overflow-hidden border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/20">
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Course</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Excuse</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.length > 0 ? (
                      attendanceRecords.map((record, index) => (
                        <tr key={index} className="border-t border-border/20">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-primary" />
                              {format(record.date, "MMM d, yyyy")}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Book className="w-4 h-4 mr-2 text-primary" />
                              {record.courseName || "Unknown Course"}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(record.status, record.excused)}`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              {record.excused && " (Excused)"}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {record.excused && record.excuseType ? (
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                                <span className="capitalize">{record.excuseType}</span>
                              </div>
                            ) : (
                              <span className="text-foreground/50">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {record.notes || <span className="text-foreground/50">-</span>}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-foreground/70">
                          No attendance records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                  <div className="rounded-lg overflow-hidden border border-border">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-secondary/20">
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Excuse</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground/70">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRecords.length > 0 ? (
                          filteredRecords.map((record, index) => (
                            <tr key={index} className="border-t border-border/20">
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                                  {format(record.date, "MMM d, yyyy")}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(record.status, record.excused)}`}>
                                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                  {record.excused && " (Excused)"}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {record.excused && record.excuseType ? (
                                  <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-2 text-blue-500" />
                                    <span className="capitalize">{record.excuseType}</span>
                                  </div>
                                ) : (
                                  <span className="text-foreground/50">-</span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                {record.notes || <span className="text-foreground/50">-</span>}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center py-4 text-foreground/70">
                              No course-specific records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
