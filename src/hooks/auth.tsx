import { AuthContext } from "@/context/authContext";
import { AuthContextType } from "@/type";
import { useContext } from "react";

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvide");
  return context;
}
