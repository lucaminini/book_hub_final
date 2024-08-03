"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/UserAvatar";
import {
  Book,
  BookPlus,
  BookUser,
  Check,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  ShoppingBag,
  Sun,
} from "lucide-react";
import { signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "next-themes";

const UserButton = ({ session }) => {
  const user = session?.user;

  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full">
          <UserAvatar avatarUrl={session?.user?.image} size={40} />
        </button>
      </DropdownMenuTrigger>
      {user ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Book className="mr-2 h-4 w-4" />
              <span>Libri</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Link href="/profile/my-books">
                <DropdownMenuItem>
                  <BookUser className="mr-2 h-4 w-4" />
                  <span>I miei libri</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/my-books/add">
                <DropdownMenuItem>
                  <BookPlus className="mr-2 h-4 w-4" />
                  <span>Aggiungi libro</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Ordini</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Link href="/profile/orders">
                <DropdownMenuItem>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>I miei ordini</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/received-orders">
                <DropdownMenuItem>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Ordini ricevuti</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                Sistema
                {theme === "system" && <Check className="ms-2 size-4"/>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Scuro
                {theme === "dark" && <Check className="ms-2 size-4"/>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Chiaro
                {theme === "light" && <Check className="ms-2 size-4"/>}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Esci</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => signIn()}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Accedi</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
