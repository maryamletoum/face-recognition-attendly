
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import GlassCard from './ui/GlassCard';

type AttendanceSearchProps = {
  onSearch: (params: { studentName: string; date: Date | undefined }) => void;
};

const AttendanceSearch: React.FC<AttendanceSearchProps> = ({ onSearch }) => {
  const [studentName, setStudentName] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSearch = () => {
    onSearch({ studentName, date });
  };

  return (
    <GlassCard className="mb-6">
      <h3 className="text-lg font-medium mb-4">Search Attendance Records</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
          <Input
            placeholder="Search by student name..."
            className="pl-10"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setIsCalendarOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Button 
          className="sm:col-span-3"
          onClick={handleSearch}
        >
          <Search className="w-4 h-4 mr-2" />
          Search Records
        </Button>
      </div>
    </GlassCard>
  );
};

export default AttendanceSearch;
