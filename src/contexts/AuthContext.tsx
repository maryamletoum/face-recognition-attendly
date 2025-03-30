
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  userEmail: string | null;
  userName: string | null;
  login: (email: string, password: string, role: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');
    
    if (storedRole && storedEmail) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setUserEmail(storedEmail);
      setUserName(storedName);
    }
  }, []);

  const login = (email: string, password: string, role: string) => {
    // In a real app, this would validate credentials with a backend
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
    
    // Store in localStorage
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    
    navigate('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);
    setUserName(null);
    
    // Clear localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    navigate('/');
  };

  const isAdmin = () => userRole === 'admin';
  const isTeacher = () => userRole === 'teacher';

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userRole, 
        userEmail,
        userName,
        login, 
        logout,
        isAdmin,
        isTeacher
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create a higher-order component for role-based access control
export const withRoleAccess = (allowedRoles: string[]) => 
  <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
      const { isAuthenticated, userRole } = useAuth();
      
      if (!isAuthenticated) {
        return <div>Please log in to access this page.</div>;
      }
      
      if (!userRole || !allowedRoles.includes(userRole)) {
        return <div>You don't have permission to access this page.</div>;
      }
      
      return <Component {...props} />;
    };
  };
