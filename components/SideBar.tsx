"use client";
import { FC, ReactNode, Suspense, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion as m, AnimatePresence } from "framer-motion";
import classnames from "classnames";
import { Icon, Switcher, Text } from "@components/index";
interface SideBarProps {
  children: ReactNode;
}

const SideBar: FC<SideBarProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [isToggle, setToggle] = useState(false);
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
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setToggle(!isToggle);
  }

  useEffect(() => {
    const data = window.localStorage.getItem("theme");
    data === "dark" && setToggle(!isToggle);
  }, []);

  return (
    <div className="flex " suppressHydrationWarning>
      {/*       // ! The Main SideBar */}
      <m.div
        animate={{
          width: open ? "320px" : "85px",
          transition: {
            duration: 1,
            type: "spring",
            damping: 15,
          },
        }}
        className={classnames(
          "fixed w-20 h-screen p-4  bg-slate-200 dark:bg-slate-900  border-slate-400 dark:border-slate-700 border-r-[1px] flex flex-col  justify-between ",
          open ? "items-center" : " "
        )}>
        {/*  // ? This is the close and open menu */}
        <m.div className="p-2 my-2" animate={{ translateX: open ? 100 : 0 }}>
          <AnimatePresence>
            {!open ? (
              <Icon
                onClick={() => setOpen(!open)}
                name="align-justify"
                color={isToggle ? "#fff" : "#ddd"}
                size={34}></Icon>
            ) : (
              <Icon
                //@ts-ignore
                name="x"
                onClick={() => setOpen(!open)}
                color={!isToggle ? "#fff" : "#ddd"}
                size={35}
                className={
                  open ? "bg-slate-300 dark:bg-slate-700 " : " "
                }></Icon>
            )}
          </AnimatePresence>
        </m.div>
        {/*    // ? This the LI */}
        {selected.map((item) => (
          <Link
            onClick={() => handleClick(item.id)}
            key={item.id}
            href={item.href}
            className="border-b-[0.5px] dark:border-slate-500  border-slate-300 flex justify-between items-center w-[85%]"
            title={item.label}>
            <Icon
              className={classnames(
                "w-10 p-2 my-3 rounded-md shadow-md hover:bg-slate-300 border-b-[1px] border-r-[1px] border-l-[1px] dark:border-slate-500  border-slate-300",
                item.isSelected ? "bg-slate-300 " : " "
                /*                open ? " mr-[160px]  " : " " */
              )}
              //@ts-ignore
              name={item.classImg}
              color={!isToggle ? "#fff" : "#bbb"}
              size={40}
              alt="icons"></Icon>

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
                "w-10 p-2   ",
                open ? "mr-44" : "",
                isToggle ? " transition-all  duration-300 rotate-180" : ""
              )}
              size={34}
              onClick={handleChange}></Icon>
            {open && <Switcher checked={!isToggle} onChange={handleChange} />}
          </div>
        ) : (
          <div className="flex items-center justify-between w-[85%]">
            <Icon
              className={classnames(
                "w-10 p-2   ",
                open ? "mr-0" : "",
                isToggle ? " transition-all  duration-300 rotate-180" : ""
              )}
              name="sun"
              color={isToggle ? "#fff" : "#ddd"}
              size={37}
              onClick={handleChange}></Icon>
            {open && <Switcher checked={!isToggle} onChange={handleChange} />}
          </div>
        )}
      </m.div>
      <main className="w-full ml-32">{children}</main>
    </div>
  );
};

export default SideBar;
