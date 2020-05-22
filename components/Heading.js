import React from 'react'
import Box from './Box'

const Heading = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="h2"
    variant="heading"
    {...props}
    __themeKey="text"
    __css={{
      fontFamily: 'heading',
      fontWeight: '600',
      lineHeight: 'heading',
    }}
  />
))

export default Heading;