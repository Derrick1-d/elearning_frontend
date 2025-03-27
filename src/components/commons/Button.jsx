const Button = ({ 
  text, 
  onClick, 
  type = "button", 
  className = "",
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick} 
      type={type} 
      disabled={disabled}
      className={`
        bg-neutral-800 
        text-white 
        px-5 
        py-2.5 
        rounded-md 
        hover:bg-neutral-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-neutral-500 
        focus:ring-opacity-50 
        transition-colors 
        duration-200 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-700'}
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;