
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show back button on main routes
  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return null;
  }
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={className} 
      onClick={handleGoBack}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;
