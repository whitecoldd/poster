"use client";

import React from "react";

interface ToggleProps {
  onDelete: () => void;
  setToggle: (toggle: boolean) => void;
}

const Toggle = ({ onDelete, setToggle }: ToggleProps) => {
  return (
    <div
      onClick={() => setToggle(false)}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl text-center">you sure ?</h2>
        <h3 className="text-red-600 text-sm text-center">
          pressing 'delete' button will remove your post completely
        </h3>
        <button
          onClick={()=>onDelete()}
          className="bg-red-600 text-sm text-white py-2 px-4 text-center rounded-lg"
        >
          yes, delete
        </button>
      </div>
    </div>
  );
};

export default Toggle;
