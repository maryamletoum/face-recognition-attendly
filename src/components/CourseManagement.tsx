
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import GlassCard from './ui/GlassCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, User, Clock, BookOpen, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Course = {
  id: string;
  name: string;
  code: string;
  instructor: string;
  students: number;
  room: string;
  status: 'active' | 'pending' | 'archived';
};

type Teacher = {
  id: string;
  name: string;
};

type CourseManagementProps = {
  className?: string;
};

const CourseManagement: React.FC<CourseManagementProps> = ({ className }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewCourseDialog, setShowNewCourseDialog] = useState(false);
  const [showEditCourseDialog, setShowEditCourseDialog] = useState(false);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'archived'>('all');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    instructor: '',
    room: '',
    status: 'pending' as const
  });

  const [selectedTeacher, setSelectedTeacher] = useState('');
  
  // Sample data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      name: "Web Development",
      code: "CS101",
      instructor: "Dr. Jane Smith",
      students: 32,
      room: "Tech Building, Room 205",
      status: 'active'
    },
    {
      id: "2",
      name: "Data Structures",
      code: "CS201",
      instructor: "Prof. Michael Johnson",
      students: 28,
      room: "Science Center, Room 103",
      status: 'active'
    },
    {
      id: "3",
      name: "Mobile App Development",
      code: "CS310",
      instructor: "Dr. Robert Davis",
      students: 24,
      room: "Tech Building, Room 115",
      status: 'pending'
    },
    {
      id: "4", 
      name: "Database Systems",
      code: "CS230",
      instructor: "Prof. Lisa Brown",
      students: 30,
      room: "Main Hall, Room 302",
      status: 'archived'
    }
  ]);
  
  const teachers: Teacher[] = [
    { id: '1', name: 'Dr. Jane Smith' },
    { id: '2', name: 'Prof. Michael Johnson' },
    { id: '3', name: 'Dr. Robert Davis' },
    { id: '4', name: 'Prof. Lisa Brown' },
    { id: '5', name: 'Dr. Sarah Wilson' }
  ];
  
  const filteredCourses = courses.filter(course => {
    const textMatch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const statusMatch = statusFilter === 'all' || course.status === statusFilter;
    
    return textMatch && statusMatch;
  });
  
  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: (courses.length + 1).toString(),
      ...formData,
      students: 0
    };
    
    setCourses([...courses, newCourse]);
    setShowNewCourseDialog(false);
    resetForm();
    
    toast({
      title: "Course created",
      description: `${newCourse.name} (${newCourse.code}) has been added to the system`
    });
  };
  
  const handleUpdateCourse = () => {
    if (!currentCourse) return;
    
    setCourses(courses.map(course => 
      course.id === currentCourse.id 
        ? { ...currentCourse, ...formData } 
        : course
    ));
    
    setShowEditCourseDialog(false);
    resetForm();
    
    toast({
      title: "Course updated",
      description: `${formData.name} (${formData.code}) has been updated`
    });
  };
  
  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    
    toast({
      title: "Course deleted",
      description: "The course has been deleted from the system"
    });
  };
  
  const handleOpenEditDialog = (course: Course) => {
    setCurrentCourse(course);
    setFormData({
      name: course.name,
      code: course.code,
      instructor: course.instructor,
      room: course.room,
      status: course.status
    });
    setShowEditCourseDialog(true);
  };
  
  const handleOpenReassignDialog = (course: Course) => {
    setCurrentCourse(course);
    setSelectedTeacher('');
    setShowReassignDialog(true);
  };
  
  const handleReassignCourse = () => {
    if (!currentCourse || !selectedTeacher) return;
    
    const teacher = teachers.find(t => t.id === selectedTeacher);
    if (!teacher) return;
    
    setCourses(courses.map(course => 
      course.id === currentCourse.id 
        ? { ...course, instructor: teacher.name } 
        : course
    ));
    
    setShowReassignDialog(false);
    
    toast({
      title: "Course reassigned",
      description: `${currentCourse.name} is now assigned to ${teacher.name}`
    });
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      instructor: '',
      room: '',
      status: 'pending'
    });
    setCurrentCourse(null);
  };
  
  const handleUpdateStatus = (courseId: string, status: 'active' | 'pending' | 'archived') => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, status } 
        : course
    ));
    
    toast({
      title: `Course ${status}`,
      description: `Course status has been updated to ${status}`
    });
  };

  return (
    <GlassCard className={className}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Course Management</h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setShowNewCourseDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      {course.name}
                    </div>
                  </TableCell>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      {course.instructor}
                    </div>
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>{course.room}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      course.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-200' :
                      course.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-200' :
                      'bg-gray-500/10 text-gray-500 border-gray-200'
                    }`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleOpenEditDialog(course)}
                        title="Edit course"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleOpenReassignDialog(course)}
                        title="Reassign instructor"
                      >
                        <User className="w-4 h-4" />
                      </Button>
                      
                      {course.status !== 'active' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleUpdateStatus(course.id, 'active')}
                          title="Activate course"
                          className="text-green-500"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {course.status !== 'pending' && course.status !== 'archived' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleUpdateStatus(course.id, 'pending')}
                          title="Set as pending"
                          className="text-amber-500"
                        >
                          <Clock className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {course.status !== 'archived' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleUpdateStatus(course.id, 'archived')}
                          title="Archive course"
                          className="text-gray-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-foreground/70">
                  No courses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-foreground/60">
        Showing {filteredCourses.length} of {courses.length} courses
      </div>
      
      {/* New Course Dialog */}
      <Dialog open={showNewCourseDialog} onOpenChange={setShowNewCourseDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input 
                  id="code" 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select 
                value={formData.instructor}
                onValueChange={(value) => setFormData({...formData, instructor: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.name}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Input 
                id="room" 
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value: any) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowNewCourseDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCourse}>
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Course Dialog */}
      <Dialog open={showEditCourseDialog} onOpenChange={setShowEditCourseDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Course Name</Label>
                <Input 
                  id="edit-name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-code">Course Code</Label>
                <Input 
                  id="edit-code" 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-instructor">Instructor</Label>
              <Input 
                id="edit-instructor" 
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                disabled
              />
              <p className="text-sm text-foreground/60">
                To change the instructor, use the reassign option
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-room">Room</Label>
              <Input 
                id="edit-room" 
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value: any) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="destructive" 
                onClick={() => {
                  if (currentCourse) {
                    handleDeleteCourse(currentCourse.id);
                    setShowEditCourseDialog(false);
                  }
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Course
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowEditCourseDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateCourse}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Reassign Instructor Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Reassign Course Instructor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {currentCourse && (
              <div className="p-3 bg-secondary/20 rounded-lg">
                <p className="font-medium">{currentCourse.name} ({currentCourse.code})</p>
                <p className="text-sm text-foreground/70">Current instructor: {currentCourse.instructor}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="new-instructor">New Instructor</Label>
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowReassignDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleReassignCourse}
                disabled={!selectedTeacher}
              >
                <User className="w-4 h-4 mr-2" />
                Reassign Instructor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </GlassCard>
  );
};

export default CourseManagement;
