import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, LogOut, User } from 'lucide-react';
import Link from "next/link";
import { logout } from "@/actions/auth";
import { User as UserType } from "@/lib/definitions";

interface UserDropDownMenuProps {
  user: UserType;
}

const UserDropDownMenu = ({ user }: UserDropDownMenuProps) => {
  const userName = user.name;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="" asChild>
        <button className="flex items-center justify-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-primary bg-primary-100">{initials}</AvatarFallback>
          </Avatar>
          {userName}
          <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-46" align="center">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center w-full">
            الصفحة الشخصية
            <DropdownMenuShortcut className="ml-0 mr-auto">
              <User size={16} />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600"   onClick={async (e) => {
          e.preventDefault();
          await logout();
        }}>
          تسجيل الخروج
          <DropdownMenuShortcut className="ml-0 mr-auto"><LogOut size={16} className="text-red-600" /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropDownMenu