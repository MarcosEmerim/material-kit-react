import { Helmet } from 'react-helmet-async';

import CadastroView from 'src/sections/cadastro/cadastro-view';

// ----------------------------------------------------------------------

export default function CadastroPage() {
  return (
    <>
      <Helmet>
        <title> Página de Cadastro </title>
      </Helmet>

      <CadastroView />
    </>
  );
}
