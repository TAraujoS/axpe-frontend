import React from 'react';
import PropTypes from 'prop-types';

const ICONS = {
  star: '/assets/icons/star-blue.svg',
  check: '/assets/icons/check.svg',
  sofa: '/assets/icons/sofa.svg'
};

import { Container } from './styles';

export default function Tag({ color, icon, label }) {
  return (
    <Container color={color} icon={icon}>
      {icon && <img src={ICONS[icon]} alt={label} />}
      {label}
    </Container>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf([ 'star', 'check', 'sofa' ])
};
