import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User as UserIcon, Mail, Calendar, Shield, LogOut } from 'lucide-react';
import { MinimalBackground } from '@/components/3d/MinimalBackground';

// Define the user type
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  theme?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Profile() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const userData = user as User;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MinimalBackground />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userData.profileImageUrl} alt={userData.firstName || userData.email} />
                    <AvatarFallback className="bg-blue-600 text-blue-600 text-2xl">
                      {userData.firstName ? userData.firstName.charAt(0) : userData.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">
                      {userData.firstName} {userData.lastName}
                    </h2>
                    <p className="text-muted-foreground">{userData.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Joined {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                  <Separator />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="md:w-2/3 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserIcon className="mr-2 h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">First Name:</span>
                        <span className="ml-2">{userData.firstName || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Name:</span>
                        <span className="ml-2">{userData.lastName || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <span className="ml-2">{userData.email}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Account Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Member Since:</span>
                        <span className="ml-2">
                          {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span className="ml-2">
                          {userData.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your security settings and connected applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your account is secured.
                    </p>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Connected Applications</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      No third-party applications are connected to your account.
                    </p>
                    <Button variant="outline" size="sm">
                      Manage Applications
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}