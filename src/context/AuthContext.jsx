import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from local storage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const text = await res.text();
            let data;
            try { data = JSON.parse(text); } catch (e) { throw new Error('Invalid response from server'); }
            setCurrentUser({ uid: data.user.id, email: data.user.email });
            setUserProfile(data.user);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Failed to verify token', error);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Register
  const register = async (userData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    let data;
    try { data = await res.json(); } catch (e) {
      const error = new Error('Server returned an invalid response. Please try again.');
      error.code = 'auth/network-error';
      throw error;
    }

    if (!res.ok) {
      const error = new Error(data.error);
      error.code = data.code;
      throw error;
    }

    localStorage.setItem('token', data.token);
    setCurrentUser({ uid: data.user.id, email: data.user.email });
    setUserProfile(data.user);
    
    return data.user;
  };

  // Login
  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try { data = await res.json(); } catch (e) {
      const error = new Error('Server returned an invalid response. Please try again.');
      error.code = 'auth/network-error';
      throw error;
    }

    if (!res.ok) {
      const error = new Error(data.error);
      error.code = data.code;
      throw error;
    }

    localStorage.setItem('token', data.token);
    setCurrentUser({ uid: data.user.id, email: data.user.email });
    setUserProfile(data.user);

    return data.user;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Delete account (Not implemented in local backend yet, placeholder)
  const deleteAccount = async (password) => {
    throw new Error('Delete account not implemented in local SQLite version yet');
  };

  const fetchUserProfile = async () => {
     // Local user profile is already fetched in initAuth or login/register
     return userProfile;
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    register,
    login,
    logout,
    deleteAccount,
    fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
