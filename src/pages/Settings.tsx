import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import NotificationBell from '@/components/NotificationBell';
import { Cloud, Lock, Save, Server, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Settings</h1>
            <p className="text-foreground/70">Manage your account and application preferences</p>
          </div>
          <NotificationBell />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="md:col-span-1">
            <FadeIn>
              <GlassCard>
                <nav className="space-y-1">
                  {[
                    { id: 'account', label: 'Account', icon: <User className="w-5 h-5" /> },
                    { id: 'security', label: 'Security', icon: <Lock className="w-5 h-5" /> },
                    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
                    { id: 'system', label: 'System', icon: <Server className="w-5 h-5" /> },
                    { id: 'ai', label: 'AI Recognition', icon: <Cloud className="w-5 h-5" /> },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3">
            <FadeIn delay={100}>
              <GlassCard>
                {activeTab === 'account' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-medium">
                          A
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium">Profile Picture</h3>
                          <p className="text-sm text-foreground/70">Update your profile photo</p>
                          <div className="mt-2 flex gap-2">
                            <Button variant="outline" size="sm">Upload</Button>
                            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">Remove</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 rounded-lg border border-border glass" 
                            defaultValue="Admin User"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input 
                            type="email" 
                            className="w-full px-3 py-2 rounded-lg border border-border glass" 
                            defaultValue="admin@attendly.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Role</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 rounded-lg border border-border glass bg-secondary/30" 
                            defaultValue="Administrator"
                            readOnly
                          />
                          <p className="text-xs text-foreground/70 mt-1">Your role determines your permissions in the system</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Change Password</h3>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Current Password</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 rounded-lg border border-border glass" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">New Password</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 rounded-lg border border-border glass" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Confirm Password</label>
                          <input 
                            type="password" 
                            className="w-full px-3 py-2 rounded-lg border border-border glass" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-foreground/70">Add an extra layer of security to your account</p>
                        
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border mt-2">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-foreground/70">Not enabled</p>
                          </div>
                          <Button variant="outline">Enable</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                    
                    <div className="space-y-6">
                      {[
                        { id: 'email', title: 'Email Notifications', description: 'Receive email notifications for important events' },
                        { id: 'attendance', title: 'Attendance Alerts', description: 'Get notified when a student is marked absent' },
                        { id: 'system', title: 'System Notifications', description: 'Updates about system maintenance and upgrades' },
                        { id: 'reports', title: 'Weekly Reports', description: 'Receive weekly attendance and performance reports' },
                      ].map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-foreground/70">{item.description}</p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/25 transition-colors">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-primary translate-x-6 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'system' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">System Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Application Settings</h3>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Default Language</label>
                          <select className="w-full px-3 py-2 rounded-lg border border-border glass">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Time Zone</label>
                          <select className="w-full px-3 py-2 rounded-lg border border-border glass">
                            <option>UTC-5 (Eastern Time)</option>
                            <option>UTC-6 (Central Time)</option>
                            <option>UTC-7 (Mountain Time)</option>
                            <option>UTC-8 (Pacific Time)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Attendance Threshold</label>
                          <input 
                            type="number" 
                            className="w-full px-3 py-2 rounded-lg border border-border glass" 
                            defaultValue="85"
                          />
                          <p className="text-xs text-foreground/70 mt-1">Minimum attendance percentage required</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Data Management</h3>
                        
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border mt-2">
                          <div>
                            <p className="font-medium">Backup Data</p>
                            <p className="text-sm text-foreground/70">Last backup: Never</p>
                          </div>
                          <Button variant="outline">Backup Now</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'ai' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">AI Recognition Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary">
                            <Cloud className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">AI System Status</h3>
                            <p className="text-sm text-foreground/70 mt-1">The face recognition system is operational and running normally.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Recognition Confidence Threshold</label>
                          <input 
                            type="range" 
                            min="60" 
                            max="99" 
                            defaultValue="85"
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-foreground/70">
                            <span>Low (60%)</span>
                            <span>Medium (80%)</span>
                            <span>High (95%+)</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Camera Settings</label>
                          <select className="w-full px-3 py-2 rounded-lg border border-border glass">
                            <option>Default Camera</option>
                            <option>External USB Camera</option>
                            <option>IP Camera</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                          <div>
                            <p className="font-medium">Automatic Face Recognition</p>
                            <p className="text-sm text-foreground/70">Enable automatic face detection and recognition</p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/25 transition-colors">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-primary translate-x-6 transition-transform" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Face Recognition Model</h3>
                        <p className="text-sm text-foreground/70">Update the AI model or retrain with new data</p>
                        
                        <div className="flex items-center justify-between p-4 rounded-lg border border-border mt-2">
                          <div>
                            <p className="font-medium">Model Version: 1.2.5</p>
                            <p className="text-sm text-foreground/70">Last updated: 2 months ago</p>
                          </div>
                          <Button variant="outline">Update Model</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </GlassCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
