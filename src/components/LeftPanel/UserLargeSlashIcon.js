import IconRender from "../IconRender/IconRender";

function UserLargeSlashIcon(props) {
  return (
    // <div className={props.className}>
    <IconRender
      className="left-panel-icon"
      path="/images/icons/user-large-slash.svg"
      width="42px"
      height="42px"
      iwidth="14px"
      iheight="14px"
      addstyle={{
        backgroundColor: "rgb(71, 146, 167)",
        borderRadius: "2px",
      }}
    />
    // </div>
  );
}

export default UserLargeSlashIcon;
