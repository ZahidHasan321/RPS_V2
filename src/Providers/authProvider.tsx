import { AuthContext } from "@/context/authContext";
import secureAxios from "@/lib/interceptor";
import { User } from "@/type";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const key = "auth.user";

function getStoredUser() {
  const storedUser = localStorage.getItem(key);
  return storedUser ? JSON.parse(storedUser) : null;
}

function setStoredUser(user: User | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  const login = useCallback(async (teacher_id: number, password: string) => {
    const data = await axios
      .post(
        import.meta.env.VITE_API_URL + "/login/teacher",
        {
          teacher_id,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((res) => res.data);

    if (data.session_id) {
      setUser(data.user);
      setStoredUser(data.user);

      localStorage.setItem("sessionID", data.session_id);
    } else {
      toast("Unable to login");
    }
  }, []);

  const logout = useCallback(async () => {
    return secureAxios.post("/logout").then(() => {
      setUser(null);
      setStoredUser(null);
      localStorage.removeItem("sessionID");
    });
  }, []);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setUser(user);
    } else {
      logout();
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
