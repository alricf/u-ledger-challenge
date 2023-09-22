export default function Input({ name, type, value, onChange, text, className }) {
  return (
    <>
      <input
        name={name}
        className={className}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={text}
      />
    </>
  );
}