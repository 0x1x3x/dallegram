import React from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const BackToTopButton = () => {
  const up = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {BackToTopButton && (
        <button className="fixed bottom-5 right-5" onClick={up}>
          <BsFillArrowUpCircleFill className="h-12 w-12 text-[#6469ff]" />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
