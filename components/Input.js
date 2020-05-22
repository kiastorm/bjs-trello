import React, { useEffect, useRef } from 'react'
import Box from './Box'

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef(ref);

  useEffect(() => {
    if (props.focus) ref.current.focus();
  }, [])
  
  return (
    <Box
      ref={ref}
      as="input"
      variant="input"
      {...props}
      __themeKey="forms"
      __css={{
        display: 'block',
        bg: 'white',
        width: '100%',
        px: 2,
        py: 1,
        appearance: 'none',
        fontSize: '14px',
        lineHeight: 'inherit',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'border',
        borderRadius: 4,
        color: 'inherit',
        '&:focus': {
          outline: 'none'
        }
      //   bg: 'transparent',
      }}
    />
  );
});

export default Input;