import React from 'react'
import Box from './Box'

const Text = React.forwardRef((props, ref) => (
  <Box ref={ref} variant="default" {...props} __themeKey="text" sx={{ fontSize: '14px' }} />
))

export default Text;