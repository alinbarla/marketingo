import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User } from '../types';
import { debug } from '../lib/debug';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (profile: Partial<User>) => Promise<void>;
  updateUserRole: (role: 'user' | 'motoservice') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Add loading timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        debug.log('warn', 'Auth loading timeout reached, resetting state');
        setLoading(false);
        setUser(null);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  // Handle auth errors gracefully
  const handleAuthError = (error: any) => {
    debug.log('error', 'Auth error:', error);
    setUser(null);
    setLoading(false);
  };

  // Separate session check from profile fetch for faster initial load
  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      debug.log('info', 'Session check result:', { hasSession: !!session });
      if (error) throw error;
      return session;
    } catch (error) {
      handleAuthError(error);
      return null;
    }
  };

  const fetchUserProfile = async (userId: string) => {
    debug.log('info', 'Fetching user profile for:', userId);
    const { data, error } = await supabase
      .from('users')
      .select('id, role, full_name, email, avatar_url, verified')
      .eq('id', userId)
      .single();
    
    return { data, error };
  };

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;
    const MAX_RETRIES = 3;

    async function initAuth() {
      if (!mounted) return;

      try {
        const session = await checkSession();
        debug.log('info', 'Initial auth check complete');

        if (!session?.user) {
          setUser(null);
          setLoading(false);
          return;
        }

        const { data: userData, error } = await fetchUserProfile(session.user.id);
        debug.log('info', 'User profile fetch result:', { hasData: !!userData });

        if (userData && !error) {
          setUser(userData);
        } else if (error?.code === 'PGRST116') {
          // User doesn't exist, create profile
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .upsert({
              id: session.user.id,
              role: 'user',
              full_name: session.user.user_metadata?.full_name || '',
              email: session.user.email || '',
              avatar_url: session.user.user_metadata?.avatar_url || ''
            })
            .select('*')
            .single();

          debug.log('info', 'New user profile created:', { success: !!newUser });
          if (!createError && newUser) {
            setUser(newUser);
          } else {
            debug.log('error', 'Failed to create user profile:', createError);
            setUser(null);
            setLoading(false);
            return;
          }
        }

        setLoading(false);
      } catch (error) {
        debug.log('error', 'Error checking session:', error);
        setUser(null);
        setLoading(false);
      }
    }

    initAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (!mounted) return;

        if (!session) {
          setUser(null);
          setLoading(false);
          return;
        }

        debug.log('info', 'Auth state changed, fetching profile');
        const { data: userData, error } = await fetchUserProfile(session.user.id);

        timeoutId = setTimeout(() => {
          if (!error && userData) {
            setUser(userData);
          } else {
            debug.log('error', 'Error fetching user profile on auth change:', error);
            setUser(null);
          }
          setLoading(false);
        }, 100);
      } catch (error) {
        debug.log('error', 'Auth state change error:', error);
        
        // Only clear user if we're sure there's an error
        if (error instanceof Error && 
            !error.message.includes('Failed to fetch') && 
            !error.message.includes('Network')) {
          setUser(null);
        }

        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      debug.log('info', 'Starting Google sign in');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/services`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        debug.log('error', 'Google sign in error', error);
        throw error;
      }

      debug.log('info', 'Google sign in initiated');
    } catch (error) {
      debug.log('error', 'Google sign in failed', error);
      handleAuthError(error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate('/login');
    } catch (error) {
      debug.log('error', 'Error signing out:', error);
      throw error;
    }
  };

  const updateUserRole = async (role: 'user' | 'motoservice') => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user?.id);

      if (error) throw error;

      setUser(user ? { ...user, role } : null);
      navigate('/services');
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  const updateUserProfile = async (profile: Partial<User>) => {
    try {
      const { error } = await supabase
        .from('users')
        .update(profile)
        .eq('id', user?.id);

      if (error) throw error;

      setUser(user ? { ...user, ...profile } : null);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    updateUserProfile,
    updateUserRole
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