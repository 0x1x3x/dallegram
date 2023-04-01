import React from "react";
import { BsTwitter, BsMedium, BsGithub } from "react-icons/bs";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center py-3 px-3 sm:px-8">
      <div>
        <a href="https://openai.com/product/dall-e-2">
          <img src="/src/assets/logo.svg" alt="" className="w-10 py-2" />
        </a>
      </div>
      <div className="flex gap-5">
        <a href="https://medium.com/" target="blank">
          <BsMedium className="h-[1.5rem] w-[1.5rem]" />
        </a>
        <a href="https://twitter.com/dallegram" target="blank">
          <BsTwitter className="h-[1.5rem] w-[1.5rem] ml-2" />
        </a>
        <a href="https://github.com/0x1x3x" target="blank">
          <BsGithub className="h-[1.5rem] w-[1.5rem] ml-2" />
        </a>
      </div>
    </header>
  );
};

export default Header;
