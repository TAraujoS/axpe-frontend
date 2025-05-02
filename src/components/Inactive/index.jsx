import React from 'react';
import SVG from 'react-inlinesvg';

// styles
import { Container } from './styles';

export default function Inactive({ type, className }) {
  return (
    <Container type={type} className={className}>
      <SVG src='/assets/icons/emoji.svg' uniquifyIDs={true} />
      <p>
        <strong>Ops!</strong>
        <br />
        Esse imóvel não está mais disponível
      </p>
    </Container>
  );
}
