import React, { createContext, useContext, useState, useEffect } from 'react';

export const ADMIN_CREDENTIALS = {
  email: 'debabratamandal200615@gmail.com',
  password: 'Debu@2006',
};

interface AuthContextType {
  isAdminLoggedIn: boolean;
  adminEmail: string | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'patlu_admin_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return isAdminLoggedIn ? ADMIN_CREDENTIALS.email : null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && cleanPass === ADMIN_CREDENTIALS.password) {
      setIsAdminLoggedIn(true);
      setAdminEmail(ADMIN_CREDENTIALS.email);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (err) {
        console.error('Failed to save session:', err);
      }
      setIsLoginModalOpen(false);
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Invalid Login ID or Password. Please check credentials.',
      };
    }
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setAdminEmail(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear session:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminEmail,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
