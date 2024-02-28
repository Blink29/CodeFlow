import React, { memo, useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

function CustomNode({ id, data, isConnectable }) {
  const name = data.name;
  const Id = data.Id;
  const code = data.code;
  const file_name = data.file_name;
  const file_path = data.file_path;
  const description = data.description;
  const class_name = data.class_name;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = (nodeData) => {
    setIsModalOpen((prev) => !prev);
    setSelectedNode(nodeData);
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="custom-node__header overflow-hidden cursor-pointer p-2 whitespace-nowrap overflow-ellipsis"
        onClick={() => toggleModal(data)}
      >
        <strong>{name}</strong>
        <p className="text-gray-500">{class_name}</p>
        <p className="text-gray-500">{file_name}</p>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            style={{ width: "fit-content" }}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="bg-white rounded-lg p-4 shadow-lg max-h-screen overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-start">
                <AiOutlineClose
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 justify-self-start cursor-pointer "
                  style={{ fontSize: "24px" }}
                />
                <div className="mt-4">
                <p className="text-lg font-semibold">{file_name}</p>
                <p className="text-gray-500">{file_path}</p>
                <pre className="mt-4 p-2 bg-gray-100 rounded-md overflow-auto">
                  {code}
                </pre>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ right: "-4px" }}
      />
    </>
  );
}

export default memo(CustomNode);
