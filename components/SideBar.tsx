"use client";
import { FC, ReactNode, Suspense, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion as m, AnimatePresence } from "framer-motion";
import classnames from "classnames";
import { Icon, Switcher, Loader, Text } from "@components/index";

interface SideBarProps {
  children: ReactNode;
}

const SideBar: FC<SideBarProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();
  const [isToggle, setToggle] = useState(theme === "dark");
  const listItems = [
    {
      id: 0,
      classImg: "warehouse",
      label: "Home",
      href: "/",
      isSelected: true,
    },
    {
      id: 1,
      classImg: "calendar-range",
      label: "Customers",
      href: "/customers",
      isSelected: false,
    },
    {
      id: 2,
      classImg: "bar-chart-4",
      label: "Analytics",
      href: "/analytics",
      isSelected: false,
    },
    {
      id: 3,
      classImg: "calendar-days",
      label: "Tasks",
      href: "/tasks",
      isSelected: false,
    },
  ];
  const handleClick = (id: number) => {
    setSelected(
      selected.map((d) =>
        d.id === id
          ? { ...d, isSelected: !d.isSelected }
          : { ...d, isSelected: false }
      )
    );
  };
  const [selected, setSelected] = useState(listItems);
  function handleChange() {
    setTheme(theme === "dark" ? "light" : "dark");
    setToggle(!isToggle);
  }

  useEffect(() => {
    const data = window.localStorage.getItem("theme");
    data === "dark" && setToggle(true);
  }, []);

  return (
    <div className="flex ">
      {/*       // ! The Main SideBar */}
      <m.div
        animate={{
          width: open ? "320px" : "90px",
          transition: {
            duration: 1,
            type: "spring",
            damping: 15,
          },
        }}
        className={classnames(
          "fixed w-20 h-screen p-4 items-center bg-slate-100 dark:bg-slate-900  border-slate-300 dark:border-slate-200 border-r-[1px] flex flex-col justify-between "
        )}>
        {/*  // ? This is the close and open menu */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, translateX: open ? 100 : 0 }}>
          <AnimatePresence>
            {!open ? (
              <Icon
                onClick={() => setOpen(!open)}
                /*                 className={classnames(
                  " ",
                  open ? " bg-slate-300 transition-all duration-500 " : ""
                )} */
                name="align-justify"
                color={isToggle ? "#fff" : "#ddd"}
                size={24}></Icon>
            ) : (
              <Icon
                onClick={() => setOpen(!open)}
                className={classnames(
                  "w-10 p-2 rounded-md cursor-pointer hover:bg-slate-300",
                  open
                    ? "mr-0 bg-slate-300 transition-all duration-500 ease-linear  delay-200"
                    : ""
                )}
                //@ts-ignore
                name="x"
                color={!isToggle ? "#fff" : "#ddd"}
                size={24}></Icon>
            )}
          </AnimatePresence>
        </m.div>
        {/*    // ? This the LI */}
        {selected.map((item) => (
          <Link
            onClick={() => handleClick(item.id)}
            key={item.id}
            href={item.href}
            className="border-b-[1px] p-1 m-[-10px] dark:border-slate-500  border-slate-300 flex justify-between items-center"
            title={item.label}>
            <Suspense fallback={<Loader />}>
              <Icon
                className={classnames(
                  "w-10 p-2 my-3 rounded-md shadow-md hover:bg-slate-300 border-b-[1px] border-r-[1px] border-l-[1px] dark:border-slate-500  border-slate-300",
                  item.isSelected ? "bg-slate-300 " : " ",
                  open ? " mr-[160px]  " : " "
                )}
                //@ts-ignore
                name={item.classImg}
                color={!isToggle ? "#fff" : "#bbb"}
                size={24}
                alt="icons"></Icon>
            </Suspense>
            <div className={classnames(open ? "w-10" : " ")}>
              {open && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, translateX: open ? -30 : 0 }}>
                  <AnimatePresence>
                    <Text size="p">{item.label}</Text>
                  </AnimatePresence>
                </m.div>
              )}
            </div>
          </Link>
        ))}
        {/* //? here is the Theming */}

        {isToggle ? (
          <div className="flex items-center ">
            <Icon
              name="moon"
              color={isToggle ? "#fff" : "#ddd"}
              className={classnames(
                "w-10 p-2  rounded-md cursor-pointer hover:bg-slate-300",
                open ? "mr-44" : "",
                isToggle ? " transition-all  duration-300 rotate-180" : ""
              )}
              size={0}
              onClick={handleChange}></Icon>
            {open && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{
                  transition: { duration: 1 },
                  translateX: -30,
                  opacity: 1,
                }}
                transition={{ duration: 1, type: "spring", damping: 15 }}
                className="z-20 w-full m-1">
                <Switcher checked={isToggle} onChange={handleChange} />
              </m.div>
            )}
          </div>
        ) : (
          <div className="flex items-center cursor-pointer">
            <Icon
              name="sun"
              color={isToggle ? "#fff" : "#ddd"}
              className={classnames(
                "w-10 p-2  rounded-md cursor-pointer hover:bg-slate-300",
                open ? "" : "",
                isToggle ? " " : "transition-all  duration-300 rotate-0 "
              )}
              size={24}
              onClick={handleChange}></Icon>
            {open && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{
                  transition: { duration: 1 },
                  translateX: -30,
                  opacity: 1,
                }}
                transition={{ duration: 1, type: "spring", damping: 15 }}
                className="z-20 w-full m-1">
                <Switcher checked={isToggle} onChange={handleChange} />
              </m.div>
            )}
          </div>
        )}
      </m.div>
      <main className="w-full ml-32">{children}</main>
    </div>
  );
};

export default SideBar;
