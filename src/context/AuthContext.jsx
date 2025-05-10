import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { 
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        setError(null);
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            setError(error.message);
            console.error("Erro no login:", error);
            throw error;
        }
    };

    const logout = async () => {    
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao sair:", error);
            throw error;
        }
    };

    const value = {
        currentUser,
        loginWithGoogle,
        logout,
        loading,
        error
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};




