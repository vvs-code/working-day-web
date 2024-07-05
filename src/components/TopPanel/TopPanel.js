import { Drawer } from "@mui/material";
import { Button, Image } from "react-bootstrap";
import Config from "../../config/UserPageConfig";
import "../../styles/toppanel.css";
import BellIcon from "./BellIcon";
import AngleDownIcon from "./AngleDownIcon";
import UserIcon from "./UserIcon";
import UnlockIcon from "./UnlockIcon";
import MoneyIcon from "./MoneyIcon";
import Function from "./Function";
import optional from "../../functions/optional";
import { useEffect } from "react";
import API from "../../network/API";
import { Link, useNavigate } from "react-router-dom";

function TopPanel({
  profpic,
  title = "Мой профиль",
  showfunctions = true,
  username,
}) {
  let height = showfunctions ? 164 : 128;
  const navigate = useNavigate();

  function logout() {
    API.logout();
    navigate("/login");
  }

  useEffect(() => {
    document.getElementById("tp-drawer").style.height =
      document.getElementById("top-panel-all").offsetHeight.toString() + "px";
  });
  return (
    <Drawer
      // className="clearfix"
      // style={{ width: "100%" }}
      id="tp-drawer"
      sx={{
        // width: "100%",
        // height: height,
        // height: document.getElementById("top-panel-all").offsetHeight,
        // borderBottom: 0,
        // marginLeft: leftPanelWidth,
        // flexShrink: 0,
        "& .MuiDrawer-paper": {
          // height: height,
          // boxSizing: "border-box",
          zIndex: 1,
          // borderBottom: 0,
        },
      }}
      variant="permanent"
      anchor="top"
    >
      <div
        id="top-panel-all"
        className="top-panel-all"
        style={{ marginLeft: Config.leftPanelWidth }}
      >
        <div className="top-panel-content">
          <p className="top-panel-title">{title}</p>
          <div className="top-panel-controls">
            <Link to="/notifications">
              <BellIcon />
            </Link>
            {optional(
              profpic,
              <Image
                className="top-panel-profpic"
                src={profpic}
                width={40}
                height={40}
                roundedCircle
              />
            )}
            <Link to="/user/me" className="top-panel-mp-link">
              {username ? username : "Мой профиль"}
            </Link>
            {/* <AngleDownIcon /> */}
            <Button variant="outline-danger" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>

      </div>
    </Drawer>
  );
}

export default TopPanel;
