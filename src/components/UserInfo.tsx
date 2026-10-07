"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="absolute right-2 top-4 flex items-center gap-3 text-sm">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              {user?.image && <img alt="Avater" src={user?.image as string} />}
            </div>
          </div>
          <h2>{user?.name}</h2>

          <button
            onClick={handleSignout}
            className="btn btn-error btn-sm -mt-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link href={"/signin"}>
            <button className="btn btn-ghost text-neutral-700">সাইন ইন</button>
          </Link>

          <Link href={"/signup"}>
            <button className="btn btn-sm bg-red-700 px-3 py-1.5 font-semibold text-white">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
