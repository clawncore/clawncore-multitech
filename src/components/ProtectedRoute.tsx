import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, openLoginModal } = useAuth();

    React.useEffect(() => {
        if (!isAuthenticated) {
            // Show login modal instead of redirecting
            openLoginModal();
        }
    }, [isAuthenticated, openLoginModal]);

    // Only render children if authenticated
    return isAuthenticated ? <>{children}</> : null;
}