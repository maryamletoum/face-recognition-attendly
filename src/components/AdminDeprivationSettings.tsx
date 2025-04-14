
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlassCard from './ui/GlassCard';
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDeprivationSettings: React.FC = () => {
  const [maxAbsencePercentage, setMaxAbsencePercentage] = useState('15');
  const [totalSessions, setTotalSessions] = useState('30');
  const [autoNotifyTeacher, setAutoNotifyTeacher] = useState(true);
  const [autoNotifyStudent, setAutoNotifyStudent] = useState(true);
  const [notifyAtPercentage, setNotifyAtPercentage] = useState('10');
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Deprivation rules have been updated successfully.",
    });
  };
  
  return (
    <div>
      <div className="p-4 bg-amber-500/10 border border-amber-200 rounded-lg mb-6">
        <div className="flex gap-2 items-center">
          <AlertTriangle className="text-amber-500 w-5 h-5" />
          <h3 className="text-amber-500 font-medium">Important Information</h3>
        </div>
        <p className="text-foreground/70 mt-2 text-sm">
          These settings determine when a student becomes eligible for deprivation 
          (disqualification from course completion) due to excessive absences. Only administrators can modify these settings.
        </p>
      </div>
      
      <div className="space-y-6">
        <GlassCard>
          <h3 className="font-medium mb-4">Deprivation Thresholds</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxAbsence">Maximum Absence Percentage</Label>
                <div className="flex">
                  <Input
                    id="maxAbsence"
                    type="number"
                    min="1"
                    max="100"
                    value={maxAbsencePercentage}
                    onChange={(e) => setMaxAbsencePercentage(e.target.value)}
                    className="rounded-r-none"
                  />
                  <div className="bg-secondary/30 px-3 flex items-center border border-l-0 border-input rounded-r-md">
                    %
                  </div>
                </div>
                <p className="text-xs text-foreground/70">
                  Students exceeding this absence percentage will be eligible for deprivation
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalSessions">Total Course Hours/Sessions</Label>
                <Input
                  id="totalSessions"
                  type="number"
                  min="1"
                  value={totalSessions}
                  onChange={(e) => setTotalSessions(e.target.value)}
                />
                <p className="text-xs text-foreground/70">
                  The total number of hours/sessions for a typical course
                </p>
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Current Deprivation Rule</Label>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <span className="text-primary font-medium">{maxAbsencePercentage}%</span> of <span className="text-primary font-medium">{totalSessions}</span> hours
                {' '}= <span className="text-primary font-medium">{Math.ceil(Number(totalSessions) * Number(maxAbsencePercentage) / 100)}</span> hours of absence will trigger deprivation
              </div>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard>
          <h3 className="font-medium mb-4">Notification Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifyTeacher" className="mb-1 block">Notify Teachers</Label>
                <p className="text-xs text-foreground/70">
                  Send notifications to teachers when students approach deprivation threshold
                </p>
              </div>
              <Switch
                id="notifyTeacher"
                checked={autoNotifyTeacher}
                onCheckedChange={setAutoNotifyTeacher}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifyStudent" className="mb-1 block">Notify Students</Label>
                <p className="text-xs text-foreground/70">
                  Send warnings to students when they approach deprivation threshold
                </p>
              </div>
              <Switch
                id="notifyStudent"
                checked={autoNotifyStudent}
                onCheckedChange={setAutoNotifyStudent}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notifyAt">Early Warning Threshold</Label>
              <div className="flex">
                <Input
                  id="notifyAt"
                  type="number"
                  min="1"
                  max="100"
                  value={notifyAtPercentage}
                  onChange={(e) => setNotifyAtPercentage(e.target.value)}
                  className="rounded-r-none"
                  disabled={!autoNotifyStudent && !autoNotifyTeacher}
                />
                <div className="bg-secondary/30 px-3 flex items-center border border-l-0 border-input rounded-r-md">
                  %
                </div>
              </div>
              <p className="text-xs text-foreground/70">
                Notifications will be sent when a student reaches this percentage of absences
              </p>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard>
          <h3 className="font-medium mb-4">Institutional Settings</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year Format</Label>
              <Select defaultValue="fall-spring">
                <SelectTrigger id="academicYear">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fall-spring">Fall-Spring (Sep-Jun)</SelectItem>
                  <SelectItem value="calendar">Calendar Year (Jan-Dec)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deprivationApproval">Deprivation Approval Process</Label>
              <Select defaultValue="teacher-confirm">
                <SelectTrigger id="deprivationApproval">
                  <SelectValue placeholder="Select process" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Automatic</SelectItem>
                  <SelectItem value="teacher-confirm">Teacher Confirmation</SelectItem>
                  <SelectItem value="admin-confirm">Admin Confirmation</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-foreground/70">
                Who needs to approve a student's deprivation status
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDeprivationSettings;
