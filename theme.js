import { base } from '@theme-ui/presets'

export default {
  ...base,
  space: [
    0,
    4,
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
    40,
    44,
    48,
    52,
    56,
    60,
    64,
    68,
    72,
    76,
    80    
  ],
  colors: {
    ...base.colors,
    sub: '#ebecf0',
    border: '#ddd'
  },
  sizes: {
    container: '1200px'
  },
  buttons: {
    'inline-ghost': {
      bg: 'transparent',
      height: 'auto',
      p: 0,
      '&:hover': {
        bg: '#ddd'
      }
    },
    ghost: {
      bg: 'transparent',
      width: '32px',
      height: '32px',
      p: 0,
      '&:hover': {
        bg: '#ddd'
      }
    },
  },
  styles: {
    ...base.styles,
    h4: {
      fontSize: '14px',
    },
    p: {
      fontSize: '14 px',
    },
  },
}