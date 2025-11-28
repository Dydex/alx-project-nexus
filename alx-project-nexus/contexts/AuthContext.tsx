import { createContext, useState, useContext } from "react";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  email: string;
  setEmail: (email: string) => void;
  signUpData: SignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <AuthContext.Provider
      value={{ email, setEmail, signUpData, setSignUpData }}
    >
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
