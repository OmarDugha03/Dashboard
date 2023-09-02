import { ReactNode } from "react";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
interface iconProps {
  name: keyof typeof dynamicIconImports;
  color: string;
  size: number;
  className?: ReactNode;
  onClick?: () => void;
}

const Icon = ({
  name,
  color,
  size,
  className,
  onClick,
  ...props
}: iconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return (
    <LucideIcon
      className={
        className +
        "p-2  rounded-md cursor-pointer hover:bg-slate-300 dark:bg-slate-700"
      }
      size={size}
      onClick={onClick}
      {...props}
    />
  );
};

export default Icon;
