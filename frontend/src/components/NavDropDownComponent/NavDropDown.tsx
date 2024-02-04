import React from "react";
import PlusIcon from "../../assets/icons/ph_plus.svg";
import MinusIcon from "../../assets/icons/ic_baseline-minus.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import NavLabelComponent from "../NavLabelComponent/NavLabelComponent";

type Props = {
  config?: {
    name: string;
    type: string;
    items?: {
      name: string;
      type: string;
    }[];
  }
};

const NavDropDown = ({ config }: Props) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div
        className="px-3 py-2 flex space-x-2 bg-gray-200 border-black cursor-pointer hover:bg-gray-300 text-black"
        onClick={() => setToggle(!toggle)}
      >
        <div>
          <img
            src={toggle ? MinusIcon : PlusIcon}
            alt="plus-icon"
            className="h-7 w-7"
          />
        </div>
        <div>{config?.name ?? ""}</div>
      </div>
      {toggle && (
        <div className="bg-gray-100">
          {config?.items?.map((item, index) => (
            item.type === "label" ?
            <NavLabelComponent key={index} name={item.name} /> : 
            <div className="ml-5">
              <NavDropDown key={index} config={item} />
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropDown;
