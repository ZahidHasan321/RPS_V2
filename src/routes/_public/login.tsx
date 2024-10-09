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
  const [teacher_id, setTeacher_id] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { login } = useAuth();

  const onSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTeacher_id = Number(teacher_id.trim());
    const trimmedPassword = password.trim();
    if (trimmedPassword === "") {
      toast("Please enter email and password");
      return;
    }

    if (isNaN(Number(trimmedTeacher_id))) {
      toast("Please enter a valid teacher id");
      return;
    }

    login(trimmedTeacher_id, trimmedPassword).then(() => {
      router.invalidate().then(() => {
        navigate({ to: search.redirect || "/" });
      });
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmitClick}
        className="flex flex-col items-center justify-center w-[30%] gap-6"
      >
        <Input
          value={teacher_id}
          onChange={(e) => setTeacher_id(e.target.value)}
          placeholder="Teacher id"
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
