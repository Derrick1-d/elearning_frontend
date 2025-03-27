const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  if (!message) return null;

  return (
    <div className={`border-l-4 p-4 my-2 ${alertStyles[type]} relative`}>
      <span>{message}</span>
      <button onClick={onClose} className="absolute top-1 right-2 text-xl font-bold">&times;</button>
    </div>
  );
};

export default Alert;
