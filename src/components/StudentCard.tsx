
import React from 'react';
import { cn } from "@/lib/utils";
import GlassCard from './ui/GlassCard';

type StudentCardProps = {
  student: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    attendancePercentage: number;
    lastAttendance?: string;
    status?: 'present' | 'absent' | 'late';
  };
  className?: string;
};

const StudentCard: React.FC<StudentCardProps> = ({ student, className }) => {
  const getStatusColorClass = () => {
    switch (student.status) {
      case 'present':
        return 'bg-green-500/10 text-green-500';
      case 'absent':
        return 'bg-red-500/10 text-red-500';
      case 'late':
        return 'bg-amber-500/10 text-amber-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getAttendanceColorClass = () => {
    if (student.attendancePercentage >= 90) return 'text-green-500';
    if (student.attendancePercentage >= 75) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <GlassCard className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border">
            {student.avatarUrl ? (
              <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-xl font-medium text-primary">
                {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            )}
          </div>
          {student.status && (
            <div className={cn(
              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center text-[8px] font-medium",
              getStatusColorClass()
            )}>
              {student.status === 'present' && '✓'}
              {student.status === 'absent' && '✗'}
              {student.status === 'late' && '⏱'}
            </div>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-medium truncate">{student.name}</h3>
          <p className="text-sm text-foreground/70 truncate">{student.email}</p>
        </div>
        <div className="text-right">
          <div className={cn(
            "font-medium",
            getAttendanceColorClass()
          )}>
            {student.attendancePercentage}%
          </div>
          {student.lastAttendance && (
            <p className="text-xs text-foreground/60">
              Last: {student.lastAttendance}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default StudentCard;
