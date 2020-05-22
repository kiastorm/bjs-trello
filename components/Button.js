import React from 'react'
import Box from './Box'
import { darken } from '@theme-ui/color';

const Button = React.forwardRef(({ variant = "primary", ...props }, ref) => (
  <Box
    ref={ref}
    as="button"
    {...props}
    __themeKey="buttons"
    __css={{
      appearance: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: 'inherit',
      // minWidth: '80px',  
      textDecoration: 'none',
      fontSize: 'inherit',
      px: 3,
      height: '32px',
      color: 'white',
      bg: 'primary',
      border: 0,
      borderRadius: 4,
      variant: `buttons.${variant}`
    }}
  />
))

export default Button;