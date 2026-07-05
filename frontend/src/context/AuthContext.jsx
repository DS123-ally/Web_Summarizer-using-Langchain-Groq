import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;

      setCurrentUser(user);

      if (user && ['/login', '/signup', '/'].includes(window.location.pathname)) {
        router.replace('/dashboard');
      }

      setLoading(false);
    });

    getRedirectResult(auth)
      .catch((error) => {
        console.error('Google sign-in redirect failed:', error);
      });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
