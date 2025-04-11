
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Users } from "lucide-react";
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
        <div className="w-full h-full flex flex-col items-center justify-center bg-black/5 p-4">
          <Shield className="w-12 h-12 text-primary mb-3" />
          <div className="text-center">
            <h3 className="font-medium mb-1">External Hardware Required</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Taking attendance requires a hardware device that is controlled by staff members.
            </p>
            <Button onClick={startAttendanceSession}>
              <Users className="w-4 h-4 mr-2" />
              Start Attendance Session
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-foreground/70">
        <p>Start an attendance session to begin recording student attendance for this class.</p>
        <p className="mt-2 text-amber-600">Note: Students cannot take attendance. This feature requires special hardware access.</p>
      </div>
    </GlassCard>
  );
};

export default FaceRecognition;
