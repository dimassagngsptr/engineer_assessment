import React from "react";

const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  btnTitle,
  disabled,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-poppins">
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-full mx-auto z-10">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="p-4">{children}</div>
        <div className="p-4 border-t text-right flex justify-between">
          <button
            disabled={disabled}
            onClick={onSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {btnTitle}
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
