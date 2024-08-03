import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCart } from "@/lib/cart";
import UserButton from "./UserButton";
import CartBtn from "./CartBtn";

const getUserCart = async (userId) => {
  const cart = await getCart(userId);
  return cart;
};

// Put the search field

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const cart = session?.user.id ? await getUserCart(session.user.id) : {};

  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-5 py-3">
        <Button variant="ghost" asChild>
          <Link href="/" className="text-xl text-primary">
            <Image alt="logo" src="/favicon.ico" width={40} height={40} />
            <span className="ml-2 font-bold">BookHub</span>
          </Link>
        </Button>
        <div className="sm:ms-auto flex gap-5">
          {
            session?.user && <CartBtn cart={cart} />
          }
          <UserButton session={session} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
