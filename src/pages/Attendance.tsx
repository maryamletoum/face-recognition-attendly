
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Calendar as CalendarIcon, ChevronDown, Filter, Folder, BookOpen, Users, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const classes = [
  {
    id: "1",
    name: "Web Development",
    code: "CS101",
    instructor: "Dr. Jane Smith",
    students: 32,
    room: "Tech Building, Room 205",
    sessions: [
      { date: new Date(2023, 9, 15), time: "10:00 AM", attendance: 94 },
      { date: new Date(2023, 9, 17), time: "10:00 AM", attendance: 91 },
      { date: new Date(2023, 9, 19), time: "10:00 AM", attendance: 97 },
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
      { date: new Date(2023, 9, 14), time: "2:00 PM", attendance: 89 },
      { date: new Date(2023, 9, 16), time: "2:00 PM", attendance: 86 },
      { date: new Date(2023, 9, 18), time: "2:00 PM", attendance: 92 },
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
      { date: new Date(2023, 9, 15), time: "1:30 PM", attendance: 92 },
      { date: new Date(2023, 9, 17), time: "1:30 PM", attendance: 88 },
      { date: new Date(2023, 9, 19), time: "1:30 PM", attendance: 95 },
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
      { date: new Date(2023, 9, 14), time: "11:00 AM", attendance: 87 },
      { date: new Date(2023, 9, 16), time: "11:00 AM", attendance: 90 },
      { date: new Date(2023, 9, 18), time: "11:00 AM", attendance: 83 },
    ]
  }
];

const Attendance: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Attendance Records
            </h1>
            <p className="text-foreground/70">View and manage attendance records by class</p>
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
          </div>
        </div>

        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm text-foreground/70 mb-6 overflow-x-auto">
          <div className="flex items-center">
            <Folder className="w-4 h-4 mr-1" />
            <span>Attendance</span>
          </div>
          
          {selectedClass && (
            <>
              <ArrowRight className="w-3 h-3 mx-2" />
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
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

        {!selectedClass ? (
          // Classes List View
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <GlassCard 
                  key={classItem.id}
                  className="transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
                  hoverEffect
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 text-primary rounded-lg p-3">
                      <BookOpen className="w-6 h-6" />
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
                  
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <Button 
                      className="w-full shadow-sm hover:shadow-md transition-shadow"
                      onClick={() => setSelectedClass(classItem.id)}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      View Attendance
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </FadeIn>
        ) : !selectedSession ? (
          // Class Sessions View
          <FadeIn>
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedClass(null)}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                Back to Classes
              </Button>
              <Button variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
                <Filter className="w-4 h-4 mr-2" />
                Filter Sessions
              </Button>
            </div>
            
            <GlassCard className="overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold">
                  {classes.find(c => c.id === selectedClass)?.name} - Sessions
                </h2>
                <p className="text-sm text-foreground/70">
                  Select a session to view detailed attendance records
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Time</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Attendance</th>
                      <th className="text-right py-3 px-4 font-medium text-foreground/70">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.find(c => c.id === selectedClass)?.sessions.map((session, index) => (
                      <tr key={index} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
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
                            onClick={() => setSelectedSession(String(index + 1))}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </FadeIn>
        ) : (
          // Detailed Attendance Record
          <FadeIn>
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedSession(null)}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                Back to Sessions
              </Button>
              <Button 
                variant="outline"
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                Export CSV
              </Button>
            </div>
            
            <GlassCard>
              <div className="mb-6">
                <h2 className="text-lg font-semibold">
                  {classes.find(c => c.id === selectedClass)?.name} - Session {selectedSession}
                </h2>
                <p className="text-sm text-foreground/70">
                  {format(classes.find(c => c.id === selectedClass)?.sessions[parseInt(selectedSession!) - 1].date || new Date(), "EEEE, MMMM d")} • {classes.find(c => c.id === selectedClass)?.sessions[parseInt(selectedSession!) - 1].time}
                </p>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/30">
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Student Name</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Check In</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground/70">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "John Smith", id: "ST001", status: "present", time: "09:05 AM", notes: "" },
                      { name: "Emma Johnson", id: "ST002", status: "present", time: "08:58 AM", notes: "" },
                      { name: "Michael Brown", id: "ST003", status: "late", time: "09:30 AM", notes: "Bus delay" },
                      { name: "Sophia Williams", id: "ST004", status: "absent", time: "", notes: "Sick leave" },
                      { name: "James Davis", id: "ST005", status: "present", time: "08:50 AM", notes: "" },
                    ].map((student, index) => (
                      <tr key={index} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-4 font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              {student.name.charAt(0)}
                            </div>
                            <span>{student.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{student.id}</td>
                        <td className="py-3 px-4">
                          <div className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                            student.status === "present" ? "bg-green-500/10 text-green-500 border-green-200" :
                            student.status === "late" ? "bg-amber-500/10 text-amber-500 border-amber-200" :
                            "bg-red-500/10 text-red-500 border-red-200"
                          )}>
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </div>
                        </td>
                        <td className="py-3 px-4">{student.time || "-"}</td>
                        <td className="py-3 px-4 text-foreground/70">{student.notes || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-foreground/70">
                  Total Students: 5 • Present: 3 • Late: 1 • Absent: 1
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
                    Print Report
                  </Button>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default Attendance;
