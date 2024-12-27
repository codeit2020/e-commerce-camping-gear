import Image from "next/image";
import React from "react";

const Button = ({ icon }) => {
  return (
    <button>
      <Image src={icon} alt="cart" width={24} height={24}></Image>
    </button>
  );
};

export default Button;
