import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

export function AccountDropdown() {
    const { user, logout } = useAuth();
    const [, navigate] = useLocation();

    const handleLogout = () => {
        logout();
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSettingsClick = () => {
        // Handle settings click
    };

    // Use a default icon if no user data is available
    const renderUserIcon = () => {
        if (user?.firstName && user?.lastName) {
            // Show initials if we have both first and last name
            const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
            return (
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-pink-500 text-slate-900 rounded-full text-sm font-medium">
                    {initials}
                </div>
            );
        } else if (user?.email) {
            // Show first letter of email if we only have email
            const initial = user.email.charAt(0).toUpperCase();
            return (
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-pink-500 text-slate-900 rounded-full text-sm font-medium">
                    {initial}
                </div>
            );
        } else {
            // Show default user icon if no user data
            return <User className="h-4 w-4 text-slate-900" />;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full p-0">
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-slate-900 rounded-full transition-all duration-200">
                        {renderUserIcon()}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}