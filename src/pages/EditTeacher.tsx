
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { useToast } from "@/hooks/use-toast";
import BackButton from '@/components/BackButton';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Upload, Trash } from "lucide-react";

// Sample teacher data - in a real app, you would fetch this from your backend
const teachers = [
  {
    id: "1",
    name: "Dr. Robert Smith",
    email: "robert.smith@example.com",
    subjects: "Web Development, Mobile App Development",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, Academic City, AC 12345",
    bio: "Dr. Smith has over 15 years of experience in web technologies and mobile application development. He has published numerous papers on modern frontend frameworks.",
    status: "Active"
  },
  {
    id: "2",
    name: "Prof. Emily Johnson",
    email: "emily.johnson@example.com",
    subjects: "Database Systems, Data Structures",
    phone: "+1 (555) 234-5678",
    address: "456 College Blvd, Academic City, AC 12345",
    bio: "Prof. Johnson specializes in database architecture and optimization. She previously worked at major tech companies developing large-scale data systems.",
    status: "Active"
  },
  {
    id: "3",
    name: "Dr. Michael Williams",
    email: "michael.williams@example.com",
    subjects: "Web Development, UI/UX Design",
    phone: "+1 (555) 345-6789",
    address: "789 Education Dr, Academic City, AC 12345",
    bio: "Dr. Williams combines technical expertise with design principles to create engaging user experiences. He leads workshops on UI/UX best practices.",
    status: "Active"
  },
  {
    id: "4",
    name: "Prof. Sarah Davis",
    email: "sarah.davis@example.com",
    subjects: "Mobile App Development, Data Structures",
    phone: "+1 (555) 456-7890",
    address: "101 Learning Lane, Academic City, AC 12345",
    bio: "Prof. Davis focuses on efficient algorithms and mobile development. She has developed several popular educational apps used in universities worldwide.",
    status: "On Leave"
  }
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subjects: z.string().min(2, "Subject information is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  status: z.string(),
});

const EditTeacher: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const teacher = teachers.find(t => t.id === id);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subjects: "",
      phone: "",
      address: "",
      bio: "",
      status: "Active",
    }
  });

  useEffect(() => {
    if (teacher) {
      form.reset({
        name: teacher.name,
        email: teacher.email,
        subjects: teacher.subjects,
        phone: teacher.phone || "",
        address: teacher.address || "",
        bio: teacher.bio || "",
        status: teacher.status,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Teacher not found",
      });
      navigate('/teachers');
    }
  }, [teacher, form, toast, navigate]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you would update the teacher in your backend
    toast({
      title: "Teacher Updated",
      description: "Teacher information has been updated successfully",
    });
    navigate('/teachers');
  };

  const handleUploadPicture = () => {
    // In a real app, you would upload the image to a server
    const dummyUrl = "https://i.pravatar.cc/150?u=" + Date.now();
    setProfilePicture(dummyUrl);
    toast({
      title: "Profile Picture Uploaded",
      description: "The profile picture has been updated",
    });
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    toast({
      title: "Profile Picture Removed",
      description: "The profile picture has been removed",
    });
  };

  if (!teacher) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <BackButton className="mr-2" />
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Edit Teacher</h1>
            <p className="text-foreground/70">
              Update teacher information
            </p>
          </div>
        </div>

        <FadeIn>
          <GlassCard className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden mb-4">
                  {profilePicture ? (
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl font-medium text-primary">
                      {teacher.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUploadPicture}
                  >
                    <Upload className="w-4 h-4 mr-1" /> Upload
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!profilePicture}
                    onClick={handleRemovePicture}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Enter email address" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subjects"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subjects</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Web Development, Database Systems" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="On Leave">On Leave</SelectItem>
                                <SelectItem value="Sabbatical">Sabbatical</SelectItem>
                                <SelectItem value="Retired">Retired</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biography</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter teacher biography" 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end pt-4">
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default EditTeacher;
