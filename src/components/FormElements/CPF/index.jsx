import React from 'react';
import { BaseMask } from '../styles';

export default function CPF(props) {
  return (
    <BaseMask
      mask={[
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '.',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '.',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '-',
        /[0-9]/,
        /[0-9]/
      ]}
      {...props}
    />
  );
}
