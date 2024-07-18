import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'; 

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

// Component for each region's modal content
const RegionModalContent = ({ region }) => (
  <Box sx={style}>
    <Typography variant="h6" component="h2">
      {`Informações sobre a região ${region}`}
    </Typography>
    <Typography sx={{ mt: 2 }}>
      {`Aqui você pode adicionar informações detalhadas sobre a região ${region}.`}
    </Typography>
  </Box>
);

// Defina as prop types para o componente
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
