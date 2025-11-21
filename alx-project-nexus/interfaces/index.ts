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
