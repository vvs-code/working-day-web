function TitleField({ title, value }) {
  return (
    <div className="title-field">
      <h3 className="title-field-title">{title}</h3>
      <p className="title-field-value">{value}</p>
    </div>
  );
}

export default TitleField;
