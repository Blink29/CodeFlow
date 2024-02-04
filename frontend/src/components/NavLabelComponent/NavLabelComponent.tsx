import React from "react";

type Props = { name?: string | undefined };

const NavLabelComponent = ({ name }: Props) => {
  return (
    <div>
      <div className="px-5 py-2 border-b cursor-pointer text-black hover:bg-gray-50 ">
        {name ?? (
            <span> </span>
        )}
      </div>
    </div>
  );
};

export default NavLabelComponent;
