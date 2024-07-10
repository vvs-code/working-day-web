import React from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Google as GmailIcon, MailOutline as MailIcon, Mail as MailRuIcon, } from "@mui/icons-material";

const EmailClientSelector = () => {
  const navigate = useNavigate();

  const email = 'workingday.info@gmail.com';
  const subject = encodeURIComponent('Запрос в службу поддержки');
  const body = encodeURIComponent('Пожалуйста, опишите вашу проблему:');

  const openWebEmailClient = (client) => {
    let url;

    switch (client) {
      case 'gmail':
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
        break;
      case 'mailru':
        url = `https://e.mail.ru/compose/?to=${email}&subject=${subject}&body=${body}`;
        break;
      case 'yandex':
        url = `https://mail.yandex.ru/compose?to=${email}&subject=${subject}&body=${body}`;
        break;
      default:
        url = `mailto:${email}?subject=${subject}&body=${body}`;
        break;
    }

    window.open(url, '_blank', 'noopener noreferrer');
    navigate(-1); 
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Выберите почтовый клиент
      </Typography>
      <IconButton
        onClick={() => openWebEmailClient('gmail')}
        color="primary"
        sx={{
          width: '100%',
          mb: 2,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <GmailIcon sx={{ fontSize: 40, mr: 1 }} />
        <Typography variant="h6">Gmail</Typography>
      </IconButton>
      <IconButton
        onClick={() => openWebEmailClient('mailru')}
        color="primary"
        sx={{
          width: '100%',
          mb: 2,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <MailRuIcon sx={{ fontSize: 40, mr: 1 }} />
        <Typography variant="h6">Mail.ru</Typography>
      </IconButton>
      <IconButton
        onClick={() => openWebEmailClient('yandex')}
        color="primary"
        sx={{
          width: '100%',
          mb: 2,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <MailIcon sx={{ fontSize: 40, mr: 1 }} />
        <Typography variant="h6">Yandex</Typography>
      </IconButton>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
      >
        Закрыть
      </Button>
    </Box>
  );
};

export default EmailClientSelector;
