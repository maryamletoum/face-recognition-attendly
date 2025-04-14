
import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RoleBasedAccessProps {
  allowedRoles: string[];
  fallback?: ReactNode;
  children: ReactNode;
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ 
  allowedRoles, 
  fallback = null,
  children 
}) => {
  const { isLoggedIn, userRole } = useAuth();
  
  if (!isLoggedIn || !userRole) {
    return <>{fallback}</>;
  }
  
  if (allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

export default RoleBasedAccess;
