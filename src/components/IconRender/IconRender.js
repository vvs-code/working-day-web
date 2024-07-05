import "../../styles/icon.css";

function IconRender({
  className = "",
  path,
  width = "24px",
  height = "24px",
  iwidth = "20px",
  iheight = "20px",
  addstyle = {},
  addistyle = {},
}) {
  return (
    <div
      className={className + " icon"}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        ...addstyle,
      }}
    >
      <img
        style={{
          width: iwidth,
          height: iheight,
          ...addistyle,
        }}
        src={path}
        alt="icon"
      />
    </div>
  );
}

export default IconRender;
