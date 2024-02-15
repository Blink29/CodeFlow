import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  // const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/canvas?url=${url}`);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault;
  //   history.push(`/canvas?url=${url}`);
  // };

  return (
    <div className="h-full flex border border-1 border-red-700 items-center justify-center">
      <div className="flex flex-col gap-16 w-full items-center">
        <div className="text-7xl font-mono font-black">CodeFlow</div>
        <div className="flex gap-3 w-full justify-center">
          <form onSubmit={handleSubmit} className="w-1/3">
            <input
              type="text"
              placeholder="Enter Github URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border rounded-sm px-5 py-3"
            />
            <input
              type="submit"
              className="bg-emerald-500 px-5 py-3 font-bold rounded-sm"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
