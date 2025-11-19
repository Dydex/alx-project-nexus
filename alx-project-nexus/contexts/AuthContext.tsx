import { createContext, useState, useContext } from "react";

interface AuthContextProps {
  email: string;
  setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");

  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
