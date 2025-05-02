import React from 'react';
import SVG from 'react-inlinesvg';
import { InputSelect } from '../styles';

export default function Select(props) {
  return (
    <>
      <InputSelect {...props}>
        {props.items &&
          props.items.length > 0 &&
          props.items.map(i => (
            <option key={`option-${i.value}`} value={i.value} dangerouslySetInnerHTML={{ __html: i.label }} />
          ))}
      </InputSelect>
      <SVG src='/assets/icons/arrow.svg' uniquifyIDs={true} />
    </>
  );
}
