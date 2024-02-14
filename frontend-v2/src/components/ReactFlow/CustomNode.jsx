import React, { memo } from "react";
import { Handle, Position } from "reactflow";

function CustomNode({ id, data, isConnectable }) {
  const name = data.name;
  const Id = data.Id;
  const code = data.code;
  const description = data.description;

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="custom-node__header">
        <strong>{name}</strong>
      </div>
      <div className="custom-node__body">
        <p>{description}</p>
        <div>{Id}</div>
        <pre>{code}</pre>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ right: "-4px" }}
        // isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(CustomNode);
