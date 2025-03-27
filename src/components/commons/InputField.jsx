const InputField = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={styles.input} />
    </div>
  );
};

const styles = {
  container: { marginBottom: "10px" },
  label: { display: "block", marginBottom: "5px" },
  input: { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
};

export default InputField;
