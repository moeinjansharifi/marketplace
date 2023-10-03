import React from "react";

const Message = ({ children }) => {
  return (
    <div
      className="bg-red-200 px-4 py-2 rounded w-64 text-center text-gray-600 mb-2"
      role="alert"
    >
      <p className="text-sm">{children}</p>
    </div>
  );
};

export default Message;
