"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewsPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome Home</h1>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/news"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Go to Home
              </Link>
              <div className="flex items-center gap-2">
                <Image
                  src="/user-icon.png"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  );
}