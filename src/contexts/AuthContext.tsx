import React, { createContext, useContext, useEffect, useState } from 'react';

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

const MOCK_USER: AuthUser = {
  id: 'usr_01',
  email: 'creator@contentflow.ai',
  name: 'Alex Rivera',
  role: 'creator',
  tier: 'growth',
};

const MOCK_ADMIN: AuthUser = {
  id: 'usr_admin',
  email: 'admin@contentflow.ai',
  name: 'Admin User',
  role: 'admin',
  tier: 'premium',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cf_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
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
      // Network error — fall back to mock
      const u = email.includes('admin') ? MOCK_ADMIN : MOCK_USER;
      setUser(u);
      localStorage.setItem('cf_user', JSON.stringify(u));
      localStorage.setItem('cf_token', 'mock_jwt_token');
    }
  };

  const signup = async (name: string, email: string, password: string, tier = 'growth') => {
    try {
      const res = await fetch('/api/auth/signup', {
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
      // Network error — fall back to mock
      const u: AuthUser = { id: 'usr_new', email, name, role: 'creator', tier: tier as AuthUser['tier'] };
      setUser(u);
      localStorage.setItem('cf_user', JSON.stringify(u));
      localStorage.setItem('cf_token', 'mock_jwt_token');
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
