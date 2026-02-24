function FormInput({ name, label, type, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  );
}

export default FormInput;
