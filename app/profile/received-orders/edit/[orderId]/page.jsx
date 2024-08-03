import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function EditReceivedOrder({params}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin?callbackUrl=/profile/received-orders/edit/${params.orderId}`);

  return (
    <div>Edit Received order: {params.orderId}</div>
  );
}