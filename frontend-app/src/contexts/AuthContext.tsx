import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  role: string;
  don_vi_id?: string;
  ho_ten?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isRole: (...roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null, token: null,
  login: () => {}, logout: () => {}, isRole: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const userData = {
          id: decoded.sub || decoded.id,
          email: decoded.email,
          role: decoded.role || decoded.vai_tro,
          don_vi_id: decoded.don_vi_id,
          ho_ten: decoded.ho_ten
        };
        setUser(userData);
      } catch {
        setToken(null);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isRole = (...roles: string[]) => user ? roles.includes(user.role) : false;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
