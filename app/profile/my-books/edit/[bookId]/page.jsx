import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function EditBook({params}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin?callbackUrl=/profile/my-books/edit/${params.bookId}`);

  return (
    <div>Edit book: {params.bookId}</div>
  );
}