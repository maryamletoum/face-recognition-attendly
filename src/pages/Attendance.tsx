import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Calendar as CalendarIcon, ChevronDown, Filter, Folder, Book, Users, ArrowRight, Download, Clock, FileText, Search } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import AttendanceTable from '@/components/AttendanceTable';
import BackButton from '@/components/BackButton';
import { exportToExcel } from '@/utils/excelExport';
import { useToast } from "@/components/ui/use-toast";
import FaceRecognition from '@/components/FaceRecognition';
import DeprivationSettings from '@/components/DeprivationSettings';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StudentAttendanceHistory from '@/components/StudentAttendanceHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const classes = [
  {
    id: "1",
    name: "Web Development",
    code: "CS101",
    instructor: "Dr. Jane Smith",
    students: 32,
    room: "Tech Building, Room 205",
    sessions: [
      { id: "1", date: new Date(2023, 9, 15), time: "10:00 AM", attendance: 94 },
      { id: "2", date: new Date(2023, 9, 17), time: "10:00 AM", attendance: 91 },
      { id: "3", date: new Date(2023, 9, 19), time: "10:00 AM", attendance: 97 },
    ]
  },
  {
    id: "2",
    name: "Data Structures",
    code: "CS201",
    instructor: "Prof. Michael Johnson",
    students: 28,
    room: "Science Center, Room 103",
    sessions: [
      { id: "1", date: new Date(2023, 9, 14), time: "2:00 PM", attendance: 89 },
      { id: "2", date: new Date(2023, 9, 16), time: "2:00 PM", attendance: 86 },
      { id: "3", date: new Date(2023, 9, 18), time: "2:00 PM", attendance: 92 },
    ]
  },
  {
    id: "3",
    name: "Mobile App Development",
    code: "CS310",
    instructor: "Dr. Robert Davis",
    students: 24,
    room: "Tech Building, Room 115",
    sessions: [
      { id: "1", date: new Date(2023, 9, 15), time: "1:30 PM", attendance: 92 },
      { id: "2", date: new Date(2023, 9, 17), time: "1:30 PM", attendance: 88 },
      { id: "3", date: new Date(2023, 9, 19), time: "1:30 PM", attendance: 95 },
    ]
  },
  {
    id: "4", 
    name: "Database Systems",
    code: "CS230",
    instructor: "Prof. Lisa Brown",
    students: 30,
    room: "Main Hall, Room 302",
    sessions: [
      { id: "1", date: new Date(2023, 9, 14), time: "11:00 AM", attendance: 87 },
      { id: "2", date: new Date(2023, 9, 16), time: "11:00 AM", attendance: 90 },
      { id: "3", date: new Date(2023, 9, 18), time: "11:00 AM", attendance: 83 },
    ]
  }
];

const sampleAttendanceHistory = [
  {
    date: new Date(2023, 8, 5),
    status: 'present' as const,
    excused: false
  },
  {
    date: new Date(2023, 8, 12),
    status: 'absent' as const,
    excused: true,
    excuseType: 'medical' as const,
    notes: 'Doctor appointment'
  },
  {
    date: new Date(2023, 8, 19),
    status: 'late' as const,
    excused: true,
    excuseType: 'other' as const,
    notes: 'Traffic delay'
  },
  {
    date: new Date(2023, 8, 26),
    status: 'present' as const,
    excused: false
  },
  {
    date: new Date(2023, 9, 3),
    status: 'absent' as const,
    excused: false
  },
  {
    date: new Date(2023, 9, 10),
    status: 'present' as const,
    excused: false
  }
];

const sampleCourseAttendance = [
  {
    courseId: "1",
    courseName: "Web Development",
    attendanceRate: 92,
    totalSessions: 15,
    attended: 14,
    absences: 1,
    lateArrivals: 0,
    excusedAbsences: 1
  },
  {
    courseId: "2",
    courseName: "Data Structures",
    attendanceRate: 85,
    totalSessions: 20,
    attended: 17,
    absences: 3,
    lateArrivals: 2,
    excusedAbsences: 1
  },
  {
    courseId: "3",
    courseName: "Mobile App Development",
    attendanceRate: 78,
    totalSessions: 18,
    attended: 14,
    absences: 4,
    lateArrivals: 3,
    excusedAbsences: 2
  }
];

