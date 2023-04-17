import Image from "next/image";
import React from "react";
import logo from "../public/img/logo.png";
import Link from "next/link";

const Logo = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <Link href={"/"}>
        <Image src={logo} alt="Logo-soft-valley" placeholder="blur" />
      </Link>
    </div>
  );
};

export default Logo;
