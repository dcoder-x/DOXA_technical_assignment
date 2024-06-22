"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const router = useRouter();

  React.useEffect(() => {
    if (!isSignedIn) {
      router.push('/'); // Redirect to signin if the sign in state is false
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null; // 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
