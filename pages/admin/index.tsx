// pages/admin/index.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

// pages/admin/index.tsx

type Props = {
  user: {
    email: string;
    role: string;
  };
};

export default function AdminPage({ user }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">👑 Area Admin</h1>
      <p>Benvenuto {user.email ?? "Utente non loggato"}</p>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  console.log("🔑 Server-side session:", session);

  if (!session || session.user?.role !== "admin") {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session.user?.email ?? "",
        role: session.user?.role ?? "",
      },
    },
  };
}