const Attendance: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [showDeprivationSettings, setShowDeprivationSettings] = useState(false);
  const [showStudentHistory, setShowStudentHistory] = useState(false);
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [activeTab, setActiveTab] = useState("sessions");
  const [selectedCourseForHistory, setSelectedCourseForHistory] = useState<string | undefined>(undefined);
  
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, isStudent } = useAuth();
  
  useEffect(() => {
    if (isStudent() && location.search.includes('action=take')) {
      navigate('/attendance');
      toast({
        title: "Access Denied",
        description: "Students cannot take attendance. This requires special hardware.",
        variant: "destructive"
      });
      return;
    }
    
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get('course');
    const action = queryParams.get('action');
    
    if (courseId) {
      setSelectedClass(courseId);
      
      if (action === 'take' && !isStudent()) {
        setIsTakingAttendance(true);
      }
    }
  }, [location.search, navigate, isStudent, toast]);

  const handleExportSessions = () => {
    if (!selectedClass) return;
    
    const currentClass = classes.find(c => c.id === selectedClass);
    if (!currentClass) return;
    
    const columns = [
      { header: 'Session ID', key: 'id', width: 15 },
      { header: 'Date', key: 'formattedDate', width: 20 },
      { header: 'Time', key: 'time', width: 15 },
      { header: 'Attendance', key: 'attendanceFormatted', width: 15 }
    ];
    
    const data = currentClass.sessions.map(session => ({
      ...session,
      formattedDate: format(session.date, "MMMM d, yyyy"),
      attendanceFormatted: `${session.attendance}%`
    }));
    
    exportToExcel(data, columns, `${currentClass.name}_Sessions`);
    
    toast({
      title: "Export successful",
      description: "Sessions data has been exported to Excel",
    });
  };

  const handleExportCsv = () => {
    const selectedClassData = classes.find(c => c.id === selectedClass);
    const selectedSessionData = selectedClassData?.sessions.find(s => s.id === selectedSession);
    
    if (!selectedClassData || !selectedSessionData) return;
    
    const filename = `${selectedClassData.name}_Session${selectedSession}_${format(selectedSessionData.date, "yyyy-MM-dd")}`;
    
    toast({
      title: "Preparing Export",
      description: "Your file will be downloaded shortly",
    });
  };
  
  const handleFinishAttendance = () => {
    setIsTakingAttendance(false);
    toast({
      title: "Attendance session completed",
      description: "All student attendance has been recorded.",
    });
  };
  
  const handleViewStudentHistory = (courseId?: string) => {
    setSelectedStudentName('John Smith');
    setSelectedStudentId('ST001');
    setSelectedCourseForHistory(courseId);
    setShowStudentHistory(true);
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {isTakingAttendance ? "Taking Attendance" : "Attendance"}
            </h1>
            <p className="text-foreground/70">
              {isTakingAttendance 
                ? "Record student attendance for today's class" 
                : "Manage attendance records by category"}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" onClick={() => setIsCalendarOpen(!isCalendarOpen)} className="shadow-sm hover:shadow-md transition-shadow">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {format(date, "MMMM d, yyyy")}
            </Button>
            {isCalendarOpen && (
              <div className="absolute z-10 mt-10 right-4 md:right-auto">
                <GlassCard className="p-0 shadow-lg">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setDate(newDate);
                        setIsCalendarOpen(false);
                      }
                    }}
                    initialFocus
                  />
                </GlassCard>
              </div>
            )}
            <BackButton className="shadow-sm hover:shadow-md transition-shadow" />
            {userRole === 'admin' && !isTakingAttendance && (
              <Button 
                variant="outline" 
                onClick={() => setShowDeprivationSettings(true)}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <Filter className="w-4 h-4 mr-2" />
                Settings
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-foreground/70 mb-6 overflow-x-auto">
          <div className="flex items-center">
            <Folder className="w-4 h-4 mr-1" />
            <span>Attendance</span>
          </div>
          
          {selectedClass && (
            <>
              <ArrowRight className="w-3 h-3 mx-2" />
              <div className="flex items-center">
                <Book className="w-4 h-4 mr-1" />
                <span>{classes.find(c => c.id === selectedClass)?.name}</span>
              </div>
            </>
          )}
          
          {selectedSession && (
            <>
              <ArrowRight className="w-3 h-3 mx-2" />
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>Session {selectedSession}</span>
              </div>
            </>
          )}
        </div>

        {isTakingAttendance && !isStudent() && (
          <FadeIn>
            <GlassCard className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Taking Attendance</h2>
                  <p className="text-sm text-foreground/70">
                    {format(new Date(), "EEEE, MMMM d • h:mm a")} | {classes.find(c => c.id === selectedClass)?.name}
                  </p>
                </div>
                <Button onClick={handleFinishAttendance} variant="outline">
                  End Session
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-secondary/30 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-500">12</p>
                  <p className="text-foreground/70 text-sm">Present</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-500">3</p>
                  <p className="text-foreground/70 text-sm">Late</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-500">2</p>
                  <p className="text-foreground/70 text-sm">Absent</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg text-center">
                  <p className="text-2xl font-bold">17</p>
                  <p className="text-foreground/70 text-sm">Total</p>
                </div>
              </div>
              
              <AttendanceTable 
                date={new Date()}
                courseId={selectedClass || ""}
                isSessionActive={true}
              />
              
              <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-4 flex justify-between items-center">
                <span>
                  <FileText className="w-4 h-4 inline mr-2" />
                  Emails will be sent to absent students automatically
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleViewStudentHistory(selectedClass || undefined)}
                >
                  View Student History
                </Button>
              </div>
            </GlassCard>
          </FadeIn>
        )}

        {!isTakingAttendance && !selectedClass ? (
          <FadeIn>
            <GlassCard className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Classes</h2>
              <p className="text-sm text-foreground/70 mb-6">Select a class to view attendance records</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                  <GlassCard 
                    key={classItem.id}
                    className="transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
                    hoverEffect
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-primary/10 text-primary rounded-lg p-3">
                        <Book className="w-6 h-6" />
                      </div>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                        {classItem.code}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-1">{classItem.name}</h3>
                    <p className="text-foreground/70 text-sm mb-4">{classItem.instructor}</p>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      <div>
                        <p className="text-xs text-foreground/50">Students</p>
                        <p className="font-medium">{classItem.students}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50">Room</p>
                        <p className="font-medium truncate">{classItem.room}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-foreground/50">Sessions</p>
                        <p className="font-medium">{classItem.sessions.length} recent sessions</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      {isStudent() ? (
                        <Button 
                          className="w-full shadow-sm hover:shadow-md transition-shadow"
                          onClick={() => setSelectedClass(classItem.id)}
                          variant="outline"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Attendance Records
                        </Button>
                      ) : (
                        <Button 
                          className="w-full shadow-sm hover:shadow-md transition-shadow"
                          onClick={() => setSelectedClass(classItem.id)}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Take Attendance Now
                        </Button>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        ) : !isTakingAttendance && !selectedSession ? (
          <FadeIn>
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedClass(null)}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                Back to Classes
              </Button>
              <div className="flex gap-2">
                {!isStudent() && (
                  <Button 
                    variant="outline" 
                    className="shadow-sm hover:shadow-md transition-shadow"
                    onClick={handleExportSessions}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Sessions
                  </Button>
                )}
              </div>
            </div>
            
            <GlassCard className="mb-6">
              <div className="border-b border-border pb-4 mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  {classes.find(c => c.id === selectedClass)?.name}
                </h2>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <TabsContent value="sessions" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="text-left py-3 px-4 font-medium text-foreground/70">Session ID</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground/70">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground/70">Time</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground/70">Attendance</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground/70">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.find(c => c.id === selectedClass)?.sessions.map((session) => (
                        <tr key={session.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                          <td className="py-3 px-4">Session #{session.id}</td>
                          <td className="py-3 px-4">{format(session.date, "MMMM d, yyyy")}</td>
                          <td className="py-3 px-4">{session.time}</td>
                          <td className="py-3 px-4">
                            <div className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                              session.attendance >= 90 ? "bg-green-500/10 text-green-500 border-green-200" :
                              session.attendance >= 80 ? "bg-amber-500/10 text-amber-500 border-amber-200" :
                              "bg-red-500/10 text-red-500 border-red-200"
                            )}>
                              {session.attendance}%
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedSession(session.id)}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="students" className="mt-0">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-border glass"
                      placeholder="Search students..."
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/20 cursor-pointer"
                      onClick={() => handleViewStudentHistory(selectedClass || undefined)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <div>
                          <p className="font-medium">Student {i + 1}</p>
                          <p className="text-sm text-foreground/70">ID: ST00{i + 1}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={cn(
                          "font-medium",
                          Math.random() > 0.3 ? "text-green-500" : "text-amber-500"
                        )}>
                          {Math.floor(85 + Math.random() * 15)}%
                        </div>
                        <p className="text-xs text-foreground/60">Attendance Rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </GlassCard>
          </FadeIn>
        ) : !isTakingAttendance && selectedSession ? (
          <FadeIn>
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedSession(null)}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                Back to Sessions
              </Button>
              {!isStudent() && (
                <Button 
                  variant="outline"
                  className="shadow-sm hover:shadow-md transition-shadow"
                  onClick={handleExportCsv}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              )}
            </div>
            
            <GlassCard>
              <div className="mb-6">
                <h2 className="text-lg font-semibold">
                  {classes.find(c => c.id === selectedClass)?.name} - Session {selectedSession}
                </h2>
                <p className="text-sm text-foreground/70">
                  {format(classes.find(c => c.id === selectedClass)?.sessions.find(s => s.id === selectedSession)?.date || new Date(), "EEEE, MMMM d")} • 
                  {classes.find(c => c.id === selectedClass)?.sessions.find(s => s.id === selectedSession)?.time}
                </p>
              </div>
              
              <AttendanceTable 
                date={classes.find(c => c.id === selectedClass)?.sessions.find(s => s.id === selectedSession)?.date || new Date()}
                courseId={selectedClass || ""}
                isSessionActive={false}
              />
            </GlassCard>
          </FadeIn>
        ) : null}
      </div>
      
      <Dialog open={showDeprivationSettings} onOpenChange={setShowDeprivationSettings}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Attendance & Deprivation Settings</DialogTitle>
          </DialogHeader>
          <DeprivationSettings />
        </DialogContent>
      </Dialog>
      
      <StudentAttendanceHistory 
        isOpen={showStudentHistory}
        onOpenChange={setShowStudentHistory}
        studentName={selectedStudentName}
        studentId={selectedStudentId}
        attendanceRecords={sampleAttendanceHistory.map(record => ({
          ...record,
          courseId: selectedCourseForHistory || (Math.floor(Math.random() * 3) + 1).toString(),
          courseName: !selectedCourseForHistory ? 
            ["Web Development", "Data Structures", "Mobile App Development"][Math.floor(Math.random() * 3)] :
            classes.find(c => c.id === selectedCourseForHistory)?.name || "Unknown Course"
        }))}
        overallAttendance={87}
        courseAttendance={sampleCourseAttendance}
        selectedCourseId={selectedCourseForHistory}
      />
    </div>
  );
};

export default Attendance;
