import { AuthContextType } from "@/type";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
