"use client";
import { Switch } from "@headlessui/react";
import { FC, ReactNode } from "react";

interface SwitcherProps {
  checked: any;
  onChange: any;
  className?: ReactNode;
}

const Switcher: FC<SwitcherProps> = ({ checked, onChange, className }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={
        `${checked ? "bg-slate-400" : "bg-cyan-500"} 
                  relative inline-flex h-[19px] w-[32px]  shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75` +
        className
      }>
      <span className="sr-only">Dark Mode</span>
      <span
        aria-hidden="true"
        className={
          `${checked ? "translate-x-3" : "translate-x-0"}
                    pointer-events-none inline-block h-[14px] w-[14px]  transform rounded-full bg-white dark: shadow-lg ring-0 transition duration-200 ease-in-out` +
          className
        }
      />
    </Switch>
  );
};

export default Switcher;
