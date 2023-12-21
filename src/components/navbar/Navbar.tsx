import { RootState } from "@/store/store";
import { User } from "@/types/userType";
import { useAppSelector } from "@/hook/Redux";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { removeUser } from "@/store/features/user/userSlice";
import { useDispatch } from "react-redux";
import { Role } from "@/enums/Role";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  // next router
  const router = useRouter();

  // Redux State
  const user: User = useAppSelector(
    (state: RootState) => state.user.value as User
  );
  const dispatch = useDispatch();

  // user logout
  const logout = () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // go to admin panel
  const goToAdminPanel = () => {
    router.push("/admin");
  };

  // go to dashboard
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  // go to account settings
  const goToAccountSettings = () => {
    router.push("/settings");
  };

  // go to my profile
  const goToMyProfile = () => {
    router.push("/profile");
  };

  return (
    <nav className="h-12 border-b-[1px] border-gray-300 flex flex-row items-center justify-between">
      <Link href="/dashboard" className="ml-4 font-bold">
        HELP DESK
      </Link>
      <div>
        {/* TODO: Add Shortcut functions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
              <div className="ml-2">
                {user?.name} {user?.surname}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>title: {user?.title.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => goToMyProfile()}>
                My Profile
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={goToDashboard}>
                Dashboard
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => goToAccountSettings()}>
                Account Settings
                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
              {user?.role === Role.ADMIN.toString() && (
                <DropdownMenuItem onClick={goToAdminPanel}>
                  Admin Panel
                  <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={logout}>
                Log Out
                <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
