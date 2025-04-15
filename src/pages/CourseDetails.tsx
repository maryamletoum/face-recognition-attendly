import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, Clock, MapPin, Users, FileText, Eye, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import RoleBasedAccess from '@/components/RoleBasedAccess';
import StudentAttendanceHistory from '@/components/StudentAttendanceHistory';
import DeprivationNotification from '@/components/DeprivationNotification';

const courses = [
  {
    id: "1",
    title: "Web Development",
    code: "CS101",
    instructor: "Dr. Jane Smith",
    students: 32,
    schedule: "Mon, Wed, Fri - 10:00 AM",
    room: "Tech Building, Room 205",
    attendance: 94,
    description: "An introduction to modern web development technologies including HTML, CSS, JavaScript, and React. Students will build responsive web applications and learn best practices for web design and deployment.",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    sessions: [
      { id: "1", date: new Date(2023, 9, 15), time: "10:00 AM", status: "present" },
      { id: "2", date: new Date(2023, 9, 17), time: "10:00 AM", status: "late" },
      { id: "3", date: new Date(2023, 9, 19), time: "10:00 AM", status: "absent" },
    ]
  },
  {
    id: "2",
    title: "Data Structures",
    code: "CS201",
    instructor: "Prof. Michael Johnson",
    students: 28,
    schedule: "Tue, Thu - 2:00 PM",
    room: "Science Center, Room 103",
    attendance: 89,
    description: "A study of fundamental data structures and algorithms. Topics include arrays, linked lists, stacks, queues, trees, hash tables, and graphs, along with various searching and sorting algorithms.",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    sessions: [
      { id: "1", date: new Date(2023, 9, 14), time: "2:00 PM", status: "present" },
      { id: "2", date: new Date(2023, 9, 16), time: "2:00 PM", status: "absent" },
      { id: "3", date: new Date(2023, 9, 18), time: "2:00 PM", status: "present" },
    ]
  },
  {
    id: "3",
    title: "Mobile App Development",
    code: "CS310",
    instructor: "Dr. Robert Davis",
    students: 24,
    schedule: "Mon, Wed - 1:30 PM",
    room: "Tech Building, Room 115",
    attendance: 92,
    description: "An advanced course on mobile application development focusing on iOS and Android platforms. Students will learn native and cross-platform development techniques.",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    sessions: [
      { id: "1", date: new Date(2023, 9, 15), time: "1:30 PM", status: "present" },
      { id: "2", date: new Date(2023, 9, 17), time: "1:30 PM", status: "present" },
      { id: "3", date: new Date(2023, 9, 19), time: "1:30 PM", status: "late" },
    ]
  },
  {
    id: "4", 
    title: "Database Systems",
    code: "CS230",
    instructor: "Prof. Lisa Brown",
    students: 30,
    schedule: "Tue, Thu - 11:00 AM",
    room: "Main Hall, Room 302",
    attendance: 87,
    description: "An introduction to database management systems. Topics include data modeling, relational databases, SQL, transaction processing, and database design principles.",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    sessions: [
      { id: "1", date: new Date(2023, 9, 14), time: "11:00 AM", status: "present" },
      { id: "2", date: new Date(2023, 9, 16), time: "11:00 AM", status: "late" },
      { id: "3", date: new Date(2023, 9, 18), time: "11:00 AM", status: "absent" },
    ]
  }
];

const sampleAttendanceHistory = [
  {
    date: new Date(2023, 8, 5),
    status: 'present' as const,
    excused: false,
    courseId: "1",
    courseName: "Web Development"
  },
  {
    date: new Date(2023, 8, 12),
    status: 'absent' as const,
    excused: true,
    excuseType: 'medical' as const,
    notes: 'Doctor appointment',
    courseId: "1",
    courseName: "Web Development"
  },
  {
    date: new Date(2023, 8, 19),
    status: 'late' as const,
    excused: false,
    courseId: "1",
    courseName: "Web Development"
  },
  {
    date: new Date(2023, 9, 3),
    status: 'absent' as const,
    excused: false,
    courseId: "1",
    courseName: "Web Development"
  }
];

const sampleCourseAttendance = [
  {
    courseId: "1",
    courseName: "Web Development",
    attendanceRate: 85,
    totalSessions: 12,
    attended: 10,
    absences: 2,
    lateArrivals: 1,
    excusedAbsences: 1
  }
];

