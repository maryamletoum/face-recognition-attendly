
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import GlassCard from './ui/GlassCard';
import { Save, Info } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

type DeprivationSettingsProps = {
  className?: string;
};

const DeprivationSettings: React.FC<DeprivationSettingsProps> = ({ className }) => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    deprivationThreshold: 15, // Percentage
    totalCourseHours: 45,
    sendEmailToStudent: true,
    notifyTeachers: true,
    requireConfirmation: true,
    autoDeprive: false,
  });
  
  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    toast({
      title: "Settings saved",
      description: "Deprivation rules have been updated",
    });
  };

  return (
    <GlassCard className={className}>
      <h3 className="text-lg font-semibold mb-4">Attendance & Deprivation Rules</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="deprivationThreshold">Deprivation Threshold (%)</Label>
            <Input
              id="deprivationThreshold"
              type="number"
              min="1"
              max="100"
              value={settings.deprivationThreshold}
              onChange={(e) => setSettings({...settings, deprivationThreshold: parseInt(e.target.value)})}
            />
            <p className="text-sm text-foreground/60">
              Students are deprived when their absence exceeds this percentage
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="totalCourseHours">Total Course Hours</Label>
            <Input
              id="totalCourseHours"
              type="number"
              min="1"
              value={settings.totalCourseHours}
              onChange={(e) => setSettings({...settings, totalCourseHours: parseInt(e.target.value)})}
            />
            <p className="text-sm text-foreground/60">
              Total number of hours in a course
            </p>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border/30">
          <h4 className="text-md font-medium mb-3">Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sendEmailToStudent" className="cursor-pointer">Send email to student when absent</Label>
                <p className="text-sm text-foreground/60">Notify student via email after each absence</p>
              </div>
              <Switch
                id="sendEmailToStudent"
                checked={settings.sendEmailToStudent}
                onCheckedChange={(checked) => setSettings({...settings, sendEmailToStudent: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifyTeachers" className="cursor-pointer">Notify teachers of deprivation status</Label>
                <p className="text-sm text-foreground/60">Alert teachers when a student becomes deprived</p>
              </div>
              <Switch
                id="notifyTeachers"
                checked={settings.notifyTeachers}
                onCheckedChange={(checked) => setSettings({...settings, notifyTeachers: checked})}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border/30">
          <h4 className="text-md font-medium mb-3">Approval Process</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireConfirmation" className="cursor-pointer">Require teacher confirmation</Label>
                <p className="text-sm text-foreground/60">Teachers must confirm deprivation status</p>
              </div>
              <Switch
                id="requireConfirmation"
                checked={settings.requireConfirmation}
                onCheckedChange={(checked) => setSettings({...settings, requireConfirmation: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoDeprive" className="cursor-pointer">Auto-deprive students</Label>
                <p className="text-sm text-foreground/60">Automatically deprive students when threshold is reached</p>
              </div>
              <Switch
                id="autoDeprive"
                checked={settings.autoDeprive}
                onCheckedChange={(checked) => setSettings({...settings, autoDeprive: checked})}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-200 rounded-md">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
          <div>
            <h5 className="font-medium text-blue-700 dark:text-blue-300">How deprivation works</h5>
            <p className="text-sm text-foreground/70 mt-1">
              Deprivation status is calculated based on the percentage of course hours missed. 
              When a student's absence exceeds the threshold percentage, they may become deprived from 
              the course. Teachers can verify absence excuses and confirm deprivation status.
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default DeprivationSettings;
