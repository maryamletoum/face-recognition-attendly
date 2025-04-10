
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Book, ChevronDown, Search, User, Clock, Plus, X } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import { useToast } from "@/hooks/use-toast";
import RoleBasedAccess from '@/components/RoleBasedAccess';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Course = {
  id: string;
  title: string;
  code: string;
  instructor: string;
  instructorId?: string;
  students: number;
  schedule: string;
  room: string;
  attendance: number;
  status?: 'active' | 'pending' | 'completed';
};

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Web Development",
    code: "CS101",
    instructor: "Dr. Jane Smith",
    students: 32,
    schedule: "Mon, Wed, Fri - 10:00 AM",
    room: "Tech Building, Room 205",
    attendance: 94,
    status: 'active'
  },
  {
    id: "2",
    title: "Data Structures",
    code: "CS201",
    instructor: "Prof. Michael Johnson",
    instructorId: "2",
    students: 28,
    schedule: "Tue, Thu - 2:00 PM",
    room: "Science Center, Room 103",
    attendance: 89,
    status: 'active'
  },
  {
    id: "3",
    title: "Mobile App Development",
    code: "CS310",
    instructor: "Dr. Robert Davis",
    instructorId: "1",
    students: 24,
    schedule: "Mon, Wed - 1:30 PM",
    room: "Tech Building, Room 115",
    attendance: 92,
    status: 'active'
  },
  {
    id: "4", 
    title: "Database Systems",
    code: "CS230",
    instructor: "Prof. Lisa Brown",
    instructorId: "3",
    students: 30,
    schedule: "Tue, Thu - 11:00 AM",
    room: "Main Hall, Room 302",
    attendance: 87,
    status: 'pending'
  },
  {
    id: "5", 
    title: "AI Fundamentals",
    code: "CS450",
    instructor: "Unassigned",
    students: 0,
    schedule: "TBD",
    room: "Science Center, Room 105",
    attendance: 0,
    status: 'pending'
  }
];

