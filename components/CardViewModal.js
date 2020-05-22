import { useState, useRef } from 'react';
import { useRouter, Router } from 'next/router';

import Box from './Box';
import Flex from './Flex';
import Heading from './Heading';
import Text from './Text';
import Avatar from './Avatar';
import Input from './Input';
import Button from './Button';
import { X, Trash } from 'react-feather';
import { darken } from "@theme-ui/color";
import { connect } from 'react-redux';
import { updateCard, deleteCard, createComment } from '../actions';
import useOnClickOutside from '../lib/useOnClickOutside';

const CardViewModal = ({
  exitCard,
  activeCardID,
  title,
  body,
  allComments,
  comments,
  list,
  ...props
}) => {
  const modalRef = useRef(null);
  const draftCardTitleInputRef = useRef(null);
  const draftCardBodyInputRef = useRef(null);
  const commentInputRef = useRef(null);

  const [ draftCommentText, setDraftCommentText ] = useState('');

  const startUpdatingTitle = () => {
    setCurrentState('UPDATING_TITLE');
  };

  const updateDraftCommentText = (e) => {
    setDraftCommentText(e.target.value)
  }

  const startUpdatingBody = () => {
    setCurrentState('UPDATING_BODY');
  };

  const commitNewTitle = () => {
    if (current === 'UPDATING_TITLE') {
      props.dispatch(updateCard({ id: activeCardID, listID: list.id, title: draftCardTitle }));
      setCurrentState('IDLE');
    }
  }

  const commitComment = () => {
    props.dispatch(createComment({ text: draftCommentText }));
    setDraftCommentText('')
    commentInputRef.current.focus();
  };

  const handleDeleteCard = () => {
    props.dispatch(deleteCard({ id: activeCardID, listID: list.id }));
  }

  const commitNewBody = () => {
    if (current === 'UPDATING_BODY') {
      props.dispatch(updateCard({ id: activeCardID, listID: list.id, body: draftCardBody }));
      setCurrentState('IDLE');
    }
  }

  useOnClickOutside(modalRef, exitCard);
  useOnClickOutside(draftCardTitleInputRef, commitNewTitle);

  const [current, setCurrentState] = useState('IDLE');
  const [draftCardTitle, setDraftCardTitle] = useState(title) 
  const [draftCardBody, setDraftCardBody] = useState(body) 

  const renderCardTitle = () => {
    if (current === 'UPDATING_TITLE') {
      return (
          <Input
            focus
            ref={draftCardTitleInputRef}
            value={draftCardTitle}
            onChange={(e) => setDraftCardTitle(e.target.value)}
          />
      )
    }

    return <Heading mb={1} onClick={startUpdatingTitle}>{title}</Heading>;
  }

  const renderCardBody = () => {
    if (current === 'UPDATING_BODY') {
      return (
        <Box>
          <Input
            ref={draftCardBodyInputRef}
            focus
            as="textarea" 
            rows="6"
            cols="20"
            wrap="hard"
            value={draftCardBody}
            onChange={(e) => setDraftCardBody(e.target.value)}
            sx={{
              mb: 3,
              resize: 'vertical',
              maxHeight: '500px',
              minHeight: '240px'
            }}
          />
          <Flex>
            <Button
              type="submit"
              bg="green"
              onClick={commitNewBody}
            >
              Save
            </Button>
            <Button
              ml={1}
              variant="ghost"
              color="black"
              // onClick={onCancel}   
            >
                <X size="24px" />
            </Button>
          </Flex>
        </Box>
      )
    }

    if (draftCardBody) return <Text onClick={startUpdatingBody} sx={{ height: '100%' }}>{body}</Text>;

    return (
      <Box
        onClick={() => setCurrentState('UPDATING_BODY')}
        sx={{
          bg: darken('sub', 0.05),
          p: 2,
          borderRadius: '4px',
          minHeight: '240px'
        }}
      >
        <Text
          sx={{
            bg: darken('text', 0.1),
          }}
        >
          Enter a body
        </Text>
      </Box>
    );
  }

  return (
    <Flex
      sx={{
          bg: 'rgba(0, 0, 0, .5)',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          px: 4
      }}
      {...props}
  >
      <Box
        ref={modalRef}
        sx={{
            bg: 'sub',
            borderRadius: '4px',
            width: '768px',
        }}
      >
          <Box
              sx={{
                  p: 4,
              }}
          >
            <Flex>
              <Box sx={{ flex: 1 }}>
                <Box mb={1} ref={draftCardTitleInputRef}>
                  {renderCardTitle()}
                </Box>
                <Text>in list {list.title}</Text>
              </Box>
              <Box ml="auto">
                <Button variant="ghost" color="black" onClick={exitCard}>
                  <X size="20px" />
                </Button>
              </Box>
            </Flex>
          </Box>
          <Flex mx={-2} sx={{ flexDirection: ['column', 'row'], px: 4 }}>
            <Box mx={2} sx={{ minHeight: '240px', flex: [null, '3 1 0'] }}>
              {renderCardBody()}
            </Box>
            <Box mx={2} sx={{ flexDirection: ['row', 'column'], flex: [null, '1 1 0'] }}>
              <Button sx={{ bg: '#DE503A', width: ['100%'] }} onClick={handleDeleteCard}>
                  <Trash size="16px" />
                  <Text ml={1}>Delete</Text>
              </Button>
            </Box>
          </Flex>
          <Box sx={{ px: 4, py: 6 }}>
            <Box mb={3}>
              <Heading mb={1}>
                Comments
              </Heading>
            </Box>
            <Box>
              <Flex mb={5}>
                <Avatar size="32px" src="/user-avatar.jpg" />
                <Flex sx={{ flexGrow: '1',  alignItems: 'center' }}>
                  <Input mr={3} ref={commentInputRef} value={draftCommentText} onChange={updateDraftCommentText} ml={3} textarea placeholder="Write a comment..." sx={{ flexGrow: '1' }} />
                  <Button onClick={commitComment}>Send</Button>
                </Flex>
              </Flex>
              {comments.map(comment => {
                const commentObj = allComments[comment];

                return (
                  <Flex pl={11} mb={3}>
                    <Avatar mr={3} size="20px" src="/user-avatar.jpg" />
                    <Text>{commentObj.text}</Text>
                  </Flex>
                );
              })}
            </Box>
          </Box>
      </Box>
  </Flex>
  );
}

export default connect()(CardViewModal);