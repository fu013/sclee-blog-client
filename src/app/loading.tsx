import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-70">
      <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-16 w-16"></div>
    </div>
  );
};

export default LoadingSpinner;
