"use client";
import { userLoggedOut } from "@/redux/auth/authSlice";
import { RootState } from "@/redux/store";
import { Menu } from "@/svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// prop type
type IProps = {
  setSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const default_user = "/admin/assets/img/users/user-10.jpg";
const Header = ({ setSideMenu }: IProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchOverlay, setSearchOverlay] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const pRef = useRef<HTMLDivElement>(null);
  const nRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  // handle logout
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    router.push(`/login`);
  };

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent running on the server

    const handleClickOutside = (e: any) => {
      if (!pRef?.current?.contains(e.target)) {
        setProfileOpen(false);
      }
      if (!nRef?.current?.contains(e.target)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationOpen = () => {
    setNotificationOpen(!notificationOpen);
    setProfileOpen(false);
  };
  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
    setNotificationOpen(false);
  };

  return (
    <>
      <header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-8 pr-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-6 lg:space-x-0">
            <button
              onClick={() => setSideMenu((prev) => !prev)}
              type="button"
              className="block lg:hidden text-2xl text-black"
            >
              <Menu />
            </button>
          </div>

          <div className="flex items-center justify-end space-x-6">
            <div
              ref={pRef}
              className="relative w-[70%] flex justify-end items-center"
            >
              <button
                onClick={handleProfileOpen}
                className="relative"
                type="button"
              >
                {user?.image ? (
                  <Image
                    className="w-[40px] h-[40px] rounded-md"
                    src={user.image}
                    alt="user-img"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : (
                  <Image
                    className="w-[40px] h-[40px] rounded-md"
                    src={default_user}
                    alt="user-img"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                )}
                <span className="w-[12px] h-[12px] inline-block bg-green-500 rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white"></span>
              </button>

              {profileOpen && (
                <div className="absolute w-[280px] top-full right-0 shadow-lg rounded-md bg-white py-5 px-5">
                  <div className="flex items-center space-x-3 border-b border-gray pb-3 mb-2">
                    <div>
                      <Image
                        className="w-[50px] h-[50px] rounded-md"
                        src={user?.image ? user.image : default_user}
                        alt="user-img"
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <div>
                      <h5 className="text-base mb-1 leading-none">
                        {user?.name}
                      </h5>
                      <p className="mb-0 text-tiny leading-none">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link
                        href="/profile"
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Account Settings
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={handleLogOut}
                        style={{ cursor: "pointer" }}
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
