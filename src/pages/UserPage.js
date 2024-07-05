import { Button, Col, Container, Image, Row } from "react-bootstrap";
import TitleField from "../components/UserPage/TitleField";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import "../styles/userpage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import API from "../network/API";
import useAsync from "../functions/hooks/useAsync";
import optional from "../functions/optional";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";
import getCachedLogin from "../functions/getCachedLogin";
import getCachedRole from "../functions/getCachedRole";

function UserPage({ get_id = useParams }) {
  const { id } = get_id();
  const my_id = getCachedLogin();
  const my_role = getCachedRole();
  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setMyInfo, [
    (args) => API.infoEmployee(args),
    [my_id],
  ]);
  const [info, setInfo] = useState(null);
  useAsync(
    getJsonWithErrorHandlerFunc,
    setInfo,
    [(args) => API.infoEmployee(args), [id]]
  );

  return !info || !myInfo ? null : (
    <div className="page-container">
      <LeftPanel highlight="user" />
      <div className="main-content">
        <TopPanel
          title={my_id == id ? "Мой профиль" : "Профиль сотрудника"}
          profpic={myInfo.photo_link}
          showfunctions={false}
          username={myInfo.name}
        />
        <Container className="main-body" fluid>
          <Row>
            <Col md="auto">
              <h1 className="user-page-name">
                {info.name +
                  " " +
                  optional(info.patronymic) +
                  " " +
                  info.surname}
              </h1>
              {my_role == "admin" && id != my_id ? (
                <Button
                  className="user-page-delete-button"
                  variant="danger"
                  onClick={() => {
                    API.removeEmployee({ employee_id: id });
                    alert("Пользователь удален");
                  }}
                >
                  Удалить
                </Button>
              ) : (
                <div className="user-page-delete-button-replacer"></div>
              )}
              <TitleField
                title="Электронная почта"
                value={optional(info.email)}
              />
              <TitleField
                title="Номер телефона"
                value={optional(info.phones, info.phones[0])}
              />
              <Row>
                <Col className="user-page-col-padding">
                  <TitleField
                    title="День рождения"
                    value={optional(info.birthday)}
                  />
                </Col>
                <Col className="user-page-col-padding">
                  <TitleField
                    title="Telegram ID"
                    value={optional(info.telegram_id)}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="user-page-col-padding">
                  <TitleField title="Команда" value={optional(info.team)} />
                </Col>
                <Col className="user-page-col-padding">
                  <TitleField title="VK ID" value={optional(info.vk_id)} />
                </Col>
              </Row>
              {optional(
                my_id == id,
                <Button
                  className="edit-button"
                  onClick={() => navigate("./edit")}
                >
                  Изменить личную информацию
                </Button>
              )}
            </Col>
            <Col className="img-col" md="auto">
              {optional(
                info.photo_link,
                <Image
                  className="img"
                  src={info.photo_link}
                  width={370}
                  height={358}
                  roundedCircle
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UserPage;
