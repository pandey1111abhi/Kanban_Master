import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Filter from "./FilterModal";
import { useState } from "react";
const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <nav id="navbar">
      <div style={{ position: "relative" }}>
        <div className="menu" onClick={() => setIsClicked((state) => !state)}>
          <AiOutlineMenuUnfold />
          <span>Display</span>
          {isClicked ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </div>
        {isClicked && <Filter />}
      </div>
    </nav>
  );
};

export default Navbar;
