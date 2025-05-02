import React, { useState } from 'react';

// styles
import { Input, ButtonEye, SVGEye } from '../styles';

export default function Password({ useEye, type, ...props }) {
  const [ showPass, setShowPass ] = useState(false);
  return (
    <>
      {useEye && (
        <ButtonEye type="button" active={showPass} onClick={() => setShowPass(!showPass)}>
          <SVGEye src='/assets/icons/eye' />
        </ButtonEye>
      )}
      <Input type={showPass ? 'text' : 'password'} {...props} />
    </>
  );
}
