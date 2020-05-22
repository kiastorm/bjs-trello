import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DashboardCard from '../../../components/DashboardCard';
import Box from '../../../components/Box';
import Flex from '../../../components/Flex';
import Heading from '../../../components/Heading';
import Container from '../../../components/Container';
import CardList from '../../../components/CardList';
import { useRouter } from 'next/router';
import CardViewModal from '../../../components/CardViewModal';
import CreateNewList from '../../../components/CreateNewList';
import { withRedux } from '../../../lib/redux'
import { setActiveBoard, setActiveCard, sort } from '../../../actions';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const BoardPage = ({ lists, boards, cards, activeCardID, allComments, ...props }) => {
    const router = useRouter();

    const { query: { boardID } } = router;

    const activeCard = cards[activeCardID];

    useEffect(() => {
        props.dispatch(setActiveBoard({ id: boardID }));
    }, []);

    const exitCard = () => {
        props.dispatch(setActiveCard({ id: null }));
    };

    const updateActiveCard = (cardID) => {
        props.dispatch(setActiveCard({ id: cardID }));
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        props.dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        );
    }

    const board = boards[boardID];
    
    if (!board) {
        return <Heading>Board not found</Heading>;
    }

    const listOrder = board.lists;

    return (
        <Flex
            sx={{
                    bg: 'tomato',
                    flexGrow: 1,
            }}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex
                    sx={{
                        flexDirection: 'column',
                        minWidth: '100%'
                    }}
                >
                    <Box py={2} px={4}>
                        <Heading color="white" as="h2">
                            {/* {name} */}
                            Board one!
                        </Heading>
                    </Box>
                    <Flex
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {(provided) => (
                                <Flex
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    sx={{
                                        overflowX: 'auto',
                                        flex: 1,
                                        px: 4
                                    }}
                                >
                                    {listOrder.map((listID, index) => {
                                        const list = lists[listID];

                                        if (list) {
                                            const listCards = list.cards.map(cardID => cards[cardID]);

                                            return (
                                                <CardList
                                                    index={index}
                                                    mr={3}
                                                    key={list.id}
                                                    listID={list.id}
                                                    updateActiveCard={updateActiveCard}
                                                    title={list.title}
                                                    cards={listCards}
                                                />
                                            )
                                        }
                                    })}
                                    {provided.placeholder}
                                    <CreateNewList />
                                </Flex>
                            )}
                        </Droppable>
                    </Flex>
                </Flex>
            </DragDropContext>
            {activeCard &&
                <CardViewModal
                    activeCardID={activeCardID}
                    exitCard={exitCard}
                    allComments={allComments}
                    list={lists[activeCard.listID]}
                    {...activeCard}
                />
            }
        </Flex>
    );
}

const mapStateToProps = state => ({
    lists: state.lists,
    cards: state.cards,
    boards: state.boards,
    allComments: state.comments,
    activeCardID: state.activeCard
});

export default withRedux(connect(mapStateToProps)(BoardPage));
