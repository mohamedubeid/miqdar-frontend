import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, LogOut, User } from 'lucide-react';
import Link from "next/link";

const UserDropDownMenu = () => {
  const userName = "Mohamed Ubeid";
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
            <AvatarImage src="https://github.com/shadcdn.png" />
            <AvatarFallback className="text-primary bg-primary-100">{initials}</AvatarFallback>
          </Avatar>
          محمد عبدالله
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
        <DropdownMenuItem className="text-red-600">
          تسجيل الخروج
          <DropdownMenuShortcut className="ml-0 mr-auto"><LogOut size={16} className="text-red-600" /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropDownMenu