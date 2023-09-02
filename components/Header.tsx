import { FC } from "react";
import Text from "./ui/Text";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div>
      <Text size="head">Dashboard - Home </Text>
    </div>
  );
};

export default Header;
