import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DownArrow from "../../assets/icons/down-arrow.svg";

type Props = {};

const Function = (props: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="ml-10">
      {/* function-name-block  */}
      <div
        onClick={() => setShow(!show)}
        className="flex mt-4 py-1 items-center bg-[#f0f0f0] max-w-max border-l-4 border-[#cccccc]"
      >
        <div className="font-bold pl-1 pr-4">
          Function
          <span className="text-gray-500">
            (<span className="text-[12px]">cookie</span>)
          </span>
        </div>
        <a href="#" className="text-green-600 text-[12px]">
          [source]
        </a>
        <img src={DownArrow} alt="" className={show ? "transform rotate-180" : ""}/>
      </div>

      {/* function-code-block */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", stiffness: 100 }}
            className="flex flex-wrap my-2 mx-5 bg-gray-200 p-5 rounded-md shadow-slate-700"
          >
            <code className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              voluptatibus mollitia voluptas, distinctio rerum rem porro
              perferendis ducimus ab dignissimos, reiciendis veritatis obcaecati
              adipisci eligendi laborum, quae dolorem neque quasi.
            </code>
          </motion.div>
        )}
      </AnimatePresence>

      {/* function-description-block */}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis optio
        nobis tenetur voluptas doloribus laboriosam! Voluptatum nostrum saepe
        suscipit ullam, repellendus quidem, asperiores perspiciatis fugit nam,
        porro sequi debitis optio.
      </div>
    </div>
  );
};

export default Function;
