import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import Link from 'next/link';

import { withRedux } from '../lib/redux'
import DashboardCard from '../components/DashboardCard';
import Box from '../components/Box';
import Heading from '../components/Heading';
import Container from '../components/Container';
import CreateNewBoard from '../components/CreateNewBoard';
import { createBoard } from '../actions';

const Home = ({ boards, boardOrder, ...props }) => {
  const [ isDraftingNewBoard, setIsDraftingNewBoard ] = useState(false);
  const [ draftBoardName, setDraftBoardName ] = useState('');

  const startDraftingNewBoard = () => {
    setIsDraftingNewBoard(true);
  };

  const resetToInitialState = () => {
    setDraftBoardName('');
    setIsDraftingNewBoard(false);
  }

  const updateDraftBoardName = (e) => {
    setDraftBoardName(e.target.value);
  }

  const commitNewBoard = (e) => {
    e.preventDefault();
    props.dispatch(createBoard({ name: draftBoardName }));
    resetToInitialState();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        sx={{
          py: 4,
          px: 2
        }}
      >
        <Box mb={5}>
          <Heading as="h1" mb={1}>Dashboard</Heading>
          <Heading as="h3" sx={{ fontWeight: '400' }}>You have {boardOrder.length} card{boardOrder.length === 1 ? '' : 's'}</Heading>
        </Box>
        <Box
          sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: '96px',
            gridGap: 3
          }}
        >
          <CreateNewBoard
            startDraftingNewBoard={startDraftingNewBoard} 
            resetToInitialState={resetToInitialState}
            isDraftingNewBoard={isDraftingNewBoard}
            updateDraftBoardName={updateDraftBoardName} draftBoardName={draftBoardName}
            commitNewBoard={commitNewBoard}
          />
          {boardOrder.map(boardID => {
            const board = boards[boardID];

            if (board) {
              return (
                <Link key={boardID} href={`/board/[boardID]`} as={`/board/${boardID}`}>
                  <DashboardCard key={board.id} board={board} />
                </Link>
              )
            }
          })}
        </Box>
      </Container>
    </Box>
  );
}

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default withRedux(connect(mapStateToProps)(Home));

