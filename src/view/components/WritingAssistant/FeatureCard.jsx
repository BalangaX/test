const FeatureCard = ({ title, children }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default FeatureCard;
