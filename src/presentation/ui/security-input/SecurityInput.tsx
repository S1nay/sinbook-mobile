import { useReducer } from 'react';

import Input from '@ui/input/Input';
import { InputProps } from '@ui/input/types';

const SecurityInput = (props: Omit<InputProps, 'endIcon' | 'secureTextEntry'>) => {
  const [isSecured, toggle] = useReducer(state => !state, true);

  return (
    <Input
      {...props}
      secureTextEntry={isSecured}
      endIcon={{
        name: isSecured ? 'eye' : 'closeEye',
        size: 16,
        onPress: toggle,
      }}
    />
  );
};

export default SecurityInput;
