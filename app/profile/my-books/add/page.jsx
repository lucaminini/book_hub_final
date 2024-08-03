import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BookForm from "./BookForm";

export const metadata = {
  title: "Aggiungi libro"
};

export default async function AddBook() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin?callbackUrl=/profile/my-books/add");

  return (
    <BookForm session={session} />
  );
}