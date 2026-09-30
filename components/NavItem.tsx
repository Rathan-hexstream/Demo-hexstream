import Link from "next/link";
import React from "react";

interface NavItemRequiredProps {
  onClick?: () => void;
  title: string;
  link: string;
  active: boolean;
}

interface NavItemOptionalProps {
  hasDropdown: boolean;
}

interface NavItemProps extends NavItemRequiredProps, NavItemOptionalProps {}

const defaultProps: NavItemOptionalProps = {
  hasDropdown: false,
};

const NavItem = ({
  title,
  link,
  active,
  hasDropdown,
  onClick,
}: NavItemProps) => {
  return (
    <div
      onClick={onClick}
      className="transition-colors duration-300 hover:text-prime cursor-pointer space-x-1"
    >
      <Link
        href={link}
        className={`py-2 items-center justify-center transition-colors duration-300 hover:text-secondary  text-sm ${
          active ? "underline underline-offset-4" : "text-white"
        }`}
      >
        {title}
      </Link>
      {hasDropdown ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="inline"
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      ) : null}
    </div>
  );
};

NavItem.defaultProps = defaultProps;

export default NavItem;
