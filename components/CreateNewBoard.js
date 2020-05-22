import { useRef } from 'react';
import { useRouter } from 'next/router';

import Box from './Box';
import Flex from './Flex';
import Button from './Button';
import Label from '../components/Label';
import Input from '../components/Input';
import Text from './Text';
import { darken  } from '@theme-ui/color';
import { Plus, X } from 'react-feather';

const CreateNewBoard = ({
  startDraftingNewBoard,
  resetToInitialState,
  isDraftingNewBoard,
  draftBoardName,
  updateDraftBoardName,
  commitNewBoard,
  ...props
}) => {
  const draftBoardNameRef = useRef(null);
  
    return (
      <Box
        sx={{
          bg: 'sub',
          borderWidth: '3px',
          borderStyle: 'dashed',
          borderColor: 'border',
          width: '100%',
          // color: '#555',
          cursor: 'pointer',
          py: 1,
          px: 2,
          borderRadius: 4,
          cursor: 'pointer',
          '&:hover': {
            bg: darken('sub', 0.05),
            borderColor: darken('border', 0.05)
          },
        }}
        {...props}
      >
          {isDraftingNewBoard ?
            <Box mb={3}>
              <Input ref={draftBoardNameRef} focus mb={2} name="board-name"  value={draftBoardName} onChange={updateDraftBoardName} />
              <Flex>
                <Button type="submit" bg="green" onClick={commitNewBoard}>Create board</Button>
                <Button ml={1} variant="ghost" color="black" onClick={resetToInitialState}>
                    <X size="24px" />
                </Button>
              </Flex>
            </Box>
            :
            <Flex
              onClick={startDraftingNewBoard}
              sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text ml={1}>
                Create a new Board
              </Text>
            </Flex>
          }
      </Box>  
    );
}

export default CreateNewBoard;