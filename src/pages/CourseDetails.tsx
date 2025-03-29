import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import BackButton from '@/components/BackButton';

// Mock course data - in a real application, this would come from an API
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
    endDate: "2023-12-15"
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
    endDate: "2023-12-15"
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
    endDate: "2023-12-15"
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
    endDate: "2023-12-15"
  }
];

const CourseDetails: React.FC = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch course details
    setLoading(true);
    setTimeout(() => {
      const foundCourse = courses.find(c => c.id === courseId);
      setCourse(foundCourse);
      setLoading(false);
    }, 500);
  }, [courseId]);

  const handleTakeAttendance = () => {
    toast({
      title: "Attendance session started",
      description: "Students can now check in for today's class.",
    });
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
                  <Button onClick={handleTakeAttendance}>Take Attendance</Button>
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
                    <Link to={`/attendance?course=${courseId}`}>
                      <Button variant="outline">View Attendance Records</Button>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>
          
          <div>
            <FadeIn delay={100}>
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
                </div>
              </GlassCard>
            </FadeIn>
            
            <FadeIn delay={200}>
              <GlassCard className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
                {[1, 2, 3].map((session) => (
                  <div key={session} className="mb-3 pb-3 border-b border-border/30 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Session #{session}</p>
                        <p className="text-sm text-foreground/70">
                          {new Date(Date.now() + session * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {course.schedule.split(' - ')[1]}
                      </span>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
