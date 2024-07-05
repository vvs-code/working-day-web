import { Drawer, Tooltip, Typography } from "@mui/material";
import Config from "../config/UserPageConfig";
import { Button, Container, Form, Image, Row } from "react-bootstrap";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import API from "../network/API";
import IconRender from "./IconRender/IconRender";
import { Link, useNavigate } from "react-router-dom";
import BellIcon from "./TopPanel/BellIcon";
import optional from "../functions/optional";
import { useEffect, useState } from "react";
import useAsync from "../functions/hooks/useAsync";
import getCachedLogin from "../functions/getCachedLogin";
import getCachedRole from "../functions/getCachedRole";

function SearchPanel({ setOuterRequest, searchFunc }) {
  const navigate = useNavigate();

  const [info, setInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setInfo, [
    (args) => API.infoEmployee(args),
    [getCachedLogin()],
  ]);

  function logout() {
    API.logout();
    navigate("/login");
  }

  useEffect(() => {
    if (!info) {
      return;
    }
    document.getElementById("sp-drawer").style.height =
      document.getElementById("search-panel-all").offsetHeight.toString() +
      "px";
  }, [info]);

  const [request, setRequest] = useState("");
  const [suggest, setSuggest] = useState({ employees: [] });

  useAsync(
    getJsonWithErrorHandlerFunc,
    setSuggest,
    [(args) => API.suggestSearch(args), [{ search_key: request, limit: 5 }]],
    [request]
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      searchFunc(e); 
    }
  };

  return !info ? null : (
    <Drawer
      id="sp-drawer"
      sx={{
        "& .MuiDrawer-paper": {
          zIndex: 1,
          borderBottom: 0,
        },
      }}
      variant="permanent"
      anchor="top"
    >
      <div
        id="search-panel-all"
        style={{ marginLeft: Config.leftPanelWidth }}
      >
        <div className="search-content">
          <Form onSubmit={(e) => e.preventDefault()}> 
            <div className="overlay-container-search">
              <Tooltip
                open={request}
                title={
                  <Container>
                    {suggest.employees.length > 0
                      ? suggest.employees.map((emp) => (
                          <Row key={emp.id}>
                            <Link
                              className="search-suggest-link"
                              to={"/user/" + emp.id}
                            >
                              <Typography variant="body2">
                                {emp.surname +
                                  " " +
                                  emp.name +
                                  " " +
                                  optional(emp.patronymic)}
                              </Typography>
                            </Link>
                          </Row>
                        ))
                      : "Ничего не найдено"}
                  </Container>
                }
              >
                <Form.Control
                  className="overlay-bgimage-search search-field"
                  type="text"
                  placeholder="Поиск коллег"
                  onChange={(e) => {
                    setRequest(e.target.value);
                    setOuterRequest(e.target.value);
                  }}
                  onKeyPress={handleKeyPress} 
                />

                <Button
                  className="overlay-fgimage-search search-button modern-search-button"
                  onClick={(e) => searchFunc(e)}
                >
                  <IconRender
                    path="/images/icons/search.svg"
                    width="16px"
                    height="16px"
                    iwidth="16px"
                    iheight="16px"
                    addstyle={{ display: "flex" }}
                  />
                </Button>
              </Tooltip>
            </div>
          </Form>
          {optional(
            getCachedRole() == "admin",
            <Button
              onClick={() => {
                navigate("/user/add");
              }}
              className="add-employee-button"
              style={{ marginLeft: '10px' }}
            >
              Добавить сотрудника
            </Button>
          )}
          <div className="search-controls">
            <BellIcon />
            {optional(
              info.photo_link,
              <Image
                className="top-panel-profpic"
                src={info.photo_link}
                width={40}
                height={40}
                roundedCircle
              />
            )}
            <Link to="/user/me" className="top-panel-mp-link">
              {info.name}
            </Link>
            <Button variant="outline-danger" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchPanel;
