const Input = ({ label, style, textArea, ...props }) => {
  return (
    <div className="flex flex-col md:gap-1 lg:gap-2 font-poppins">
      {label && <label className={style}>{label}</label>}
      {textArea ? <textarea {...props} /> : <input {...props} />}
    </div>
  );
};
export default Input;
