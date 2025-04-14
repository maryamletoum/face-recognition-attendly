
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/hooks/use-notifications';

type DeprivationNotificationProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  student: {
    id: string;
    name: string;
    absenceRate: number;
    courseId: string;
    courseName: string;
  };
};

const DeprivationNotification: React.FC<DeprivationNotificationProps> = ({
  isOpen,
  onOpenChange,
  student
}) => {
  const [notes, setNotes] = useState('');
  const { toast } = useToast();
  const { isTeacher } = useAuth();
  const { addNotification } = useNotifications();

  const handleConfirm = () => {
    if (isTeacher()) {
      toast({
        title: "Deprivation confirmed",
        description: `${student.name} has been officially deprived from ${student.courseName}.`,
      });
      
      // Add notification about the confirmed deprivation
      addNotification(
        "Student Deprivation Confirmed", 
        `${student.name} has been officially deprived from ${student.courseName}.`
      );
    } else {
      toast({
        title: "Deprivation notification sent",
        description: `${student.name} will be notified of their deprivation status.`,
      });
    }
    
    onOpenChange(false);
  };
  
  const handleReject = () => {
    if (isTeacher()) {
      toast({
        title: "Deprivation rejected",
        description: `${student.name} will remain enrolled in ${student.courseName}.`,
      });
      
      // Add notification about the rejected deprivation
      addNotification(
        "Student Deprivation Rejected", 
        `${student.name} will remain enrolled in ${student.courseName}.`
      );
    } else {
      toast({
        title: "Deprivation canceled",
        description: `${student.name} will not be deprived from the course.`,
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-amber-500">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Student Deprivation Warning
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="p-4 bg-amber-500/10 border border-amber-200 rounded-lg mb-4">
            <h3 className="font-medium mb-2">{student.name}</h3>
            <p className="text-sm text-foreground/70 mb-1">
              Course: {student.courseName}
            </p>
            <p className="text-sm text-foreground/70 mb-2">
              Student ID: {student.id}
            </p>
            <div className="font-medium text-amber-500">
              Absence Rate: {student.absenceRate}%
            </div>
            <p className="text-sm mt-2 text-amber-500">
              This student has exceeded the allowed absence threshold and is eligible for deprivation.
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
            <Textarea
              placeholder="Add any notes regarding this deprivation decision..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={handleReject}>
              <X className="w-4 h-4 mr-2" />
              {isTeacher() ? "Reject Deprivation" : "Cancel Deprivation"}
            </Button>
            <Button onClick={handleConfirm}>
              <Check className="w-4 h-4 mr-2" />
              {isTeacher() ? "Confirm Deprivation" : "Send Notification"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeprivationNotification;
