export default function Input({ type, value, onChange, text, className }) {
  return (
    <>
      <input
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={text}
      />
    </>
  );
}