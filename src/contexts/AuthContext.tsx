import React, { createContext, useContext, useEffect, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || '';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'creator' | 'admin';
  tier: 'starter' | 'growth' | 'premium';
  avatar?: string;
}

interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, tier?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

function devMockUser(email: string, name?: string, tier?: string): AuthUser {
  return {
    id: 'mock_' + Date.now(),
    email,
    name: name || email.split('@')[0],
    role: 'creator',
    tier: (tier as AuthUser['tier']) || 'growth',
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cf_user');
    const token = localStorage.getItem('cf_token');
    if (stored && token) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('cf_user'); localStorage.removeItem('cf_token'); }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('cf_user', JSON.stringify(data.user));
        localStorage.setItem('cf_token', data.token);
        return;
      }
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Invalid credentials');
    } catch (e) {
      if (!(e instanceof TypeError)) throw e;
      if (!import.meta.env.DEV) throw new Error('Unable to connect to server. Please try again.');
      // Network error in DEV — fall back to dynamic mock
      const u = devMockUser(email);
      const token = 'mock_jwt_' + Date.now();
      setUser(u);
      localStorage.setItem('cf_user', JSON.stringify(u));
      localStorage.setItem('cf_token', token);
    }
  };

  const signup = async (name: string, email: string, password: string, tier = 'growth') => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, tier }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('cf_user', JSON.stringify(data.user));
        localStorage.setItem('cf_token', data.token);
        return;
      }
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Signup failed');
    } catch (e) {
      if (!(e instanceof TypeError)) throw e;
      if (!import.meta.env.DEV) throw new Error('Unable to connect to server. Please try again.');
      // Network error in DEV — fall back to dynamic mock
      const u = devMockUser(email, name, tier);
      const token = 'mock_jwt_' + Date.now();
      setUser(u);
      localStorage.setItem('cf_user', JSON.stringify(u));
      localStorage.setItem('cf_token', token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cf_user');
    localStorage.removeItem('cf_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
