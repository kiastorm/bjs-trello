import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { uuid } from 'uuidv4'
import Box from './Box';
import Flex from './Flex';
import Button from './Button';
import Input from './Input';
import Heading from './Heading';
import { X } from 'react-feather';
import { alpha, darken } from '@theme-ui/color';
import { Plus } from 'react-feather';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createList } from "../actions";


const CreateNewList = (props) => {
  const draftListTitleRef = useRef(null);
  const [ isDraftingNewList, setIsDraftingNewList ] = useState(false);
  const [ draftListTitle, setDraftListTitle ] = useState('');

    const startDraftingNewList = (e) => {
      if (!isDraftingNewList) setIsDraftingNewList(true);
    }

    const updateDraftListTitle = (e) => {
      setDraftListTitle(e.target.value);
    }

    const endDraftingNewList = () => {
      setIsDraftingNewList(false);
      setDraftListTitle('');
    }

    const commitNewList = () => {
      props.dispatch(createList({ title: draftListTitle }));
      setDraftListTitle('');
      draftListTitleRef.current.focus();
    }

    return (
      <Box sx={{ minWidth: '272px' }}
        {...props}
      >
        <Box
          p={1}
          onClick={startDraftingNewList}
          sx={{
            bg: alpha('sub', isDraftingNewList ? 1 : 0.5 ),
            color: '#555',
            cursor: 'pointer',
            borderRadius: 4,
            cursor: 'pointer',
            '&:hover': {
              bg: !isDraftingNewList && alpha('sub', 0.7),
              color: 'black'
            },
          }}
        >
          { isDraftingNewList ?
            <Box>
                <Input ref={draftListTitleRef} focus mb={2} value={draftListTitle} onChange={updateDraftListTitle} onKeyPress={() => console.log('hi')} />
                <Flex>
                  <Button type="submit" bg="green" onClick={commitNewList} disabled={!draftListTitle}>Create list</Button>
                  <Button ml={1} variant="ghost" color="black" onClick={endDraftingNewList}>
                      <X size="24px" />
                  </Button>
                </Flex>
            </Box>
            :
            <Flex
              sx={{
                py: 1,
                alignItems: 'center',
              }}
            >
                <Plus size="20px" />
                <Heading ml={1} as="h4">Create new list</Heading>
            </Flex>
          }
          
        </Box>
      </Box>
    );
}

const mapStateToProps = (state) => ({
  lists: state.lists,
})

export default connect(mapStateToProps)(CreateNewList)
