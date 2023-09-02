import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { ReactNode } from "react";
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
      className="p-1 rounded-md cursor-pointer hover:bg-slate-300 dark:bg-slate-700"
      size="30"
      onClick={onClick}
      {...props}
    />
  );
};

export default Icon;
