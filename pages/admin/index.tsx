import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin"); // se non loggato o non admin, vai al login
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">👑 Area Admin</h1>
      <p>Benvenuto {session.user.email}</p>
    </div>
  );
}
