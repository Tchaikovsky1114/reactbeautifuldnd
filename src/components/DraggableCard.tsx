import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styled from 'styled-components';
import { ITodo } from '../atom';

const List = styled.li<{ isDragging: boolean }>`
  width: 100%;
  border: 0;
  list-style: none;
  background-color: ${(prop) => (prop.isDragging ? '#00A79E' : '#008A60')};
  margin: 10px 0px;
  border-radius: 3px;
  padding-left: 10px;
  padding: 5px 0px;
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 20px rgba(0,0,0,0.5)' : 'none'};
`;
const Text = styled.span`
  margin-left: 10px;
  font-size: 1rem;
  color: #1d1d35;
`;

interface IDraggabbleCardProps {
  toDoId: number;
  toDoText: string;
  idx: number;
}

const DraggableCard = ({ toDoId, toDoText, idx }: IDraggabbleCardProps) => {
  //   const [toDos, setToDos] = useRecoilState(toDoState);
  return (
    <Draggable key={idx} draggableId={toDoText} index={idx}>
      {(provided, snapshot) => (
        <List
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Text>⏺ {toDoText}</Text>
        </List>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