const CourseDetails: React.FC = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showStudentHistory, setShowStudentHistory] = useState(false);
  const [showDeprivation, setShowDeprivation] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const navigate = useNavigate();
  const { isStudent, isTeacher, isAdmin } = useAuth();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundCourse = courses.find(c => c.id === courseId);
      setCourse(foundCourse);
      setLoading(false);
      
      console.log('Course ID:', courseId);
      console.log('Found Course:', foundCourse);
    }, 500);
  }, [courseId]);

  const handleTakeAttendance = () => {
    toast({
      title: "Attendance session started",
      description: "Students can now check in for today's class.",
    });
    
    navigate(`/attendance?course=${courseId}&action=take`);
  };

  const handleViewAttendance = () => {
    navigate(`/attendance?course=${courseId}`);
  };
  
  const handleViewStudentHistory = () => {
    setShowStudentHistory(true);
  };

  const getStatusPercentage = (status: string) => {
    console.log('Status input:', status);
    switch (status.toLowerCase()) {
      case 'present':
        return "100%";
      case 'absent':
        return "0%";
      case 'late':
        return "50%";
      default:
        return "0%";
    }
  };
  
  const getStatusColorClass = (status: string) => {
    console.log('Color Status input:', status);
    switch (status.toLowerCase()) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-foreground/70">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <BackButton />
          </div>
          <GlassCard>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
              <p className="text-foreground/70">The course you're looking for doesn't exist or has been removed.</p>
              <Button className="mt-4" asChild>
                <Link to="/courses">View All Courses</Link>
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FadeIn>
              <GlassCard>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                      {course.code}
                    </span>
                    <h1 className="text-2xl font-bold mt-2 mb-1">{course.title}</h1>
                    <p className="text-foreground/70">{course.instructor}</p>
                  </div>
                  <RoleBasedAccess allowedRoles={['admin', 'teacher']}>
                    <Button onClick={handleTakeAttendance}>Take Attendance</Button>
                  </RoleBasedAccess>
                </div>
                
                <p className="mb-6">{course.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70">Enrolled Students</div>
                      <div className="font-medium">{course.students} Students</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70">Course Duration</div>
                      <div className="font-medium">
                        {format(new Date(course.startDate), "MMM d, yyyy")} - {format(new Date(course.endDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70">Schedule</div>
                      <div className="font-medium">{course.schedule}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground/70">Location</div>
                      <div className="font-medium">{course.room}</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border/40 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-foreground/70">Average Attendance</div>
                      <div className="font-medium">{course.attendance}%</div>
                    </div>
                    <RoleBasedAccess 
                      allowedRoles={['admin', 'teacher']}
                      fallback={
                        <Button variant="outline" onClick={handleViewStudentHistory}>
                          <Eye className="w-4 h-4 mr-2" />
                          View My Attendance
                        </Button>
                      }
                    >
                      <Button variant="outline" onClick={handleViewAttendance}>
                        <FileText className="w-4 h-4 mr-2" />
                        View Attendance Records
                      </Button>
                    </RoleBasedAccess>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>
          
          <div>
            <FadeIn delay={100}>
              <RoleBasedAccess allowedRoles={['admin', 'teacher']}>
                <GlassCard>
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to={`/students?course=${courseId}`}>
                        <Users className="w-4 h-4 mr-2" />
                        View Students
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleTakeAttendance}>
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Take Attendance
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/dashboard">
                        <Clock className="w-4 h-4 mr-2" />
                        View Analytics
                      </Link>
                    </Button>
                    {isAdmin() && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to={`/attendance?course=${courseId}&settings=true`}>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Deprivation Settings
                        </Link>
                      </Button>
                    )}
                  </div>
                </GlassCard>
              </RoleBasedAccess>
            </FadeIn>
            
            <FadeIn delay={200}>
              <GlassCard className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Recent Sessions</h2>
                {course?.sessions && course.sessions.map((session: any) => (
                  <div key={session.id} className="mb-3 pb-3 border-b border-border/30 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Session #{session.id}</p>
                        <p className="text-sm text-foreground/70">
                          {format(new Date(session.date), 'EEE, MMM d')}
                        </p>
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColorClass(session.status)}`}>
                        {getStatusPercentage(session.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
      
      <StudentAttendanceHistory 
        isOpen={showStudentHistory}
        onOpenChange={setShowStudentHistory}
        studentName={isStudent() ? "John Smith" : "Student Name"}
        studentId={isStudent() ? "ST001" : "ST001"}
        attendanceRecords={sampleAttendanceHistory}
        overallAttendance={85}
        courseAttendance={sampleCourseAttendance}
        selectedCourseId={courseId}
      />
      
      {selectedStudent && (
        <DeprivationNotification
          isOpen={showDeprivation}
          onOpenChange={setShowDeprivation}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default CourseDetails;
