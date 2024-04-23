import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, createContext, useContext, useState } from "react";
import { IconType } from "react-icons/lib";
import { LuChevronFirst, LuChevronLast, LuLogOut } from "react-icons/lu";
import Cookies from "js-cookie";
import { Cookie, Storage } from "@/lib";
import { toast } from "react-toastify";

const SidebarContext = createContext({ isExpanded: false });

const Sidebar: FC<{
  menus: Array<SidebarItemProps>;
}> = (props) => {
  const { menus } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <aside className="min-h-screen">
      <nav className="min-h-screen flex flex-col bg-white border-r shadow-sm">
        <div className="md:p-4 md:pb-2 p-3 pb-1 flex justify-between items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={100}
            className={clsx(`overflow-hidden transition-all`, {
              "md:w-32 w-24": isExpanded,
              "w-0": !isExpanded,
            })}
          />
          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? (
              <LuChevronFirst className="md:w-6 md:h-6 w-4 h-4" />
            ) : (
              <LuChevronLast className="md:w-6 md:h-6 w-4 h-4" />
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="flex md:p-3 p-1.5 md:mx-1.5 mx-2 mb-4 sm:mb-2">
            <Image
              src="/images/female.png"
              height={100}
              width={100}
              alt="Avatar"
              className="md:w-10 md:h-10 w-7 h-7 rounded-lg"
            />

            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                isExpanded ? "md:w-52 md:ml-3 w-36 ml-1.5" : "w-0"
              }`}
            >
              <div className="md:leading-4 leading-3">
                <h4 className="font-semibold md:text-base text-sm">
                  {Cookie.getName() + Storage.load("accessToken")}
                </h4>
                <span className="text-xs text-gray-600 capitalize">
                  {Cookie.getLevel()}
                </span>
              </div>
            </div>
          </div>
        )}

        <SidebarContext.Provider value={{ isExpanded }}>
          <ul className="flex-1 px-3">
            {menus.map((menu, idx) => (
              <SidebarItem key={idx} {...menu} />
            ))}

            <SidebarItem text="Keluar" icon={LuLogOut} logout />
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default Sidebar;

export type SidebarItemProps = {
  icon: IconType;
  text: string;
  active?: boolean;
  alert?: boolean;
  link?: string;
  logout?: boolean;
};

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { isExpanded } = useContext(SidebarContext);
  const router = useRouter();

  const onClick = () => {
    if (
      props.logout &&
      confirm("Apakah Anda yakin ingin keluar dari aplikasi ?")
    ) {
      const cookieKeys = [
        "user_id",
        "level",
        "access_token",
        "email",
        "name",
        "employee_id",
      ];

      cookieKeys.forEach((item) => Cookies.remove(item));
      Storage.remove("accessToken");

      toast.success("Terima kasih sudah menggunakan aplikasi");

      router.replace("/auth/login");
    }

    if (props.link) router.push(props.link);
  };

  return (
    <li
      onClick={onClick}
      className={clsx(
        `relative flex justify-center items-center md:py-2 md:px-3 py-1.5 px-1 my-0.5 font-medium rounded-md cursor-pointer transition-colors`,
        {
          "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800":
            props.active,
          "hover:bg-indigo-50 text-gray-600": !props.active,
        }
      )}
    >
      <props.icon className="md:w-6 md:h-6 w-4 h-4" />

      {isExpanded && (
        <span
          className={`overflow-hidden transition-all md:text-base text-sm ${
            isExpanded ? "md:w-52 w-36 md:ml-3 ml-1.5" : "w-0 "
          }`}
        >
          {props.text}
        </span>
      )}

      {props.alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            isExpanded && "top-0"
          }`}
        ></div>
      )}

      {/* {!isExpanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-2 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0">
          {props.text}
        </div>
      )} */}
    </li>
  );
};
