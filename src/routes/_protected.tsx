import NavHeader from "@/components/navigation/navHeader";
import useAuth from "@/hooks/auth";
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_protected")({
  component: LayoutComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

export default function LayoutComponent() {
  const { logout } = useAuth();
  const navigate = Route.useNavigate();
  const router = useRouter();
  const location = useLocation();

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function onLogoutClick() {
    logout()
      .then(() => {
        router.invalidate().finally(async () => {
          await sleep(1000);
          navigate({ to: "/" });
        });
      })
      .catch((error) => {
        toast("Unable to logout");
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col">
      {location.pathname.includes("/exam/pdf/") === false && (
        <NavHeader logout={onLogoutClick} />
      )}
      <Outlet />
    </div>
  );
}
