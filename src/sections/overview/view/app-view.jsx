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
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  height: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto', 
};

const regionsInfo = {
  'Amazônia': {
    characteristics: 'A Amazônia é o maior bioma do Brasil, cobrindo cerca de 49% do território nacional e se estendendo por outros países da América do Sul, como Peru, Colômbia, Venezuela, Equador, Bolívia, Guiana, Guiana Francesa e Suriname. Caracteriza-se pelo clima equatorial, quente e úmido, com temperaturas médias entre 24°C e 28°C, e alta pluviosidade ao longo do ano. A hidrografia da região é marcada por uma vasta rede de rios, sendo o Rio Amazonas o principal e maior em volume de água do mundo. Os solos da Amazônia são, em sua maioria, pobres em nutrientes devido à rápida decomposição da matéria orgânica provocada pela alta umidade e temperatura. A flora amazônica é extremamente diversa, destacando-se as árvores de grande porte como a castanheira-do-pará (Bertholletia excelsa), seringueira (Hevea brasiliensis), pau-rosa (Aniba rosaeodora) e mogno (Swietenia macrophylla). Diversas espécies de palmeiras, como o açaí (Euterpe oleracea), babaçu (Attalea speciosa) e buriti (Mauritia flexuosa), também são comuns. Além disso, a floresta abriga muitas epífitas e lianas, como bromélias e orquídeas, que crescem sobre outras plantas, além de lianas que se enrolam nas árvores. Pteridófitas, como samambaias e avencas, prosperam no sub-bosque úmido da floresta. A Amazônia é também rica em plantas medicinais, como a andiroba (Carapa guianensis) e a unha-de-gato (Uncaria tomentosa). A diversidade da flora não só sustenta a vasta biodiversidade da região, mas também oferece recursos valiosos para as comunidades locais e para a pesquisa científica. A Amazônia desempenha um papel crucial na regulação do clima global, além de ser uma fonte essencial de biodiversidade e recursos naturais.',
    deforestationRisk: 'Alto',
    imageUrl: '/assets/images/covers/floresta-amazonica.png'
  },
  'Cerrado': {
    characteristics: 'O Cerrado, conhecido como a savana brasileira, ocupa aproximadamente 23% do território nacional, abrangendo estados como Goiás, Tocantins, Mato Grosso, Mato Grosso do Sul, Minas Gerais, Bahia e partes do Distrito Federal. Caracteriza-se por um clima tropical sazonal, com uma estação seca pronunciada durante o inverno e uma estação chuvosa no verão. As temperaturas médias anuais variam entre 20°C e 26°C. A vegetação do Cerrado é bastante diversificada, incluindo árvores esparsas de pequeno e médio porte, arbustos e gramíneas. Algumas das espécies mais conhecidas são o pequizeiro (Caryocar brasiliense), o barbatimão (Stryphnodendron adstringens), a lobeira (Solanum lycocarpum) e o ipê (Tabebuia spp.). O solo do Cerrado é geralmente ácido e pobre em nutrientes, com alta concentração de alumínio. A biodiversidade do Cerrado é imensa, sendo considerado um dos hotspots de biodiversidade do mundo. No entanto, enfrenta grande pressão devido à expansão agrícola e à pecuária, ameaçando muitas espécies endêmicas e habitats.',
    deforestationRisk: 'Alto',
    imageUrl: '/assets/images/covers/cerrado.png'
  },
  'Mata Atlântica': {
    characteristics: 'A Mata Atlântica é um dos biomas mais ricos em biodiversidade e um dos mais ameaçados do Brasil. Originalmente, cobria cerca de 15% do território brasileiro, mas atualmente resta apenas cerca de 12% de sua área original, devido à intensa urbanização e desmatamento. Este bioma se estende por várias regiões costeiras, desde o Rio Grande do Norte até o Rio Grande do Sul. O clima varia de tropical a subtropical, com altas taxas de umidade e temperaturas médias entre 14°C e 27°C. A vegetação é extremamente diversificada, incluindo florestas densas, manguezais e restingas. Entre as espécies emblemáticas estão o pau-brasil (Paubrasilia echinata), a figueira (Ficus spp.), o jequitibá-rosa (Cariniana legalis) e a palmeira juçara (Euterpe edulis). A Mata Atlântica abriga uma fauna rica, com muitas espécies endêmicas, como o mico-leão-dourado (Leontopithecus rosalia) e o muriqui (Brachyteles arachnoides). A conservação da Mata Atlântica é crucial devido à sua biodiversidade única e aos serviços ecossistêmicos que fornece, como a regulação do clima e a provisão de água.',
    deforestationRisk: 'Médio',
    imageUrl: '/assets/images/covers/mata-atlantica.png'
  },
  'Caatinga': {
    characteristics: 'A Caatinga é o único bioma exclusivamente brasileiro, cobrindo cerca de 10% do território nacional, principalmente na região Nordeste. Caracteriza-se por um clima semiárido, com chuvas irregulares e longos períodos de seca. As temperaturas médias anuais ficam em torno de 27°C, com variações extremas. A vegetação da Caatinga é adaptada às condições áridas, composta por plantas xerófitas, como cactos, bromélias e arbustos espinhosos. Algumas espécies notáveis são o mandacaru (Cereus jamacaru), a aroeira (Myracrodruon urundeuva) e o umbuzeiro (Spondias tuberosa). Os solos são geralmente rasos, pedregosos e pobres em nutrientes. A fauna da Caatinga também é adaptada às condições de seca, incluindo espécies como o calango (Tropidurus hispidus), a asa-branca (Patagioenas picazuro) e o tatu-bola (Tolypeutes tricinctus). A Caatinga enfrenta desafios significativos devido ao desmatamento, à desertificação e à mudança climática, ameaçando a biodiversidade e os modos de vida locais.',
    deforestationRisk: 'Médio',
    imageUrl: '/assets/images/covers/caatinga.png'
  },
  'Pantanal': {
    characteristics: 'O Pantanal é a maior planície inundável do mundo, cobrindo cerca de 1,8% do território brasileiro, principalmente nos estados de Mato Grosso e Mato Grosso do Sul. Este bioma se caracteriza por um clima tropical continental, com uma estação seca e uma estação chuvosa que causa extensas inundações. As temperaturas médias anuais variam entre 23°C e 26°C. A vegetação do Pantanal é extremamente diversificada, influenciada pela proximidade de outros biomas como a Amazônia, o Cerrado e a Mata Atlântica. Inclui áreas de cerrado, florestas ripárias, campos inundáveis e pastagens naturais. Espécies típicas incluem o ipê-roxo (Handroanthus impetiginosus), o paratudal (Tabebuia aurea) e o buriti (Mauritia flexuosa). O Pantanal é um refúgio para a fauna, abrigando uma grande variedade de animais, como a onça-pintada (Panthera onca), o jacaré-do-pantanal (Caiman yacare), a arara-azul (Anodorhynchus hyacinthinus) e o tuiuiú (Jabiru mycteria). Apesar de sua biodiversidade impressionante, o Pantanal enfrenta ameaças significativas devido à expansão agropecuária, ao desmatamento e às mudanças climáticas, que alteram os padrões de inundação e afetam os ecossistemas locais.',
    deforestationRisk: 'Baixo',
    imageUrl: '/assets/images/covers/pantanal.png'
  },
  'Pampas': {
    characteristics: 'O Pampa, também conhecido como Campos Sulinos, é um bioma exclusivamente brasileiro, presente no estado do Rio Grande do Sul, cobrindo cerca de 2% do território nacional. O clima é subtropical, com verões quentes e invernos frios, e uma precipitação bem distribuída ao longo do ano. As temperaturas médias variam entre 13°C e 18°C. A vegetação é composta principalmente por campos nativos de gramíneas, com algumas espécies arbustivas e arbóreas em áreas mais elevadas. Algumas plantas características são o capim-mimoso (Axonopus affinis), a grama-fina (Paspalum notatum) e a figueira-do-pampa (Ficus organensis). O Pampa é conhecido por sua rica biodiversidade, especialmente de gramíneas e leguminosas, além de uma fauna variada, incluindo espécies como o veado-campeiro (Ozotoceros bezoarticus), o gato-do-mato (Leopardus geoffroyi) e a ema (Rhea americana). No entanto, a conversão de áreas de campo para a agricultura e a pecuária intensiva representam grandes ameaças ao bioma, resultando na perda de habitat e na diminuição da biodiversidade.',
    deforestationRisk: 'Baixo',
    imageUrl: '/assets/images/covers/pampas.png'
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

  const { flora, characteristics, deforestationRisk, imageUrl } = regionsInfo[region] || {};

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
        <Typography>{flora}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Características</Typography>
        <Typography>{characteristics}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Risco de Desmatamento</Typography>
        <Typography>{deforestationRisk}</Typography>
        {imageUrl && (
          <Box sx={{ mt: 2 }}>
            <img src={imageUrl} alt={`Imagem da região ${region}`} style={{ width: '40%', height: 'auto' }} />
          </Box>
        )}
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

  const biomas = ['Amazônia', 'Cerrado', 'Mata Atlântica', 'Caatinga', 'Pantanal', 'Pampas'];

  const getButtonColor = (region) => {
    if (region === 'Amazônia') {
      return '#30E998';
    } if (region === 'Cerrado') {
      return '#24A1F3';
    } if (region === 'Mata Atlântica') {
      return '#FED443'
    } if (region === 'Caatinga') {
      return '#FD7827'
    } if (region === 'Pantanal') {
      return '#B767F2'
    } if (region === 'Pampas') {
      return '#DE585B'
    }
      return 'default';
    
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Bem vindo de volta!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/assets/images/covers/mapa-brasil.png" alt="Mapa do Brasil" width='100%' height='100%' />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mr: 15 }}>
          {biomas.map((region) => (
            <Button
              key={region}
              variant="contained"
              onClick={() => handleOpen(region)}
              sx={{ my: 1, height: '50px', width: '150px', backgroundColor: getButtonColor(region), color: 'black' }} 

            >
              {region}
            </Button>
          ))}
        </Box>
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
