"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "@/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Loader2 } from "lucide-react";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
    signInWithGoogle: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // MOCK USER FOR DEVELOPMENT
    useEffect(() => {
        const mockUser: any = {
            uid: "mock-user-id",
            displayName: "Test User",
            email: "test@example.com",
            photoURL: null, // or a placeholder image URL
            emailVerified: true,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: "",
            tenantId: null,
            delete: async () => { },
            getIdToken: async () => "mock-token",
            getIdTokenResult: async () => ({
                token: "mock-token",
                signInProvider: "google",
                claims: {},
                authTime: Date.now().toString(),
                issuedAtTime: Date.now().toString(),
                expirationTime: (Date.now() + 3600000).toString(),
            }),
            reload: async () => { },
            toJSON: () => ({}),
            phoneNumber: null,
            providerId: "firebase",
        };

        setUser(mockUser);
        setLoading(false);
    }, []);

    const logout = async () => {
        // await signOut(auth);
        console.log("Mock logout called");
        window.location.reload(); // Optional: reload to simulate "reset", but mock user will just come back.
    };

    const signInWithGoogle = async () => {
        console.log("Mock sign in called - already logged in as mock user");
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, signInWithGoogle }}>
            {loading ? (
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <Loader2 className="size-8 animate-spin text-primary" />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
