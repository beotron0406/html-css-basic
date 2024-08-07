"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-blue-100">
        <div className="flex items-center">
          <div>
            <Link href="/">
              <Image
                src="/weblogo.png"
                alt="weblogo"
                className="mr-4"
                width={100}
                height={50}
              />
            </Link>
          </div>
          <div className="ml-4">
            <form className="flex" action="#">
              <input
                type="text"
                name="Search"
                list="location"
                placeholder="Locations"
                className="p-2 border border-gray-300 rounded"
              />
              <datalist id="location">
                <option value="Ha noi" />
                <option value="Hai Phong" />
                <option value="Hung Yen" />
                <option value="Da Nang" />
                <option value="TP Ho Chi Minh" />
                <option value="Vung Tau" />
              </datalist>
            </form>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="p-2 border border-gray-300 rounded mr-2"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded"
            >
              🔍
            </button>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center ml-4">
              <Image
                src="/user-icon.png"
                alt="User"
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                className="ml-4 p-2 border border-gray-300 rounded text-blue-700"
                href="/login"
              >
                Sign in
              </Link>
              <Link
                className="ml-4 p-2 border border-gray-300 rounded text-blue-900"
                href="/signup"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      <nav className="bg-blue-800 text-white p-4">
        <div className="flex justify-between items-center">
          <ul className="flex justify-between items-center w-full overflow-x-auto">
            <Link href="/news">Thời sự</Link>
            <Link href="/view">Góc nhìn</Link>
            <Link href="/world">Thế giới</Link>
            <Link href="/video">Video</Link>
            <Link href="/business">Kinh doanh</Link>
            <Link href="/property">Bất động sản</Link>
            <Link href="/science">Khoa học</Link>
            <Link href="/entertaiment">Giải trí</Link>
            <Link href="/todoapp">Todoapp</Link>
          </ul>
          <button className="md:hidden">&#9776;</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;