
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowLeft, Save, User, Mail, Key, Upload, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';

const NewTeacher: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    subjects: '',
  });
  
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The passwords you entered don't match",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this data to your API
    // For now, we'll just show a success message
    toast({
      title: "Teacher added successfully",
      description: `${formData.name} has been added as a teacher`,
    });
    
    // Navigate back to teachers list
    navigate("/teachers");
  };
  
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      
      toast({
        title: "Profile picture uploaded",
        description: "The profile picture has been successfully updated",
      });
    }
  };
  
  const handleRemoveProfilePicture = () => {
    // Revoke the object URL to avoid memory leaks
    if (profilePicture) {
      URL.revokeObjectURL(profilePicture);
    }
    
    setProfilePicture(null);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast({
      title: "Profile picture removed",
      description: "The profile picture has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Add New Teacher</h1>
            <p className="text-foreground/70">Create a new teacher account</p>
          </div>
          <BackButton />
        </div>
        
        <FadeIn>
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-4">
                <Avatar className="w-24 h-24 mb-4">
                  {profilePicture ? (
                    <AvatarImage src={profilePicture} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleProfilePictureClick}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  
                  {profilePicture && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handleRemoveProfilePicture}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-border glass"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-border glass"
                      placeholder="teacher@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 rounded-lg border border-border glass"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-border glass"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subjects" className="block text-sm font-medium mb-1">
                    Subjects/Courses
                  </label>
                  <textarea
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border glass"
                    rows={3}
                    placeholder="Web Development, Data Structures, etc. (comma separated)"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-border">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Add Teacher
                </Button>
              </div>
            </form>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default NewTeacher;
