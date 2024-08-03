import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Edit } from "lucide-react";

import AddToCartBtn from "./AddToCartBtn";
import { isBookInUserCart, addToCart as addToCartQuery } from "@/lib/cart";

import { revalidatePath } from "next/cache";

const getBook = cache(async (bookId) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!book) notFound();

  return book;
});

export async function generateMetadata({ params: { bookId } }) {
  const book = await getBook(bookId);

  return {
    title: book.title,
  };
}

export async function addToCart(formData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session)
    redirect(`/api/auth/signin?callbackUrl=/books/${formData.get("bookId")}`);

  const userId = session.user.id;
  const bookId = formData.get("bookId");

  await addToCartQuery(userId, bookId);

  revalidatePath("/books/[bookId]", "page");
}

export default async function SelectedBook({ params: { bookId } }) {
  const book = await getBook(bookId);
  const session = await getServerSession(authOptions);

  const user = session?.user;

  const bookAlreadyInCart = user && (await isBookInUserCart(user.id, bookId));

  return (
    <div className="max-w-3xl m-auto px-3 my-20">
      <div className="bg-muted/40 shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={book.image}
              alt="Book Cover"
              width={300}
              height={400}
              className="rounded-lg w-full max-w-[300px] h-auto"
            />
            <div className="flex items-center gap-4 mt-4">
              <Image
                src={book.user.image}
                width={40}
                height={40}
                className="rounded-full self-center"
              />
              <div>
                <h3 className="font-semibold">{book.user.name}</h3>
                <p className="text-muted-foreground text-sm">Proprietario</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className="text-muted-foreground text-sm">ISBN: {book.isbn}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Prezzo</Label>
                <p className="font-semibold">{formatMoney(book.price)}</p>
              </div>
              <div>
                <Label className="text-sm">Condizione</Label>
                <p className="font-semibold">
                  {book.condition.replace("_", " ")}
                </p>
              </div>
              <div>
                <Label className="text-sm">Settore</Label>
                <p className="font-semibold">{book.sector}</p>
              </div>
              <div>
                <Label className="text-sm">Classe</Label>
                <p className="font-semibold">{book.course}</p>
              </div>
              <div>
                <Label className="text-sm">Materia</Label>
                <p className="font-semibold">{book.subject}</p>
              </div>
            </div>
            <div className="flex gap-4">
              {!user ? (
                ""
              ) : user?.id === book.ownerId ? (
                <Button variant="outline" asChild>
                  <Link href={`/profile/my-books/edit/${bookId}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Modifica</span>
                  </Link>
                </Button>
              ) : (
                <form action={addToCart}>
                  <input type="hidden" name="bookId" value={bookId} />
                  <AddToCartBtn
                    bookAlreadyInCart={bookAlreadyInCart || false}
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
