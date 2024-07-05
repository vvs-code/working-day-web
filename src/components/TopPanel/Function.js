function Function({ image, text, width }) {
  return (
    <div className="top-panel-function">
      {image}
      <p className="top-panel-function-text" style={{ width: width }}>
        {text}
      </p>
    </div>
  );
}

export default Function;
