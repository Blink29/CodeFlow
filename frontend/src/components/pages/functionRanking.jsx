import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./functionRanking.css";

const FunctionRanking = () => {
  const location = useLocation();
  const data = location.state;
  const [functionData, setFunctionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      const callCountMap = {};

      data.forEach((func) => {
        func.functions_called.forEach((id) => {
          callCountMap[id] = (callCountMap[id] || 0) + 1;
        });
      });

      const updatedFunctionData = data.map((func) => ({
        ...func,
        timesCalled: callCountMap[func.id] || 0,
      })).sort((a, b) => b.timesCalled - a.timesCalled);

      setFunctionData(updatedFunctionData);
      setIsLoading(true);
    }
  }, [data]);

  console.log(functionData);

  const getCallingFunctions = (funcId) => {
    const callingFunctions = functionData.filter((func) =>
      func.functions_called.includes(funcId)
    );
    return callingFunctions.map((func) => func.function_name).join(", ");
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="text-center font-bold text-4xl text-lime-700 mb-4">
          Function Rankings
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th>Function Name</th>
              <th>Times Called</th>
              <th>Called In Functions</th>
              <th>File Path</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              functionData.map((func, index) => (
                <tr key={index}>
                  <td>{func.function_name}</td>
                  <td>{func.timesCalled}</td>
                  <td>{getCallingFunctions(func.id)}</td>
                  <td>{func.file_path}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FunctionRanking;
