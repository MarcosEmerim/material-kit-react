import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Modal from '@mui/material/Modal'; 
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera'; // Importa o Divider do Material-UI

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const regionsInfo = {
  'Norte': {
    flora: 'Floresta Amazônica',
    characteristics: 'A Floresta Amazônica é conhecida por sua biodiversidade rica e vasta, contendo inúmeras espécies de plantas, animais e insetos. É uma floresta tropical úmida que cobre a maior parte da Bacia Amazônica da América do Sul.',
    deforestationRisk: 'Alto'
  },
  'Nordeste': {
    flora: 'Caatinga',
    characteristics: 'A Caatinga é uma região semiárida com vegetação adaptada à seca, incluindo cactos, arbustos espinhosos e plantas de folhas pequenas. É exclusiva do Brasil e possui um ecossistema único.',
    deforestationRisk: 'Médio'
  },
  'Centro-Oeste': {
    flora: 'Cerrado',
    characteristics: 'O Cerrado é caracterizado por sua vegetação de savana, com gramíneas, arbustos e árvores esparsas. É uma das regiões mais ricas em biodiversidade do mundo, com muitas espécies endêmicas.',
    deforestationRisk: 'Alto'
  },
  'Sudeste': {
    flora: 'Mata Atlântica',
    characteristics: 'A Mata Atlântica é uma floresta tropical e subtropical com uma grande diversidade de plantas e animais. Originalmente cobria uma grande área ao longo da costa atlântica do Brasil, mas agora resta apenas uma pequena parte devido ao desmatamento.',
    deforestationRisk: 'Médio'
  },
  'Sul': {
    flora: 'Mata de Araucárias',
    characteristics: 'A Mata de Araucárias é dominada pela Araucaria angustifolia, uma espécie de pinheiro. Esta floresta é encontrada em altitudes mais elevadas e tem um clima temperado com invernos frios.',
    deforestationRisk: 'Baixo'
  },
};

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    )}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const RegionModalContent = ({ region }) => {
  const [tabValue, setTabValue] = useState(0);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePhotoChange = (event) => {
    if (event.target.files[0] && event.target.files[0].type === 'image/png') {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSend = () => {
    enqueueSnackbar('Postagem enviada para a análise do moderador.', { variant: 'success' });
    setMessage('');
    setPhoto(null);
  };

  const { flora, characteristics, deforestationRisk } = regionsInfo[region] || {};

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        {`Informações sobre a região ${region}`}
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="region tabs">
        <Tab label="Informações" id="tab-0" aria-controls="tabpanel-0" />
        <Tab label="Comunidade" id="tab-1" aria-controls="tabpanel-1" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6">Flora</Typography>
        <Typography>{flora}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Características</Typography>
        <Typography>{characteristics}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Risco de Desmatamento</Typography>
        <Typography>{deforestationRisk}</Typography>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Ainda não há postagens da comunidade
        </Typography>
        <Divider sx={{ mb: 2 }} /> {/* Adiciona um divisor com uma margem inferior */}
        <TextField
          label="Mensagem"
          multiline
          rows={4}
          value={message}
          onChange={handleMessageChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton color="primary" component="label">
            <input hidden accept="image/png" type="file" onChange={handlePhotoChange} />
            <PhotoCamera />
          </IconButton>
          <Typography sx={{ ml: 1 }}>
            {photo ? photo.name : 'Nenhuma foto selecionada'}
          </Typography>
        </Box>
        <Button variant="contained" onClick={handleSend}>
          Enviar
        </Button>
      </TabPanel>
    </Box>
  );
};

RegionModalContent.propTypes = {
  region: PropTypes.string.isRequired,
};

export default function AppView() {
  const [open, setOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState('');

  const handleOpen = (region) => {
    setCurrentRegion(region);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const regions = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Bem vindo de volta!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src="/assets/images/covers/mapa-brasil.png" alt="Mapa do Brasil" width={400} height={400} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
        {regions.map((region) => (
          <Button key={region} variant="contained" onClick={() => handleOpen(region)}>
            {region}
          </Button>
        ))}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <RegionModalContent region={currentRegion} />
      </Modal>
    </Container>
  );
}
