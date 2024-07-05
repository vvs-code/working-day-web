import IconRender from "../IconRender/IconRender";

function PencilIcon({ className = "" }) {
  return (
    <IconRender
      className={className}
      path="/images/icons/pencil.svg"
      width="24px"
      height="24px"
      iwidth="14px"
      iheight="14px"
      addstyle={{
        backgroundColor: "rgb(71, 146, 167)",
        borderRadius: "2px",
      }}
    />
  );
}

export default PencilIcon;
