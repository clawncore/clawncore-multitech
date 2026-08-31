import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
    phone?: string;
    theme?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoggingIn: boolean;
    loginModalOpen: boolean;
    setLoginModalOpen: (open: boolean) => void;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<{ success: boolean; message: string; requiresOtp?: boolean }>;
    verifyOtp: (email: string, otp: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function supabaseUserToUser(supabaseUser: SupabaseUser): User {
    return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        firstName: supabaseUser.user_metadata?.first_name || supabaseUser.email?.split('@')[0] || '',
        lastName: supabaseUser.user_metadata?.last_name || '',
        profileImageUrl: supabaseUser.user_metadata?.profile_image_url || '',
        phone: supabaseUser.phone || '',
        createdAt: supabaseUser.created_at,
        updatedAt: supabaseUser.updated_at,
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // Listen for Supabase auth state changes
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser(supabaseUserToUser(session.user));
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(supabaseUserToUser(session.user));
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoggingIn(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.error('Login error:', error.message);
                return false;
            }
            setLoginModalOpen(false);
            return true;
        } catch (err) {
            console.error('Login error:', err);
            return false;
        } finally {
            setIsLoggingIn(false);
        }
    };

    const register = async (email: string, password: string): Promise<{ success: boolean; message: string; requiresOtp?: boolean }> => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: email.split('@')[0],
                        last_name: '',
                    }
                }
            });
            if (error) {
                return { success: false, message: error.message };
            }
            return { success: true, message: 'Registration successful. Check your email for verification.', requiresOtp: false };
        } catch (err) {
            return { success: false, message: 'Registration failed' };
        }
    };

    const verifyOtp = async (email: string, otp: string, _password: string): Promise<{ success: boolean; message: string }> => {
        try {
            const { error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'signup',
            });
            if (error) {
                return { success: false, message: error.message };
            }
            setLoginModalOpen(false);
            return { success: true, message: 'Email verified' };
        } catch (err) {
            return { success: false, message: 'Verification failed' };
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const openLoginModal = () => {
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoggingIn,
        loginModalOpen,
        setLoginModalOpen,
        login,
        register,
        verifyOtp,
        logout,
        openLoginModal,
        closeLoginModal
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
