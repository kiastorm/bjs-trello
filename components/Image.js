import React from 'react'
import Box from './Box'

const Image = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="img"
    {...props}
    __themeKey="images"
    __css={{
      maxWidth: '100%',
      height: 'auto',
      ...props.__css,
    }}
  />
))

export default Image;