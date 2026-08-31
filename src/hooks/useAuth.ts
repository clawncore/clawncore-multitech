import { useAuth as useAuthContext } from "@/contexts/AuthContext";

export function useAuth() {
  const auth = useAuthContext();

  return {
    user: auth.user,
    isLoading: false,
    isAuthenticated: auth.isAuthenticated,
    login: auth.login,
    logout: auth.logout,
    openLoginModal: auth.openLoginModal,
    closeLoginModal: auth.closeLoginModal,
    isLoggingIn: auth.isLoggingIn,
  };
}