const teachers = [
  { id: "1", name: "Dr. Robert Davis" },
  { id: "2", name: "Prof. Michael Johnson" },
  { id: "3", name: "Prof. Lisa Brown" },
  { id: "4", name: "Dr. Jane Smith" }
];

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Courses');
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [showNewCourseDialog, setShowNewCourseDialog] = useState(false);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("active");
  
  // New course form state
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    code: '',
    instructor: 'Unassigned',
    students: 0,
    schedule: '',
    room: '',
    attendance: 0,
    status: 'pending'
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userRole } = useAuth();

  const filteredCourses = courses.filter(course => {
    // Text filter
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      activeTab === 'all' || 
      (activeTab === 'active' && course.status === 'active') ||
      (activeTab === 'pending' && course.status === 'pending');
    
    return matchesSearch && matchesStatus;
  });
  
  const handleAddNewCourse = () => {
    setShowNewCourseDialog(true);
  };

  const submitNewCourse = () => {
    const newId = (Math.max(...courses.map(c => parseInt(c.id))) + 1).toString();
    
    const createdCourse: Course = {
      id: newId,
      title: newCourse.title || 'New Course',
      code: newCourse.code || `CS${Math.floor(Math.random() * 1000)}`,
      instructor: newCourse.instructor || 'Unassigned',
      instructorId: undefined,
      students: 0,
      schedule: newCourse.schedule || 'TBD',
      room: newCourse.room || 'TBD',
      attendance: 0,
      status: 'pending'
    };
    
    setCourses([...courses, createdCourse]);
    setShowNewCourseDialog(false);
    setNewCourse({
      title: '',
      code: '',
      instructor: 'Unassigned',
      students: 0,
      schedule: '',
      room: '',
      attendance: 0,
      status: 'pending'
    });
    
    toast({
      title: "Course created",
      description: "The new course has been added to pending courses",
    });
  };

  const handleReassignTeacher = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowReassignDialog(true);
  };
  
  const submitReassignment = () => {
    if (!selectedCourseId || !selectedTeacherId) {
      toast({
        title: "Error",
        description: "Please select a teacher for this course",
        variant: "destructive"
      });
      return;
    }
    
    const selectedTeacher = teachers.find(t => t.id === selectedTeacherId);
    
    setCourses(courses.map(course => 
      course.id === selectedCourseId
        ? { 
            ...course, 
            instructor: selectedTeacher?.name || 'Unassigned',
            instructorId: selectedTeacherId,
            status: 'active' 
          }
        : course
    ));
    
    setShowReassignDialog(false);
    setSelectedCourseId(null);
    setSelectedTeacherId(null);
    
    toast({
      title: "Teacher assigned",
      description: "Course has been assigned to the selected teacher",
    });
  };

  const handleRemoveCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    
    toast({
      title: "Course removed",
      description: "The course has been removed from the system",
    });
  };

  const handleTakeAttendance = (courseId: string) => {
    navigate(`/attendance?course=${courseId}&action=take`);
    
    toast({
      title: "Attendance session started",
      description: "You can now mark attendance for today's class",
    });
  };

  const handleApproveCourse = (courseId: string) => {
    setCourses(courses.map(course => 
      course.id === courseId
        ? { ...course, status: 'active' }
        : course
    ));
    
    toast({
      title: "Course approved",
      description: "The course has been moved to active courses",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <BackButton className="mr-2" />
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Courses</h1>
            <p className="text-foreground/70">Manage your classes and course materials</p>
          </div>
          <div className="mt-4 md:mt-0">
            <RoleBasedAccess allowedRoles={['admin']} fallback={null}>
              <Button onClick={handleAddNewCourse}>
                <Book className="w-4 h-4 mr-2" />
                Add New Course
              </Button>
            </RoleBasedAccess>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border glass"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs 
            defaultValue="active" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <FadeIn key={course.id} delay={index * 50}>
              <GlassCard className="h-full relative" hoverEffect>
                {userRole === 'admin' && course.status === 'pending' && (
                  <div className="absolute top-3 right-3 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full text-xs font-medium">
                    Pending Approval
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/10 text-primary rounded-lg p-3">
                    <Book className="w-6 h-6" />
                  </div>
                  <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                    {course.code}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                <p className="text-foreground/70 text-sm mb-4 flex items-center">
                  <User className="w-4 h-4 mr-1 inline" />
                  {course.instructor}
                </p>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <p className="text-xs text-foreground/50">Students</p>
                    <p className="font-medium">{course.students}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50">Attendance</p>
                    <p className="font-medium">{course.attendance}%</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-foreground/50">Schedule</p>
                    <p className="font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1 inline" />
                      {course.schedule}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-foreground/50">Location</p>
                    <p className="font-medium">{course.room}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/40">
                  <Link 
                    to={`/course/${course.id}`} 
                    className="text-sm text-primary hover:underline"
                  >
                    View Details
                  </Link>
                  <div className="flex gap-2">
                    {userRole === 'admin' && (
                      <>
                        {course.status === 'pending' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApproveCourse(course.id)}
                          >
                            Approve
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReassignTeacher(course.id)}
                          >
                            Reassign
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveCourse(course.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    
                    {(userRole === 'teacher' || userRole === 'admin') && course.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTakeAttendance(course.id)}
                      >
                        Take Attendance
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
      
      {/* Add New Course Dialog */}
      <Dialog open={showNewCourseDialog} onOpenChange={setShowNewCourseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title</Label>
              <Input 
                id="title" 
                value={newCourse.title} 
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                placeholder="e.g. Web Development"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Course Code</Label>
              <Input 
                id="code" 
                value={newCourse.code} 
                onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                placeholder="e.g. CS101"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room">Room</Label>
              <Input 
                id="room" 
                value={newCourse.room} 
                onChange={(e) => setNewCourse({...newCourse, room: e.target.value})}
                placeholder="e.g. Tech Building, Room 205"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input 
                id="schedule" 
                value={newCourse.schedule} 
                onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                placeholder="e.g. Mon, Wed, Fri - 10:00 AM"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCourseDialog(false)}>Cancel</Button>
            <Button onClick={submitNewCourse}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reassign Teacher Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reassign Course to Teacher</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label htmlFor="course-name">Course</Label>
              <p className="text-foreground/70">{courses.find(c => c.id === selectedCourseId)?.title}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teacher">Select Teacher</Label>
              <select 
                id="teacher" 
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
                value={selectedTeacherId || ''}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
              >
                <option value="">-- Select a teacher --</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReassignDialog(false)}>Cancel</Button>
            <Button onClick={submitReassignment}>Assign Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Courses;
