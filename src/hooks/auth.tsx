import { AuthContext } from "@/context/authContext";
import { AuthContextType } from "@/type";
import { useContext } from "react";

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
