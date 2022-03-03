
const ErrorSection = ({message, className}) => { 
  return (
    <section className={`content ${className}`}>
      <p>Error: {message}</p>
    </section>
  );
}

export default ErrorSection;