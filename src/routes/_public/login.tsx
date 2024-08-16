import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/auth";
import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_public/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({ to: search.redirect || "/" });
    }
  },
  component: Page,
});

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { login, user, isAuthenticated } = useAuth();

  const onSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmerEmail = email.trim();
    const trimmedPassword = password.trim();
    if (trimmerEmail === "" || trimmedPassword === "") {
      toast("Please enter email and password");
      return;
    }

    await login(trimmerEmail, trimmedPassword);

    await router.invalidate();
    await navigate({ to: search.redirect || "/" });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmitClick}
        className="flex flex-col items-center justify-center w-[30%] gap-6"
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <Button>Login</Button>
      </form>
    </div>
  );
}
