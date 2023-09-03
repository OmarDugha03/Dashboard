"use client";
import { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion as m, AnimatePresence } from "framer-motion";
import classnames from "classnames";
import { Switcher, Text } from "@components/index";
import {
  barChart,
  barChartW,
  calendarDays,
  calendarDaysW,
  calendarRang,
  calendarRangW,
  menu,
  menuW,
  moon,
  moonW,
  pieChart,
  sun,
  pieChartW,
  sunW,
  wareHouse,
  wareHouseW,
  x,
  xW,
} from "@Images/index";
import Image from "next/image";
const SideBar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [isToggle, setToggle] = useState(true);
  const listItems = [
    {
      id: 0,
      classImgW: wareHouseW,
      classImg: wareHouse,
      label: "Home",
      href: "/",
      isSelected: true,
    },
    {
      id: 1,
      classImgW: calendarRangW,
      classImg: calendarRang,
      label: "Customers",
      href: "/customers",
      isSelected: false,
    },
    {
      id: 2,
      classImgW: barChartW,
      classImg: barChart,
      label: "Analytics",
      href: "/analytics",
      isSelected: false,
    },
    {
      id: 3,
      classImgW: calendarDaysW,
      classImg: calendarDays,
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
    setToggle((prev) => !prev);
  }
  useEffect(() => {
    const data = window.localStorage.getItem("theme");
    data === "dark" ? setToggle(true) : setToggle(false);
  }, []);

  return (
    <div className="flex " suppressHydrationWarning>
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
        <m.div className="p-2 my-2" animate={{ translateX: open ? 100 : 0 }}>
          <AnimatePresence>
            {!open ? (
              <Image
                className={classnames(
                  "w-10 p-2 my-3 rounded-md shadow-md hover:bg-slate-300 border-b-[1px] border-r-[1px] border-l-[1px] dark:border-slate-500  border-slate-300"

                  /*                open ? " mr-[160px]  " : " " */
                )}
                onClick={() => setOpen(!open)}
                src={isToggle ? menuW : menu}
                alt={"menu"}></Image>
            ) : (
              <Image
                className={classnames(
                  "w-10 p-1 my-3 rounded-md shadow-md hover:bg-slate-300 border-b-[1px] border-r-[1px] border-l-[1px] dark:border-slate-500  border-slate-300"
                )}
                onClick={() => setOpen(!open)}
                src={isToggle ? xW : x}
                alt={"menu"}></Image>
            )}
          </AnimatePresence>
        </m.div>
        {selected.map((item) => (
          <Link
            suppressHydrationWarning
            onClick={() => handleClick(item.id)}
            key={item.id}
            href={item.href}
            className="border-b-[0.5px] dark:border-slate-500  border-slate-300 flex justify-between items-center w-[85%]"
            title={item.label}>
            <>
              {resolvedTheme === "light" && (
                <Image src={item.classImg} alt={"icons"} />
              )}
              {resolvedTheme === "dark" && (
                <Image src={item.classImgW} alt={"icons"} />
              )}
            </>
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
        {resolvedTheme === "light" ? (
          <div className="flex items-center ">
            <Image
              src={isToggle ? sunW : sun}
              onClick={handleChange}
              alt={"sun"}
              className={classnames(
                isToggle ? "transition-all  rotate-180 duration-200" : " "
              )}
            />
            {open && <Switcher checked={!isToggle} onChange={handleChange} />}
          </div>
        ) : (
          <div className="flex items-center justify-between w-[85%]">
            <Image
              onClick={handleChange}
              src={isToggle ? moonW : moon}
              alt={"moon"}
              className={classnames(
                isToggle ? "transition-all rotate-0 duration-200" : " "
              )}
            />
            {open && <Switcher checked={!isToggle} onChange={handleChange} />}
          </div>
        )}
      </m.div>
      <main className="w-full ml-32">{children}</main>
    </div>
  );
};

export default SideBar;
