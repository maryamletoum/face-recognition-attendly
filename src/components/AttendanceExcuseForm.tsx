
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import GlassCard from './ui/GlassCard';
import { FileText } from 'lucide-react';

type AttendanceExcuseFormProps = {
  studentName: string;
  studentId: string;
  date: Date;
  onSubmit: (data: {
    excuseType: string;
    notes: string;
  }) => void;
  onCancel: () => void;
};

const AttendanceExcuseForm: React.FC<AttendanceExcuseFormProps> = ({
  studentName,
  studentId,
  date,
  onSubmit,
  onCancel
}) => {
  const [excuseType, setExcuseType] = useState<string>('');
  const [notes, setNotes] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ excuseType, notes });
  };

  return (
    <GlassCard>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">Add Excuse for Absence</h2>
          <p className="text-sm text-foreground/70">Student: {studentName} (ID: {studentId})</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="excuseType">Excuse Type</Label>
            <Select value={excuseType} onValueChange={setExcuseType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select excuse type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="family">Family Emergency</SelectItem>
                <SelectItem value="academic">Academic Commitment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Add details about this excuse..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <FileText className="w-4 h-4 mr-2" />
              Submit Excuse
            </Button>
          </div>
        </div>
      </form>
    </GlassCard>
  );
};

export default AttendanceExcuseForm;
