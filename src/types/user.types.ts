
export interface User {
  username: string;
  email: string;
}

export interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
}