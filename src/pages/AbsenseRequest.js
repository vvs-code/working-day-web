import {
  Box,
  Container as MUIContainer,
  Typography,
  Grid,
  Button as MUIButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru"; 
import { useState } from "react";
import API from "../network/API";
import formatDate from "../functions/formatDate";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import TopPanel from "../components/TopPanel/TopPanel";
import getCachedLogin from "../functions/getCachedLogin";
import useAsync from "../functions/hooks/useAsync";
import getJsonWithErrorHandlerFunc from "../functions/getJsonWithErrorHandlerFunc";

dayjs.locale("ru");

function AbsenseRequest() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  async function send_request() {
    if (!startDate || !endDate) {
      alert("Выберите даты начала и конца отпуска");
      return;
    }
    let res = await API.requestAbsence({
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      type: "vacation",
    });
    if (res && res.ok) {
      alert("Запрос отправлен");
    } else {
      alert("Не удалось запросить отпуск");
    }
  }

  const my_id = getCachedLogin();
  const [myInfo, setMyInfo] = useState(null);
  useAsync(getJsonWithErrorHandlerFunc, setMyInfo, [
    (args) => API.infoEmployee(args),
    [my_id],
  ]);

  return !myInfo ? null : (
    <Box display="flex" overflow="hidden" height="100vh">
      <LeftPanel highlight="absenserequest" className="left-panel" />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <TopPanel
          title="Запрос отпуска"
          profpic={myInfo.photo_link}
          showfunctions={false}
          username={myInfo.name}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <MUIContainer maxWidth="md" sx={{ fontSize: '1.25rem' }}>
            <Typography variant="h4" gutterBottom>
              Выберите дату отпуска
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    format="DD.MM.YYYY"
                    slotProps={{ textField: { placeholder: "Начало" } }}
                    onChange={(v) => {
                      const date = new Date(v);
                      setStartDate(date);
                    }}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    format="DD.MM.YYYY"
                    slotProps={{ textField: { placeholder: "Конец" } }}
                    onChange={(v) => {
                      const date = new Date(v);
                      setEndDate(date);
                    }}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MUIButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={send_request}
                    sx={{
                      backgroundColor: "#164f94",
                      "&:hover": { backgroundColor: "#133a6c" },
                      fontSize: '1.25rem',
                      padding: '0.75rem',
                    }}
                  >
                    Запросить отпуск
                  </MUIButton>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </MUIContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default AbsenseRequest;
