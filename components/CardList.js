import { useState, useRef } from 'react';
import Box from '../components/Box';
import Flex from '../components/Flex';
import Button from '../components/Button';
import Input from '../components/Input';
import { Edit2, Trash, Check } from 'react-feather';
import Heading from '../components/Heading';
import { connect } from 'react-redux'
import Card from '../components/Card';
import CreateNewCard from './CreateNewCard';
import { createCard } from '../actions';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useOnClickOutside from '../lib/useOnClickOutside';


const CardList = ({ listID, title, cards, index, updateActiveCard, ...props }) => {
  const [ draftCardTitle, setDraftCardTitle ] = useState('');
  const [ currentState, setCurrentState ] = useState('IDLE');
  
  const draftCardInputRef = useRef(null);
  const draftCardListRef = useRef(null);

  useOnClickOutside(draftCardListRef, () => setCurrentState('IDLE'));

  const startDraftingNewCard = () => {
    setCurrentState('DRAFTING_NEW_CARD');
  }

  const updateDraftCardTitle = (e) => {
    setDraftCardTitle(e.target.value);
  }

  const resetToInitialState = () => {
    setDraftCardTitle('');
    setCurrentState('IDLE');
  }

  const commitNewCard = (e) => {
    e.preventDefault();
    props.dispatch(createCard({ listID, title: draftCardTitle }));
    setDraftCardTitle('');
    draftCardInputRef.current && draftCardInputRef.current.focus();
  }


  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            minWidth: '260px',
          }}
        >
          <Droppable droppableId={String(listID)} type="card" style="flex: 1;">
            {provided => (
              <Box
                ref={draftCardListRef}
                {...props}
              >
                <Box
                  sx={{
                    ...props.sx,
                    pb: 2,
                    px: 2,
                    bg: 'sub',
                    borderRadius: '4px',
                  }}
                >
                  <Box py={3} px={1} sx={{ alignItems: 'center' }}>
                    <Heading as="h4" sx={{ fontSize: '14px' }}>{title}</Heading>
                  </Box>
                  <Box
                    // mb={3}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {cards.map((card, index) => card && (
                          <Card
                            mb={index + 1 !== cards.length ? 3 : undefined}
                            key={card.id} 
                            index={index}
                            updateActiveCard={updateActiveCard}
                            {...card}
                          />
                      ))}
                      <Box pb={3}>
                          {provided.placeholder}
                      </Box>
                  </Box>
                  <Box>
                    <CreateNewCard
                      onCommit={commitNewCard}
                      isDraftingNewCard={currentState === 'DRAFTING_NEW_CARD'}
                      draftCardInputRef={draftCardInputRef}
                      startDraftingNewCard={startDraftingNewCard}
                      onCancel={resetToInitialState}
                      draftCardTitle={draftCardTitle}
                      updateDraftCardTitle={updateDraftCardTitle}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
}


export default connect()(CardList);