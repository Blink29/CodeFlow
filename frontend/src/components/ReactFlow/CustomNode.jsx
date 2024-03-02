import React, { memo, useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import 'ace-builds/src-noconflict/ext-language_tools';

function CustomNode({ id, data, isConnectable }) {
  const name = data.name;
  const Id = data.Id;
  const code = data.code;
  const file_name = data.file_name;
  const file_path = data.file_path;
  // const description = data.description;
  const class_name = data.class_name;

  const [isModalOpen, setIsModalOpen] = useState(false);
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
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        className="overflow-hidden p-2 whitespace-nowrap "
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
            className=" z-50 flex items-center justify-center bg-black bg-opacity-50"
            style={{ width: "max-content" }}
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

                  <p className="text-lg font-semibold">{name}</p>
                  <p className="text-gray-500">{file_path}</p>
                  <AceEditor
                    mode="python"
                    theme="monokai"
                    name={Id.toString()}
                    editorProps={{ $blockScrolling: true }}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={code}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                      wrap: true
                    }}
                  />
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
