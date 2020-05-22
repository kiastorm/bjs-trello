import Box from '../components/Box';
import Text from '../components/Text';
import { darken } from "@theme-ui/color";
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ id: cardID, index, title, provided, updateActiveCard, ...props }) => {
  const handleCardClick = (e) => {
    e.preventDefault();
    updateActiveCard(cardID);
  }

  return (
    <Draggable draggableId={cardID} index={index}>
      {provided => 
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Box
            onClick={handleCardClick}
            sx={{
              bg: 'white',
              cursor: 'pointer',
              boxShadow: '0 1px 0 rgba(9,30,66,.25)',
              py: 1,
              px: 2,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'transparent',
              borderRadius: 4,
              '&:hover': {
                bg: darken('white', 0.05)
              },
              ...props.sx
            }}
            {...props}
          >
              <Text>
                {title}
              </Text>
          </Box>  
      </Box>
      }
    </Draggable>
  );
}

export default Card;