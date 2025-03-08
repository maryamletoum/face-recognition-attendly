
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, User, X, RefreshCw } from "lucide-react";
import GlassCard from './ui/GlassCard';
import { toast } from '@/hooks/use-toast';

const FaceRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognizedName, setRecognizedName] = useState<string | null>(null);
  const [faceBoundingBox, setFaceBoundingBox] = useState<{ x: number, y: number, width: number, height: number } | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera access error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setFaceBoundingBox(null);
    }
  };

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0, 0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
      }
    }
  };

  const simulateRecognition = () => {
    setIsRecognizing(true);
    
    // Simulate face detection process
    setTimeout(() => {
      setFaceBoundingBox({
        x: 220,
        y: 100,
        width: 200,
        height: 200
      });
      
      // Simulate face recognition after detection
      setTimeout(() => {
        setIsRecognizing(false);
        setRecognizedName("John Smith");
        toast({
          title: "Student identified",
          description: "John Smith has been successfully recognized.",
        });
      }, 2000);
    }, 1500);
  };

  const resetRecognition = () => {
    setRecognizedName(null);
    setFaceBoundingBox(null);
  };

  return (
    <GlassCard className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Face Recognition</h2>
      
      <div className="relative w-full max-w-md mx-auto bg-black rounded-lg overflow-hidden aspect-video">
        {isStreaming ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            <canvas 
              ref={canvasRef} 
              className="hidden"
            />
            
            {/* Overlay for face detection */}
            {faceBoundingBox && (
              <div
                className="absolute border-2 border-primary animate-pulse"
                style={{
                  left: `${faceBoundingBox.x}px`,
                  top: `${faceBoundingBox.y}px`,
                  width: `${faceBoundingBox.width}px`,
                  height: `${faceBoundingBox.height}px`
                }}
              />
            )}
            
            {/* Recognition status overlay */}
            {isRecognizing && (
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20">
                <div className="flex flex-col items-center gap-2 text-white">
                  <RefreshCw className="h-8 w-8 animate-spin" />
                  <p>Recognizing...</p>
                </div>
              </div>
            )}
            
            {/* Recognition result overlay */}
            {recognizedName && !isRecognizing && (
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20">
                <div className="glass border border-green-200 text-center px-4 py-3 rounded-lg max-w-[80%]">
                  <div className="w-16 h-16 rounded-full border-2 border-green-500 bg-green-500/10 flex items-center justify-center mx-auto mb-2">
                    <User className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">{recognizedName}</h3>
                  <p className="text-sm text-foreground/70 mb-3">Attendance recorded successfully</p>
                  <Button size="sm" onClick={resetRecognition}>
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {/* Close button */}
            <button
              className="absolute top-2 right-2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              onClick={stopCamera}
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black/5">
            <Button onClick={startCamera}>
              <Camera className="w-4 h-4 mr-2" />
              Start Camera
            </Button>
          </div>
        )}
      </div>
      
      {isStreaming && !recognizedName && !isRecognizing && (
        <div className="flex justify-center">
          <Button onClick={simulateRecognition}>
            Recognize Student
          </Button>
        </div>
      )}
      
      <div className="text-sm text-foreground/70">
        <p>Position your face clearly in the camera view for accurate recognition.</p>
      </div>
    </GlassCard>
  );
};

export default FaceRecognition;
