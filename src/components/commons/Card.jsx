const Card = ({ title, content }) => {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

const styles = {
  card: { border: "1px solid #ccc", padding: "15px", borderRadius: "5px", margin: "10px", background: "#fff" },
};

export default Card;
