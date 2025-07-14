import{ useState, useEffect, useContext, createContext } from 'react'
import api from '../api/config'
import type { AuthContextType } from '../interfaces/AuthContextType'
import type { User } from '../interfaces/User';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get('/usuarios/me', { withCredentials: true });
            setUser(res.data);
        }
        catch (err) {
            setUser(null);
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const login = async (email: string, password: string) => {
        await api.post('/usuarios/login', {'username': email, 'password': password}, { withCredentials: true})
        await fetchUser();
    }

    const logout = async () => {
        await api.post('/usuarios/logout', {}, {withCredentials: true});
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout}} >
            {children}
        </AuthContext.Provider>
    );
}


const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth
