import { useRouter } from 'next/router'
import { Plus, Home } from 'react-feather';

import Box from './Box';
import Flex from './Flex';
import Heading from './Heading';
import Text from './Text';
import Button from './Button';
import Avatar from './Avatar';


const Header = (props) => {
  const router = useRouter();

  const handleHomeClick = e => {
    e.preventDefault()
    router.push('/');
  }

  console.log(router);


  return (
    <Box
      p={2}
      bg='highlight'>
      <Flex
        sx={{
          alignItems: 'center',
        }}>
        <Button p={2} onClick={handleHomeClick}>
          <Home size="20px" />
        </Button>
        <Flex ml='auto'>
          <Avatar
            ml={3}
            src="/user-avatar.jpg"
            sx={{
              size: '32px'
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;