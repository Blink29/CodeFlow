import React from "react";

const Home = () => {
  return (
    <div className="h-full flex border border-1 border-red-700 items-center justify-center">
      <div className="flex flex-col gap-16 w-full items-center">
        <div className="text-7xl font-mono font-black">CodeFlow</div>
        <div className="flex gap-3 w-full justify-center">
          <input
            type="text"
            placeholder="Enter Github URL"
            className="border rounded-sm px-5 py-3 w-1/3"
          />
          <input
            type="submit"
            className="bg-emerald-500 px-5 py-3 font-bold rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
