export default function Input({ name, type, value, onChange, text, className, max }) {
  return (
    <>
      <input
        name={name}
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={text}
        max={max}
        required
      />
    </>
  );
}