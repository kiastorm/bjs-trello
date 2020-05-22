import { useRouter } from 'next/router';

import Box from './Box';
import Flex from './Flex';
import Button from './Button';
import Input from './Input';
import Text from './Text';
import { darken  } from '@theme-ui/color';
import { Plus, X } from 'react-feather';

const CreateNewCard = ({ startDraftingNewCard, isDraftingNewCard, onCommit, onCancel, draftCardInputRef, draftCardTitle, updateDraftCardTitle, ...props }) => {

    return isDraftingNewCard ? 
      <Box>
        <Input
          focus
          ref={draftCardInputRef}
          mb={2}
          placeholder="Enter card title..."
          value={draftCardTitle}
          onChange={updateDraftCardTitle}
        />
        <Flex>
          <Button type="submit" bg="green" onClick={onCommit} disabled={!draftCardTitle}>Create card</Button>
          <Button ml={1} variant="ghost" color="black" onClick={onCancel}>
              <X size="24px" />
          </Button>
        </Flex>
      </Box>
      :
      <Box
        onClick={startDraftingNewCard}
        sx={{
          bg: 'sub',
          width: '100%',
          color: '#555',
          cursor: 'pointer',
          py: 1,
          px: 2,
          borderRadius: 4,
          cursor: 'pointer',
          '&:hover': {
            bg: darken('sub', 0.05),
            color: 'black'
          },
        }}
        {...props}
      >
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Plus size="20px" />
          <Text ml={1}>
            Create a new card
          </Text>
        </Flex>
      </Box>  
}

export default CreateNewCard;