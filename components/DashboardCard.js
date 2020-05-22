import { forwardRef } from 'react';

import Flex from './Flex';
import Heading from './Heading';


const DashboardCard = forwardRef(({ board: { id, name }, ...props}, ref) => {
    return (
      <Flex
        ref={ref}
        as="a"
        {...props}
        sx={{
          ...props.sx,
          cursor: 'pointer',
          p: 2,
          bg: 'primary',
          display: 'inline-flex',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'border',
          borderRadius: '4px',
          minHeight: '96px'
        }}
      >
        <Heading
          as="h3"
          sx={{
            color: 'white',
            display: 'inline'
          }}
        >
          {name}
        </Heading>
      </Flex>  
    );
});

export default DashboardCard;