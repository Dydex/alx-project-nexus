export interface ButtonProps {
  title: string;
  onPress?: () => void;
  bg: string;
  color: string;
  borderColor?: string;
}

export interface PillProps {
  title: string;
  onPress?: () => void;
  borderColor: string;
  borderRadius: number;
  color: string;
  icon: React.ReactNode;
  selected?: boolean;
}

export interface Poll {
  id: string;
  question: string;
  category: string;
  timeFrame: string;
  expiresIn: number;
  createdAt: number;
  options: { text: string; votes: number }[];
}

export interface PollState {
  polls: Poll[];
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthContextProps {
  email: string;
  setEmail: (email: string) => void;
  signUpData: SignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
}
