import { createContext, useContext, useState, useEffect } from 'react';
import db from '../data/handler';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const register = (email, password) => db.auth.signUp({ email, password });
const login = (email, password) =>
  db.auth.signInWithPassword({ email, password });
const logout = () => db.auth.signOut();

export const AuthProvdier = ({ children }) => {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data } = await db.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setLoading(false);
    })();
    const { data } = db.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        setAuth(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvdier;
