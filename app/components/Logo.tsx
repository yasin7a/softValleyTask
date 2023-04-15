import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import Link from "next/link";

const Logo = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <Link href={"/"}>
        <Image src={logo} alt="Logo-soft-valley" />
      </Link>
    </div>
  );
};

export default Logo;
