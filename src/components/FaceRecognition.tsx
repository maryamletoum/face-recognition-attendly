
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import GlassCard from './ui/GlassCard';
import { useToast } from '@/hooks/use-toast';

const FaceRecognition: React.FC = () => {
  const { toast } = useToast();

  const startAttendanceSession = () => {
    toast({
      title: "Attendance session started",
      description: "Session has been started successfully. Students can now check in.",
    });
  };

  return (
    <GlassCard className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Start Attendance Session</h2>
      
      <div className="relative w-full max-w-md mx-auto bg-black/5 rounded-lg overflow-hidden aspect-video">
        <div className="w-full h-full flex items-center justify-center bg-black/5">
          <Button onClick={startAttendanceSession}>
            <Users className="w-4 h-4 mr-2" />
            Start Attendance Session
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-foreground/70">
        <p>Start an attendance session to begin recording student attendance for this class.</p>
      </div>
    </GlassCard>
  );
};

export default FaceRecognition;
