const Loader = () => {
  return <div style={styles.loader}></div>;
};

const styles = {
  loader: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Loader;
