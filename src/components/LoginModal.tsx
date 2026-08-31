import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
    const { login, register, verifyOtp, isLoggingIn } = useAuth();
    const [mode, setMode] = useState<'signin' | 'signup' | 'verify-otp'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (mode === 'signin') {
            const result = await login(email, password);
            if (!result) {
                setError('Invalid email or password');
            }
        } else if (mode === 'signup') {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
            const result = await register(email, password);
            if (result.success && result.requiresOtp) {
                setSuccess('OTP sent to your email. Please check your inbox.');
                setMode('verify-otp');
            } else {
                setError(result.message);
            }
        } else if (mode === 'verify-otp') {
            const result = await verifyOtp(email, otp, password);
            if (!result.success) {
                setError(result.message);
            }
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        onOpenChange(newOpen);
        if (!newOpen) {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setOtp('');
            setMode('signin');
            setError('');
            setSuccess('');
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        {mode === 'signin' && 'Welcome Back'}
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'verify-otp' && 'Verify Email'}
                    </DialogTitle>
                    <DialogDescription className="text-center sr-only">
                        {mode === 'signin'
                            ? 'Sign in to your account'
                            : mode === 'signup'
                            ? 'Create a new account'
                            : 'Enter the OTP sent to your email'}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-200">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="login-modal-email">Email</Label>
                        <Input
                            id="login-modal-email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={mode === 'verify-otp'}
                        />
                    </div>

                    {mode !== 'verify-otp' && (
                        <div className="space-y-2">
                            <Label htmlFor="login-modal-password">Password</Label>
                            <Input
                                id="login-modal-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="space-y-2">
                            <Label htmlFor="login-modal-confirm-password">Confirm Password</Label>
                            <Input
                                id="login-modal-confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {mode === 'verify-otp' && (
                        <div className="space-y-2">
                            <Label htmlFor="login-modal-otp">One-Time Password</Label>
                            <Input
                                id="login-modal-otp"
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                            />
                        </div>
                    )}

                    <Button className="w-full" type="submit" disabled={isLoggingIn}>
                        {isLoggingIn
                            ? 'Processing...'
                            : mode === 'signin'
                            ? 'Sign In'
                            : mode === 'signup'
                            ? 'Sign Up'
                            : 'Verify & Complete'}
                    </Button>
                </form>

                <div className="text-sm text-muted-foreground text-center pt-2">
                    {mode === 'signin' && (
                        <>
                            Don't have an account?{' '}
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
                            >
                                Sign up
                            </Button>
                        </>
                    )}
                    {mode === 'signup' && (
                        <>
                            Already have an account?{' '}
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => { setMode('signin'); setError(''); setSuccess(''); }}
                            >
                                Sign in
                            </Button>
                        </>
                    )}
                    {mode === 'verify-otp' && (
                        <>
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
                            >
                                Back to sign up
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
