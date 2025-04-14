
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

type UserRole = 'admin' | 'teacher' | 'student' | null;

type AuthContextType = {
  isLoggedIn: boolean;
  userRole: UserRole;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userRole: null,
  login: async () => false,
  logout: () => {},
  isAdmin: () => false,
  isTeacher: () => false,
  isStudent: () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const { toast } = useToast();
  
  // In a real app, this would verify credentials against a backend
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple role assignment based on username prefix for demo
    if (username.startsWith('admin') && password) {
      setUserRole('admin');
      setIsLoggedIn(true);
      return true;
    } else if (username.startsWith('teacher') && password) {
      setUserRole('teacher');
      setIsLoggedIn(true);
      return true;
    } else if (password) {
      setUserRole('student');
      setIsLoggedIn(true);
      return true;
    }
    
    return false;
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const isAdmin = () => userRole === 'admin';
  const isTeacher = () => userRole === 'teacher' || userRole === 'admin';
  const isStudent = () => userRole === 'student';

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userRole, 
      login, 
      logout,
      isAdmin,
      isTeacher,
      isStudent
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
