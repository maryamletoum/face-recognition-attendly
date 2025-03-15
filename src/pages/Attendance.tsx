
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import StudentCard from '@/components/StudentCard';

const getRandomAttendancePercentage = () => {
  return Math.floor(Math.random() * 30) + 70; // Random between 70-99%
};

const students = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 9:05 AM",
    status: "present" as const,
  },
  {
    id: "2",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 8:58 AM",
    status: "present" as const,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 9:30 AM",
    status: "late" as const,
  },
  {
    id: "4",
    name: "Sophia Williams",
    email: "sophia.w@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 8:45 AM",
    status: "absent" as const,
  },
  {
    id: "5",
    name: "Daniel Jones",
    email: "daniel.j@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 9:02 AM",
    status: "present" as const,
  },
  {
    id: "6",
    name: "Olivia Taylor",
    email: "olivia.t@example.com",
    attendancePercentage: getRandomAttendancePercentage(),
    lastAttendance: "Today, 8:50 AM",
    status: "present" as const,
  },
];

const Attendance: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Web Development");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter students by status if filter is active
  const filteredStudents = statusFilter === "All" 
    ? students 
    : students.filter(student => 
        statusFilter.toLowerCase() === student.status
      );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Attendance Records</h1>
            <p className="text-foreground/70">View and manage student attendance</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
              <CalendarIcon className="w-4 h-4 mr-2" />
              {format(date, "MMMM d, yyyy")}
            </Button>
            {isCalendarOpen && (
              <div className="absolute z-10 mt-10 right-4 md:right-auto">
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
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative min-w-[200px]">
            <Button variant="outline" className="w-full justify-between">
              {selectedCourse}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="relative min-w-[150px]">
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                {statusFilter}
              </span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-secondary">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span>{format(date, "EEEE, MMMM d")}</span>
            <button className="p-1 rounded-full hover:bg-secondary">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Export CSV</Button>
            <Button size="sm">Take Attendance</Button>
          </div>
        </div>

        <FadeIn>
          <GlassCard>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <StudentCard 
                  key={student.id} 
                  student={student}
                />
              ))}
            </div>
            
            <div className="mt-6 flex items-center justify-between text-sm text-foreground/70">
              <div>Showing {filteredStudents.length} of {students.length} students</div>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-secondary rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-2 py-1 hover:bg-secondary rounded bg-primary/10 text-primary">1</button>
                <button className="px-2 py-1 hover:bg-secondary rounded">2</button>
                <button className="p-1 hover:bg-secondary rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default Attendance;
